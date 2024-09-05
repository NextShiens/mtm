import AdminLayout from "@/components/AdminLayout";
import { backendUrl } from "@/url";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";

const ProfileDetails = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [user, setUser] = useState();
  const { id } = router.query;

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
  }, [id]);

  console.log(user);

  return (
    <div>
      <div className="flex flex-col gap-4 xl:flex-row xl:gap-6 ">
        <div className=" w-full xl:w-[20%] xl:h-[240px]  border border-[#000] border-opacity-[0.08]  bg-white rounded-[10px] p-4 ">
          {user && user.userImages.length > 0 ? (
            <img
              src={user?.userImages[0]}
              alt="Profile Image"
              className="block mx-auto h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full mx-auto">
              {user && user.name[0]}
            </div>
          )}

          <h1 className="text-[#000] text-[16px] font-[600] text-center mt-3">
            {user && user.name}
          </h1>
          <p className="text-[#82868e] text-[16px] text-center mt-1">
            {user && user?.email}
          </p>

          <div className="flex flex-row justify-center gap-3 mt-3 ">
            <div className="rounded-[50%] border border-[#ED6C0E]">
              <BiSolidPhoneCall className="   text-[40px] p-2 text-[#ED6C0E]" />
            </div>
            <div className="rounded-[50%] border border-[#ED6C0E]">
              <IoMdMail className="   text-[40px] p-2 text-[#ED6C0E]" />
            </div>
            <div className="rounded-[50%] border border-[#ED6C0E]">
              <BsFillImageFill className=" text-[40px] p-2 text-[#ED6C0E]" />
            </div>
          </div>
        </div>
        <div className="w-fll xl:w-[80%] ">
          <div className="bg-white rounded-[10px]  pt-4 ">
            <div className=" border-b border-b-[#e6e6e6]">
              <h1 className="text-[#ED6C0E] text-[18px] font-[600]  mx-4 mb-3">
                Profile Details
              </h1>
            </div>

            <div>
              <div className=" p-3 md:px-5 md:pt-5">
                <h1 className="text-[#000] text-[18px] font-[600]">
                  About {user && user.name}
                </h1>

                {/* <div className="mt-4 border border-[#e6e6e6] p-4 rounded-[10px]">
                  <p className="text-[#000] text-opacity-[0.77] font-[500]"></p>
                </div> */}
              </div>

              <div className=" p-3 md:px-5 md:pt-5">
                <h1 className="text-[#000] text-[18px] font-[600]">
                  Basic Information
                </h1>

                <div className="mt-4 border border-[#e6e6e6]  py-6 sm:px-4 rounded-[10px]">
                  <div className="flex justify-between xl:justify-start">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Name
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.name}
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Age
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.age}
                      </p>
                    </div>
                  </div>

                  <div className="flex mt-5">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start ">
                        Marital Status
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.maritalStatus}
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Gender
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.gender}
                      </p>
                    </div>
                  </div>

                  <div className="flex mt-5">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start ">
                        Height
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start ">
                        {user && user.height}
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Caste
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user?.horoscopeDetails?.caste}
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex mt-5">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Profile Created for
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        Own
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Physical Status
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user?.physicalStatus}
                      </p>
                    </div>
                  </div> */}

                  <div className="flex mt-5">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Birth Place
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user?.horoscopeDetails?.birthPlace}
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Birth Time
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user?.horoscopeDetails?.birthTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" p-3 md:px-5 md:pt-5">
                <h1 className="text-[#000] text-[18px] font-[600] ">
                  Family Details
                </h1>

                <div className="mt-4 border border-[#e6e6e6]  py-6 sm:px-4 rounded-[10px] ">
                  <div className="flex">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start ">
                        Brothers
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user?.FamilyDetails?.numOfBrothers}
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Married Brothers
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.FamilyDetails?.numOfMarriedBrothers}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Sisters
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.FamilyDetails?.numOfSisters}
                      </p>
                    </div>

                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Married Sisters
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.FamilyDetails?.numOfMarriedSisters}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" p-3 md:px-5 md:pt-5">
                <h1 className="text-[#000] text-[18px] font-[600] ">
                  Contact Details
                </h1>

                <div className="mt-4 border border-[#e6e6e6]  py-6 sm:px-4 rounded-[10px] ">
                  <div className="flex">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start ">
                        Phone Number
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.phone}
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Email
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" p-3 md:px-5 md:pt-5">
                <h1 className="text-[#000] text-[18px] font-[600] ">
                  Location Information
                </h1>

                <div className="mt-4 border border-[#e6e6e6]  py-6 sm:px-4 rounded-[10px] ">
                  <div className="flex gap-1 md:gap-0">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start ">
                        Present Address
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.FamilyDetails?.city},{" "}
                        {user && user.FamilyDetails?.state}{" "}
                        {user && user.FamilyDetails?.country}
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Work Address
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.workLocation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" p-3 md:px-5 md:pt-5">
                <h1 className="text-[#000] text-[18px] font-[600] ">
                  Education Career
                </h1>

                <div className="mt-4 border border-[#e6e6e6]  py-6 sm:px-4 rounded-[10px] ">
                  <div className="flex">
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start ">
                        Highest Education
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user?.Education?.education}
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%]">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Occupation
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user?.Education?.occupation}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-full xl:w-[50%] mt-8">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start ">
                        Employed in
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.employedIn}
                      </p>
                    </div>
                    <div className="w-full xl:w-[50%] mt-8">
                      <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                        Annual Income
                      </h1>

                      <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                        {user && user.Education?.income}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-6 md:pt-5">
                  <h1 className="text-[#000] text-[18px] font-[600]   ">
                    Partner Expectation
                  </h1>

                  <div className="mt-4 border border-[#e6e6e6]  py-6 sm:px-4 rounded-[10px]">
                    <div className="flex justify-between xl:justify-start">
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Looking for
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user.lookingFor}
                        </p>
                      </div>
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Physical Status
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user.physicalStatus}
                        </p>
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start ">
                          Age
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user.ageFrom} - {user && user.ageTo}
                        </p>
                      </div>
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Height
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user.heightFrom} - {user && user.heightTo}
                        </p>
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start ">
                          Food
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start ">
                          {user && user?.food}
                        </p>
                      </div>
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Family Type
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user.familyType}
                        </p>
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Family Status
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user.familyStatus}
                        </p>
                      </div>
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Family Value
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user.familyValue}
                        </p>
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Smoking
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user?.smoking}
                        </p>
                      </div>
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Drinking
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user?.drinking}
                        </p>
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Physical Status
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user?.physicalStatus}
                        </p>
                      </div>
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Father Occupation
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user?.fathersOccupation}
                        </p>
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <div className="w-full xl:w-[50%]">
                        <h1 className="text-[#000] text-opacity-[0.77] text-[16px] text-center sm:text-start">
                          Partner Expectation Note
                        </h1>

                        <p className="text-[#000] text-[16px] font-[500] mt-1 text-center sm:text-start">
                          {user && user?.partnerExpectation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileDetails.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ProfileDetails;
