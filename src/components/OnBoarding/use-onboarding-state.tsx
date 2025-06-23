"use client"

import { useState, useRef } from "react"
import type React from "react"

export interface TeamMember {
  id: number
  name: string
  role: string
  email: string
  phone: string
  onboardingStatus: string
  hireDate: string
  documents: {
    i9Form: boolean
    w4Form: boolean
    directDeposit: boolean
  }
}

export interface Task {
  id: number
  title: string
  category: string
  priority: string
  dueDate: string
}

export interface FileData {
  file: File | null
  url: string | null
}

export type FileInputRefs = {
  i9Form: React.RefObject<HTMLInputElement | null>
  w4Form: React.RefObject<HTMLInputElement | null>
  directDeposit: React.RefObject<HTMLInputElement | null>
}

export function useOnboardingState() {
  const [activeTab, setActiveTab] = useState("welcome")
  const [completedTasks, setCompletedTasks] = useState<number[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: FileData
  }>({
    i9Form: { file: null, url: null },
    w4Form: { file: null, url: null },
    directDeposit: { file: null, url: null },
  })
  const [fileViewerModal, setFileViewerModal] = useState<{
    isOpen: boolean
    file: File | null
    url: string | null
  }>({
    isOpen: false,
    file: null,
    url: null,
  })
  const [employeeModal, setEmployeeModal] = useState<{
    isOpen: boolean
    employee: TeamMember | null
  }>({
    isOpen: false,
    employee: null,
  })
  const [viewingEmployeeDocs, setViewingEmployeeDocs] = useState<string | null>(null)

  const fileInputRefs: FileInputRefs = {
    i9Form: useRef<HTMLInputElement>(null),
    w4Form: useRef<HTMLInputElement>(null),
    directDeposit: useRef<HTMLInputElement>(null),
  }

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Miller",
      role: "Engineering Manager",
      email: "sarah.m@example.com",
      phone: "(555) 123-4567",
      onboardingStatus: "Completed",
      hireDate: "2023-01-15",
      documents: {
        i9Form: true,
        w4Form: true,
        directDeposit: true,
      },
    },
    {
      id: 2,
      name: "John Davis",
      role: "Senior Developer",
      email: "john.d@example.com",
      phone: "(555) 987-6543",
      onboardingStatus: "In Progress",
      hireDate: "2023-03-22",
      documents: {
        i9Form: true,
        w4Form: false,
        directDeposit: false,
      },
    },
    {
      id: 3,
      name: "Alex Johnson",
      role: "UX Designer",
      email: "alex.j@example.com",
      phone: "(555) 456-7890",
      onboardingStatus: "Not Started",
      hireDate: "2023-05-10",
      documents: {
        i9Form: false,
        w4Form: false,
        directDeposit: false,
      },
    },
  ]

  const onboardingTasks: Task[] = [
    { id: 1, title: "Complete I-9 Form", category: "Legal", priority: "High", dueDate: "Day 1" },
    { id: 2, title: "Submit Tax Documents", category: "Finance", priority: "High", dueDate: "Day 1" },
    { id: 3, title: "IT Equipment Setup", category: "Technology", priority: "Medium", dueDate: "Day 2" },
    { id: 4, title: "Office Tour", category: "Orientation", priority: "Medium", dueDate: "Day 3" },
    { id: 5, title: "Meet Team Members", category: "Social", priority: "Low", dueDate: "Week 1" },
    { id: 6, title: "Complete Training Modules", category: "Training", priority: "High", dueDate: "Week 2" },
  ]

  return {
    activeTab,
    setActiveTab,
    completedTasks,
    setCompletedTasks,
    uploadedFiles,
    setUploadedFiles,
    fileViewerModal,
    setFileViewerModal,
    employeeModal,
    setEmployeeModal,
    viewingEmployeeDocs,
    setViewingEmployeeDocs,
    onboardingTasks,
    teamMembers,
    fileInputRefs,
  }
}
