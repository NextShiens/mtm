import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { backendUrl } from '@/url';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';

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
        password: userId ? Yup.string() : Yup.string().required('Required'),
        // Add more validations as needed
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-orange-600 font-semibold mb-2">Name</label>
                            <Field name="name" type="text" className="w-full p-2 border border-orange-300 rounded" />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-orange-600 font-semibold mb-2">Email</label>
                            <Field name="email" type="email" className="w-full p-2 border border-orange-300 rounded" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-orange-600 font-semibold mb-2">Phone</label>
                            <Field name="phone" type="text" className="w-full p-2 border border-orange-300 rounded" />
                            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {!userId && (
                            <div>
                                <label htmlFor="password" className="block text-orange-600 font-semibold mb-2">Password</label>
                                <Field name="password" type="password" className="w-full p-2 border border-orange-300 rounded" />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        )}

                        <div>
                            <label htmlFor="isAdmin" className="block text-orange-600 font-semibold mb-2">Is Admin</label>
                            <Field name="isAdmin" type="checkbox" className="mr-2" />
                        </div>

                        <div>
                            <label htmlFor="gender" className="block text-orange-600 font-semibold mb-2">Gender</label>
                            <Field name="gender" as="select" className="w-full p-2 border border-orange-300 rounded">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Field>
                        </div>

                        <div>
                            <label htmlFor="dateOfBirth" className="block text-orange-600 font-semibold mb-2">Date of Birth</label>
                            <Field name="dateOfBirth" type="date" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="age" className="block text-orange-600 font-semibold mb-2">Age</label>
                            <Field name="age" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="height" className="block text-orange-600 font-semibold mb-2">Height</label>
                            <Field name="height" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="motherTongue" className="block text-orange-600 font-semibold mb-2">Mother Tongue</label>
                            <Field name="motherTongue" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="cast" className="block text-orange-600 font-semibold mb-2">Cast</label>
                            <Field name="cast" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="religion" className="block text-orange-600 font-semibold mb-2">Religion</label>
                            <Field name="religion" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="sect" className="block text-orange-600 font-semibold mb-2">Sect</label>
                            <Field name="sect" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-orange-600 font-semibold mb-2">City</label>
                            <Field name="city" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="highestDegree" className="block text-orange-600 font-semibold mb-2">Highest Degree</label>
                            <Field name="highestDegree" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="occupation" className="block text-orange-600 font-semibold mb-2">Occupation</label>
                            <Field name="occupation" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="employedIn" className="block text-orange-600 font-semibold mb-2">Employed In</label>
                            <Field name="employedIn" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="annualIncome" className="block text-orange-600 font-semibold mb-2">Annual Income</label>
                            <Field name="annualIncome" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="workLocation" className="block text-orange-600 font-semibold mb-2">Work Location</label>
                            <Field name="workLocation" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="maritalStatus" className="block text-orange-600 font-semibold mb-2">Marital Status</label>
                            <Field name="maritalStatus" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
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

                        <div>
                            <label htmlFor="ageFrom" className="block text-orange-600 font-semibold mb-2">Age From</label>
                            <Field name="ageFrom" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="ageTo" className="block text-orange-600 font-semibold mb-2">Age To</label>
                            <Field name="ageTo" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="heightFrom" className="block text-orange-600 font-semibold mb-2">Height From</label>
                            <Field name="heightFrom" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="heightTo" className="block text-orange-600 font-semibold mb-2">Height To</label>
                            <Field name="heightTo" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="lookingFor" className="block text-orange-600 font-semibold mb-2">Looking For</label>
                            <Field name="lookingFor" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="physicalStatus" className="block text-orange-600 font-semibold mb-2">Physical Status</label>
                            <Field name="physicalStatus" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="food" className="block text-orange-600 font-semibold mb-2">Food Preference</label>
                            <Field name="food" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="smoking" className="block text-orange-600 font-semibold mb-2">Smoking</label>
                            <Field name="smoking" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="drinking" className="block text-orange-600 font-semibold mb-2">Drinking</label>
                            <Field name="drinking" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="familyType" className="block text-orange-600 font-semibold mb-2">Family Type</label>
                            <Field name="familyType" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="familyStatus" className="block text-orange-600 font-semibold mb-2">Family Status</label>
                            <Field name="familyStatus" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="familyValue" className="block text-orange-600 font-semibold mb-2">Family Value</label>
                            <Field name="familyValue" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>

                        <div>
                            <label htmlFor="fathersOccupation" className="block text-orange-600 font-semibold mb-2">Father's Occupation</label>
                            <Field name="fathersOccupation" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-orange-600 mt-6">Horoscope Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="horoscopeDetails.dosh" className="block text-orange-600 font-semibold mb-2">Dosh</label>
                            <Field name="horoscopeDetails.dosh" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="horoscopeDetails.star" className="block text-orange-600 font-semibold mb-2">Star</label>
                            <Field name="horoscopeDetails.star" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="horoscopeDetails.birthTime" className="block text-orange-600 font-semibold mb-2">Birth Time</label>
                            <Field name="horoscopeDetails.birthTime" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="horoscopeDetails.birthPlace" className="block text-orange-600 font-semibold mb-2">Birth Place</label>
                            <Field name="horoscopeDetails.birthPlace" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="horoscopeDetails.religion" className="block text-orange-600 font-semibold mb-2">Religion</label>
                            <Field name="horoscopeDetails.religion" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="horoscopeDetails.caste" className="block text-orange-600 font-semibold mb-2">Caste</label>
                            <Field name="horoscopeDetails.caste" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="horoscopeDetails.motherTongue" className="block text-orange-600 font-semibold mb-2">Mother Tongue</label>
                            <Field name="horoscopeDetails.motherTongue" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="horoscopeDetails.manglik" className="block text-orange-600 font-semibold mb-2">Manglik</label>
                            <Field name="horoscopeDetails.manglik" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-orange-600 mt-6">Family Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="FamilyDetails.numOfBrothers" className="block text-orange-600 font-semibold mb-2">Number of Brothers</label>
                            <Field name="FamilyDetails.numOfBrothers" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="FamilyDetails.numOfMarriedBrothers" className="block text-orange-600 font-semibold mb-2">Number of Married Brothers</label>
                            <Field name="FamilyDetails.numOfMarriedBrothers" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="FamilyDetails.numOfSisters" className="block text-orange-600 font-semibold mb-2">Number of Sisters</label>
                            <Field name="FamilyDetails.numOfSisters" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="FamilyDetails.numOfMarriedSisters" className="block text-orange-600 font-semibold mb-2">Number of Married Sisters</label>
                            <Field name="FamilyDetails.numOfMarriedSisters" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="FamilyDetails.country" className="block text-orange-600 font-semibold mb-2">Country</label>
                            <Field name="FamilyDetails.country" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="FamilyDetails.state" className="block text-orange-600 font-semibold mb-2">State</label>
                            <Field name="FamilyDetails.state" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                        <div>
                            <label htmlFor="FamilyDetails.city" className="block text-orange-600 font-semibold mb-2">City</label>
                            <Field name="FamilyDetails.city" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Education.education" className="block text-orange-600 font-semibold mb-2">Education</label>
                        <Field name="Education.education" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        <ErrorMessage name="Education.education" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Education.occupation" className="block text-orange-600 font-semibold mb-2">Occupation</label>
                        <Field name="Education.occupation" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        <ErrorMessage name="Education.occupation" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Education.income" className="block text-orange-600 font-semibold mb-2">Income</label>
                        <Field name="Education.income" type="text" className="w-full p-2 border border-orange-300 rounded" />
                        <ErrorMessage name="Education.income" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="partnerExpectation" className="block text-orange-600 font-semibold mb-2">Partner Expectation</label>
                        <Field name="partnerExpectation" as="textarea" className="w-full p-2 border border-orange-300 rounded" />
                        <ErrorMessage name="partnerExpectation" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

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