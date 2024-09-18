import React, { useState, useEffect, useRef, useCallback } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidEdit, BiFilterAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEye, AiFillPlusCircle } from "react-icons/ai";
import { FaUserCheck, FaUserClock, FaUserEdit, FaUser } from "react-icons/fa";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import { FaUserXmark } from "react-icons/fa6";
import { ImUserCheck } from "react-icons/im";
import { Select, Space, Spin } from "antd";
import { Modal } from "antd";
import EditModal from "../components/modals/editModal";
import DeleteModal from "../components/modals/deleteModal";
import { backendUrl } from "@/url";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from 'next/router';
import { usePopper } from 'react-popper';

const ActionMenu = ({ onClose, onView, onEdit, onDelete, onEditUser }) => (
  <div className="bg-white border border-gray-200 rounded-md shadow-lg z-50 w-48">
    <div className="py-1">
      <button onClick={onView} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <AiOutlineEye className="inline mr-2" /> View Profile
      </button>
      <button onClick={onEdit} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <BiSolidEdit className="inline mr-2" /> Edit Profile
      </button>
      <button onClick={onDelete} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <RiDeleteBin6Line className="inline mr-2" /> Delete Profile
      </button>
      <button onClick={onEditUser} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <BiSolidEdit className="inline mr-2" /> Edit User Details
      </button>
    </div>
  </div>
);

const MembersPaid = () => {
  const [members, setMembers] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sortValue, setSortValue] = useState("all");
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const router = useRouter();
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const menuRef = useRef();
  const divRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
      { name: 'preventOverflow', options: { padding: 8 } },
      { name: 'flip', options: { fallbackPlacements: ['top-end', 'left-end'] } },
    ],
  });

  useEffect(() => {
    fetchItems(page, pageSize);
  }, [page, pageSize, sortValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      // Retrieve subscription plans and get their IDs
      const subscriptionPlans = JSON.parse(localStorage.getItem('subscriptionPlans'));
      const subscriptionIds = subscriptionPlans.map(plan => plan._id);

      let allUsers = [];
      let page = 1;
      let totalPages;
      let filteredUsers = [];

      // Fetch all users and filter them by subscription IDs
      do {
        const response = await axios.get(`${backendUrl}/admin/getAllUsers`, {
          params: {
            page,
            pageSize, // Default pageSize
            sortValue,
          },
          withCredentials: true,
        });

        // Accumulate users
        allUsers = allUsers.concat(response.data.users);

        // Move to the next page
        page += 1;

        // Update totalPages if available in the response
        totalPages = response.data.totalPages;

      } while (page <= totalPages);

      // Filter users by subscription IDs
      filteredUsers = allUsers.filter(user => subscriptionIds.includes(user.membership));

      // Calculate the total pages for filtered users
      const itemsPerPage = 10; // Adjust based on your needs
      const totalFilteredPages = Math.ceil(filteredUsers.length / itemsPerPage);

      // Set the total pages and members (filtered users)
      setTotal(totalFilteredPages);
      setMembers(filteredUsers);

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilter = () => {
    setPage(1);
    fetchItems(1, pageSize);
  };

  const selectData = [
    {
      value: "active",
      icon: <ImUserCheck className="h-4 w-10 text-[#82868E]" />,
      heading: "Active",
    },
    {
      value: "feature",
      icon: <FaUserEdit className="h-4 w-10 text-[#82868E]" />,
      heading: "Feature",
    },
    {
      value: "paid",
      icon: <FaUserCheck className="h-4 w-10 text-[#82868E]" />,
      heading: "Paid",
    },
    {
      value: "inactive",
      icon: <FaUserClock className="h-4 w-10 text-[#82868E]" />,
      heading: "Inactive",
    },
    {
      value: "suspended",
      icon: <FaUserXmark className="h-4 w-10 text-[#82868E]" />,
      heading: "Suspended",
    },
    {
      value: "all",
      icon: <FaUser className="h-4 w-10 text-[#82868E]" />,
      heading: "All",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
    handleDelete(deleteId);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (id) => {
    setLoading(true);
    fetch(backendUrl + `/admin/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        toast.success("User deleted successfully");
        fetchItems(page, pageSize);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const toggleMenu = useCallback((index, event) => {
    event.stopPropagation();
    setActiveMenu(prevActiveMenu => prevActiveMenu === index ? null : index);
    setReferenceElement(event.currentTarget);
  }, []);

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
      const pageNumbers = [];
      if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        if (currentPage <= 2) {
          pageNumbers.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 1) {
          pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }
      return pageNumbers;
    };

    return (
      <div className="flex justify-center items-center space-x-2 my-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          <LiaLongArrowAltLeftSolid className="text-[20px]" />
          Previous
        </button>
        {getPageNumbers().map((number, index) => (
          <button
            key={index}
            onClick={() => typeof number === 'number' && onPageChange(number)}
            className={`px-3 py-2 rounded-md ${currentPage === number
              ? "bg-[#ED6C0E] text-white"
              : number === '...'
                ? "bg-transparent text-gray-600 cursor-default"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
              }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Next
          <LiaLongArrowAltRightSolid className="text-[20px]" />
        </button>
      </div>
    );
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Edit Event"
        centered
        closable={true}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <EditModal onOk={handleOk} onCancel={handleCancel} />
      </Modal>
      <Modal
        open={isDeleteModalOpen}
        title="Delete Event"
        centered
        closable={true}
        footer={false}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <DeleteModal onOk={handleDeleteOk} onCancel={handleDeleteCancel} />
      </Modal>
      <div className="min-h-[calc(100vh-81px)] border border-borderColor border-opacity-[0.07] p-4">
        <div className="flex flex-col justify-between sm:flex-row ">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <p>Sort by:</p>

            <div className="flex flex-col items-center w-full gap-3 sm:w-auto sm:flex-row">
              <div className="w-full sm:w-auto">
                <Select
                  placeholder="select one"
                  optionLabelProp="heading"
                  bordered={false}
                  options={selectData}
                  defaultValue={"Active"}
                  value={sortValue}
                  onChange={(value) => setSortValue(value)}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.heading}>
                        {option.data.icon}
                      </span>
                      {option.data.heading}
                    </Space>
                  )}
                />
              </div>

              <button
                onClick={handleFilter}
                className="w-full sm:w-[109px] h-[50px] text-[14px] bg-[#ED6C0E] rounded-[5px] text-white flex justify-center items-center  gap-1"
              >
                Filter
                <BiFilterAlt className="text-[22px] text-white " />
              </button>
            </div>
          </div>

          <div>
            <button className=" mt-3 sm:mt-0 w-full sm:w-[185px] h-[50px] text-[14px] bg-[#ED6C0E] rounded-[5px] text-white flex justify-center items-center  gap-2">
              <AiFillPlusCircle className="text-[22px] text-white " />
              Add Member
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-7">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MemberShip ID
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Address
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile Number
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="home-table">
              {members.map((item, index) => {
                if (!item) return null;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.membership}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {item && item.userImages.length > 0 ? (
                          <img
                            src={item.userImages[0]}
                            alt="Profile Image"
                            className="h-10 w-10 rounded-full mr-3"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="text-xl font-medium text-gray-700">
                              {item && item.name[0]}
                            </span>
                          </div>
                        )}
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.gender || "N/A"}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.email}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.phone}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm font-medium relative">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={(event) => toggleMenu(index, event)}
                      >
                        <BsThreeDotsVertical />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          )}
        </div>

        <Pagination
          currentPage={page}
          totalPages={total}
          onPageChange={handlePageChange}
        />
      </div>
      {activeMenu !== null && (
        <div
          ref={setPopperElement}
          style={{
            ...styles.popper,
            zIndex: 1000,
            position: 'fixed',
          }}
          {...attributes.popper}
        >
          <ActionMenu
            onClose={() => setActiveMenu(null)}
            onView={() => router.push(`/user-profile/${members[activeMenu]._id}`)}
            onEdit={() => router.push(`/user-edit/${members[activeMenu]._id}`)}
            onDelete={() => showDeleteModal(members[activeMenu]._id)}
            onEditUser={() => router.push(`/edit-user?userId=${members[activeMenu]._id}`)}
          />
        </div>
      )}
    </>
  );
};

MembersPaid.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default MembersPaid;