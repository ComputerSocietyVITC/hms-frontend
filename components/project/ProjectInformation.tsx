"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface ProjectInformationProps {
  description: string;
  teamName: string;
  repoUrl?: string;
  demoUrl?: string;
  reportUrl?: string;
  adminView?: boolean;
  customStyle?: string;
}

const ProjectInformation = ({
  description,
  teamName,
  repoUrl,
  demoUrl,
  reportUrl,
  adminView = false,
  customStyle,
}: ProjectInformationProps) => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  return (
    <div
      className={cn(
        `w-full flex flex-col my-auto h-auto border border-gray-700 p-6 rounded-md bg-[#121212] text-white`,
        customStyle
      )}
    >
      <div className="mb-4">
        {adminView || <h2 className="text-3xl font-black">Your Project</h2>}
        {adminView && <h2 className="text-3xl font-black">Team Project</h2>}
        {adminView || (
          <p className="text-sm text-gray-400">
            Here&apos;s how your project saves the world 🌍
          </p>
        )}
        {adminView && (
          <p className="text-sm text-gray-400">Below are the project details</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <p className="font-bold">Team Name</p>
          <p className="text-gray-400">{teamName}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <p className="font-bold">Description</p>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <p className="font-bold">Repository URL</p>
          <p className="text-gray-400">{repoUrl || "No repository URL yet"}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <p className="font-bold">Demo URL</p>
          <p className="text-gray-400">{demoUrl || "No demo URL yet"}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Report URL</p>
          <p className="text-gray-400">{reportUrl || "No report URL yet"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
