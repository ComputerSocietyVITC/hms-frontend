"use client";

import DangerButton from "@/components/ui/DangerButton";
import FooterSection from "@/components/ui/FooterSection";
import React, { useEffect, useState } from "react";
import ProjectList from "@/components/project/ProjectList";
import api from "@/api";
import axios from "axios";
import { Project } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorizedError, setUnauthorizedError] = useState(false);

  const { user, getUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      const currentLocation = window.location.href;

      router.back();

      setTimeout(() => {
        if (window.location.href === currentLocation) {
          router.push("/");
        }
      }, 100);
    }
  };

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
              setUnauthorizedError(true);
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
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        error={error}
        type={unauthorizedError ? "unauthorized" : "generic"}
      />
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
        <DangerButton buttonText="Go Back" onClick={handleBack} />
      </header>
      <main className="flex-grow w-[95%] mx-auto py-8 bg-[#09090b]">
        <ProjectList
          projects={filteredProjects}
          evaluatorView={user?.role === "EVALUATOR"}
          onDelete={handleProjectDelete}
        />
      </main>
      <FooterSection />
    </div>
  );
};

export default Page;
