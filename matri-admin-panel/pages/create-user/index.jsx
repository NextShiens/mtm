import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { backendUrl } from '@/url';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import {age,genderList,indianMotherTongues,indianCastes,workLocationList,QualificationList,occupationList,annualIncomeRangesIndia,manglikOptions,lookingForOptions,numOfBrothersOptions,countryOptions,cityOptions,stateOptions,religionsInIndia,statuses,doshOptions,starOptions,birthTimeOptions,physicalStatusOptions,foodOptions,smokingOptions,drinkingOptions,familyTypeOptions,familyStatusOptions,familyValueOptions,heightToOptions}  from '@/data/appData';

const UserForm = ({ userId = null }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            fetchUser();
        }
    }, [userId]);
    const handleGoBack = () => {
        router.push('/');
    };

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
                await axios.put(
                    `${backendUrl}/admin/edit-user/${userId}`,
                    values,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );
            } else {
                await axios.post(
                    `${backendUrl}/admin/create-user`,
                    values,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );
            }
            alert(userId ? "User updated successfully" : "User created successfully");
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
        formData.append('file', file);

        try {
            const response = await axios.post(
                backendUrl + "/admin/uploadFile",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );
            setFieldValue('userImages', [...values.userImages, response.data.fileUrl]);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image. Please try again.");
        }
    };

    if (userId && !user) {
        return <div>Loading...</div>;
    }

    const initialValues = user || {
        name: '',
        email: '',
        phone: '',
        password: '',
        isAdmin: false,
        gender: '',
        dateOfBirth: '',
        age: '',
        height: '',
        motherTongue: '',
        cast: '',
        religion: '',
        sect: '',
        city: '',
        highestDegree: '',
        occupation: '',
        employedIn: '',
        annualIncome: '',
        workLocation: '',
        maritalStatus: '',
        userImages: [],
        ageFrom: '',
        ageTo: '',
        heightFrom: '',
        heightTo: '',
        lookingFor: '',
        physicalStatus: '',
        food: '',
        smoking: '',
        drinking: '',
        familyType: '',
        familyStatus: '',
        familyValue: '',
        fathersOccupation: '',
        horoscopeDetails: {
            dosh: '',
            star: '',
            birthTime: '',
            birthPlace: '',
            religion: '',
            caste: '',
            motherTongue: '',
            manglik: '',
        },
        FamilyDetails: {
            numOfBrothers: '',
            numOfMarriedBrothers: '',
            numOfSisters: '',
            numOfMarriedSisters: '',
            country: '',
            state: '',
            city: '',
        },
        Education: {
            education: '',
            occupation: '',
            income: '',
        },
        partnerExpectation: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        isAdmin: Yup.boolean(),
        gender: Yup.string().required('Required'),
        dateOfBirth: Yup.date().required('Required'),
        age: Yup.number().required('Required').positive().integer(),
        height: Yup.string().required('Required'),
        motherTongue: Yup.string().required('Required'),
        cast: Yup.string().required('Required'),
        religion: Yup.string().required('Required'),
        sect: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        highestDegree: Yup.string().required('Required'),
        occupation: Yup.string().required('Required'),
        employedIn: Yup.string().required('Required'),
        annualIncome: Yup.string().required('Required'),
        workLocation: Yup.string().required('Required'),
        maritalStatus: Yup.string().required('Required'),
        userImages: Yup.array().of(Yup.string().url()),
        ageFrom: Yup.number().required('Required').positive().integer(),
        ageTo: Yup.number().required('Required').positive().integer(),
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
        FamilyDetails: Yup.object().shape({
            numOfBrothers: Yup.number().required('Required').positive().integer(),
            numOfMarriedBrothers: Yup.number().required('Required').positive().integer(),
            numOfSisters: Yup.number().required('Required').positive().integer(),
            numOfMarriedSisters: Yup.number().required('Required').positive().integer(),
            country: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
        }),
        Education: Yup.object().shape({
            education: Yup.string().required('Required'),
            occupation: Yup.string().required('Required'),
            income: Yup.string().required('Required'),
        }),
        partnerExpectation: Yup.string().required('Required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    <div className="flex items-center mb-6">
                        <FaArrowLeft
                            className="text-orange-600 cursor-pointer mr-2"
                            onClick={handleGoBack}
                        />
                        <h2 className="text-2xl font-bold text-orange-600">Create New User</h2>
                    </div>

                    <FormSection title="Basic Information">
                        <FormField name="name" label="Name" />
                        <FormField name="email" label="Email" type="email" />
                        <FormField name="phone" label="Phone" />
                        {!userId && <FormField name="password" label="Password" type="password" />}
                        <FormField name="isAdmin" label="Is Admin" type="checkbox" style={{textAlign:'le'}} />
                        <DropdownField name="gender" label="Gender" options={genderList} />
                        <FormField name="dateOfBirth" label="Date of Birth" type="date" />
                        <DropdownField name="age" label="Age" options={age} />
                        <DropdownField name="height" label="Height" options={heightToOptions} />
                        <DropdownField name="motherTongue" label="Mother Tongue" options={indianMotherTongues} />
                        <DropdownField name="cast" label="Cast" options={indianCastes} />
                        <DropdownField name="religion" label="Religion" options={religionsInIndia}/>
                        <DropdownField name="sect" label="Sect" options={indianCastes} />
                        <DropdownField name="city" label="City" options={workLocationList} />
                        <DropdownField name="highestDegree" label="Highest Degree" options={QualificationList} />
                        <DropdownField name="occupation" label="Occupation" options={occupationList} />
                        <DropdownField name="annualIncome" label="Annual Income" options={annualIncomeRangesIndia} />
                        <DropdownField name="workLocation" label="Work Location" options={workLocationList} />
                        <DropdownField name="maritalStatus" label="Marital Status"options={statuses} />
                        <div className="mb-4">
                            <label htmlFor="userImages" className="block text-orange-600 font-semibold mb-2">User Images</label>
                            <input
                                type="file"
                                onChange={(event) => handleImageUpload(event, setFieldValue, values)}
                                className="w-full p-2 border border-orange-300 rounded"
                            />
                            {values.userImages.map((image, index) => (
                                <img key={index} src={image} alt={`User image ${index + 1}`} className="w-24 h-24 mt-2" />
                            ))}
                        </div>
                    </FormSection>

                    <FormSection title="Partner Preferences">
                        <DropdownField name="ageFrom" label="Age From" options={age} />
                        <DropdownField name="ageTo" label="Age To" options={age} />
                        <DropdownField name="heightFrom" label="Height From"  options={heightToOptions}/>
                        <DropdownField name="heightTo" label="Height To" options={heightToOptions}/>
                        <DropdownField name="lookingFor" label="Looking For" options={lookingForOptions} />
                        <DropdownField name="physicalStatus" label="Physical Status" options={physicalStatusOptions}/>
                        <DropdownField name="food" label="Food Preference" options={foodOptions} />
                        <DropdownField name="smoking" label="Smoking" options={smokingOptions} />
                        <DropdownField name="drinking" label="Drinking" options={drinkingOptions} />
                        <DropdownField name="familyType" label="Family Type" options={familyTypeOptions}/>
                        <DropdownField name="familyStatus" label="Family Status" options={familyStatusOptions} />
                        <DropdownField name="familyValue" label="Family Value" options={familyValueOptions} />
                        <DropdownField name="fathersOccupation" label="Father's Occupation" options={occupationList}/>
                    </FormSection>

                    <FormSection title="Horoscope Details">
                        <DropdownField name="horoscopeDetails.dosh" label="Dosh" options={doshOptions} />
                        <DropdownField name="horoscopeDetails.star" label="Star" options={starOptions} />
                        <DropdownField name="horoscopeDetails.birthTime" label="Birth Time" options={birthTimeOptions}/>
                        <DropdownField name="horoscopeDetails.birthPlace" label="Birth Place"options={workLocationList} />
                        <DropdownField name="horoscopeDetails.religion" label="Religion" options={religionsInIndia} />
                        <DropdownField name="cast" label="Cast" options={indianCastes} />
                        <DropdownField name="horoscopeDetails.motherTongue" label="Mother Tongue" options={indianMotherTongues} />
                        <DropdownField name="horoscopeDetails.manglik" label="Manglik" options={manglikOptions} />
                    </FormSection>

                    <FormSection title="Family Details">
                        <DropdownField name="FamilyDetails.numOfBrothers" label="Number of Brothers" options={numOfBrothersOptions} />
                        <DropdownField name="FamilyDetails.numOfMarriedBrothers" label="Number of Married Brothers" options={numOfBrothersOptions}/>
                        <DropdownField name="FamilyDetails.numOfSisters" label="Number of Sisters" options={numOfBrothersOptions} />
                        <DropdownField name="FamilyDetails.numOfMarriedSisters" label="Number of Married Sisters" options={numOfBrothersOptions} />
                        <DropdownField name="FamilyDetails.country" label="Country" options={countryOptions} />
                        <DropdownField name="FamilyDetails.state" label="State" options={stateOptions} />
                        <DropdownField name="FamilyDetails.city" label="City" options={cityOptions} />
                    </FormSection>

                    <FormSection title="Education">
                        <DropdownField name="Education.education" label="Education" options={QualificationList} />
                        <DropdownField name="Education.occupation" label="Occupation" options={occupationList} />
                        <DropdownField name="Education.income" label="Income" options={annualIncomeRangesIndia} />
                    </FormSection>

                    <FormField name="partnerExpectation" label="Partner Expectation" as="textarea" />

                    <button type="submit" disabled={isLoading} className="w-full p-2 bg-orange-600 text-white font-semibold rounded">
                        {isLoading ? 'Submitting...' : 'Create User'}
                    </button>
                </Form>
            )}
        </Formik>
    );

};

UserForm.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default UserForm;

const FormField = ({ name, label, type = 'text', as = 'input', ...props }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-orange-600 font-semibold mb-2">{label}</label>
        <Field name={name} type={type} as={as} className="w-full p-2 border border-orange-300 rounded" {...props} />
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
);

const DropdownField = ({ name, label, options }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-orange-600 font-semibold mb-2">{label}</label>
        <Field name={name} as="select" className="w-full p-2 border border-orange-300 rounded">
            <option value="">Select {label}</option>
            {options?.map((option, index) => (
                <option key={index} value={option.value || option}>{option.value || option}</option>
            ))}
        </Field>
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
);

const FormSection = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);