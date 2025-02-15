"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/api";
import axios from "axios";
import DangerButton from "@/components/ui/DangerButton";
import DialogBox from "@/components/ui/DialogBox";

const UpdateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [reportUrl, setReportUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const handleSubmit = () => {
    console.log({
      name: name || "(empty)",
      description: description || "(empty)",
      repoUrl: repoUrl || "(empty)",
      demoUrl: demoUrl || "(empty)",
      reportUrl: reportUrl || "(empty)",
      imageId: imageId || "(empty)",
    });

    handleUpdateProject();
  };

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
      </div>
    );
  }

  const handleUpdateProject = async () => {
    try {
      const response = await api.post(`/project/update`, {
        name,
        description,
        repoUrl,
        demoUrl,
        reportUrl,
        imageId,
      });

      if (response.status === 200) {
        router.push("/projects");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 403) {
            setError(
              "You do not have sufficient permissions to update this project.",
            );
          } else if (error.response.status === 404) {
            setError("Project not found. It may have been deleted.");
          } else if (error.response.status === 500) {
            setError("Internal Server Error. Please try again later.");
          } else {
            setError("An unexpected error occurred.");
          }
        } else {
          setError(
            "Failed to connect to the server. Check your internet connection.",
          );
        }
        setSuccess("");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Update your Project</h1>
        <DangerButton
          buttonText="Cancel"
          onClick={() => setIsCancelDialogOpen(true)}
        />
      </header>

      <main className="flex-grow flex items-center justify-center w-full">
        <div className="flex flex-col p-6 border rounded-lg bg-[#121212] h-auto w-[600px] border-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Project Name"
              type="text"
              placeholder="Enter project name"
              onTextChange={setName}
              text={name}
            />
            <InputField
              label="Description"
              type="text"
              placeholder="Enter project description"
              onTextChange={setDescription}
              text={description}
            />
            <InputField
              label="Repository URL"
              type="url"
              placeholder="Enter repository URL"
              onTextChange={setRepoUrl}
              text={repoUrl}
            />
            <InputField
              label="Demo URL"
              type="url"
              placeholder="Enter demo URL"
              onTextChange={setDemoUrl}
              text={demoUrl}
            />
            <InputField
              label="Report URL"
              type="url"
              placeholder="Enter report URL"
              onTextChange={setReportUrl}
              text={reportUrl}
            />
            <InputField
              label="Image ID"
              type="text"
              placeholder="Enter image ID"
              onTextChange={setImageId}
              text={imageId}
            />
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
          <Button
            buttonText="Update Project"
            onClick={() => setIsSaveDialogOpen(true)}
            customStyle="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white"
          />
        </div>
      </main>

      <DialogBox
        isOpen={isCancelDialogOpen}
        title="Confirm Cancel"
        message="Are you sure you want to cancel editing your project?"
        positive={false}
        onConfirm={() => router.push("/dashboard")}
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

export default UpdateProject;
