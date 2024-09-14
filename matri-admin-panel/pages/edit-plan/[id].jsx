import AdminLayout from "@/components/AdminLayout";
import { backendUrl } from "@/url";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditPlan = () => {
  const [plan, setPlan] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    messages: 0,
    liveChat: "NO",
    profileViews: 0,
  });

  useEffect(() => {
    if (id) {
      fetch(backendUrl + "/admin/plan/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.subscription) {
            setPlan(data.subscription);
          }
        });
    }
  }, [id]);

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || "",
        price: plan.price || "",
        duration: plan.duration || "",
        messages: plan.messages || 0,
        liveChat: plan.liveChat || "NO",
        profileViews: plan.profileViews || 0,
      });
    }
  }, [plan]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.duration ||
      !formData.messages ||
      !formData.liveChat ||
      !formData.profileViews
    ) {
      return toast.error("Please fill all the fields");
    }
    setLoading(true);
    fetch(backendUrl + "/admin/updatePlan/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.message) {
          toast.success(data.message);
          router.push("/view-plans");
        }
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className="subscription-form flex flex-col gap-10 w-[85%] mx-auto drop-shadow-lg">
      <h1 className="text-xl font-bold">Edit Plan</h1>
      <div className="flex justify-center flex-col md:flex-row gap-5">
        <div className="flex flex-col gap-2 w-full px-2">
          <label htmlFor="name">Plan Name</label>
          <input
            placeholder="Plan name"
            type="text"
            name="name"
            id=""
            className="outline-none shadow-sm p-2 px-3 rounded-xl w-full border border-gray-200"
            onChange={handleChange}
            required
            value={formData.name}
          />
        </div>

        <div className="flex flex-col gap-2 w-full px-2">
          <label htmlFor="price">Price</label>
          <input
            placeholder="Price"
            type="number"
            name="price"
            id=""
            className="outline-none shadow-lg p-2 px-3 rounded-xl w-full border border-gray-200"
            onChange={handleChange}
            required
            value={formData.price}
          />
        </div>
      </div>

      <div className="flex justify-center flex-col md:flex-row gap-5">
        <div className="flex flex-col gap-2 w-full px-2">
          <label htmlFor="Plan duration ">Plan duration</label>
          <input
            placeholder="Plan duration (eg. 1 month)"
            type="text"
            name="duration"
            id=""
            className="outline-none shadow-lg p-2 px-3 rounded-xl w-full border border-gray-200"
            onChange={handleChange}
            required
            value={formData.duration}
          />
        </div>

        <div className="flex flex-col gap-2 w-full px-2">
          <label htmlFor="messages">Messages</label>

          <input
            placeholder="Messages"
            type="text"
            name="messages"
            id=""
            className="outline-none shadow-lg p-2 px-3 rounded-xl w-full border border-gray-200"
            onChange={handleChange}
            required
            value={formData.messages}
          />
        </div>
      </div>
      
      {/* <div className="flex justify-center flex-col md:flex-row gap-5">
        <div className="flex flex-col gap-2 w-full px-2">
          <label htmlFor="sms">SMS</label>
          <input
            placeholder="SMS"
            type="number"
            name="sms"
            id=""
            className="outline-none shadow-lg p-2 px-3 rounded-xl w-full border border-gray-200"
            onChange={handleChange}
            required
            value={formData.sms}
          />
        </div>

        <div className="w-full flex flex-col gap-2 px-2">
          <label htmlFor="contactViews">Contact views</label>
          <input
            placeholder="Contact views"
            type="number"
            name="contactViews"
            id=""
            className="outline-none shadow-lg p-2 px-3 rounded-xl w-full border border-gray-200"
            onChange={handleChange}
            required
            value={formData.contactViews}
          />
        </div>
      </div> */}

      <div className="flex justify-center flex-col md:flex-row gap-5">
        <div className="w-full flex flex-col gap-2 px-2">
          <label htmlFor="liveChat">Live chat</label>
          <select
            placeholder="live chat"
            type="number"
            name="liveChat"
            id=""
            className="outline-none shadow-lg p-2 px-3 rounded-xl w-full border border-gray-200"
            onChange={handleChange}
            required
            value={formData.liveChat}
          >
            <option value="" className="text-gray-600">
              Live chat{" "}
            </option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div className="w-full flex flex-col gap-2 px-2">
          <label htmlFor="profileViews">Profile views</label>
          <input
            placeholder="Profile views"
            type="number"
            name="profileViews"
            id=""
            className="outline-none shadow-lg p-2 px-3 rounded-xl w-full border border-gray-200"
            onChange={handleChange}
            required
            value={formData.profileViews}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-navBtnBg-Color text-white px-5 py-2 rounded-lg w-full"
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Update Plan"}
        </button>
      </div>
    </div>
  );
};

EditPlan.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default EditPlan;
