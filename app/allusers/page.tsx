"use client";

import api from "@/api";
import DangerButton from "@/components/ui/DangerButton";
import FooterSection from "@/components/ui/FooterSection";
import { TeamMemberListItemModified } from "@/components/team/TeamMemberListItemModified";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { getImageUrl } from "@/lib/utils";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [teamNames, setTeamNames] = useState<{ [key: string]: string | null }>(
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/user/all");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            switch (err.response.status) {
              case 403:
                setError(
                  "You do not have sufficient permissions to view users."
                );
                break;
              case 500:
                setError("Internal server error. Please try again later.");
                break;
              default:
                setError("An unexpected error occurred.");
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTeamNames = async () => {
      const teamData: { [key: string]: string | null } = {};
      for (const user of users) {
        if (user.teamId && !teamData[user.teamId]) {
          try {
            const response = await api.get(`/team/${user.teamId}`);
            teamData[user.teamId] = response.data.name;
          } catch {
            teamData[user.teamId] = "Unknown Team";
          }
        }
      }
      setTeamNames(teamData);
    };

    fetchTeamNames();
  }, [users]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        [user.name, user.github]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const handleUserDelete = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error type="unauthorized" error={error} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">All Users</h1>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-gray-500"
        />
        <Link href="/admincontrols">
          <DangerButton buttonText="Go Back" onClick={() => {}} />
        </Link>
      </header>
      <main className="flex-grow w-[95%] mx-auto py-8 bg-[#09090b]">
        <div className="flex flex-col">
          {filteredUsers.map((filteredUser) => (
            <TeamMemberListItemModified
              key={filteredUser.id}
              githubId={filteredUser.github}
              name={filteredUser.name}
              teamName={teamNames[filteredUser.teamId || ""] || "No Team"}
              avatarSrc={
                getImageUrl(filteredUser.imageId, filteredUser.mimeType) ||
                (filteredUser.github ? `${filteredUser.github}.png` : "")
              }
              userId={filteredUser.id}
              currentUserId={user?.id}
              userRole={filteredUser.role}
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
