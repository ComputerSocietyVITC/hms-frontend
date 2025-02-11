"use client";

import api from "@/api";
import DangerButton from "@/components/ui/DangerButton";
import FooterSection from "@/components/ui/FooterSection";
import { TeamMemberListItemModified } from "@/components/team/TeamMemberListItemModified";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
}

interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  authId: string;
  name: string;
  role: string;
  regNum: string;
  phone: string;
  college: string;
  github: string;
  imageId: string | null;
  isLeader: boolean;
  teamId: string | null;
  evaluations: Evaluation[];
}

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/user/all");
        setUsers(response.data);
      } catch (err) {
        setError(
          axios.isAxiosError(err) && err.response
            ? err.response.data?.message || "An unexpected error occurred."
            : "Failed to connect to the server."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUserDelete = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const getTeamName = async (teamId: string | null): Promise<string | null> => {
    if (!teamId) return null;
    try {
      const response = await api.get(`/team/${teamId}`);
      return response.data.name;
    } catch {
      return "Unknown Team";
    }
  };

  const [teamNames, setTeamNames] = useState<{ [key: string]: string | null }>(
    {}
  );

  useEffect(() => {
    const fetchTeamNames = async () => {
      const teamData: { [key: string]: string | null } = {};
      for (const user of users) {
        if (user.teamId && !teamData[user.teamId]) {
          teamData[user.teamId] = await getTeamName(user.teamId);
        }
      }
      setTeamNames(teamData);
    };

    fetchTeamNames();
  }, [users]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#09090b]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">All Users</h1>
        <Link href="/admincontrols">
          <DangerButton buttonText="Go Back" onClick={() => {}} />
        </Link>
      </header>
      <main className="flex-grow w-[95%] mx-auto py-8 bg-[#09090b]">
        <div className="flex flex-col">
          {users.map((user) => (
            <TeamMemberListItemModified
              key={user.id}
              githubId={user.github}
              name={user.name}
              teamName={teamNames[user.teamId || ""] || "No Team"}
              avatarSrc={
                (user.github && `${user.github}.png`) ||
                "https://github.com/example.png"
              }
              userId={user.id}
              onDelete={handleUserDelete}
            />
          ))}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Page;
