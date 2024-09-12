import AdminLayout from "@/components/AdminLayout";
import { backendUrl } from "@/url";
import { useRouter } from "next/router";
import React, { act, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserUpdate = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState();
  const [memberShipPlans, setMemberShipPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMemberShip, setNewMemberShip] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [activeCard, setActiveCard] = useState("");

  if (router.isFallback) {
    <div>loading...</div>;
  }

  useEffect(() => {
    fetch(backendUrl + `/admin/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
  }, []);

  useEffect(() => {
    fetch(backendUrl + `/admin/get-sub-plan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMemberShipPlans(data.subscription);
      });
  }, []);

  const updateUserMembership = () => {
    if (newMemberShip === "") return;
    setActiveCard("membership");
    setLoading(true);
    fetch(backendUrl + `/admin/update-user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        membershipId: newMemberShip,
      }),
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        setLoading(false);
        if (data.success) {
          setUser(data.user);
          toast.success(data.message);
        } else {
          toast.error(data.message,'error updating user');
        }
      });
    });
  };

  const updateUserActiveStatus = () => {
    if (activeStatus === "") return;
    setActiveCard("active");
    setLoading(true);
    fetch(backendUrl + `/admin/update-userActive/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activeStatus,
      }),
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        setLoading(false);
        if (data.success) {
          setUser(data.user);
          toast.success(data.message);
        } else {
          toast.error(data.message,'error updating user');
        }
      });
    });
  };

  const updateUserFeaturedStatus = () => {
    if (isFeatured === "") return;
    setActiveCard("featured");
    setLoading(true);
    fetch(backendUrl + `/admin/update-featured/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isFeatured,
      }),
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        setLoading(false);
        if (data.success) {
          setUser(data.user);
          toast.success(data.message);
        } else {
          toast.error(data.message,'error updating user');
        }
      });
    });
  };

  return (
    <div className=" flex flex-col gap-4 lg:gap-10 w-full">
      <h1 className="text-xl font-bold flex items-center">
        <div className="">
          <p>{user && user.name}</p>
          <p className="text-sm font-normal text-gray-500">
            {user && user.email}
          </p>
        </div>
      </h1>

      <div className="w-full md:w-[85%] mx-auto">
        <div className="flex flex-col gap-3 border border-gray-200 p-10 shadow-md">
          <h1 className="mb-5 font-bold">Update Membership</h1>
          <div className="flex flex-col gap-3">
            <label htmlFor="Current membership p-3">Current Membership</label>
            <input
              type="text"
              readOnly
              className="outline-none shadow-sm p-3 rounded-xl w-full border border-gray-200"
              value={user?.membership?.name}
            />
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <label htmlFor="Current membership p-3">Update Membership</label>
            <select
              type="text"
              readOnly
              className="outline-none shadow-sm p-3 rounded-xl w-full border border-gray-200"
              onChange={(e) => setNewMemberShip(e.target.value)}
            >
              <option value={""}>Choose</option>
              {memberShipPlans.map((plan) => {
                return (
                  <option
                    key={plan._id}
                    value={plan._id}
                    className="p-2 flex justify-around"
                  >
                    <p>Name: {plan.name}</p>, <p>Price: {plan.price}</p>,{" "}
                    <p>Duration: {plan?.duration}</p>
                  </option>
                );
              })}
            </select>
            <button
              className="mt-10 bg-navBtnBg-Color text-white p-3 rounded-xl"
              onClick={updateUserMembership}
            >
              {loading && activeCard === "membership"
                ? "Loading..."
                : "Save changes"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 border border-gray-200 p-10 shadow-md mt-5">
          <h1 className="mb-5 font-bold">Update Active Status</h1>
          <div className="flex flex-col gap-3">
            <label htmlFor="Current membership p-3">Current Status</label>
            <input
              type="text"
              readOnly
              className="outline-none shadow-sm p-3 rounded-xl w-full border border-gray-200"
              value={user?.isActive ? "Yes" : "No"}
            />
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <label htmlFor="Current membership p-3">Update Status</label>
            <select
              type="text"
              readOnly
              className="outline-none shadow-sm p-3 rounded-xl w-full border border-gray-200"
              onClick={(e) => setActiveStatus(e.target.value)}
            >
              <option value="">Select</option>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button
            className="mt-10 bg-navBtnBg-Color text-white p-3 rounded-xl"
            onClick={updateUserActiveStatus}
          >
            {loading && activeCard === "active" ? "Loading..." : "Save changes"}
          </button>
        </div>

        <div className="flex flex-col gap-3 border border-gray-200 p-10 shadow-md mt-5">
          <h1 className="mb-5 font-bold">Change Featured Status</h1>
          <div className="flex flex-col gap-3">
            <label htmlFor="Current membership p-3">Current Status</label>
            <input
              type="text"
              readOnly
              className="outline-none shadow-sm p-3 rounded-xl w-full border border-gray-200"
              value={user?.isFeatured ? "Yes" : "No"}
            />
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <label htmlFor="Current membership p-3">Update Status</label>
            <select
              type="text"
              readOnly
              className="outline-none shadow-sm p-3 rounded-xl w-full border border-gray-200"
              onClick={(e) => setIsFeatured(e.target.value)}
            >
              <option value="">Select</option>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button
            className="mt-10 bg-navBtnBg-Color text-white p-3 rounded-xl"
            onClick={updateUserFeaturedStatus}
          >
            {loading && activeCard === "featured"
              ? "Loading..."
              : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

UserUpdate.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default UserUpdate;
