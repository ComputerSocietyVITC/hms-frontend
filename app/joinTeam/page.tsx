"use client";

import React, { useState } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/DangerButton";
import { useRouter } from "next/navigation";
import api from "@/api";
import axios from "axios";

const JoinTeamPage: React.FC = () => {
  const [teamID, setTeamID] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getErrorMessage = (status: number): string => {
    switch (status) {
      case 403:
        return "You don't have permission to join this team.";
      case 404:
        return "Team not found. Please check the Team ID and try again.";
      case 409:
        return "You are already a member of a team.";
      case 500:
        return "An unexpected error occurred. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const joinTeam = async () => {
    if (!teamID.trim()) {
      setError("Please enter a Team ID");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await api.post(`/team/${teamID}/join`);

      if (response.status === 201) {
        router.push("/teampage");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;
          setError(getErrorMessage(status));
        } else {
          setError("Unable to connect to the server.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    joinTeam();
  };

  return (
    <div className="bg-[#F3F4F6] w-full h-screen flex flex-col">
      <header className="w-full bg-white flex items-center justify-between px-6 py-3">
        <h1 className="text-lg font-bold">Join a Team</h1>
        <DangerButton buttonText="Cancel" onClick={() => router.push("/")} />
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-white p-4 rounded-lg w-96 border border-[#D9D9D9]">
          <InputField
            label="Team ID"
            type="text"
            placeholder="Enter Team ID"
            onTextChange={(value) => {
              setTeamID(value);
              setError(null);
            }}
            text={teamID}
          />

          <Button
            buttonText={isLoading ? "Joining..." : "Join Team"}
            onClick={handleSubmit}
            customStyle="w-full mt-4"
            disabled={isLoading}
          />

          {error && (
            <div className="mt-3 text-sm text-red-600 text-center">{error}</div>
          )}

          <p className="mt-4 text-center block">
            Want to create a team?{" "}
            <a
              onClick={() => (window.location.href = "/createTeam")}
              className="font-bold cursor-pointer hover:underline"
            >
              Create a Team
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default JoinTeamPage;
