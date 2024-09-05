"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RiMenu4Fill } from "react-icons/ri";
import MobileDrawer from "./mobileDrawer";
import Image from "next/image";
import { useRouter } from "next/router";
import { backendUrl } from "@/url";
import Link from "next/link";

const NavbarComp = () => {
  const [user, setUser] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const [users, setUsers] = useState();
  const [lastSevenDaysUsers, setLastSevenDaysUsers] = useState();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetch(backendUrl + "/admin/getUserInfo/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
        if (!data.success) {
          setUser(null);
        }
      });
  }, []);

  useEffect(() => {
    fetch(backendUrl + "/admin/latest-users/", {
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

  const logoutHandler = () => {
    fetch(backendUrl + "/admin/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          router.push("/login");
        }
      });
  };

  return (
    <div>
      {/* nav-bar-start */}
      <div className="bg-[#fff] p-4 flex justify-between border-b border-[rgba(15, 35, 84, 0.10)]">
        {/* left-div */}

        <div className="flex items-center gap-4 max-lg:justify-between max-lg:w-full ">
          <RiMenu4Fill
            className="text-[42px] text-[#0F2354] block lg:hidden"
            onClick={() =>
              setTimeout(() => {
                setOpen(true);
              }, 100)
            }
          />

          {open && (
            <div className="fixed max-lg:block hidden top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.8)] z-10 "></div>
          )}

          {open && <MobileDrawer open={open} toggleSidebar={toggleSidebar} />}
          <h1 className="text-navtext-Color font-[600] text-[24px] text-right lg:text-left ">
            {(pathname === "/" && "Dashboard") ||
              (pathname === "/pending-approvals" && "Pending Approvals") ||
              (pathname === "/members-all" && "All Members") ||
              (pathname === "/members-paid" && "Paid Members") ||
              (pathname === "/membership-renew" && "Renew Membership") ||
              (pathname === "/profile-details" && "Profile Detail") ||
              (pathname === "/dashboard/stats" && "Stats") ||
              (pathname === "/dashboard/announcement" && "Announcement") ||
              (pathname === "/dashboard/help" && "Help") ||
              (pathname === "/dashboard/create-report" &&
                "Create Incident Report") ||
              (pathname === "/dashboard/create-upcoming-events" &&
                "Create Upcoming Events") ||
              (pathname === "/dashboard/create-time-sheet" &&
                "Create Time Sheet")}
          </h1>
        </div>
        {/* left-div */}

        {/* right-div */}
        <div className="items-center hidden gap-6 lg:flex ">
          {/* <div>
            <img
              src={"/images/navNotification.png"}
              alt="Profile Img"
              className="h-[30px] mr-2  mb-3  mt-2 cursor-pointer"
            />
          </div>
          <div className="relative">
            <span className="text-[#ED6C0E] absolute text-[14px] right-0 top-">
              2
            </span>
            <img
              src={"/images/navMessageIcon.png"}
              alt="Profile Img"
              className="h-[30px] mr-2 mb-3  mt-2 cursor-pointer"
            />
          </div> */}
          <div>
            {user && user.userImages.length > 0 ? (
              <img
                src={user.userImages[0]}
                alt="Profile Image"
                className="block mx-auto w-10 h-10 rounded-full"
              />
            ) : (
              <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full mx-auto">
                {user && user.name[0]}
              </div>
            )}
          </div>

          {/* profile */}
          <div onClick={() => router.push(`user-profile/${user._id}`)}>
            <h1 className="text-black text-[16px] font-[500] cursor-pointer">
              {user && user.name}
            </h1>
            <p className="text-start text-[13px] text-[#81818175] text-opacity-[0.46] -mt-1 cursor-pointer">
              {user && user.occupation}
            </p>
          </div>

          <button
            className="w-[93px] h-[40px] bg-navBtnBg-Color rounded-[5px] text-[13px]  text-white ml-3"
            onClick={logoutHandler}
          >
            Log out
          </button>

          {/* profile */}
        </div>
        {/* right-div */}
      </div>
      {/* nav-bar-end */}
    </div>
  );
};

export default NavbarComp;
