"use client";

import React, { useEffect } from "react";
import Button from "../ui/Button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface UserInformationProps {
  registrationNumber: string;
  teamName: string;
  collegeName: string;
  phoneNumber: string;
  userId: string;
  githubId: string | null;
  customStyle?: string;
  adminView?: boolean;
}

const UserInformation = ({
  registrationNumber,
  teamName,
  collegeName,
  phoneNumber,
  userId,
  githubId,
  customStyle,
  adminView,
}: UserInformationProps) => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  return (
    <div
      className={`w-full flex flex-col my-auto h-auto border border-gray-700 p-6 rounded-md bg-[#121212] text-white ${customStyle}`}
    >
      <div className="mb-4">
        {adminView || <h2 className="text-3xl font-black">Your Details</h2>}
        {adminView && <h2 className="text-3xl font-black">User Details</h2>}
        {adminView || (
          <p className="text-sm text-gray-400">
            Here&apos;s how you look to us 😎
          </p>
        )}
        {adminView && (
          <p className="text-sm text-gray-400">
            Below are the user&apos;s details
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <p className="font-bold">Registration Number</p>
          <p className="text-gray-400">{registrationNumber}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Team Name</p>
          <p className="text-gray-400">{teamName}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <p className="font-bold">College Name</p>
          <p className="text-gray-400">{collegeName}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">GitHub Profile</p>
          <p className="text-gray-400">{githubId || "GitHub ID not set"}</p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-bold">Phone Number</p>
        <p className="text-gray-400">{phoneNumber}</p>
      </div>
      {user?.id === userId && (
        <Link href="/editProfile">
          <Button
            buttonText="Edit Profile"
            customStyle="mt-6 bg-blue-600 hover:bg-blue-500 text-white w-full"
            onClick={() => {}}
          />
        </Link>
      )}
    </div>
  );
};

export default UserInformation;
