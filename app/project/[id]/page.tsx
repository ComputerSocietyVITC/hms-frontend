/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import api from "@/api";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectInformation from "@/components/project/ProjectInformation";
import Button from "@/components/ui/Button";
import FooterSection from "@/components/ui/FooterSection";
import HeaderComponent from "@/components/ui/HeaderComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, use } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
}

interface Team {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  imageId: string;
}

interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageId: string;
  teamId: string;
  team: Team;
  evaluations: Evaluation[];
}

interface Params {
  params: Promise<{
    id: string;
  }>;
}

const Profile = ({ params }: Params) => {
  const { user, loading, getUser } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const id = use(params).id;
  const getProject = async () => {
    if (id) {
      try {
        const response = await api.get(`/project/${id}`);
        if (response.status === 200) {
          setProject(response.data);
        }

        if (!response.data) {
          router.push("/");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          switch (err.response.status) {
            case 400:
              setError("Bad Request. Please try again later.");
              break;
            case 403:
              setError("Forbidden. User does not have sufficient permissions.");
              break;
            case 404:
              setError("Project not found.");
              break;
            case 500:
              setError("Unexpected Server Error.");
              break;
            default:
              setError("An unexpected error occurred. Please try again later.");
          }
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getProject();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-red-400">
        <div className="bg-red-800 text-white px-4 py-3 rounded border border-red-500">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
      <HeaderComponent />
      <div className="flex flex-grow flex-row w-[80%] mx-auto align-center justify-center mt-10">
        <ProjectCard
          createdAt={
            project?.createdAt
              ? formatDate(project.createdAt)
              : formatDate(new Date().toISOString())
          }
          updatedAt={
            project?.updatedAt
              ? formatDate(project.updatedAt)
              : formatDate(new Date().toISOString())
          }
          name={project?.name || ""}
          imageId={project?.imageId || ""}
          evaluations={project?.evaluations || []}
          teamName={project?.team?.name || ""}
          customStyle="w-[1/4]"
        />
        <div className="ml-8 my-auto">
          <ProjectInformation
            teamName={project?.team?.name || "Not in a team"}
            description={project?.description || "No description"}
            customStyle="w-[3/4]"
          />
          {user?.isLeader && (
            <Link href="/updateProject">
              <Button
                buttonText="Update Project"
                customStyle="mt-6 bg-blue-600 hover:bg-blue-500 text-white w-full"
                onClick={() => {}}
              />
            </Link>
          )}
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Profile;
