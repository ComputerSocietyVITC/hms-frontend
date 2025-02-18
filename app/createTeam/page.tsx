/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import { useRouter } from "next/navigation";
import api from "@/api";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";

const CreateTeamPage: React.FC = () => {
  const [name, setName] = useState("");
  const [imageId, setImageID] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.teamId) {
      router.push("/team");
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const response = await api.put("/team", { name: name, imageId: imageId });

      if (response.status === 201) {
        router.push("/team");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;
          setError(
            status === 403
              ? "You do not have permission to create a team."
              : status === 404
                ? "User not found."
                : status === 500
                  ? "Internal Server Error. Please try again later."
                  : "An error occurred. Please try again later."
          );
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="bg-[#09090b] w-full h-screen flex flex-col text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">Create a Team</h1>
        <DangerButton buttonText="Cancel" onClick={() => router.push("/")} />
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-[#121212] p-6 rounded-lg w-96 border border-gray-700 shadow-lg">
          <div className="mb-4">
            <h2 className="text-3xl font-black">Create a Team</h2>
            <p className="text-sm text-gray-400">
              Enter the team details to create a team
            </p>
          </div>

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
            <div className="mt-3 text-sm text-red-400 text-center">{error}</div>
          )}

          <Button
            buttonText="Create Team"
            onClick={handleSubmit}
            customStyle="w-full mt-4"
          />

          <p className="mt-4 text-center block">
            Want to join a team?{" "}
            <Link
              href="/joinTeam"
              className="font-bold cursor-pointer hover:underline text-blue-400"
            >
              Join a Team
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default CreateTeamPage;
