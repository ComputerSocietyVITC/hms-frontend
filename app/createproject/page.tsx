"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const CreateProjectPage: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
  }, [user]);

  const handleSubmit = () => {
    console.log({ name, description });
  };

  return (
    <div className="bg-[#09090b] w-full h-screen flex flex-col text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">Create a Project</h1>
        <Link href="/">
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
