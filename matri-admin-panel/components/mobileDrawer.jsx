"use client";
import { VscChromeClose } from "react-icons/vsc";
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
import { useRef, useEffect } from "react";

import Image from "next/image";
import { sidebarData } from "./sidebar";

function MobileDrawer({ open, toggleSidebar }) {
  const router = useRouter();
  const pathname = usePathname();

  const [openDropdowns, setOpenDropdowns] = useState([]);

  // const sidebarData = [
  //   {
  //     id: 1,
  //     icon: <MdOutlineDashboard className="text-[#ED6C0E] text-[22px]" />,
  //     header: "Dashboard",
  //     startingRoute: "/dashboard",
  //     subRoutes: [
  //       {
  //         text: "Main Dashboard",
  //         route: "/",
  //       },
  //       {
  //         text: "Route 2",
  //         route: "",
  //       },
  //       {
  //         text: "Route 3",
  //         route: "",
  //       },
  //       {
  //         text: "Route 4",
  //         route: "",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     icon: <LiaUserLockSolid className="text-[#ED6C0E] text-[22px]" />,
  //     header: "First From Data",
  //     startingRoute: "",
  //     subRoutes: [
  //       {
  //         text: "Route 1",
  //         route: "",
  //       },
  //       {
  //         text: "Route 2",
  //         route: "",
  //       },
  //       {
  //         text: "Route 3",
  //         route: "",
  //       },
  //       {
  //         text: "Route 4",
  //         route: "",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     icon: <TbSettingsCheck className="text-[#ED6C0E] text-[22px]" />,
  //     header: "Site Settings",
  //     startingRoute: "",
  //     subRoutes: [
  //       {
  //         text: "Route 1",
  //         route: "",
  //       },
  //       {
  //         text: "Route 2",
  //         route: "",
  //       },
  //       {
  //         text: "Route 3",
  //         route: "",
  //       },
  //       {
  //         text: "Route 4",
  //         route: "",
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     icon: <VscTag className="text-[#ED6C0E] text-[22px]" />,
  //     header: "Add New Deals",
  //     startingRoute: "",
  //     subRoutes: [
  //       {
  //         text: "Route 1",
  //         route: "/",
  //       },
  //       {
  //         text: "Route 2",
  //         route: "",
  //       },
  //       {
  //         text: "Route 3",
  //         route: "",
  //       },
  //       {
  //         text: "Route 4",
  //         route: "",
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     icon: <PiUsersThreeThin className="text-[#ED6C0E] text-[22px]" />,
  //     header: "Members",
  //     startingRoute: "/members",
  //     subRoutes: [
  //       {
  //         text: "All Members",
  //         route: "/members-all",
  //       },
  //       {
  //         text: "Paid Members",
  //         route: "/members-paid",
  //       },
  //       {
  //         text: "Renew Membership",
  //         route: "/membership-renew",
  //       },
  //       {
  //         text: "Change membership",
  //         route: "",
  //       },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     icon: <RiUserHeartLine className="text-[#ED6C0E] text-[22px]" />,
  //     header: "Match Making",
  //     startingRoute: "",
  //     subRoutes: [
  //       {
  //         text: "Route 1",
  //         route: "",
  //       },
  //       {
  //         text: "Route 2",
  //         route: "",
  //       },
  //       {
  //         text: "Route 3",
  //         route: "",
  //       },
  //       {
  //         text: "Route 4",
  //         route: "",
  //       },
  //     ],
  //   },
  //   {
  //     id: 7,
  //     icon: <BsAward className="text-[#ED6C0E] text-[22px]" />,
  //     header: "Membership Plans",
  //     startingRoute: "",
  //     subRoutes: [
  //       {
  //         text: "Route 1",
  //         route: "",
  //       },
  //       {
  //         text: "Route 2",
  //         route: "",
  //       },
  //       {
  //         text: "Route 3",
  //         route: "",
  //       },
  //       {
  //         text: "Route 4",
  //         route: "",
  //       },
  //     ],
  //   },
  //   {
  //     id: 8,
  //     icon: <LuUserCheck className="text-[#ED6C0E] text-[22px]" />,
  //     header: "Approvals",
  //     startingRoute: "",
  //     subRoutes: [
  //       {
  //         text: "Route 1",
  //         route: "",
  //       },
  //       {
  //         text: "Route 2",
  //         route: "",
  //       },
  //       {
  //         text: "Route 3",
  //         route: "",
  //       },
  //       {
  //         text: "Route 4",
  //         route: "",
  //       },
  //     ],
  //   },
  //   {
  //     id: 9,
  //     icon: <PiUserSwitchLight className="text-[#ED6C0E] text-[22px]" />,
  //     header: "User Activity",
  //     startingRoute: "",
  //     subRoutes: [
  //       {
  //         text: "Route 1",
  //         route: "",
  //       },
  //       {
  //         text: "Route 2",
  //         route: "",
  //       },
  //       {
  //         text: "Route 3",
  //         route: "",
  //       },
  //       {
  //         text: "Route 4",
  //         route: "",
  //       },
  //     ],
  //   },
  // ];

  const handleDropdownClick = (item, event) => {
    event.stopPropagation();

    if (openDropdowns.includes(item.header)) {
      setOpenDropdowns(
        openDropdowns.filter((dropdown) => dropdown !== item.header)
      );
    } else {
      setOpenDropdowns([...openDropdowns, item.header]);
    }
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open, toggleSidebar]);

  const handleProfileFunctions = () => {
    toggleSidebar();
    router.push("/profile-details");
  };

  return (
    <div
      className={`flex flex-col h-screen  navbar w-64 absolute overflow-x-hidden  overflow-y-auto  top-0 left-0 z-10  bg-gradient-sidebarGg main-side-bar`}
      ref={containerRef}
    >
      <nav className={`flex-1 `}>
        <div className="flex items-center justify-between p-2">
          <img
            src={"/images/sidebarLogo.png"}
            alt="Sidebar Logo"
            className="w-auto"
          />
          <VscChromeClose
            className="text-[28px] text-white"
            onClick={toggleSidebar}
          />
        </div>

        <div className="mt-4">
          {sidebarData?.map((item, index) => (
            <div
              className={`${
                index === 0 && pathname === "/" && "bg-[#081B4B]"
              } ${
                index === 4 &&
                pathname.startsWith(item.startingRoute) &&
                "bg-[#081B4B]"
              } pt-4 pb-${openDropdowns.includes(item.header) ? [4] : [0]}`}
            >
              <div
                className="flex justify-between items-center px-6 pb-4 cursor-pointer border-b border-b-[#505050]"
                onClick={(event) => handleDropdownClick(item, event)}
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
                      onClick={() => toggleSidebar()}
                    >
                      {x.text}
                    </h2>
                  </div>
                ))}
            </div>
          ))}

          <div className="flex justify-between items-center py-4 px-6 pb-4 cursor-pointer border-b border-b-[#505050]">
            <div className="flex items-center justify-start gap-4">
              <MdOutlineManageAccounts className="text-[#ED6C0E] text-[22px]" />
              <p className="text-white text-opacity-[0.59] mt-1 text-[14px]">
                Content Managment
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-3" onClick={handleProfileFunctions}>
        <div className="flex flex-row justify-start gap-5 mt-6">
          <img
            src={"/images/profileImage.png"}
            alt="Profile Img"
            className="w-[49px] h-[49px]"
          />
          <div>
            <h1 className="text-[16px] font-[500] text-white">
              James Williams
            </h1>
            <p className="text-white text-start">Student</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileDrawer;
