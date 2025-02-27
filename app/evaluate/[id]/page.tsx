"use client";

import React, { use, useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import api from "@/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import DialogBox from "@/components/ui/DialogBox";
import { useAuth } from "@/context/AuthContext";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

const EvaluateProjectPage = ({ params }: Params) => {
  const [projectId, setProjectId] = useState("");
  const [score, setScore] = useState<number | "">("");
  const [error, setError] = useState("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const router = useRouter();

  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const id = use(params).id;

  useEffect(() => {
    setProjectId(id);
  }, [id]);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      const currentLocation = window.location.href;

      router.back();

      setTimeout(() => {
        if (window.location.href === currentLocation) {
          router.push("/");
        }
      }, 100);
    }
  };

  const handleSubmit = async () => {
    if (projectId === "") {
      setError("Please enter a valid project ID.");
      setIsSaveDialogOpen(false);
      return;
    }

    if (score === "" || score < 0 || score > 10) {
      setError("Please enter a valid score.");
      setIsSaveDialogOpen(false);
      return;
    }

    setError("");

    try {
      const response = await api.post("/evaluation", {
        projectId,
        score,
      });

      if (response.status === 201) {
        router.push("/allprojects");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 401) {
            setError("Unauthorized. Please log in.");
          } else if (err.response.status === 403) {
            setError("You do not have sufficient permissions.");
          } else if (err.response.status === 404) {
            setError("Project not found.");
          } else if (err.response.status === 500) {
            setError("Internal Server Error. Please try again later.");
          } else {
            setError("An unexpected error occurred.");
          }
        } else {
          setError("Failed to connect to the server.");
        }
      }
    }
  };

  return (
    <div className="bg-[#09090b] w-full h-screen flex flex-col text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">Evaluate a Project</h1>
        <DangerButton
          buttonText="Cancel"
          onClick={() => setIsCancelDialogOpen(true)}
        />
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-[#121212] p-6 rounded-lg w-96 border border-gray-700 shadow-lg">
          <div className="mb-4">
            <h2 className="text-3xl font-black">Evaluate a Project</h2>
            <p className="text-sm text-gray-400">
              Enter the details to evaluate the project
            </p>
          </div>

          <InputField
            label="Project ID"
            type="text"
            placeholder="Enter Project ID"
            onTextChange={(value) => setProjectId(value)}
            text={projectId}
          />

          <InputField
            label="Score"
            type="number"
            placeholder="Enter Score"
            onTextChange={(value) => setScore(value ? parseInt(value) : "")}
            customStyle="mt-4"
            text={score.toString()}
          />

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <Button
            buttonText="Submit Evaluation"
            onClick={() => setIsSaveDialogOpen(true)}
            customStyle="w-full mt-4"
          />
        </div>
      </main>

      <DialogBox
        isOpen={isCancelDialogOpen}
        title="Confirm Cancel"
        message="Are you sure you want to cancel evaluating the project?"
        positive={false}
        onConfirm={handleBack}
        onCancel={() => setIsCancelDialogOpen(false)}
      />

      <DialogBox
        isOpen={isSaveDialogOpen}
        title="Confirm Save"
        message="Are you sure you want to save the changes?"
        positive={true}
        onConfirm={handleSubmit}
        onCancel={() => setIsSaveDialogOpen(false)}
      />
    </div>
  );
};

export default EvaluateProjectPage;
