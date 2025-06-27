import type { OffboardingRequest, ChecklistTemplates, ExitAnalytics } from "./types"

export const FONTS = {
  paragraph: {
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
  },
}

export const offboardingRequests: OffboardingRequest[] = [
  {
    id: 1,
    employee: {
      name: "John Doe",
      id: "EMP001",
      department: "Engineering",
      position: "Senior Developer",
      manager: "Jane Smith",
      email: "john.doe@company.com",
      phone: "+1-555-0123",
      hireDate: "2020-03-15",
      avatar: "👨‍💻",
    },
    exitDetails: {
      type: "Resignation",
      reason: "Career Growth",
      lastWorkingDay: "2024-07-15",
      noticePeriod: 30,
      submittedDate: "2024-06-15",
      status: "In Progress",
    },
    progress: {
      completed: 12,
      total: 18,
      percentage: 67,
    },
    priority: "High",
    assignedHR: "Sarah Johnson",
  },
  {
    id: 2,
    employee: {
      name: "Alice Johnson",
      id: "EMP002",
      department: "Marketing",
      position: "Marketing Manager",
      manager: "Mike Brown",
      email: "alice.johnson@company.com",
      phone: "+1-555-0124",
      hireDate: "2019-08-20",
      avatar: "👩‍💼",
    },
    exitDetails: {
      type: "Termination",
      reason: "Performance",
      lastWorkingDay: "2024-06-30",
      noticePeriod: 0,
      submittedDate: "2024-06-28",
      status: "Completed",
    },
    progress: {
      completed: 18,
      total: 18,
      percentage: 100,
    },
    priority: "Medium",
    assignedHR: "David Wilson",
  },
  {
    id: 3,
    employee: {
      name: "Robert Chen",
      id: "EMP003",
      department: "Finance",
      position: "Financial Analyst",
      manager: "Lisa Wong",
      email: "robert.chen@company.com",
      phone: "+1-555-0125",
      hireDate: "2021-01-10",
      avatar: "👨‍💼",
    },
    exitDetails: {
      type: "Resignation",
      reason: "Relocation",
      lastWorkingDay: "2024-08-10",
      noticePeriod: 60,
      submittedDate: "2024-06-10",
      status: "Pending",
    },
    progress: {
      completed: 5,
      total: 18,
      percentage: 28,
    },
    priority: "Medium",
    assignedHR: "Sarah Johnson",
  },
]

export const checklistTemplates: ChecklistTemplates = {
  Resignation: [
    {
      category: "Documentation",
      items: [
        "Exit interview scheduled",
        "Resignation letter received",
        "Handover document created",
        "Knowledge transfer completed",
      ],
    },
    {
      category: "IT & Security",
      items: [
        "Laptop/equipment returned",
        "Access cards deactivated",
        "Software licenses revoked",
        "Email access disabled",
        "VPN access removed",
      ],
    },
    {
      category: "HR & Payroll",
      items: [
        "Final salary calculated",
        "Benefits termination processed",
        "PF/Gratuity settlement",
        "Experience certificate issued",
        "Tax documents provided",
      ],
    },
    {
      category: "Administrative",
      items: ["Office keys returned", "Parking pass cancelled", "Library books returned", "Company property audit"],
    },
  ],
  Termination: [
    {
      category: "Documentation",
      items: ["Termination letter issued", "Handover document created", "Knowledge transfer completed"],
    },
    {
      category: "IT & Security",
      items: [
        "Laptop/equipment returned",
        "Access cards deactivated",
        "Software licenses revoked",
        "Email access disabled",
      ],
    },
    {
      category: "HR & Payroll",
      items: ["Final salary calculated", "Benefits termination processed", "PF/Gratuity settlement"],
    },
    { category: "Administrative", items: ["Office keys returned", "Parking pass cancelled"] },
  ],
}

export const exitAnalytics: ExitAnalytics = {
  thisMonth: {
    total: 8,
    voluntary: 6,
    involuntary: 2,
    avgNoticePeriod: 25,
  },
  topReasons: [
    { reason: "Career Growth", count: 12, percentage: 35 },
    { reason: "Better Compensation", count: 8, percentage: 24 },
    { reason: "Work-Life Balance", count: 6, percentage: 18 },
    { reason: "Relocation", count: 4, percentage: 12 },
    { reason: "Performance", count: 4, percentage: 12 },
  ],
  departmentTrends: [
    { dept: "Engineering", exits: 15, retention: 85 },
    { dept: "Sales", exits: 12, retention: 78 },
    { dept: "Marketing", exits: 8, retention: 82 },
    { dept: "HR", exits: 3, retention: 95 },
  ],
  monthlyTrends: [12, 8, 15, 6, 9, 11, 8, 14, 7, 10, 12, 8],
  exitInterviews: {
    completed: 78,
    wouldRecommend: 85,
    averageRating: 4.2,
    boomerangHires: 12,
  },
}
