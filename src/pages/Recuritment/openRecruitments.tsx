"use client"

import { useState } from "react"

const jobListings = [
  {
    id: 15,
    company: "SCHULL TECHNOLOGIES LIMITED",
    logo: "📦",
    postedSince: "1 month, 4 weeks",
    roles: ["Django Dev", "Training and Development Coordinator"],
    title: "Django Dev",
    capacity: 10,
    applied: 0,
    description:
      "Join our team as a Django Developer. You'll help develop backend services, work with cross-functional teams, and be part of our tech-driven culture. Ideal for those passionate about Python and web frameworks.",
  },
  {
    id: 14,
    company: "InnovaSoft",
    logo: "💡",
    postedSince: "3 weeks",
    roles: ["Frontend Engineer", "UI Designer"],
    title: "React Developer",
    capacity: 5,
    applied: 1,
    description:
      "We are looking for a skilled React Developer who can build intuitive and scalable interfaces. You'll collaborate closely with designers and backend developers to deliver seamless user experiences.",
  },

  {
    id: 1,
    company: "SCHULL TECHNOLOGIES LIMITED",
    logo: "📦",
    postedSince: "1 month, 4 weeks",
    roles: ["Django Dev", "Training and Development Coordinator"],
    title: "Django Developer",
    capacity: 10,
    applied: 0,
    description:
      "Responsible for developing and maintaining Django-based web applications. Collaborate with cross-functional teams to design, build, and improve software. You’ll also play a role in training junior developers and coordinating team activities.",
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
    description:
      "We are looking for a skilled React Developer to create dynamic and interactive user interfaces. You will collaborate with designers and backend engineers to bring mockups to life and ensure cross-platform optimization.",
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
    description:
      "Join our backend team to build robust and scalable APIs using Node.js. You’ll work with microservices architecture, handle large datasets, and optimize performance for high-traffic applications.",
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
    description:
      "Seeking a DevOps Engineer to streamline our CI/CD processes and manage cloud infrastructure. Experience with AWS, Docker, Kubernetes, and monitoring tools like Prometheus is a must.",
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
    description:
      "We are hiring ML engineers to develop and deploy predictive models using Python, TensorFlow, and Scikit-learn. You'll work on real-world data problems in the healthcare and retail space.",
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
    description:
      "Work with global clients to implement green computing strategies. Analyze energy consumption, recommend efficient IT systems, and contribute to carbon footprint reduction through tech solutions.",
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
    description:
      "Analyze and interpret complex healthcare data sets to improve patient outcomes. You should be proficient in SQL, Python, and visualization tools like Tableau or PowerBI.",
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
    description:
      "Design, implement, and debug firmware for embedded devices. Experience with C/C++ and microcontrollers such as ARM Cortex is required. Knowledge of IoT protocols is a bonus.",
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
    description:
      "Create high-quality written and visual content for social media and marketing campaigns. Strong storytelling and familiarity with SEO and Canva or Adobe Suite is preferred.",
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
    description:
      "Manage the lifecycle of fintech products. Collaborate with designers, engineers, and stakeholders to define features, gather feedback, and drive product launches in a fast-paced environment.",
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
    description:
      "Develop logistics software to optimize warehouse and transportation systems. Experience in route planning algorithms, RFID integration, and database systems is advantageous.",
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
    description:
      "Design and build engaging eLearning modules using tools like Articulate Storyline, Adobe Captivate, or HTML5. Background in pedagogy or education technology is preferred.",
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
    description:
      "Monitor and secure network systems from cyber threats. You'll handle incident response, risk assessment, and compliance checks. Familiarity with tools like Splunk and Wireshark is a plus.",
  },
]
// Add similar descriptions for other jobs if needed...

type Job = (typeof jobListings)[number]

export default function OpenRecruitments() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className=" py-10 min-h-screen">
      <div className="flex justify-center items-center mb-6 relative">
        <h1 className="text-4xl font-bold">Open Job Listings</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#006666] hover:bg-[#004C4C] text-white px-5 py-2 rounded-xl font-medium transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed 
       text-white py-2 px-4 rounded hover:bg-blue-700 absolute right-0"
        >
          + Create Post
        </button>
      </div>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        We're hiring! Join our team and be part of a vibrant workplace where your talents make a difference. Here are
        the open recruitments...
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
                onClick={() => setSelectedJob(job)}
                className="text-red-500 border border-red-500 text-xs px-4 py-1 rounded-md hover:bg-red-50 transition "
              >
                Details
              </button>
              <button className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">know more</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-0  flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-l-3xl shadow-lg w-full max-w-xl p-6  relative">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl"
              onClick={() => setSelectedJob(null)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-2">{selectedJob.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{selectedJob.description || "No description provided."}</p>

            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Job Positions:</h4>
              <ul className="space-y-2 text-sm text-gray-800">
                {selectedJob.roles.map((role, index) => (
                  <li key={index}>• {role}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full text-white py-2  rounded hover:bg-blue-700 bg-[#006666] hover:bg-[#004C4C] text-white px-5 py-2 rounded-xl font-medium transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed "
              >
            
              Edit
            </button>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto
          backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl z-20"
              onClick={() => setShowCreateModal(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-6 text-white">Create Job Posting</h2>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                // Handle form submission here
                console.log("Form submitted")
                setShowCreateModal(false)
              }}
            >
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Company Name *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., SCHULL TECHNOLOGIES LIMITED"
                  required
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Job Title *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Django Developer"
                  required
                />
              </div>

              {/* Company Logo */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo (Emoji)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="📦"
                  maxLength={2}
                />
                <p className="text-xs text-gray-500 mt-1">Choose an emoji to represent your company</p>
              </div> */}

              {/* Job Roles */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Job Roles/Skills *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Django Dev, Training Coordinator (comma separated)"
                  required
                />
                <p className="text-xs text-white mt-1">Separate multiple roles with commas</p>
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Capacity *</label>
                <input
                  type="number"
                  min="1"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total number of positions"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Job Description *</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Describe the job responsibilities, requirements, and what makes this role exciting..."
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Remote, New York, Hybrid"
                />
              </div>

              {/* Salary Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Min Salary</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Max Salary</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="80000"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1  text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors bg-[#006666] hover:bg-[#004C4C] text-white px-5 py-2 rounded-xl font-medium transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
            
                  Create Job Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
