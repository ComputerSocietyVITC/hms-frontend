/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import FooterSection from "@/components/FooterSection";
import HeaderComponent from "@/components/HeaderComponent";
import UserCard from "@/components/UserCard";
import UserInformation from "@/components/UserInformation";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";

const Profile = () => {
  const { user, loading, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    console.log(user);
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
          customStyle="w-[25%]"
        />
        <UserInformation
          registrationNumber={user.regNum}
          teamName={user.teamId || "Not in a team"}
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
