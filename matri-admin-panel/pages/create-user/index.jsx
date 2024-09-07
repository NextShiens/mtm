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
        password: Yup.string().required('Required'),
        isAdmin: Yup.boolean(),
        gender: Yup.string().required('Required'),
        dateOfBirth: Yup.date().required('Required'),
        age: Yup.number().required('Required').positive().integer(),
        height: Yup.number().required('Required').positive(),
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
        heightFrom: Yup.number().required('Required').positive(),
        heightTo: Yup.number().required('Required').positive(),
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
                        <FormField name="isAdmin" label="Is Admin" type="checkbox" />
                        <FormField name="gender" label="Gender" as="select">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </FormField>
                        <FormField name="dateOfBirth" label="Date of Birth" type="date" />
                        <FormField name="age" label="Age" />
                        <FormField name="height" label="Height" />
                        <FormField name="motherTongue" label="Mother Tongue" />
                        <FormField name="cast" label="Cast" />
                        <FormField name="religion" label="Religion" />
                        <FormField name="sect" label="Sect" />
                        <FormField name="city" label="City" />
                        <FormField name="highestDegree" label="Highest Degree" />
                        <FormField name="occupation" label="Occupation" />
                        <FormField name="employedIn" label="Employed In" />
                        <FormField name="annualIncome" label="Annual Income" />
                        <FormField name="workLocation" label="Work Location" />
                        <FormField name="maritalStatus" label="Marital Status" />
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
                        <FormField name="ageFrom" label="Age From" />
                        <FormField name="ageTo" label="Age To" />
                        <FormField name="heightFrom" label="Height From" />
                        <FormField name="heightTo" label="Height To" />
                        <FormField name="lookingFor" label="Looking For" />
                        <FormField name="physicalStatus" label="Physical Status" />
                        <FormField name="food" label="Food Preference" />
                        <FormField name="smoking" label="Smoking" />
                        <FormField name="drinking" label="Drinking" />
                        <FormField name="familyType" label="Family Type" />
                        <FormField name="familyStatus" label="Family Status" />
                        <FormField name="familyValue" label="Family Value" />
                        <FormField name="fathersOccupation" label="Father's Occupation" />
                    </FormSection>

                    <FormSection title="Horoscope Details">
                        <FormField name="horoscopeDetails.dosh" label="Dosh" />
                        <FormField name="horoscopeDetails.star" label="Star" />
                        <FormField name="horoscopeDetails.birthTime" label="Birth Time" />
                        <FormField name="horoscopeDetails.birthPlace" label="Birth Place" />
                        <FormField name="horoscopeDetails.religion" label="Religion" />
                        <FormField name="horoscopeDetails.caste" label="Caste" />
                        <FormField name="horoscopeDetails.motherTongue" label="Mother Tongue" />
                        <FormField name="horoscopeDetails.manglik" label="Manglik" />
                    </FormSection>

                    <FormSection title="Family Details">
                        <FormField name="FamilyDetails.numOfBrothers" label="Number of Brothers" />
                        <FormField name="FamilyDetails.numOfMarriedBrothers" label="Number of Married Brothers" />
                        <FormField name="FamilyDetails.numOfSisters" label="Number of Sisters" />
                        <FormField name="FamilyDetails.numOfMarriedSisters" label="Number of Married Sisters" />
                        <FormField name="FamilyDetails.country" label="Country" />
                        <FormField name="FamilyDetails.state" label="State" />
                        <FormField name="FamilyDetails.city" label="City" />
                    </FormSection>

                    <FormSection title="Education">
                        <FormField name="Education.education" label="Education" />
                        <FormField name="Education.occupation" label="Occupation" />
                        <FormField name="Education.income" label="Income" />
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


const FormSection = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);