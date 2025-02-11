"use client";

import React, { useState } from "react";
import DangerButton from "../ui/DangerButton";
import api from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import DialogBox from "../ui/DialogBox";

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
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  const { getUser } = useAuth();
  const router = useRouter();

  const leaveTeam = async () => {
    try {
      const response = await api.delete(`/team/leave`);

      if (response.status === 201) {
        await getUser();

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
            setError("An unexpected error occurred. Please try again later.");
          }
        } else {
          setError("Please check your network connection and try again.");
        }
      }
    }
  };

  return (
    <div className="relative rounded-lg border border-gray-700 bg-[#121212] text-white p-6 w-full min-h-[40vh]">
      <h1 className="text-2xl font-extrabold pb-4 border-b border-gray-600">
        Team Information
      </h1>

      {error && (
        <div className="bg-red-600 text-white p-3 rounded-md mt-4 text-center">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mt-4 space-y-3">
        <div>
          <span className="block text-sm text-gray-400">Team Name</span>
          <span className="text-lg font-semibold">{teamName}</span>
        </div>
        <div>
          <span className="block text-sm text-gray-400">Created On</span>
          <span className="text-base">
            {createdOn.toLocaleDateString("en-US", options)}
          </span>
        </div>
        <div>
          <span className="block text-sm text-gray-400">Team Leader</span>
          <span className="text-lg font-semibold">{teamLeader}</span>
        </div>
      </div>

      {user?.teamId === teamId && (
        <div className="absolute bottom-6 mt-6">
          <DangerButton
            buttonText="Leave Team"
            onClick={() => setIsLeaveDialogOpen(true)}
            primary={false}
          />
        </div>
      )}

      <DialogBox
        isOpen={isLeaveDialogOpen}
        title="Confirm Leave"
        message={`Are you sure you want to leave the team ${teamName}?`}
        positive={false}
        onConfirm={leaveTeam}
        onCancel={() => setIsLeaveDialogOpen(false)}
      />
    </div>
  );
};

export default TeamInformation;
