"use client";

import React, { useEffect } from "react";
import Button from "../ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface UserInformationProps {
  registrationNumber: string;
  teamName: string;
  collegeName: string;
  phoneNumber: string;
  userId: string;
  githubId: string | null;
  customStyle?: string;
}

const UserInformation = ({
  registrationNumber,
  teamName,
  collegeName,
  phoneNumber,
  userId,
  githubId,
  customStyle,
}: UserInformationProps) => {
  const { user, getUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  return (
    <div
      className={`w-full flex flex-col my-auto h-auto border border-gray-700 p-6 rounded-md bg-[#121212] text-white ${customStyle}`}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <p className="font-bold text-gray-300">Registration Number</p>
          <p>{registrationNumber}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-gray-300">Team Name</p>
          <p>{teamName}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <p className="font-bold text-gray-300">College Name</p>
          <p>{collegeName}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-gray-300">GitHub Profile</p>
          <p>{githubId || "GitHub ID not set"}</p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-bold text-gray-300">Phone Number</p>
        <p>{phoneNumber}</p>
      </div>
      {user?.id === userId && (
        <Button
          buttonText="Edit Profile"
          customStyle="mt-6 bg-blue-600 hover:bg-blue-500 text-white"
          onClick={() => router.push("/editProfile")}
        />
      )}
    </div>
  );
};

export default UserInformation;
