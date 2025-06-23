import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
// import { Outlet } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { BarChart2, Users, Briefcase, Sliders, Calendar, TrendingUp, Percent } from "lucide-react";
import RecruitmentPipeline from "./pipeline";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { FONTS } from "../../constants/uiConstants";

const COLORS = ["#D9D9D9", "#F8D147", "#00C49F", "#FF4D4F", "#B2F296"];

// Badge component (can be moved to its own file if reused elsewhere)
function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

// Status color logic
function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "interview":
      return "bg-blue-100 text-blue-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "hired":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function RecruitmentDashboard() {
  const recentApplications = [
    {
      avatar: "AB",
      name: "Alice Brown",
      position: "Frontend Developer",
      status: "Pending",
      date: "2024-06-01",
    },
    {
      avatar: "JS",
      name: "John Smith",
      position: "Backend Developer",
      status: "Interview",
      date: "2024-06-02",
    },
    {
      avatar: "MK",
      name: "Maria Khan",
      position: "UI/UX Designer",
      status: "Rejected",
      date: "2024-06-03",
    },
  ];

  const upcomingInterviews = [
    {
      candidate: "Alice Brown",
      position: "Frontend Developer",
      interviewer: "Sarah Lee",
      time: "10:00 AM",
      date: "2024-06-05",
    },
    {
      candidate: "John Smith",
      position: "Backend Developer",
      interviewer: "Michael Chen",
      time: "2:00 PM",
      date: "2024-06-06",
    },
    {
      candidate: "rock",
      position: "Backend Developer",
      interviewer: "Michael Chen",
      time: "2:00 PM",
      date: "2024-06-06",
    },
  ];


  const offerLetterData = [
    { name: "Not Sent", value: 10 },
    { name: "Sent", value: 5 },
    { name: "Accepted", value: 3 },
    { name: "Rejected", value: 1 },
    { name: "Joined", value: 2 },
  ];
  
  const joiningData = [
    { month: "January", value: 1 },
    { month: "February", value: 1 },
    { month: "March", value: 0 },
    { month: "April", value: 1 },
    { month: "May", value: 7 },
    { month: "June", value: 0 },
  ];
  
  const pipelineData = [
    { title: "Deep Learning Engineer", initial: 0, test: 0 },
    { title: "Computer Vision Engineer", initial: 0, test: 0 },
    { title: "Computer Vision Intern", initial: 0, test: 0 },
    { title: "Product Designer", initial: 0, test: 0 },
    { title: "Head Engineering", initial: 0, test: 0 },
    { title: "Sr. DevOps Engineer", initial: 0, test: 0 },
  ];
      
  

  return (


    <>
    
    <div className=" mx-auto max-w-screen-xl">
        <h1 className=" mb-6" style={FONTS.header}>
          Recruitment Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6 " style={{...FONTS.cardSubHeader}}>
  {[
    {
      title: "Total Vacancies",
      value: 96,
      icon: <Briefcase className="text-[#3bb78f]" />,
    },
    {
      title: "Ongoing Recruitments",
      value: 18,
      icon: <Sliders className="text-[#3bb78f]" />,
    },
    {
      title: "Hired Candidates",
      value: 3,
      icon: <Users className="text-[#3bb78f]" />,
    },
    {
      title: "Conversion Rate",
      value: "16.7%",
      icon: <BarChart2 className="text-[#3bb78f]" />,
    },
    {
      title: "Offer Acceptance Rate",
      value: "66.7%",
      icon: <Percent className="text-[#3bb78f]" />,
    },
  ].map((stat, idx) => (
    <Card key={idx} className="shadow-md">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{stat.title}</p>
          <h2 className="text-2xl font-bold text-[#10493e]">{stat.value}</h2>
        </div>
        {stat.icon}
      </CardContent>
    </Card>
  ))}
</div>

        {/* Recent Applications & Upcoming Interviews */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest job applications received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-4 justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <span className="text-sm font-medium">{app.avatar}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {app.name}
                        </p>
                        <p className="text-sm text-gray-500">{app.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">{app.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Scheduled interviews for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {interview.candidate}
                      </p>
                      <p className="text-sm text-gray-500">
                        {interview.position}
                      </p>
                      <p className="text-xs text-gray-400">
                        Interviewer: {interview.interviewer}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{interview.time}</p>
                      <p className="text-xs text-gray-400">{interview.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>






       {/* 3-Column Stats Cards */}
<div className="grid grid-cols-3 md:grid-cols-3 gap-6 mt-6">
  {/* Skill Zone Status */}
  
  <Card className="shadow-lg rounded-2xl p-4">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-[#10493e]">Skill Zone Status</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <ul className="space-y-2">
        <li className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center">DE</div>
            <span className="font-medium text-sm">Designer</span>
          </div>
          <span className="text-sm text-gray-600">2 Candidates</span>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center">SI</div>
            <span className="font-medium text-sm">Social Media Influencer</span>
          </div>
          <span className="text-sm text-gray-600">0 Candidates</span>
        </li>
      </ul>
    </CardContent>
  </Card>

  {/* Candidate Offer Letter Status */}
  <Card className="shadow-lg rounded-2xl p-4">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-[#10493e]">Candidate Offer Letter Status</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={offerLetterData} dataKey="value" outerRadius={80}>
            {offerLetterData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  {/* Candidate Onboard */}
  <Card className="shadow-lg rounded-2xl p-4">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-[#10493e]">Candidate on Onboard</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between border-t pt-3">
        <div className="flex items-center space-x-2">
          <div className="bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center">HA</div>
          <span className="font-medium text-sm">Haroon</span>
        </div>
        <span className="text-sm text-gray-600">FD-002-Finance</span>
        <a href="#" className="text-blue-500 text-sm font-medium">View</a>
      </div>
    </CardContent>
  </Card>
</div>

{/* 2-Column: Joinings & Pipeline */}
<div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-6">
  {/* Joinings Per Month */}
  <Card className="shadow-lg rounded-2xl p-4">
    <CardHeader className="flex justify-between items-center">
      <CardTitle className="text-lg font-semibold text-[#10493e]">Joinings Per Month</CardTitle>
      <select className="border rounded px-2 py-1 text-sm text-gray-600">
        <option>2025</option>
      </select>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={joiningData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#006666" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  {/* Hiring Pipeline */}
  <Card className="shadow-lg rounded-2xl p-4">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-[#10493e]">Current Hiring Pipeline</CardTitle>
    </CardHeader>
    <CardContent>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Job Positions</th>
            <th className="py-2">Initial</th>
            <th className="py-2">Test</th>
          </tr>
        </thead>
        <tbody>
          {pipelineData.map((job, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-2">{job.title}</td>
              <td>{job.initial}</td>
              <td>{job.test}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardContent>
  </Card>
</div>
        </div>
     
      
      </>
  );
}



        {/* <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common recruitment tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Button className="h-20 flex-col space-y-2">
                  <Briefcase className="h-6 w-6" />
                  <span>Post New Job</span>
                </Button>
                <Button className="h-20 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>View Candidates</span>
                </Button>
                <Button className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Interview</span>
                </Button>
                <Button className="h-20 flex-col space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div> */}



        {/* Additional Sections */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="shadow">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-[#10493e] mb-2">
                Candidate Statistics
              </h3>
              <div className="text-gray-500 text-sm">
                Pie charts, status, etc. will go here
              </div>
              <div className="p-6">
     
      <Link
        to="/candidates"
        className="text-blue-500 hover:underline font-medium"
      >
        Go to Candidates
      </Link>
    </div>
            </CardContent>
          </Card>
          <Card className="shadow">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-[#10493e] mb-2">
                Recruitment Pipeline
              </h3>
              <div className="text-gray-500 text-sm">
                Coming Soon: Stages and pipeline view
              </div>
            </CardContent>
          </Card>

        
        </div> */}

        {/* Pipeline Component */}
        {/* <div className="mt-6">
          <RecruitmentPipeline />
          {/* <CandidatesPage /> */}
        {/* </div> */} 

        {/* <div>
      <CandidatesPage />
    </div> */}


    