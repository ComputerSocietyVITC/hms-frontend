"use client";

import React from "react";
import DangerButton from "./DangerButton";

interface TeamInformationProps {
  teamName: string;
  createdOn: Date;
  teamLeader: string;
  teamId: string;
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const TeamInformation = ({
  teamName,
  createdOn,
  teamLeader,
  teamId,
}: TeamInformationProps) => {
  return (
    <div className="rounded-md border border-[#D9D9D9] bg-[#FFFFFF] p-4">
      <span className="text-xl font-bold block">Team Information</span>
      <span className="block mt-6 font-bold">Team Name</span>
      <span className="block">{teamName}</span>
      <span className="block mt-2 font-bold">Created On</span>
      <span className="block">
        {createdOn.toLocaleDateString("en-US", options)}
      </span>
      <span className="block mt-2 font-bold">Team Leader</span>
      <span className="block">{teamLeader}</span>

      <div className="grid grid-cols-2 gap-2 mt-16">
        <DangerButton
          buttonText="Leave Team"
          onClick={() => console.log("Left team with ID: " + teamId)}
          primary={false}
        />
        <DangerButton
          buttonText="Delete Team"
          onClick={() => console.log("Deleted team with ID: " + teamId)}
        />
      </div>
    </div>
  );
};

export default TeamInformation;
