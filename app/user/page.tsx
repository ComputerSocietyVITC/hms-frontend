/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import api from "@/api";
import DangerButton from "@/components/ui/DangerButton";
import FooterSection from "@/components/ui/FooterSection";
import UserCard from "@/components/user/UserCard";
import UserInformation from "@/components/user/UserInformation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const { user, loading, getUser } = useAuth();
  const [team, setTeam] = useState<string | null>(null);
  const router = useRouter();

  const getTeam = async () => {
    if (user?.teamId) {
      const response = await api.get(`/team/${user.teamId}`);
      setTeam(response.data.name);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getTeam();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212] text-white">
        User not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Your Profile</h1>
        <DangerButton buttonText="Go Back" onClick={() => router.push("/")} />
      </header>
      <div className="flex flex-grow flex-row w-[80%] mx-auto align-center justify-center mt-10">
        <UserCard
          id={user.id}
          createdAt={user.createdAt}
          name={user.name}
          college={user.college}
          github={user.github}
          isLeader={user.isLeader}
          teamName={team || ""}
          customStyle="w-[1/4]"
        />
        <div className="ml-8 my-auto">
          <UserInformation
            registrationNumber={user.regNum}
            teamName={team || "Not in a team"}
            collegeName={user.college}
            phoneNumber={user.phone}
            userId={user.id}
            githubId={user.github}
            customStyle="w-[3/4]"
          />
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Profile;
