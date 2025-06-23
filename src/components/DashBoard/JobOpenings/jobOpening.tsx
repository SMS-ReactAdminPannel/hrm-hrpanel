import React, { useState } from "react";

interface Applicant {
  name: string;
  experience: string;
  location: string;
  role: string;
  badgeColor: string;
}

interface Job {
  title: string;
  location: string;
  openings: number;
}

const applicants: Applicant[] = [
  {
    name: "Brian Villalobos",
    experience: "5+ Years",
    location: "USA",
    role: "UI/UX Designer",
    badgeColor: "bg-teal-700",
  },
  {
    name: "Anthony Lewis",
    experience: "4+ Years",
    location: "USA",
    role: "Python Developer",
    badgeColor: "bg-blue-600",
  },
  {
    name: "Stephan Peralt",
    experience: "6+ Years",
    location: "USA",
    role: "Android Developer",
    badgeColor: "bg-pink-600",
  },
  {
    name: "Doglas Martini",
    experience: "2+ Years",
    location: "USA",
    role: "React Developer",
    badgeColor: "bg-purple-600",
  },
];

const jobs: Job[] = [
  {
    title: "Frontend Developer",
    location: "Remote",
    openings: 2,
  },
  {
    title: "Backend Developer",
    location: "USA",
    openings: 1,
  },
  {
    title: "UI/UX Designer",
    location: "India",
    openings: 3,
  },
];

const JobOpening:React.FC = () => {
  const [activeTab, setActiveTab] = useState<"openings" | "applicants">("applicants");

  return (
    <div className="bg-white shadow rounded p-4 w-full max-w-md rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Jobs Portal</h2>
        <button className="text-sm text-gray-500 hover:text-blue-600">View All</button>
      </div>

      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("openings")}
          className={`w-1/2 text-center py-2 font-medium rounded-l ${
            activeTab === "openings"
              ? "bg-orange-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Openings
        </button>
        <button
          onClick={() => setActiveTab("applicants")}
          className={`w-1/2 text-center py-2 font-medium rounded-r ${
            activeTab === "applicants"
              ? "bg-orange-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Applicants
        </button>
      </div>

      <div className="space-y-4 min-h-[200px]">
        {activeTab === "applicants" &&
          applicants.map((applicant, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{applicant.name}</p>
                <p className="text-sm text-gray-500">
                  Exp: {applicant.experience} · {applicant.location}
                </p>
              </div>
              <span
                className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${applicant.badgeColor}`}
              >
                {applicant.role}
              </span>
            </div>
          ))}

        {activeTab === "openings" &&
          jobs.map((job, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-gray-500">
                  {job.location} · Openings: {job.openings}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobOpening;
