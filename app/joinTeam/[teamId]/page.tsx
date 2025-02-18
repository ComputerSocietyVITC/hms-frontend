"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import { useRouter, useParams } from "next/navigation";
import api from "@/api";
import axios from "axios";
import Link from "next/link";
import DialogBox from "@/components/ui/DialogBox";
import { useAuth } from "@/context/AuthContext";

const JoinTeamPage: React.FC = () => {
  const params = useParams();
  const teamId = Array.isArray(params.teamId)
    ? params.teamId[0]
    : params.teamId;

  const [teamID, setTeamID] = useState(teamId || "");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (teamId) {
      setTeamID(teamId);
    }
  }, [teamId]);

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
      setIsJoinDialogOpen(false);
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
          setError(getErrorMessage(err.response.status));
        } else {
          setError("Unable to connect to the server.");
        }
      }
    } finally {
      setIsLoading(false);
      setIsJoinDialogOpen(false);
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
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-black">Join Team</h2>
            <p className="text-sm text-gray-400">
              Press join team to join the team with the invite link
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-400 text-center">{error}</div>
          )}

          <Button
            buttonText={isLoading ? "Joining..." : "Join Team"}
            onClick={() => setIsJoinDialogOpen(true)}
            customStyle="w-full"
            disabled={isLoading}
          />
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
