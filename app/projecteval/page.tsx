"use client";

import React, { useState } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/DangerButton";
import { useRouter } from "next/navigation";
import api from "@/api";

const EvaluateProjectPage: React.FC = () => {
  const [projectId, setProjectId] = useState("");
  const [score, setScore] = useState<number | "">("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (score === "" || score < 0) {
      alert("Please enter a valid score.");
      return;
    }

    try {
      const response = await api.post("/evaluate-project", {
        projectId,
        score,
      });

      if (response.status === 200) {
        console.log("Evaluation submitted:", response.data);
      }
    } catch (err) {
      console.error("Error submitting evaluation:", err);
    }
  };

  return (
    <div className="bg-[#F3F4F6] w-full h-screen flex flex-col">
      <header className="w-full bg-white flex items-center justify-between px-6 py-3">
        <h1 className="text-lg font-medium">Evaluate a Project</h1>
        <DangerButton buttonText="Cancel" onClick={() => router.push("/")} />
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-white p-4 rounded-lg w-96 border border-[#D9D9D9]">
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
            text={score.toString()}
          />

          <Button
            buttonText="Submit Evaluation"
            onClick={handleSubmit}
            customStyle="w-full mt-4"
          />
        </div>
      </main>
    </div>
  );
};

export default EvaluateProjectPage;
