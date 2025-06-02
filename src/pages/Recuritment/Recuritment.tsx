import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { BarChart2, Users, Briefcase, Sliders, Calendar, TrendingUp } from "lucide-react";
import RecruitmentPipeline from "./pipeline";
import { Button } from "../../components/ui/button";

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

  return (
    <div className="p-6 bg-gradient-to-br from-[#e0f7f4] to-[#f4fbf9] min-h-screen">
      <h1 className="text-3xl font-semibold text-[#10493e] mb-6">
        Recruitment Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
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
        ].map((stat, idx) => (
          <Card key={idx} className="min-w-[250px] shadow-md flex-shrink-0">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h2 className="text-2xl font-bold text-[#10493e]">
                  {stat.value}
                </h2>
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


<div className="mt-6">
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
        </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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

        <Card className="shadow">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-[#10493e] mb-2">
              Candidate Statistics
            </h3>
            <div className="text-gray-500 text-sm">
              Pie charts, status, etc. will go here
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Component */}
      <div className="mt-6">
        <RecruitmentPipeline />
      </div>
    </div>
  );
}