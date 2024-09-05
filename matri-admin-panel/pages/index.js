import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { backendUrl } from "@/url";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import toast, { LoaderIcon } from "react-hot-toast";

export default function Home() {
  const [show, setShow] = useState(false);
  const [members, setMembers] = useState();
  const [selected, setSelected] = useState();
  const divRef = useRef();
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState();
  const [dashboardDetails, setDashboardDetails] = useState();

  const handleShow = (id) => {
    setShow(!show);
    setSelected(id);
  };

  useEffect(() => {
    fetch(backendUrl + "/admin/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    fetch(backendUrl + "/admin/dashDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setDashboardDetails(data);
      });
  }, []);

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
        setMembers(data.users);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

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

  const cardsData = [
    {
      id: 1,
      background: "#f4f6ff",
      heading: "All Members",
      textNumber: `${dashboardDetails && dashboardDetails.totalUsers}`,
      spanText: "#28A745",
      percentage: dashboardDetails && dashboardDetails.userPercentageChange,
      text: ` Since Last month`,
      img: "/images/allMemberIcon.png",
      borderColor: "10px solid #3747CF",
    },
    {
      id: 2,
      background: "#F4F2EB",
      heading: "Active Members",
      textNumber: `${dashboardDetails && dashboardDetails.activeUsers}`,
      spanText: "#E8BC42",
      percentage:
        dashboardDetails && dashboardDetails.activeUserPercentageChange,
      text: `  Since Last month`,
      img: "/images/allActiveMemberIcon.png",
      borderColor: "10px solid #EAC562",
    },
    {
      id: 3,
      background: "#F1E8F0",
      heading: "Paid Members",
      textNumber: `${
        dashboardDetails && dashboardDetails.paidUsers === undefined ? (
          <LoaderIcon />
        ) : (
          dashboardDetails && dashboardDetails.paidUsers
        )
      }`,
      spanText: "#C73170",
      percentage: dashboardDetails && dashboardDetails.paidUserPercentageChange,
      text: ` Since Last month`,
      img: "/images/paidMemberIcon.png",
      borderColor: "10px solid #C93B77",
    },
    {
      id: 4,
      background: "#F4EEEB",
      heading: "Featured Members",
      textNumber: `${dashboardDetails && dashboardDetails.featuredUsers}`,
      spanText: "#ED6C0E",
      percentage:
        dashboardDetails && dashboardDetails.featuredUserPercentageChange,
      text: ` Since Last month`,
      img: "/images/featureMemberIcon.png",
      borderColor: "10px solid #ED883F",
    },
  ];

  const graphCardData = [
    {
      id: 1,
      bg: "#000000",
      heading: "Advertisment",
      textNumber: "123",
      spanText: "%12.00",
      spanStyle: "#28A745",
      img: "/images/graphImg.png",
    },
    {
      id: 2,
      bg: "#000000",
      heading: "Membership Plan",
      textNumber: "123",
      spanText: "%12.00",
      spanStyle: "#C73170",

      img: "/images/graphImgPink.png",
    },
    {
      id: 3,
      bg: "#000000",
      heading: "Express Interest",
      textNumber: "123",
      spanText: "%12.00",
      spanStyle: "#E8BC42",
      img: "/images/graphImgYellow.png",
    },
    {
      id: 4,
      bg: "#000000",
      heading: "Success Story",
      textNumber: "123",
      spanText: "%12.00",
      spanStyle: "#1240B4",
      img: "/images/graphImgBlue.png",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2  xxl:grid-cols-4 gap-[1rem]">
        {cardsData.map((item, index) => (
          <div
            className={`flex justify-between gap-4 px-4 pt-4  border border-[rgba(15, 35, 84, 0.10)] rounded-[10px]`}
            style={{
              background: item.background,
              borderBottom: item.borderColor,
            }}
            key={item.id}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-[16px] text-[#363B49] font-[500]">
                {item.heading}
              </h1>
              {dashboardDetails ? (
                <h1 className="text-[24px] text-[#000] font-[600] mt-2">
                  {item.textNumber}
                </h1>
              ) : (
                <LoaderIcon />
              )}
              <p className="text-[#363B49] text-[16px] pt-2 pb-4 ">
                <span style={{ color: item.spanText }}>{item.percentage}</span>
                {item.text}
              </p>
            </div>
            <div>
              <img src={item.img} className="mt-4 " alt="Icon" />
            </div>
          </div>
        ))}

        {/* {graphCardData.map((item) => (
          <div key={item.id}>
            <div className="  border border-[rgba(15, 35, 84, 0.10)] rounded-[10px]">
              <div className={`flex justify-between  gap-4 p-4 `}>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[16px] text-[#363B49] font-[500]">
                    {item.heading}
                  </h1>
                  <h1 className="text-[24px] text-[#000] font-[600]">
                    {item.textNumber}
                  </h1>
                </div>
                <div>
                  <p
                    className="text-[14px] font-[600]"
                    style={{ color: item.spanStyle }}
                  >
                    {item.spanText}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <img
                  src={item.img}
                  alt="Graph Img"
                  className="w-full h-[80px]"
                />
              </div>
            </div>
          </div>
        ))} */}
      </div>

      <div className="mt-6">
        <h1 className="text-homeText-Color text-[24px] font-[600] ">
          Recent Members
        </h1>
        <div className="overflow-x-auto mt-7">
          <table className="min-w-full bg-white ">
            <thead className="ltr:text-left rtl:text-right border-t border-t-[rgba(0, 0, 0, 0.07)] p-4">
              <tr className="">
                <th className="whitespace-nowrap px-5 py-4  text-[16px]    text-[#363B49]  font-[400]">
                  User Name
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-[16px]  text-[#363B49]  font-[400] ">
                  Gender
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-[16px]  text-[#363B49]  font-[400] ">
                  Email Address
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-[16px]  text-[#363B49]  font-[400] ">
                  Mobile Number
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-[16px]  text-[#363B49]  font-[400] ">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-4 text-[16px]  text-[#363B49]  font-[400] ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="home-table ">
              {users &&
                users.map((item, index) => {
                  return (
                    <tr
                      className="border border-[rgba(0, 0, 0, 0.07)]"
                      key={index}
                    >
                      <td className="whitespace-nowrap p-4 text-[14px]  text-blackColor font-[500] flex items-center gap-4  max-xl:w-[200px] ">
                        {item && item.userImages.length > 0 ? (
                          <img
                            src={item.userImages[0]}
                            alt="Profile Image"
                            className="block mx-auto w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full mx-auto">
                            {item && item.name[0]}
                          </div>
                        )}
                        <h1>{item.name}</h1>
                      </td>
                      <td className="whitespace-nowrap p-4 font-roboto text-black font-[500] max-xl:w-[300px] ">
                        {item.gender}
                      </td>
                      <td className="whitespace-nowrap p-4 font-roboto  text-blackColor font-[500] max-xl:w-[300px]  ">
                        {item.email}
                      </td>
                      <td className="whitespace-nowrap p-4  font-roboto text-blackColor font-[500] max-xl:w-[300px]  ">
                        {item.phone}
                      </td>
                      <td className="whitespace-nowrap p-4   text-blackColor font-[500] max-xl:w-[300px]  ">
                        <button
                          className={`w-[108px] h-[40px] font-roboto p-2  rounded-lg ${
                            !item.isActive
                              ? "bg-[#CFD8ED] text-[#1240B4]"
                              : "bg-[#CFFFDA] text-[#28A745]"
                          } `}
                        >
                          {item.isActive ? "Approved" : "Pending"}
                        </button>
                      </td>
                      <td className="whitespace-nowrap p-4  text-blackColor font-[500] max-xl:w-[300px]  relative">
                        <button
                          className="border border-[rgba(0, 0, 0, 0.07)] p-2 bg-[248, 249, 255, 0.72] rounded-lg"
                          onClick={() =>
                            setTimeout(() => {
                              handleShow(index);
                            }, 100)
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>
                        {show && selected === index && (
                          <div
                            ref={divRef}
                            className="absolute top-[60px] left-[-30px]  max-[1759px]:left-[-90px] w-[142px] bg-white border border-[rgba(194, 194, 206, 0.22)] p-4 flex flex-col gap-4 rounded-md z-20 shadow-dropDownBoxShadow "
                          >
                            <div className="flex items-center gap-3 cursor-pointer">
                              <AiOutlineEye className="text-[#696974]" />
                              <Link href={`/user-profile/${item._id}`}>
                                <p className="text-[#696974] font-normal text-[14px]">
                                  View Profile
                                </p>
                              </Link>
                            </div>
                            <div
                              className="flex items-center gap-3 cursor-pointer"
                              // onClick={showModal}
                            >
                              <BiSolidEdit className="text-[#696974]" />
                              <Link href={`/user-edit/${item._id}`}>
                                <p className="text-[#696974] font-normal text-[14px]">
                                  Edit Profile
                                </p>
                              </Link>
                            </div>
                            <div
                              className="flex items-center gap-3 cursor-pointer"
                              onClick={() => handleDelete(item._id)}
                            >
                              <RiDeleteBin6Line className="text-[#696974]  " />
                              <p className="text-[#696974] font-normal text-[14px]">
                                {loading ? "Deleting..." : "Delete Profile"}
                              </p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
