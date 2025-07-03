import { useState } from "react";

import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

export default function ProfilePage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
        >
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 bg-gray-200 rounded-full border shadow-inner flex items-center justify-center">
                                    <FaUser size={60} className="text-gray-600" />
                                </div>
                                <div className="mt-4 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                                    ADMINISTRATOR
                                </div>
                            </div>
                        </div>

                        {/* Stress Level */}
                        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                            <p className="text-sm text-gray-700 mb-4">Measure your stress level</p>
                            <button className="text-sm font-medium text-blue-600 border border-blue-600 px-4 py-1 rounded-full hover:bg-blue-50">
                                Edit
                            </button>
                        </div>

                        {/* Applications */}
                        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                            <div className="flex justify-around text-center text-sm text-gray-700">
                                <div>
                                    <strong>Mobile</strong>
                                    <br /> application
                                </div>
                                <div>
                                    <strong>Desktop</strong>
                                    <br /> application
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm text-center">
                            <h2 className="text-base font-semibold text-gray-700">Appreciations</h2>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 space-y-6">
                        {/* Contact Info */}
                        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
                            <div className="space-y-1 text-sm text-gray-700">
                                <p>First Name: <span className="font-medium text-gray-900">John</span></p>
                                <p>Last Name: <span className="font-medium text-gray-900">P</span></p>
                                <p>Email: <span className="font-medium text-gray-900">John@gmail.com</span></p>
                                <p>Department: <span className="font-medium text-gray-900">HRM</span></p>
                                <p>Second Name: <span className="italic text-gray-500">Field is empty</span></p>
                                <p>Notification Language: <span className="font-medium text-gray-900">English</span></p>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h2>
                            <p className="text-sm text-gray-700">
                                This area contains HR-related information and documentation visible only to authorized users.
                            </p>
                            <button className="mt-4 text-sm font-medium text-blue-600 border border-blue-600 px-4 py-1 rounded-full hover:bg-blue-50">
                                Edit
                            </button>
                        </div>

                        {/* About Me */}
                        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">About Me</h2>
                            <p className="text-sm text-gray-700">
                                Share your story, tell others about yourself, or upload photos of special moments.
                            </p>
                            <button className="mt-4 text-sm font-medium text-blue-600 border border-blue-600 px-4 py-1 rounded-full hover:bg-blue-50">
                                Tell About Yourself
                            </button>
                        </div>

                        {/* Things I Like */}
                        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Things I Like</h2>
                            <p className="text-sm text-gray-700">
                                Join interest groups and connect with like-minded individuals.
                            </p>
                            <button className="mt-4 text-sm font-medium text-blue-600 border border-blue-600 px-4 py-1 rounded-full hover:bg-blue-50">
                                Select Interests
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}