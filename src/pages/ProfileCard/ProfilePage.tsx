import { useState } from "react";

import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

export default function ProfilePage() {
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-50 relative p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-6 mb-5 flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full shadow-inner border border-gray-300 flex items-center justify-center">
                    <FaUser size={60} />
                </div>
                <div className="mt-4 bg-blue-300 px-4 py-1 rounded-full text-sm text-gray-800 font-semibold">
                    ADMINISTRATOR
                </div>
                <div className="mt-2 text-green-600 font-medium text-sm">● ONLINE</div>
            </div>

            {/* person-Info */}
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-6 mb-5">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                    <p>First Name: <strong className="text-gray-900">Sathyajothi</strong></p>
                    <p>Last Name: <strong className="text-gray-900">P</strong></p>
                    <p>Email: <strong className="text-gray-900">sathyajothi503@gmail.com</strong></p>
                    <p>Department: <strong className="text-gray-900">Bitrix</strong></p>
                    <p>Second Name: <strong className="text-gray-900 italic">Field is empty</strong></p>
                    <p>Notification Language: <strong className="text-gray-900">English</strong></p>
                </div>
            </div>

            {/* Personal-Det*/}
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Personal Details</h2>
                <p className="text-sm text-gray-700">
                    This area contains HR related information and other documentation. It will be visible only to users with sufficient permissions.
                </p>
                <button className="mt-4 border-3 px-4 py-1 rounded-full text-sm text-gray-800 font-semibold">Edit</button>
            </div>
            {/*about-me*/}
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-6 mt-5">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">About me</h2>
                <p className="text-sm text-gray-700">
                    Share interesting life stories or tell other users about yourself, upload photos of memorable moments.
                </p>
                <button className="mt-4 border-3 px-4 py-1 rounded-full text-sm text-gray-800 font-semibold">Tell About Yourself</button>
            </div>
            {/*things-i-like*/}
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-6 mt-5">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Things I Like</h2>
                <p className="text-sm text-gray-700">
                    Create or join interests. Find friends who share your interests.
                </p>
                <button className="mt-4 border-3 px-4 py-1 rounded-full text-sm text-gray-800 font-semibold">Select Intrests</button>
            </div>
            <div>
                <div className="mt-4 flex gap-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-1 rounded">SAVE</button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm px-4 py-1 rounded">CANCEL</button>
                </div>
            </div>
        </motion.div>
    );
}