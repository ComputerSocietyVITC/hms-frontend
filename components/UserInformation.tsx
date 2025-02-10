"use client";

import React, { useEffect } from "react";
import Button from "./ui/Button";
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
      className={`w-full flex flex-col my-auto h-auto border border-[#D9D9D9] p-8 rounded-md bg-white justify-center ${customStyle}`}
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-between w-full">
          <p className="font-bold">Registration Number</p>
          <p>{registrationNumber}</p>
        </div>
        <div className="flex flex-col justify-between w-full">
          <p className="font-bold">Team Name</p>
          <p>{teamName}</p>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-between w-full mt-4">
          <p className="font-bold">College Name</p>
          <p>{collegeName}</p>
        </div>
        <div className="flex flex-col justify-between w-full mt-4">
          <p className="font-bold">GitHub Profile URL</p>
          <p>{githubId || "GitHub ID not set"}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full mt-4">
        <p className="font-bold">Phone Number</p>
        <p>{phoneNumber}</p>
      </div>
      {user?.id === userId && (
        <Button
          buttonText="Edit Profile"
          customStyle="mt-6"
          onClick={() => router.push("/editProfile")}
        />
      )}
    </div>
  );
};

export default UserInformation;
