import AdminLayout from "@/components/AdminLayout";
import { backendUrl } from "@/url";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt, BiSolidEdit } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const viewPlans = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const divRef = useRef();
  const [plans, setPlans] = useState([]);

  const handleShow = (id) => {
    setShow(!show);
    setSelected(id);
  };

  useEffect(() => {
    fetch(backendUrl + "/admin/get-sub-plan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('subscriptionPlans', JSON.stringify(data.subscription));
        setPlans(data.subscription);
      });
  }, []);

  const deleteHandler = (id) => {
    fetch(backendUrl + "/admin/deletePlan/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Plan deleted successfully");

        if (data.subscriptions) {
          setPlans(data.subscriptions);
        }
      });
  };

  return (
    <div className="mt-6">
      <h1 className="text-homeText-Color text-[24px] font-[600] ">
        Available Plans
      </h1>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white  ">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="mt-4 bg-[#FAFBFF] p-5 border border-borderColor border-opacity-[0.07]">
              <th className="whitespace-nowrap px-4 py-3  text-[#363B49]  font-[400]">
                Plan
              </th>
              <th className="whitespace-nowrap px-4 py-3  text-[#363B49]  font-[400] ">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-3  text-[#363B49]  font-[400] ">
                Duration
              </th>
              <th className="whitespace-nowrap px-4 py-3  text-[#363B49]  font-[400] ">
                Messages
              </th>
              {/* <th className="whitespace-nowrap px-4 py-3  text-[#363B49]  font-[400] ">
                SMS
              </th> */}
              <th className="whitespace-nowrap px-4 py-3  text-[#363B49]  font-[400] ">
                Profile Views
              </th>
              {/* <th className="whitespace-nowrap px-4 py-3  text-[#363B49]  font-[400] ">
                Contact Views
              </th> */}
              <th className="whitespace-nowrap px-4 py-3  text-[#363B49]  font-[400] ">
                Live Chat
              </th>
              <th className="whitespace-nowrap px-4 py-3  text-[#363B49]  font-[400] ">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="home-table ">
            {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <tr className="border border-[rgba(0, 0, 0, 0.07)]" key={index}>
                <td className="whitespace-nowrap p-4 text-[14px]  text-blackColor font-[500] flex items-center gap-4  max-xl:w-[200px] ">
                  <img src={"/images/tableProfile.png"} alt="table-img" />
                  <h1>
                    Nolan Mango
                    <br />{" "}
                    <p className="text-[13px] text-[#ED6C0E] text-opacity-[0.71]">
                      #657678
                    </p>
                  </h1>
                </td>
                <td className="whitespace-nowrap p-4 font-roboto text-black font-[500] max-xl:w-[300px] ">
                  Male
                </td>
                <td className="whitespace-nowrap p-4 font-roboto  text-blackColor font-[500] max-xl:w-[300px]  ">
                  sekiya@verizon.net
                </td>
                <td className="whitespace-nowrap p-4  font-roboto text-blackColor font-[500] max-xl:w-[300px]  ">
                  +7 (371) 564-27-29
                </td>
                <td className="whitespace-nowrap p-4   text-blackColor font-[500] max-xl:w-[300px]  ">
                  <button
                    className={`w-[108px] h-[40px] font-roboto  p-2 bg-[248, 249, 255, 0.72] rounded-lg ${
                      index % 2 === 1
                        ? "bg-[#CFD8ED] text-[#1240B4]"
                        : "bg-[#CFFFDA] text-[#28A745]"
                    } `}
                  >
                    {index % 2 === 1 ? "Paid" : "Approved"}
                  </button>
                </td>
                <td className="whitespace-nowrap p-4  text-blackColor font-[500] max-xl:w-[300px]  relative">
                  <button
                    className=" p-2 bg-[248, 249, 255, 0.72] rounded-lg"
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
                      className="absolute top-[60px] left-[-30px] max-[1340px]:left-[-90px] w-[142px] bg-white border border-[rgba(194, 194, 206, 0.22)] p-4 flex flex-col gap-4 rounded-md z-20 shadow-dropDownBoxShadow "
                    >
                      <div className="flex gap-3 items-center cursor-pointer">
                        <AiOutlineEye className="text-[#696974]" />
                        <p className="text-[#696974] font-normal text-[14px]">
                          View Profile
                        </p>
                      </div>
                      <div className="flex gap-3 items-center cursor-pointer">
                        <BiSolidEdit className="text-[#696974]" />
                        <p className="text-[#696974] font-normal text-[14px]">
                          Edit Profile
                        </p>
                      </div>
                      <div className="flex gap-3 items-center cursor-pointer">
                        <RiDeleteBin6Line className="text-[#696974] " />
                        <p className="text-[#696974] font-normal text-[14px]">
                          Delete Profile
                        </p>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))} */}

            {plans.map((item, index) => (
              <tr className="p-5" key={index}>
                <td className="">{item.name}</td>
                <td className="text-center">{item.price}</td>
                <td className="text-center">{item.duration}</td>
                <td className="text-center">{item.messages}</td>
                {/* <td className="text-center">{item.sms}</td> */}
                <td className="text-center">{item.profileViews}</td>
                {/* <td className="text-center">{item.contactViews}</td> */}
                <td className="text-center">{item.liveChats}</td>
                <td className="flex gap-5">
                  <Link href={`/edit-plan/${item._id}`}>
                    <BiEditAlt />
                  </Link>
                  <button onClick={() => deleteHandler(item._id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

viewPlans.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default viewPlans;
