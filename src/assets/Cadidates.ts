// src/data/candidates.ts

import type { ReactNode } from "react";

export type Candidate = {
    role: ReactNode;
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    status: "Applied" | "Interviewing" | "Hired" | "Rejected";
    experience: string;
    skills: string[];
  };
  
  export const candidates: Candidate[] = [
    {
        id: "1",
        name: "Alice Johnson",
        position: "Frontend Developer",
        email: "alice@example.com",
        phone: "123-456-7890",
        status: "Applied",
        experience: "2 years",
        skills: ["React", "TypeScript", "TailwindCSS"],
        role: undefined
    },
    {
        id: "2",
        name: "Bob Smith",
        position: "Backend Developer",
        email: "bob@example.com",
        phone: "987-654-3210",
        status: "Interviewing",
        experience: "4 years",
        skills: ["Node.js", "Express", "MongoDB"],
        role: undefined
    },
    {
        id: "3",
        name: "Clara Lee",
        position: "UI/UX Designer",
        email: "clara@example.com",
        phone: "456-789-1230",
        status: "Hired",
        experience: "3 years",
        skills: ["Figma", "Adobe XD", "Sketch"],
        role: undefined
    },
  ];
  