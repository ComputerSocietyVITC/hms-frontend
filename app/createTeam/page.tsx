/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/DangerButton";
import { useRouter } from "next/navigation";
import api from "@/api";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const CreateTeamPage: React.FC = () => {
  const [name, setName] = useState("");
  const [imageId, setImageID] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.teamId) {
        router.push("/teampage");
      }
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const response = await api.put("/team", { name: name, imageId: imageId });

      if (response.status === 201) {
        router.push("/teampage");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 403) {
            setError("You do not have permission to create a team.");
          } else if (err.response.status === 404) {
            setError("User not found.");
          } else if (err.response.status === 500) {
            setError("Internal Server Error. Please try again later.");
          } else {
            setError("An error occurred. Please try again later.");
          }
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="bg-[#F3F4F6] w-full h-screen flex flex-col">
      <header className="w-full bg-white flex items-center justify-between px-6 py-3">
        <h1 className="text-lg font-bold">Create a Team</h1>
        <DangerButton buttonText="Cancel" onClick={() => router.push("/")} />
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-white p-4 rounded-lg w-96 border border-[#D9D9D9]">
          <InputField
            label="Team Name"
            type="text"
            placeholder="Enter a Team Name"
            onTextChange={(value) => setName(value)}
            text={name}
          />

          <InputField
            label="Image ID"
            type="text"
            placeholder="Enter Image ID"
            onTextChange={(value) => setImageID(value)}
            text={imageId}
            customStyle="mt-4"
          />

          {error && (
            <div className="mt-3 text-sm text-red-600 text-center">{error}</div>
          )}

          <Button
            buttonText="Create Team"
            onClick={handleSubmit}
            customStyle="w-full mt-4"
          />

          <p className="mt-4 text-center block">
            Want to join a team?{" "}
            <a
              onClick={() => (window.location.href = "/joinTeam")}
              className="font-bold cursor-pointer hover:underline"
            >
              Join a Team
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default CreateTeamPage;
