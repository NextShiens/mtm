import AdminLayout from "@/components/AdminLayout";
import { backendUrl } from "@/url";
import { useState } from "react";
import toast from "react-hot-toast";

const AddPlan = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    price: "",
    duration: "",
    messages: 0,
    liveChat: "NO",
    profileViews: 0,
  });

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
    console.log(formData);
    fetch(backendUrl + "/admin/add-sub-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
        }
        if (data.success) {
          setLoading(false);
          toast.success(data.message);
          setFormData({
            name: null,
            price: "",
            duration: "",
            messages: 0,
            liveChat: "NO",
            profileViews: 0,
          });
        }
      })
      .catch((err) => setLoading(false));
  };
  return (
    <div className="subscription-form flex flex-col gap-10 w-full lg:w-[85%] mx-auto drop-shadow-lg">
      <h1 className="text-xl font-bold">Add Plan</h1>
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
          <select
            placeholder="Plan duration (eg. 1 month)"
            type="text"
            name="duration"
            id=""
            className="outline-none shadow-lg p-2 px-3 rounded-xl w-full border border-gray-200"
            onChange={handleChange}
            required
            value={formData.duration}
          >
            <option value="">-select-</option>
            <option value="1 month">1 month</option>
            <option value="2 month">2 month</option>
            <option value="3 month">3 month</option>
            <option value="4 month">4 month</option>
            <option value="5 month">5 month</option>
          </select>
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
            <option value="yes">Yes</option>
            <option value="no">No</option>
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
          {loading ? "Loading..." : "Add Plan"}
        </button>
      </div>
    </div>
  );
};

AddPlan.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AddPlan;
