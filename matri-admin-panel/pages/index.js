import React, { useState, useEffect, useRef, useCallback } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { backendUrl } from "@/url";
import AdminLayout from "@/components/AdminLayout";
import toast from "react-hot-toast";
import { useRouter } from 'next/router';
import { usePopper } from 'react-popper';

const DashboardCard = ({ item, dashboardDetails }) => (
  <div
    className="flex justify-between gap-4 p-4 border border-[rgba(15,35,84,0.10)] rounded-[10px]"
    style={{
      background: item.background,
      borderBottom: item.borderColor,
    }}
  >
    <div className="flex flex-col gap-2">
      <h2 className="text-[16px] text-[#363B49] font-[500]">{item.heading}</h2>
      {dashboardDetails ? (
        <p className="text-[24px] text-[#000] font-[600] mt-2">{item.textNumber}</p>
      ) : (
        <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
      )}
      <p className="text-[#363B49] text-[16px] pt-2">
        <span style={{ color: item.spanText }}>{item.percentage}</span> {item.text}
      </p>
    </div>
    <img src={item.img} className="w-12 h-12 object-contain" alt="Icon" />
  </div>
);

const ActionMenu = ({ onClose, onView, onEdit, onDelete, onEditUser }) => (
  <div className="bg-white border border-gray-200 rounded-md shadow-lg z-20 w-48">
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

export default function Home() {
  const [users, setUsers] = useState([]);
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const router = useRouter();
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const menuRef = useRef(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
      { name: 'preventOverflow', options: { padding: 8 } },
    ],
  });

  useEffect(() => {
    fetchUsers();
    fetchDashboardDetails();
  }, []);

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

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${backendUrl}/admin/getAllUsers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  const fetchDashboardDetails = async () => {
    try {
      const res = await fetch(`${backendUrl}/admin/dashDetails`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setDashboardDetails(data);
    } catch (error) {
      console.error("Error fetching dashboard details:", error);
      toast.error("Failed to fetch dashboard details");
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/admin/delete-user/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setLoading(false);
      toast.success("User deleted successfully");
      setUsers(data.users);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Failed to delete user");
    }
  };

  const handleEditRedirect = (userId) => {
    router.push(`/edit-user?userId=${userId}`);
  };

  const toggleMenu = useCallback((index, event) => {
    event.stopPropagation();
    setActiveMenu(prevActiveMenu => prevActiveMenu === index ? null : index);
    setReferenceElement(event.currentTarget);
  }, []);

  const cardsData = [
    {
      id: 1,
      background: "#f4f6ff",
      heading: "All Members",
      textNumber: dashboardDetails?.totalUsers || 0,
      spanText: "#28A745",
      percentage: dashboardDetails?.userPercentageChange || 0,
      text: "Since Last month",
      img: "/images/allMemberIcon.png",
      borderColor: "10px solid #3747CF",
    },
    {
      id: 2,
      background: "#F4F2EB",
      heading: "Active Members",
      textNumber: dashboardDetails?.activeUsers || 0,
      spanText: "#E8BC42",
      percentage: dashboardDetails?.activeUserPercentageChange || 0,
      text: "Since Last month",
      img: "/images/allActiveMemberIcon.png",
      borderColor: "10px solid #EAC562",
    },
    {
      id: 3,
      background: "#F1E8F0",
      heading: "Paid Members",
      textNumber: dashboardDetails?.paidUsers || 0,
      spanText: "#C73170",
      percentage: dashboardDetails?.paidUserPercentageChange || 0,
      text: "Since Last month",
      img: "/images/paidMemberIcon.png",
      borderColor: "10px solid #C93B77",
    },
    {
      id: 4,
      background: "#F4EEEB",
      heading: "Featured Members",
      textNumber: dashboardDetails?.featuredUsers || 0,
      spanText: "#ED6C0E",
      percentage: dashboardDetails?.featuredUserPercentageChange || 0,
      text: "Since Last month",
      img: "/images/featureMemberIcon.png",
      borderColor: "10px solid #ED883F",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cardsData.map((item) => (
          <DashboardCard key={item.id} item={item} dashboardDetails={dashboardDetails} />
        ))}
      </div>

      <h1 className="text-2xl font-semibold mb-4">Recent Members</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user, index) => (
              <tr key={user._id}>
                <td className="px-2 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user._id.toString().substring(0, 10)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.userImages.length > 0 ? (
                      <img className="h-10 w-10 rounded-full" src={user.userImages[0]} alt="" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-600">{user.name[0]}</span>
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.gender}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={(event) => toggleMenu(index, event)}
                    className="text-indigo-600 hover:text-indigo-900 action-menu-button"
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {activeMenu === index && (
                    <div
                      ref={(el) => {
                        setPopperElement(el);
                        menuRef.current = el;
                      }}
                      style={styles.popper}
                      {...attributes.popper}
                    >
                      <ActionMenu
                        onClose={() => setActiveMenu(null)}
                        onView={() => router.push(`/user-profile/${user._id}`)}
                        onEdit={() => router.push(`/user-edit/${user._id}`)}
                        onDelete={() => handleDelete(user._id)}
                        onEditUser={() => handleEditRedirect(user._id)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Home.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;