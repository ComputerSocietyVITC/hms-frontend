/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import api from "@/api";
import FooterSection from "@/components/ui/FooterSection";
import HeaderComponent from "@/components/ui/HeaderComponent";
import UserCard from "@/components/user/UserCard";
import UserInformation from "@/components/user/UserInformation";
import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const { user, loading, getUser } = useAuth();
  const [team, setTeam] = useState<string | null>(null);

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
      <HeaderComponent />
      <div className="flex flex-grow flex-row w-[80%] mx-auto align-center justify-center mt-10">
        <UserCard
          id={user.id}
          createdAt={user.createdAt}
          name={user.name}
          college={user.college}
          github={user.github || "https://github.com/example"}
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
