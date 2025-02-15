/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import api from "@/api";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectInformation from "@/components/project/ProjectInformation";
import Button from "@/components/ui/Button";
import FooterSection from "@/components/ui/FooterSection";
import HeaderComponent from "@/components/ui/HeaderComponent";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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

const Profile = () => {
  const { user, loading, getUser } = useAuth();
  const [team, setTeam] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();

  const getProject = async () => {
    if (user?.teamId) {
      const response = await api.get(`/team/${user.teamId}`);

      if (response.data) {
        setTeam(response.data.name);
      }

      if (!response.data.project) {
        router.push("/");
      }

      setProject(response.data.project);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getProject();
  }, [user]);

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
          teamName={team || ""}
          customStyle="w-[1/4]"
        />
        <div className="ml-8 my-auto">
          <ProjectInformation
            teamName={team || "Not in a team"}
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
