"use client";

import DangerButton from "@/components/ui/DangerButton";
import FooterSection from "@/components/ui/FooterSection";
import React, { useEffect, useState } from "react";
import ProjectList from "@/components/team/ProjectList";
import Link from "next/link";

interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
}

interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageId: string;
  teamId: string;
  evaluations: Evaluation[];
}

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const projectsList: Project[] = [
      {
        id: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: "AI Diagnosis System",
        description: "A tool for automated medical diagnosis.",
        imageId: "img1",
        teamId: "team1",
        evaluations: [
          {
            id: "eval1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            projectId: "1",
            score: 85,
          },
        ],
      },
      {
        id: "2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: "Smart Traffic Control",
        description: "An AI-powered traffic light optimization system.",
        imageId: "img2",
        teamId: "team2",
        evaluations: [],
      },
      {
        id: "3",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: "Blockchain Voting System",
        description: "A secure and transparent e-voting solution.",
        imageId: "img3",
        teamId: "team3",
        evaluations: [
          {
            id: "eval2",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            projectId: "3",
            score: 92,
          },
        ],
      },
    ];

    setProjects(projectsList);
    setFilteredProjects(projectsList);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, projects]);

  const handleProjectDelete = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#09090b]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">All Projects</h1>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-gray-500"
        />
        <Link href="/admincontrols">
          <DangerButton buttonText="Go Back" onClick={() => {}} />
        </Link>
      </header>
      <main className="flex-grow w-[95%] mx-auto py-8 bg-[#09090b]">
        <ProjectList projects={filteredProjects} onDelete={handleProjectDelete} />
      </main>
      <FooterSection />
    </div>
  );
};

export default Page;
