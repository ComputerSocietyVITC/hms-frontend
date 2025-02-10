"use client";

import React from "react";
import Button from "../ui/Button";

interface ProjectInformationProps {
  projectName: string;
  projectDescription: string;
  createdOn: Date;
  currentScore: number;
  projectId: string;
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const ProjectInformation = ({
  projectName,
  projectDescription,
  createdOn,
  currentScore,
  projectId,
}: ProjectInformationProps) => {
  return (
    <div className="rounded-lg border border-gray-700 bg-[#121212] text-white p-6 w-full">
      <h1 className="text-2xl font-extrabold pb-4 border-b border-gray-600">
        Project Information
      </h1>

      <div className="mt-4 space-y-3">
        <div>
          <span className="block text-sm text-gray-400">Project Name</span>
          <span className="text-lg font-semibold">{projectName}</span>
        </div>
        <div>
          <span className="block text-sm text-gray-400">
            Project Description
          </span>
          <p className="text-base">{projectDescription}</p>
        </div>
        <div>
          <span className="block text-sm text-gray-400">Created On</span>
          <span className="text-base">
            {createdOn.toLocaleDateString("en-US", options)}
          </span>
        </div>
        <div>
          <span className="block text-sm text-gray-400">
            Current Evaluation Score
          </span>
          <span className="text-lg font-semibold">{currentScore} / 10</span>
        </div>
      </div>

      <Button
        buttonText="Edit Project Details"
        customStyle="mt-6 w-full bg-blue-600 hover:bg-blue-500"
        onClick={() => console.log("Editing project with ID: ", projectId)}
      />
    </div>
  );
};

export default ProjectInformation;
