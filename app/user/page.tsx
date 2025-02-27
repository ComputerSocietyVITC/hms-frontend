/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import api from "@/api";
import DangerButton from "@/components/ui/DangerButton";
import Error from "@/components/ui/Error";
import FooterSection from "@/components/ui/FooterSection";
import Loading from "@/components/ui/Loading";
import UserCard from "@/components/user/UserCard";
import UserInformation from "@/components/user/UserInformation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const { user, loading, getUser } = useAuth();
  const [team, setTeam] = useState<string | null>(null);
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined") {
      const currentLocation = window.location.href;

      router.back();

      setTimeout(() => {
        if (window.location.href === currentLocation) {
          router.push("/");
        }
      }, 100);
    }
  };

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
    return <Loading />;
  }

  if (!user) {
    return (
      <Error error="You are not logged in. Please log in to view your profile." />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Your Profile</h1>
        <DangerButton buttonText="Go Back" onClick={handleBack} />
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
          imageId={user.imageId}
          mimeType={user.mimeType}
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
