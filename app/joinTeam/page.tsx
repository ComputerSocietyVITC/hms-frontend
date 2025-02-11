"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import { useRouter } from "next/navigation";
import api from "@/api";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import DialogBox from "@/components/ui/DialogBox";

const JoinTeamPage: React.FC = () => {
  const [teamID, setTeamID] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const router = useRouter();

  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }

    if (user?.teamId) {
      router.push("/team");
    }
  }, [user]);

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
        await getUser();

        router.push("/team");
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

  return (
    <div className="bg-[#09090b] w-full h-screen flex flex-col text-white">
      <header className="flex justify-between items-center w-full bg-[#121212] text-white py-3 px-6 border-b border-gray-700">
        <h1 className="text-lg font-bold">Join a Team</h1>
        <Link href="/">
          <DangerButton buttonText="Cancel" onClick={() => {}} />
        </Link>
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-[#121212] p-6 rounded-lg w-96 border border-gray-700 shadow-lg">
          <div className="mb-4">
            <h2 className="text-3xl font-black">Join a Team</h2>
            <p className="text-sm text-gray-400">
              Enter a Team ID to join a team
            </p>
          </div>

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
            onClick={() => setIsJoinDialogOpen(true)}
            customStyle="w-full mt-4"
            disabled={isLoading}
          />

          {error && (
            <div className="mt-3 text-sm text-red-400 text-center">{error}</div>
          )}

          <p className="mt-4 text-center block">
            Want to create a team?{" "}
            <Link
              href="/createTeam"
              className="font-bold cursor-pointer hover:underline text-blue-400"
            >
              Create a Team
            </Link>
          </p>
        </div>
      </main>

      <DialogBox
        isOpen={isJoinDialogOpen}
        title="Confirm Join"
        message="Are you sure you want to join the team?"
        positive={true}
        onConfirm={joinTeam}
        onCancel={() => setIsJoinDialogOpen(false)}
      />
    </div>
  );
};

export default JoinTeamPage;
