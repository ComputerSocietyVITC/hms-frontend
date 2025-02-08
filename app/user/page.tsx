/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import api from "@/api";
import FooterSection from "@/components/FooterSection";
import HeaderComponent from "@/components/HeaderComponent";
import UserCard from "@/components/UserCard";
import UserInformation from "@/components/UserInformation";
import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const { user, loading, getUser } = useAuth();
  const [team, setTeam] = useState<string | null>(null);

  const getTeam = async () => {
    if (user && user.teamId) {
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
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        User not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
      <HeaderComponent />
      <div className="flex flex-grow px-24 flex-row w-full">
        <UserCard
          id={user.id}
          createdAt={user.createdAt}
          name={user.name}
          college={user.college}
          github={user.github || "https://github.com/notfound"}
          isLeader={user.isLeader}
          customStyle="w-[35%]"
        />
        <UserInformation
          registrationNumber={user.regNum}
          teamName={team || "Not in a team"}
          collegeName={user.college}
          phoneNumber={user.phone}
          userId={user.id}
          customStyle="w-[75%] ml-8"
        />
      </div>
      <FooterSection />
    </div>
  );
};

export default Profile;
