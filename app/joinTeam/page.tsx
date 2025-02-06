"use client";

import React, { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import DangerButton from "@/components/DangerButton";
import { useRouter } from "next/navigation";
import api from "@/api";
import { useAuth } from "@/context/AuthContext";

const JoinTeamPage: React.FC = () => {
  const [teamID, setTeamID] = useState("");
  const router = useRouter();

  const { user, loading, getUser } = useAuth();

  const joinTeam = async () => {
    const response = await api.post(`/team/${teamID}/join`);

    if (response.status === 201) {
      router.push("/teampage");
    }
  };

  const handleSubmit = () => {
    joinTeam();
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
            onTextChange={(value) => setTeamID(value)}
          />

          <Button
            buttonText="Join Team"
            onClick={handleSubmit}
            customStyle="w-full mt-4"
          />
        </div>
      </main>
    </div>
  );
};

export default JoinTeamPage;
