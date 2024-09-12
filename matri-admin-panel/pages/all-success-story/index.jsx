import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '@/url';
import { FaTrash } from 'react-icons/fa';
import AdminLayout from '@/components/AdminLayout';

const HomePage = () => {
  const [successStories, setSuccessStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        withCredentials: true, // Similar to credentials: "include"
      });
      setSuccessStories(response.data.successStories);
    } catch (error) {
      console.error("Error fetching success stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this success story?")) {
      try {
        await axios.delete(`${backendUrl}/admin/success-stories/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        alert("Success story deleted successfully!");
        fetchSuccessStories();
      } catch (error) {
        console.error("Error deleting success story:", error);
        alert("Error deleting success story. Please try again.");
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Success Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {successStories.map((story) => (
          <div key={story._id} className="relative p-4 border border-orange-300 rounded-lg shadow-md">
            <img src={story.image} alt={story.title} className="w-full h-48 object-cover rounded-lg shadow-md mb-4" />
            <h2 className="text-xl font-semibold text-orange-600 mb-2">{story.title}</h2>
            <p className="text-gray-700">{story.description}</p>
            <button
              onClick={() => handleDelete(story._id)}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

HomePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default HomePage;