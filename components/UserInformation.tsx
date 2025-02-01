"use client";

import React from "react";
import Button from "./Button";

interface UserInformationProps {
  registrationNumber: string;
  teamName: string;
  collegeName: string;
  phoneNumber: string;
  userId: string;
  customStyle?: string;
}

const UserInformation = ({
  registrationNumber,
  teamName,
  collegeName,
  phoneNumber,
  userId,
  customStyle,
}: UserInformationProps) => {
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
      <div className="flex flex-col justify-between w-full mt-4">
        <p className="font-bold">College Name</p>
        <p>{collegeName}</p>
      </div>
      <div className="flex flex-col justify-between w-full mt-4">
        <p className="font-bold">Phone Number</p>
        <p>{phoneNumber}</p>
      </div>
      <Button
        onClick={() => alert(`Promoted user with ID: ${userId}`)}
        buttonText="Promote"
        customBackgroundColor="#14AE5C"
        customBorderColor="#02542D"
        customTextColor="#FFFFFF"
        customStyle="mt-6 w-fit"
      />
    </div>
  );
};

export default UserInformation;
