"use client";

import api from "@/api";
import DangerButton from "@/components/ui/DangerButton";
import FooterSection from "@/components/ui/FooterSection";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/project/all");
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (err) {
        setError(
          axios.isAxiosError(err) && err.response
            ? err.response.data?.message || "An unexpected error occurred."
            : "Failed to connect to the server."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
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
        <div className="flex flex-col gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-gray-800 rounded-lg shadow-md text-white flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p className="text-sm text-gray-400">Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
                <p className="text-sm">
                  Status: {project.evaluations.length > 0 ? "Evaluated" : "Not Evaluated"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-600 rounded"
                  onClick={() => console.log(`Viewing project with ID: ${project.id}`)}
                >
                  View Project
                </button>
                <button
                  className="px-3 py-1 bg-yellow-600 rounded"
                  onClick={() => console.log(`Evaluating project with ID: ${project.id}`)}
                >
                  Evaluate Project
                </button>
                <button
                  className="px-3 py-1 bg-red-600 rounded"
                  onClick={() => handleProjectDelete(project.id)}
                >
                  Delete Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Page;