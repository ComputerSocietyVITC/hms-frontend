"use client";

import React from "react";
import Button from "./Button";

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
    <div className="rounded-md border border-[#D9D9D9] bg-[#FFFFFF] p-4 max-w-[25vw]">
      <span className="text-xl font-bold block">Project Information</span>
      <span className="block mt-6 font-bold">Project Name</span>
      <span className="block">{projectName}</span>
      <span className="block mt-2 font-bold">Project Description</span>
      <span className="block">{projectDescription}</span>
      <span className="block mt-2 font-bold">Created On</span>
      <span className="block">
        {createdOn.toLocaleDateString("en-US", options)}
      </span>
      <span className="block mt-2 font-bold">Current Evaluation Score</span>
      <span className="block">{currentScore} / 10</span>

      <Button
        buttonText="Edit Project Details"
        customBorderColor="#767676"
        customBackgroundColor="#E3E3E3"
        customTextColor="#000000"
        customStyle="mt-6"
        onClick={() => console.log("Editing project with ID: ", projectId)}
      />
    </div>
  );
};

export default ProjectInformation;
