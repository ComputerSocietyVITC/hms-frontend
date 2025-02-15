"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import api from "@/api";
import axios from "axios";

const CreateProjectPage: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
      return;
    }

    if (!user.teamId) {
      router.push("/createTeam");
    } else if (!user.isLeader) {
      router.push("/team");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/project", {
        name,
        description,
        teamId: user?.teamId,
      });

      if (response.status === 201) {
        await getUser();

        router.push("/team");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          switch (err.response.status) {
            case 403:
              setError(
                "You do not have sufficient permissions to create a project."
              );
              break;
            case 409:
              setError("Your team has already created a project.");
              break;
            case 500:
              setError("Internal server error. Please try again later.");
              break;
            default:
              setError("An unexpected error occurred.");
          }
        }
      }
    }
  };

  return (
    <div className="bg-[#09090b] w-full h-screen flex flex-col text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">Create a Project</h1>
        <Link href="/team">
          <DangerButton buttonText="Cancel" onClick={() => {}} />
        </Link>
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-[#121212] p-6 rounded-lg w-96 border border-gray-700 shadow-lg">
          <div className="mb-4">
            <h2 className="text-3xl font-black">Create a Project</h2>
            <p className="text-sm text-gray-400">
              Enter the project details to create a new project
            </p>
          </div>

          <InputField
            label="Project Name"
            type="text"
            placeholder="Enter Project Name"
            onTextChange={(value) => setName(value)}
            text={name}
          />

          <InputField
            label="Description"
            type="text"
            placeholder="Enter Project Description"
            onTextChange={(value) => setDescription(value)}
            text={description}
            customStyle="mt-4"
          />

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <Button
            buttonText="Create Project"
            onClick={handleSubmit}
            customStyle="w-full mt-4"
          />
        </div>
      </main>
    </div>
  );
};

export default CreateProjectPage;
