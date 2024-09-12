import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '@/url';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import toast from 'react-hot-toast';

const SuccessStoryForm = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successStories, setSuccessStories] = useState([]);

    useEffect(() => {
        fetchSuccessStories();
    }, []);

    const fetchSuccessStories = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${backendUrl}/admin/get-success-stories`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setSuccessStories(response.data.successStories);
        } catch (error) {
            console.error("Error fetching success stories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (event) => {
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
            setImage(response.data.fileUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Error uploading image. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/admin/add-success-story`, {
                title,
                description,
                image,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            toast.success("Success story added successfully!");
            setTitle('');
            setDescription('');
            setImage(null);
            fetchSuccessStories();
        } catch (error) {
            console.error("Error adding success story:", error);
            toast.error("Error adding success story. Please try again.");
        }

        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this success story?")) {
            try {
                await axios.delete(`${backendUrl}/admin/delete-success-story/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                toast.success("Success story deleted successfully!");
                fetchSuccessStories();
            } catch (error) {
                console.error("Error deleting success story:", error);
                toast.error("Error deleting success story. Please try again.");
            }
        }
    };

    const handleGoBack = () => {
        router.push('/');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex items-center mb-6">
                <FaArrowLeft
                    className="text-orange-600 cursor-pointer mr-2"
                    onClick={handleGoBack}
                />
                <h2 className="text-2xl font-bold text-orange-600">Add Success Story</h2>
            </div>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-orange-600 font-semibold mb-2">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-orange-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-orange-600 font-semibold mb-2">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-orange-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-orange-600 font-semibold mb-2">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="w-full p-2 border border-orange-300 rounded"
                        required
                    />
                    {image && <img src={image} alt="Success Story" className="mt-4 w-48 rounded-lg shadow-md" />}
                </div>
                <button type="submit" disabled={isLoading} className="w-full p-2 bg-orange-600 text-white font-semibold rounded">
                    {isLoading ? 'Adding...' : 'Add Success Story'}
                </button>
            </form>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Existing Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories && successStories.map((story) => (
                    <div key={story._id} className="p-4 border border-orange-300 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-orange-600">{story.title}</h3>
                        <p className="text-gray-700">{story.description}</p>
                        <img src={story.image} alt={story.title} className="mt-2 w-full h-48 object-cover rounded-lg shadow-md" />
                        <button
                            onClick={() => handleDelete(story._id)}
                            className="mt-2 p-2 bg-red-600 text-white font-semibold rounded w-full"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

SuccessStoryForm.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default SuccessStoryForm;