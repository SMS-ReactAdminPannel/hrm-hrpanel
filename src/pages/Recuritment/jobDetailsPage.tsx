import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const JobDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState<{
    id: string | number;
    title: string;
    description?: string;
    roles: string[];
  } | null>(null);

  // Simulate fetch — replace with actual API call
  useEffect(() => {
    const dummyJobs = [
        {
            id: "1",
            title: "Django Dev",
            description: "Django development in S/W Department.",
            roles: ["Django Developer", "Training Coordinator"],
          },
          {
            id: "2",
            title: "React Developer",
            description: "React Development role.",
            roles: ["Frontend Developer", "UI Designer"],
          },
          {
            id: "3",
            title: "Node.js Developer",
            description: "Backend development using Node.js.",
            roles: ["Backend Engineer"],
          },
          {
            id: "4",
            title: "DevOps Engineer",
            description: "DevOps role with focus on Cloud infrastructure.",
            roles: ["DevOps", "Cloud Architect"],
          },
          {
            id: "5",
            title: "Machine Learning Engineer",
            description: "Work on AI and machine learning models.",
            roles: ["AI Engineer"],
          },
          {
            id: "6",
            title: "Green IT Consultant",
            description: "Sustainability-focused IT solutions.",
            roles: ["Sustainability Analyst"],
          },
          {
            id: "7",
            title: "Health Data Analyst",
            description: "Data analysis in healthcare sector.",
            roles: ["Healthcare IT", "Data Specialist"],
          },
          {
            id: "8",
            title: "Firmware Engineer",
            description: "Work on embedded systems and firmware.",
            roles: ["Embedded Systems"],
          },
          {
            id: "9",
            title: "Digital Content Creator",
            description: "Create content for digital media platforms.",
            roles: ["Content Writer", "Media Manager"],
          },
          {
            id: "10",
            title: "Product Manager - Fintech",
            description: "Manage fintech product development.",
            roles: ["Fintech Analyst"],
          },
          {
            id: "11",
            title: "Logistics Software Engineer",
            description: "Software development for logistics solutions.",
            roles: ["Operations", "Tech Lead"],
          },
          {
            id: "12",
            title: "eLearning Developer",
            description: "Design and develop eLearning content.",
            roles: ["Instructional Designer"],
          },
          {
            id: "13",
            title: "Security Analyst",
            description: "Cybersecurity roles to protect systems and data.",
            roles: ["Cybersecurity"],
          },
          {
            id: "14",
            title: "Autonomous Vehicle Engineer",
            description: "Work on AI and robotics in autonomous vehicles.",
            roles: ["ML Ops", "Data Engineering"],
          },
          {
            id: "15",
            title: "Quantum Software Engineer",
            description: "Research and development in quantum computing.",
            roles: ["Quantum Researcher"],
          },
     
    ];

    const found = dummyJobs.find((job) => job.id.toString() === id);
    setJob(found || null);
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleApplyNow = () => {
    if (job) {
      navigate(`/recruitment/application-form?recruitmentId=${job.id}`);
    }
  };

  if (!job) {
    return (
      <div className="p-6 text-center text-gray-700">
        <h2 className="text-xl font-semibold">Job Not Found</h2>
      </div>
    );
  }

  return (
    
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-10 w-full max-w-md relative text-white">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-2xl text-white hover:text-gray-900"
            >
              &times;
            </button>
      
            {/* Job Title */}
            <h2 className="text-2xl font-bold mb-2 mt-4">{job.title}</h2>
      
            {/* Description */}
            <p className="text-sm text-gray-200 mb-6">{job.description}</p>
      
            {/* Job Roles */}
            <div className="mb-10">
              <h4 className="font-semibold text-sm mb-3">Job positions :</h4>
              <ul className="space-y-3">
                {job.roles.map((role, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white">
                    <span className="text-red-400 text-base mt-1">●</span>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
      
            {/* Apply Now Button */}
            <button
              onClick={handleApplyNow}
              className="w-full border border-red-400 text-red-400 py-3 rounded-md text-sm font-medium hover:bg-red-100 hover:text-red-700 transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      );
      
//     <div className="m-52 mb-[3000px] mt-1 py-40 px-48 pt-24 bg-transparent backdrop-blur-md overflow-y-auto justify-center flex items-center min-w-screen">
//     <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-full max-w-md relative">
//       {/* Close Button */}
//       <button
//         onClick={handleClose}
//         className="absolute top-4 right-4 text-2xl text-gray-100 hover:text-white"
//       >
//         &times;
//       </button>
  
//       {/* Job Title */}
//       <h2 className="text-2xl font-bold mb-2 mt-4 text-white">{job.title}</h2>
  
//       {/* Description */}
//       <p className="text-gray-200 mb-6 text-sm">{job.description}</p>
  
//       {/* Job Roles */}
//       <div className="mb-10">
//         <h4 className="font-semibold text-sm mb-3 text-white">Job positions :</h4>
//         <ul className="space-y-3">
//           {job.roles.map((role, i) => (
//             <li key={i} className="flex items-start gap-2 text-sm text-white">
//               <span className="text-red-400 text-base mt-1">●</span>
//               <span>{role}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
  
//       {/* Apply Now Button */}
//       <button
//         onClick={handleApplyNow}
//         className="w-full border border-red-400 text-red-400 py-3 rounded-md text-sm font-medium hover:bg-red-100 hover:text-red-700 transition"
//       >
//         Apply Now
//       </button>
//     </div>
//   </div>
  
//   );
};

export default JobDetailsPage;


// return (
//     <div className="fixed inset-0 z-50 bg-white overflow-y-auto flex items-center justify-center">
//       <div className="max-w-2xl mx-auto px-8 py-12 relative min-h-screen bg-white rounded-lg shadow-xl border border-gray-300">
//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-6 right-6 text-3xl text-gray-600 hover:text-black focus:outline-none"
//         >
//           &times;
//         </button>
  
//         {/* Job Title */}
//         <h2 className="text-3xl font-bold mb-3 text-gray-900">{job.title}</h2>
  
//         {/* Description */}
//         <p className="text-gray-700 mb-6 text-sm">{job.description}</p>
  
//         {/* Job Roles */}
//         <div className="mb-10">
//           <h4 className="font-semibold text-sm mb-4 text-gray-800">Job Positions:</h4>
//           <ul className="space-y-3">
//             {job.roles.map((role, i) => (
//               <li key={i} className="flex items-start gap-2 text-sm text-gray-900">
//                 <span className="text-red-500 text-base mt-1">●</span>
//                 <span>{role}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
  
//         {/* Apply Now Button */}
//         <button
//           onClick={handleApplyNow}
//           className="w-full border border-red-500 text-red-500 py-3 rounded-md text-sm font-medium hover:bg-red-50 transition focus:outline-none"
//         >
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
  
//   }
  
//   export default JobDetailsPage;