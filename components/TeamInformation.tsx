"use client";

import React, { useState } from "react";
import DangerButton from "./DangerButton";
import api from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  const { user } = useAuth();
  const [error, setError] = useState("");

  const router = useRouter();

  const leaveTeam = async () => {
    try {
      const response = await api.delete(`/team/leave`);

      if (response.status === 201) {
        router.push("/joinTeam");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 403) {
            setError(
              "You do not have sufficient permissions to perform this action."
            );
          } else if (error.response.status === 409) {
            setError("You are not the member of any team.");
          } else if (error.response.status === 500) {
            setError("Internal Server Error");
          } else {
            setError("An unexpected error occured. Please try again later.");
          }
        } else {
          setError("Please check your network connection and try again.");
        }
      }
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center w-screen h-screen font-bold text-2xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-md border border-[#D9D9D9] bg-[#FFFFFF] p-4 w-full">
      <span className="text-xl font-bold block">Team Information</span>
      <span className="block mt-6 font-bold">Team Name</span>
      <span className="block">{teamName}</span>
      <span className="block mt-2 font-bold">Created On</span>
      <span className="block">
        {createdOn.toLocaleDateString("en-US", options)}
      </span>
      <span className="block mt-2 font-bold">Team Leader</span>
      <span className="block">{teamLeader}</span>

      {user?.teamId === teamId && (
        <div className="mt-10 mx-auto">
          <DangerButton
            buttonText="Leave Team"
            onClick={leaveTeam}
            primary={false}
          />
        </div>
      )}
    </div>
  );
};

export default TeamInformation;
