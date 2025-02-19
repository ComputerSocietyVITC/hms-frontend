"use client";

import DangerButton from "@/components/ui/DangerButton";
import FooterSection from "@/components/ui/FooterSection";
import React, { useEffect, useState } from "react";
import ProjectList from "@/components/team/ProjectList";
import Link from "next/link";
import api from "@/api";
import axios from "axios";

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
  const [error, setError] = useState<string | null>(null);

  const getAllProjects = async () => {
    try {
      const response = await api.get("/project/all");

      if (response.status === 200) {
        setProjects(response.data);
        setFilteredProjects(response.data);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          switch (err.response.status) {
            case 403:
              setError(
                "You do not have sufficient permissions to view projects."
              );
              break;
            case 500:
              setError("Internal server error. Please try again later.");
              break;
            default:
              setError("An unexpected error occurred.");
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
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
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
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
        <ProjectList
          projects={filteredProjects}
          onDelete={handleProjectDelete}
        />
      </main>
      <FooterSection />
    </div>
  );
};

export default Page;
