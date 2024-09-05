// components/AdminLayout.js
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "./sidebar";
import NavbarComp from "./navbar";
import { useRouter } from "next/navigation";
import { backendUrl } from "@/url";

const AdminLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    fetch(backendUrl + "/admin/checkLogin", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          router.push("/login");
        }
      });
  }, []);

  return (
    <div>
      <Toaster position="top-center" />

      <div className="flex flex-col h-screen lg:flex-row md:overflow-hidden ">
        <div className="w-full flex-none hidden lg:block lg:w-[245px]">
          <Sidebar />
        </div>
        <div className="flex-grow overflow-auto">
          <NavbarComp />
          <div className="p-4 md:py-7 md:px-7">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
