/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import api from "@/api";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectInformation from "@/components/project/ProjectInformation";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import FooterSection from "@/components/ui/FooterSection";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Project } from "@/types";
import Loading from "@/components/ui/Loading";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Your Project</h1>
        <DangerButton buttonText="Go Back" onClick={handleBack} />
      </header>
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
          mimeType={project?.mimeType || ""}
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
