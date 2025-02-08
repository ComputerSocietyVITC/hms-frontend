/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import DangerButton from "@/components/DangerButton";
import { useRouter } from "next/navigation";
import api from "@/api";
import { useAuth } from "@/context/AuthContext";

const JoinTeamPage: React.FC = () => {
  const [name, setName] = useState("");
  const [imageId, setImageID] = useState("");
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.teamId) {
        router.push("/");
      }
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const response = await api.put("/team", { name: name, imageId: imageId });

      if (response.status === 200) {
        console.log(response.data);
        router.push("/");
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#F3F4F6] w-full h-screen flex flex-col">
      <header className="w-full bg-white flex items-center justify-between px-6 py-3">
        <h1 className="text-lg font-medium">Join a Team</h1>
        <DangerButton buttonText="Cancel" onClick={() => router.push("/")} />
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-white p-4 rounded-lg w-96 border border-[#D9D9D9]">
          <InputField
            label="Team ID"
            type="text"
            placeholder="Enter Team ID"
            onTextChange={(value) => setName(value)}
            text={name}
          />

          <InputField
            label="Image ID"
            type="text"
            placeholder="Enter Image ID"
            onTextChange={(value) => setImageID(value)}
            text={imageId}
          />

          <Button
            buttonText="Create Team"
            onClick={handleSubmit}
            customStyle="w-full mt-4"
          />
        </div>
      </main>
    </div>
  );
};

export default JoinTeamPage;
