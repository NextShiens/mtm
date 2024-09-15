import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { backendUrl } from "@/url";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import {
  age,
  genderList,
  indianMotherTongues,
  indianCastes,
  workLocationList,
  QualificationList,
  occupationList,
  annualIncomeRangesIndia,
  manglikOptions,
  lookingForOptions,
  numOfBrothersOptions,
  countryOptions,
  cityOptions,
  stateOptions,
  religionsInIndia,
  statuses,
  doshOptions,
  starOptions,
  birthTimeOptions,
  physicalStatusOptions,
  foodOptions,
  smokingOptions,
  drinkingOptions,
  familyTypeOptions,
  familyStatusOptions,
  familyValueOptions,
  heightToOptions,
} from "@/data/appData";

// Reusable FormField Component
const FormField = ({ name, label, type = "text", as = "input", ...props }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-orange-600 font-semibold mb-2">
      {label}
    </label>
    <Field
      name={name}
      type={type}
      as={as}
      className="w-full p-2 border border-orange-300 rounded"
      {...props}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);

// Reusable DropdownField Component
const DropdownField = ({ name, label, options, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-orange-600 font-semibold mb-2">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-orange-300 rounded"
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value || option}>
          {option.value || option}
        </option>
      ))}
    </select>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);

// FormSection for grouping similar fields
const FormSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-bold text-orange-600 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const UserForm = ({ userId = null }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);


  const fetchUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/user/${userId}`);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      if (userId) {
        await axios.put(`${backendUrl}/admin/edit-user/${userId}`, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        alert("User updated successfully");
      } else {
        await axios.post(`${backendUrl}/admin/create-user`, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        alert("User created successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
    setIsLoading(false);
    setSubmitting(false);
  };

  const handleImageUpload = async (event, setFieldValue, values) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${backendUrl}/admin/uploadFile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setFieldValue("userImages", [
        ...values.userImages,
        response.data.fileUrl,
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  const handleGoBack = () => router.push("/");

  if (userId && !user) return <div>Loading...</div>;

  const initialValues = user || {
    name: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: false,
    gender: "",
    dateOfBirth: "",
    age: "",
    height: "",
    motherTongue: "",
    cast: "",
    religion: "",
    sect: "",
    city: "",
    highestDegree: "",
    occupation: "",
    employedIn: "",
    annualIncome: "",
    workLocation: "",
    maritalStatus: "",
    userImages: [],
    ageFrom: "",
    ageTo: "",
    heightFrom: "",
    heightTo: "",
    lookingFor: "",
    physicalStatus: "",
    food: "",
    smoking: "",
    drinking: "",
    familyType: "",
    familyStatus: "",
    familyValue: "",
    fathersOccupation: "",
    horoscopeDetails: {
      dosh: "",
      star: "",
      birthTime: "",
      birthPlace: "",
      religion: "",
      caste: "",
      motherTongue: "",
      manglik: "",
    },
    FamilyDetails: {
      numOfBrothers: "",
      numOfMarriedBrothers: "",
      numOfSisters: "",
      numOfMarriedSisters: "",
      country: "",
      state: "",
      city: "",
    },
    Education: { education: "", occupation: "", income: "" },
    partnerExpectation: "",
  };


    useEffect(()=>{
    console.log("User:", initialValues);
  },[initialValues])
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    isAdmin: Yup.boolean(),
    gender: Yup.string().required('Required'),
    dateOfBirth: Yup.string().required('Required'),
    age: Yup.string().required('Required'),
    height: Yup.string().required('Required'),
    motherTongue: Yup.string().required('Required'),
    cast: Yup.string().required('Required'),
    religion: Yup.string().required('Required'),
    sect: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    highestDegree: Yup.string().required('Required'),
    occupation: Yup.string().required('Required'),
    annualIncome: Yup.string().required('Required'),
    ageFrom: Yup.string().required('Required'),
    ageTo: Yup.string().required('Required'),
    heightFrom: Yup.string().required('Required'),
    heightTo: Yup.string().required('Required'),
    lookingFor: Yup.string().required('Required'),
    physicalStatus: Yup.string().required('Required'),
    food: Yup.string().required('Required'),
    smoking: Yup.string().required('Required'),
    drinking: Yup.string().required('Required'),
    familyType: Yup.string().required('Required'),
    familyStatus: Yup.string().required('Required'),
    familyValue: Yup.string().required('Required'),
    fathersOccupation: Yup.string().required('Required'),
    
  //   // Horoscope validation
    horoscopeDetails: Yup.object().shape({
      dosh: Yup.string().required('Required'),
      star: Yup.string().required('Required'),
      birthTime: Yup.string().required('Required'),
      birthPlace: Yup.string().required('Required'),
      religion: Yup.string().required('Required'),
      caste: Yup.string().required('Required'),
      motherTongue: Yup.string().required('Required'),
      manglik: Yup.string().required('Required'),
    }),
  
  //   // Family Details validation
    FamilyDetails: Yup.object().shape({
      numOfBrothers: Yup.string().required('Required'),
      numOfMarriedBrothers: Yup.string().required('Required'),
      numOfSisters: Yup.string().required('Required'),
      numOfMarriedSisters: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
    }),
  
    // Education validation
    Education: Yup.object().shape({
      education: Yup.string().required('Required'),
      occupation: Yup.string().required('Required'),
      income: Yup.string().required('Required'),
    }),
    // Partner Expectation validation
    partnerExpectation: Yup.string().required('Required'),
  
  });
  
  


  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <div className="flex items-center mb-6">
            <FaArrowLeft
              className="text-orange-600 cursor-pointer mr-2"
              onClick={handleGoBack}
            />
            <h2 className="text-2xl font-bold text-orange-600">
              Create New User
            </h2>
          </div>

          <FormSection title="Basic Information">
            <FormField name="name" label="Name" />
            <FormField name="email" label="Email" type="email" />
            <FormField name="phone" label="Phone" />
            {!userId && (
              <FormField name="password" label="Password" type="password" />
            )}
            {/* <FormField
              name="isAdmin"
              label="Is Admin"
              type="checkbox"
              style={{ textAlign: "left" }}
            /> */}
            <DropdownField
              name="gender"
              label="Gender"
              options={genderList}
              value={values.gender}
              onChange={(e) => setFieldValue("gender", e.target.value)}
            />
            <FormField name="dateOfBirth" label="Date of Birth" type="date" />
            <DropdownField
              name="age"
              label="Age"
              options={age}
              value={values.age}
              onChange={(e) => setFieldValue("age", e.target.value)}
            />
            <DropdownField
              name="height"
              label="Height"
              options={heightToOptions}
              value={values.height}
              onChange={(e) => setFieldValue("height", e.target.value)}
            />
            <DropdownField
              name="motherTongue"
              label="Mother Tongue"
              options={indianMotherTongues}
              value={values.motherTongue}
              onChange={(e) => setFieldValue("motherTongue", e.target.value)}
            />
            <DropdownField
              name="cast"
              label="Cast"
              options={indianCastes}
              value={values.cast}
              onChange={(e) => setFieldValue("cast", e.target.value)}
            />
            <DropdownField
              name="religion"
              label="Religion"
              options={religionsInIndia}
              value={values.religion}
              onChange={(e) => setFieldValue("religion", e.target.value)}
            />
            <DropdownField
              name="sect"
              label="Sect"
              options={indianCastes}
              value={values.sect}
              onChange={(e) => setFieldValue("sect", e.target.value)}
            />
            <DropdownField
              name="city"
              label="City"
              options={workLocationList}
              value={values.city}
              onChange={(e) => setFieldValue("city", e.target.value)}
            />
            <DropdownField
              name="highestDegree"
              label="Highest Degree"
              options={QualificationList}
              value={values.highestDegree}
              onChange={(e) => setFieldValue("highestDegree", e.target.value)}
            />
            <DropdownField
              name="occupation"
              label="Occupation"
              options={occupationList}
              value={values.occupation}
              onChange={(e) => setFieldValue("occupation", e.target.value)}
            />
            <DropdownField
              name="annualIncome"
              label="Annual Income"
              options={annualIncomeRangesIndia}
              value={values.annualIncome}
              onChange={(e) => setFieldValue("annualIncome", e.target.value)}
            />
          </FormSection>

          <FormSection title="Images">
            <div className="mb-4">
              <label
                htmlFor="userImages"
                className="block text-orange-600 font-semibold mb-2"
              >
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  handleImageUpload(event, setFieldValue, values)
                }
                className="w-full p-2 border border-orange-300 rounded"
              />
            </div>
            {values.userImages.length > 0 && (
              <div className="flex space-x-4">
                {values.userImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`User Image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </FormSection>

          <FormSection title="Partner Preferences">
            <DropdownField
              name="ageFrom"
              label="Age From"
              options={age}
              value={values.ageFrom}
              onChange={(e) => setFieldValue("ageFrom", e.target.value)}
            />
            <DropdownField
              name="ageTo"
              label="Age To"
              options={age}
              value={values.ageTo}
              onChange={(e) => setFieldValue("ageTo", e.target.value)}
            />
            <DropdownField
              name="heightFrom"
              label="Height From"
              options={heightToOptions}
              value={values.heightFrom}
              onChange={(e) => setFieldValue("heightFrom", e.target.value)}
            />
            <DropdownField
              name="heightTo"
              label="Height To"
              options={heightToOptions}
              value={values.heightTo}
              onChange={(e) => setFieldValue("heightTo", e.target.value)}
            />
            <DropdownField
              name="lookingFor"
              label="Looking For"
              options={lookingForOptions}
              value={values.lookingFor}
              onChange={(e) => setFieldValue("lookingFor", e.target.value)}
            />
            <DropdownField
              name="physicalStatus"
              label="Physical Status"
              options={physicalStatusOptions}
              value={values.physicalStatus}
              onChange={(e) => setFieldValue("physicalStatus", e.target.value)}
            />
            <DropdownField
              name="food"
              label="Food Preference"
              options={foodOptions}
              value={values.food}
              onChange={(e) => setFieldValue("food", e.target.value)}
            />
            <DropdownField
              name="smoking"
              label="Smoking"
              options={smokingOptions}
              value={values.smoking}
              onChange={(e) => setFieldValue("smoking", e.target.value)}
            />
            <DropdownField
              name="drinking"
              label="Drinking"
              options={drinkingOptions}
              value={values.drinking}
              onChange={(e) => setFieldValue("drinking", e.target.value)}
            />
            <DropdownField
              name="familyType"
              label="Family Type"
              options={familyTypeOptions}
              value={values.familyType}
              onChange={(e) => setFieldValue("familyType", e.target.value)}
            />
            <DropdownField
              name="familyStatus"
              label="Family Status"
              options={familyStatusOptions}
              value={values.familyStatus}
              onChange={(e) => setFieldValue("familyStatus", e.target.value)}
            />
            <DropdownField
              name="familyValue"
              label="Family Value"
              options={familyValueOptions}
              value={values.familyValue}
              onChange={(e) => setFieldValue("familyValue", e.target.value)}
            />
            <DropdownField
              name="fathersOccupation"
              label="Father's Occupation"
              options={occupationList}
              value={values.fathersOccupation}
              onChange={(e) =>
                setFieldValue("fathersOccupation", e.target.value)
              }
            />
          </FormSection>

          <FormSection title="Horoscope Details">
            <DropdownField
              name="horoscopeDetails.dosh"
              label="Dosh"
              options={doshOptions}
              value={values.horoscopeDetails.dosh}
              onChange={(e) =>
                setFieldValue("horoscopeDetails.dosh", e.target.value)
              }
            />
            <DropdownField
              name="horoscopeDetails.star"
              label="Star"
              options={starOptions}
              value={values.horoscopeDetails.star}
              onChange={(e) =>
                setFieldValue("horoscopeDetails.star", e.target.value)
              }
            />
            <DropdownField
              name="horoscopeDetails.birthTime"
              label="Birth Time"
              options={birthTimeOptions}
              value={values.horoscopeDetails.birthTime}
              onChange={(e) =>
                setFieldValue("horoscopeDetails.birthTime", e.target.value)
              }
            />
            <DropdownField
              name="horoscopeDetails.birthPlace"
              label="Birth Place"
              options={workLocationList}
              value={values.horoscopeDetails.birthPlace}
              onChange={(e) =>
                setFieldValue("horoscopeDetails.birthPlace", e.target.value)
              }
            />
            <DropdownField
              name="horoscopeDetails.religion"
              label="Religion"
              options={religionsInIndia}
              value={values.horoscopeDetails.religion}
              onChange={(e) =>
                setFieldValue("horoscopeDetails.religion", e.target.value)
              }
            />
            <DropdownField
              name="cast"
              label="Cast"
              options={indianCastes}
              value={values.cast}
              onChange={(e) => setFieldValue("caste", e.target.value)}
            />
            <DropdownField
              name="horoscopeDetails.motherTongue"
              label="Mother Tongue"
              options={indianMotherTongues}
              value={values.horoscopeDetails.motherTongue}
              onChange={(e) =>
                setFieldValue("horoscopeDetails.motherTongue", e.target.value)
              }
            />
            <DropdownField
              name="horoscopeDetails.manglik"
              label="Manglik"
              options={manglikOptions}
              value={values.horoscopeDetails.manglik}
              onChange={(e) =>
                setFieldValue("horoscopeDetails.manglik", e.target.value)
              }
            />
          </FormSection>

          <FormSection title="Family Details">
            <DropdownField
              name="FamilyDetails.numOfBrothers"
              label="Number of Brothers"
              options={numOfBrothersOptions}
              value={values.FamilyDetails.numOfBrothers}
              onChange={(e) =>
                setFieldValue("FamilyDetails.numOfBrothers", e.target.value)
              }
            />
            <DropdownField
              name="FamilyDetails.numOfMarriedBrothers"
              label="Number of Married Brothers"
              options={numOfBrothersOptions}
              value={values.FamilyDetails.numOfMarriedBrothers}
              onChange={(e) =>
                setFieldValue(
                  "FamilyDetails.numOfMarriedBrothers",
                  e.target.value
                )
              }
            />
            <DropdownField
              name="FamilyDetails.numOfSisters"
              label="Number of Sisters"
              options={numOfBrothersOptions}
              value={values.FamilyDetails.numOfSisters}
              onChange={(e) =>
                setFieldValue("FamilyDetails.numOfSisters", e.target.value)
              }
            />
            <DropdownField
              name="FamilyDetails.numOfMarriedSisters"
              label="Number of Married Sisters"
              options={numOfBrothersOptions}
              value={values.FamilyDetails.numOfMarriedSisters}
              onChange={(e) =>
                setFieldValue(
                  "FamilyDetails.numOfMarriedSisters",
                  e.target.value
                )
              }
            />
            <DropdownField
              name="FamilyDetails.country"
              label="Country"
              options={countryOptions}
              value={values.FamilyDetails.country}
              onChange={(e) =>
                setFieldValue("FamilyDetails.country", e.target.value)
              }
            />
            <DropdownField
              name="FamilyDetails.state"
              label="State"
              options={stateOptions}
              value={values.FamilyDetails.state}
              onChange={(e) =>
                setFieldValue("FamilyDetails.state", e.target.value)
              }
            />
            <DropdownField
              name="FamilyDetails.city"
              label="City"
              options={cityOptions}
              value={values.FamilyDetails.city}
              onChange={(e) =>
                setFieldValue("FamilyDetails.city", e.target.value)
              }
            />
          </FormSection>

          <FormSection title="Education">
            <DropdownField
              name="Education.education"
              label="Education"
              options={QualificationList}
              value={values.Education.education}
              onChange={(e) =>
                setFieldValue("Education.education", e.target.value)
              }
            />
            <DropdownField
              name="Education.occupation"
              label="Occupation"
              options={occupationList}
              value={values.Education.occupation}
              onChange={(e) =>
                setFieldValue("Education.occupation", e.target.value)
              }
            />
            <DropdownField
              name="Education.income"
              label="Income"
              options={annualIncomeRangesIndia}
              value={values.Education.income}
              onChange={(e) =>
                setFieldValue("Education.income", e.target.value)
              }
            />
          </FormSection>

          <FormField
            name="partnerExpectation"
            label="Partner Expectation"
            as="textarea"
            value={values.partnerExpectation}
            onChange={(e) =>
              setFieldValue("partnerExpectation", e.target.value)
            }
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-orange-600 text-white font-semibold rounded"
          >
            {isLoading ? "Submitting..." : ""}
          </button>
        </Form>
      )}
    </Formik>
  );
};

UserForm.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default UserForm;
