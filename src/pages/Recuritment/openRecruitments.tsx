import React from "react";
import { useNavigate } from "react-router-dom";

const jobListings = [
  {
    id: 1,
    company: "SCHULL TECHNOLOGIES LIMITED",
    logo: "📦",
    postedSince: "1 month, 4 weeks",
    roles: ["Django Dev", "Training and Development Coordinator"],
    title: "Django Dev",
    capacity: 10,
    applied: 0,
  },
  {
    id: 2,
    company: "InnovaSoft",
    logo: "💡",
    postedSince: "3 weeks",
    roles: ["Frontend Engineer", "UI Designer"],
    title: "React Developer",
    capacity: 5,
    applied: 1,
  },
  {
    id: 3,
    company: "NextWave Solutions",
    logo: "🌊",
    postedSince: "2 weeks",
    roles: ["Backend Engineer"],
    title: "Node.js Developer",
    capacity: 6,
    applied: 4,
  },
  {
    id: 4,
    company: "CloudTrack",
    logo: "☁️",
    postedSince: "1 week",
    roles: ["DevOps", "Cloud Architect"],
    title: "DevOps Engineer",
    capacity: 4,
    applied: 2,
  },
  {
    id: 5,
    company: "BrightPath AI",
    logo: "🤖",
    postedSince: "5 days",
    roles: ["AI Engineer"],
    title: "Machine Learning Engineer",
    capacity: 7,
    applied: 3,
  },
  {
    id: 6,
    company: "EcoByte",
    logo: "🌿",
    postedSince: "2 days",
    roles: ["Sustainability Analyst"],
    title: "Green IT Consultant",
    capacity: 3,
    applied: 1,
  },
  {
    id: 7,
    company: "MedSync",
    logo: "🩺",
    postedSince: "3 weeks",
    roles: ["Healthcare IT", "Data Specialist"],
    title: "Health Data Analyst",
    capacity: 8,
    applied: 2,
  },
  {
    id: 8,
    company: "RoboTech Inc.",
    logo: "🛠️",
    postedSince: "1 week",
    roles: ["Embedded Systems"],
    title: "Firmware Engineer",
    capacity: 6,
    applied: 4,
  },
  {
    id: 9,
    company: "BrightComms",
    logo: "📡",
    postedSince: "4 days",
    roles: ["Content Writer", "Media Manager"],
    title: "Digital Content Creator",
    capacity: 5,
    applied: 2,
  },
  {
    id: 10,
    company: "NeoBank",
    logo: "🏦",
    postedSince: "1 month",
    roles: ["Fintech Analyst"],
    title: "Product Manager - Fintech",
    capacity: 9,
    applied: 5,
  },
  {
    id: 11,
    company: "LogiTrack",
    logo: "🚚",
    postedSince: "2 weeks",
    roles: ["Operations", "Tech Lead"],
    title: "Logistics Software Engineer",
    capacity: 10,
    applied: 6,
  },
  {
    id: 12,
    company: "EduLearn",
    logo: "📚",
    postedSince: "6 days",
    roles: ["Instructional Designer"],
    title: "eLearning Developer",
    capacity: 4,
    applied: 1,
  },
  {
    id: 13,
    company: "SafeData",
    logo: "🔐",
    postedSince: "1 day",
    roles: ["Cybersecurity"],
    title: "Security Analyst",
    capacity: 5,
    applied: 0,
  },
  {
    id: 14,
    company: "AutoAI",
    logo: "🚗",
    postedSince: "1 week",
    roles: ["ML Ops", "Data Engineering"],
    title: "Autonomous Vehicle Engineer",
    capacity: 3,
    applied: 2,
  },
  {
    id: 15,
    company: "QuantumX",
    logo: "⚛️",
    postedSince: "3 days",
    roles: ["Quantum Researcher"],
    title: "Quantum Software Engineer",
    capacity: 2,
    applied: 0,
  },
  {
    id: 16,
    company: "VisionMedia",
    logo: "📽️",
    postedSince: "2 weeks",
    roles: ["Video Editing", "Motion Design"],
    title: "Video Content Specialist",
    capacity: 5,
    applied: 1,
  },
];

export default function OpenRecruitments() {
  const navigate = useNavigate();

  const handleViewDetails = (id: number | string) => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="px-6 py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-2">Open Job Listings</h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        We're hiring! Join our team and be part of a vibrant workplace where your talents make a difference. Here are the open recruitments...
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobListings.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm font-medium text-gray-700">{job.company}</div>
                <div className="text-xs text-gray-500">{job.postedSince}</div>
              </div>
              <div className="text-2xl">{job.logo}</div>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {job.roles.map((role, i) => (
                <span key={i} className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                  {role}
                </span>
              ))}
            </div>

            <h2 className="text-lg font-semibold mb-2">{job.title}</h2>

            <div className="text-xs text-gray-500 mb-1">
              {job.applied} Applied of {job.capacity} Capacity
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
              <div
                className="h-2 bg-red-500 rounded-full"
                style={{ width: `${(job.applied / job.capacity) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => handleViewDetails(job.id)}
                className="text-red-500 border border-red-500 text-xs px-4 py-1 rounded-md hover:bg-red-50 transition"
              >
                Details
              </button>
              <button className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
