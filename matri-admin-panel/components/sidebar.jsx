"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PiUserSwitchLight } from "react-icons/pi";
import { LiaUserLockSolid } from "react-icons/lia";
import { TbSettingsCheck } from "react-icons/tb";
import { VscTag } from "react-icons/vsc";
import { BsAward } from "react-icons/bs";
import { PiUsersThreeThin } from "react-icons/pi";
import { RiUserHeartLine } from "react-icons/ri";
import { LuUserCheck } from "react-icons/lu";
import {
  MdOutlineDashboard,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const sidebarData = [
  {
    id: 1,
    icon: <MdOutlineDashboard className="text-[#ED6C0E] text-[22px]" />,
    header: "Dashboard",
    startingRoute: "/dashboard",
    subRoutes: [
      {
        text: "Main Dashboard",
        route: "/",
      },
      // {
      //   text: "Route 2",
      //   route: "",
      // },
      // {
      //   text: "Route 3",
      //   route: "",
      // },
      // {
      //   text: "Route 4",
      //   route: "",
      // },
    ],
  },
  // {
  //   id: 2,
  //   icon: <LiaUserLockSolid className="text-[#ED6C0E] text-[22px]" />,
  //   header: "First From Data",
  //   startingRoute: "",
  //   subRoutes: [
  //     {
  //       text: "Route 1",
  //       route: "",
  //     },
  //     {
  //       text: "Route 2",
  //       route: "",
  //     },
  //     {
  //       text: "Route 3",
  //       route: "",
  //     },
  //     {
  //       text: "Route 4",
  //       route: "",
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   icon: <TbSettingsCheck className="text-[#ED6C0E] text-[22px]" />,
  //   header: "Site Settings",
  //   startingRoute: "",
  //   subRoutes: [
  //     {
  //       text: "Route 1",
  //       route: "",
  //     },
  //     {
  //       text: "Route 2",
  //       route: "",
  //     },
  //     {
  //       text: "Route 3",
  //       route: "",
  //     },
  //     {
  //       text: "Route 4",
  //       route: "",
  //     },
  //   ],
  // },
  {
    id: 4,
    icon: <VscTag className="text-[#ED6C0E] text-[22px]" />,
    header: "Subscription plans",
    startingRoute: "",
    subRoutes: [
      {
        text: "Add new plan",
        route: "/add-plan",
      },
      {
        text: "View plans",
        route: "/view-plans",
      },
      // {
      //   text: "Route 3",
      //   route: "",
      // },
      // {
      //   text: "Route 4",
      //   route: "",
      // },
    ],
  },
  {
    id: 5,
    icon: <PiUsersThreeThin className="text-[#ED6C0E] text-[22px]" />,
    header: "Members",
    startingRoute: "/members",
    subRoutes: [
      {
        text: "All Members",
        route: "/members-all",
      },
      {
        text: "Paid Members",
        route: "/members-paid",
      },
    ],
  },
  // {
  //   id: 6,
  //   icon: <RiUserHeartLine className="text-[#ED6C0E] text-[22px]" />,
  //   header: "Match Making",
  //   startingRoute: "",
  //   subRoutes: [
  //     {
  //       text: "Route 1",
  //       route: "",
  //     },
  //     {
  //       text: "Route 2",
  //       route: "",
  //     },
  //     {
  //       text: "Route 3",
  //       route: "",
  //     },
  //     {
  //       text: "Route 4",
  //       route: "",
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   icon: <BsAward className="text-[#ED6C0E] text-[22px]" />,
  //   header: "Membership Plans",
  //   startingRoute: "",
  //   subRoutes: [
  //     {
  //       text: "Route 1",
  //       route: "",
  //     },
  //     {
  //       text: "Route 2",
  //       route: "",
  //     },
  //     {
  //       text: "Route 3",
  //       route: "",
  //     },
  //     {
  //       text: "Route 4",
  //       route: "",
  //     },
  //   ],
  // },
  {
    id: 8,
    icon: <LuUserCheck className="text-[#ED6C0E] text-[22px]" />,
    header: "Approvals",
    startingRoute: "",
    subRoutes: [
      {
        text: "Pending Approvals",
        route: "/pending-approvals",
      },
    ],
  },
  {
    id: 9,
    icon: <PiUserSwitchLight className="text-[#ED6C0E] text-[22px]" />,
    header: "User Management",
    startingRoute: "",
    subRoutes: [
      {
        text: "Create New User",
        route: "create-user",
      },
    ],
  },
];

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState([]);

  const handleDropdownClick = (item) => {
    if (openDropdowns.includes(item.header)) {
      setOpenDropdowns(
        openDropdowns.filter((dropdown) => dropdown !== item.header)
      );
    } else {
      setOpenDropdowns([...openDropdowns, item.header]);
    }
  };

  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto select-none bg-gradient-sidebarGg lg:block main-side-bar ">
      <img
        src={"/images/sidebarLogo.png"}
        alt="Sidebar Logo"
        className="w-auto mx-auto mt-4"
      />
      <div className="mt-4">
        {sidebarData?.map((item, index) => (
          <div
            key={item.id}
            className={`${index === 0 && pathname === "/" && "bg-[#081B4B]"} ${
              index === 4 &&
              pathname &&
              !pathname.includes("admin/edit-plan") &&
              pathname.startsWith(item.startingRoute) &&
              "bg-[#081B4B]"
            } pt-4 pb-${openDropdowns.includes(item.header) ? [4] : [0]}`}
          >
            <div
              className="flex justify-between items-center px-6 pb-4 cursor-pointer border-b border-b-[#505050]"
              onClick={() => handleDropdownClick(item)}
            >
              <div className="flex items-center justify-start gap-4">
                {item?.icon}
                <p className="text-white text-opacity-[0.59] mt-1 text-[14px]">
                  {item?.header}
                </p>
              </div>
              {openDropdowns.includes(item.header) ? (
                <MdOutlineKeyboardArrowUp className="text-[#ED6C0E] text-[22px]" />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-[#ED6C0E] text-[22px]" />
              )}
            </div>
            {openDropdowns.includes(item.header) &&
              item?.subRoutes.map((x) => (
                <div
                  key={x.text}
                  className="flex items-center justify-start gap-5 px-6 mt-4 cursor-pointer"
                  onClick={() => router.push(x.route)}
                >
                  <BsArrowRight className="text-[#ED6C0E] text-[18px]" />
                  <h2
                    className={`${
                      pathname === x.route
                        ? "text-white"
                        : "text-[rgba(255,255,255,0.59)]"
                    }  text-[13px]`}
                  >
                    {x.text}
                  </h2>
                </div>
              ))}
          </div>
        ))}
        {/* 
        <div className="flex justify-between items-center py-4 px-6 pb-4 cursor-pointer border-b border-b-[#505050]">
          <div className="flex items-center justify-start gap-4">
            <MdOutlineManageAccounts className="text-[#ED6C0E] text-[22px]" />
            <p className="text-white text-opacity-[0.59] mt-1 text-[14px]">
              Content Managment
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
