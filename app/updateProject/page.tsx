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
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [reportUrl, setReportUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [error, setError] = useState("");

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const { user, getUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const getProject = async () => {
      if (user?.teamId) {
        const response = await api.get(`/team/${user.teamId}`);

        if (!response.data.project) {
          router.push("/team");
        }

        if (response.data) {
          setProjectId(response.data.project.id || "");
          setName(response.data.project.name || "");
          setDescription(response.data.project.description || "");
          setRepoUrl(response.data.project.repoUrl || "");
          setDemoUrl(response.data.project.demoUrl || "");
          setReportUrl(response.data.project.reportUrl || "");
          setImageId(response.data.project.imageId || "");
        }
      }
    };

    getProject();
  }, [router, user?.teamId]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
      </div>
    );
  }

  if (user && !user.isLeader) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#09090b] text-red-400">
        You are not allowed to do this action.
      </div>
    );
  }

  const handleUpdateProject = async () => {
    if (!projectId) {
      setError("Project ID is missing.");
      return;
    }

    try {
      setError("");
      const response = await api.post(`/project/${projectId}`, {
        name,
        description,
        repoUrl,
        demoUrl,
        reportUrl,
        imageId,
      });

      if (response.status === 200) {
        router.push("/project");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 403) {
            setError(
              "You do not have sufficient permissions to update this project."
            );
          } else if (err.response.status === 404) {
            setError("Project not found.");
          } else if (err.response.status === 500) {
            setError("Internal Server Error.");
          } else {
            setError("An unexpected error occurred.");
          }
        } else {
          setError("Failed to connect to the server.");
        }
      }
    }
  };

  const handleSubmit = () => {
    if (!name) {
      setError("Project name is required.");
      setIsSaveDialogOpen(false);
      return;
    }

    if (!description) {
      setError("Project description is required.");
      setIsSaveDialogOpen(false);
      return;
    }

    if (!repoUrl) {
      setError("Repository URL is required.");
      setIsSaveDialogOpen(false);
      return;
    }

    if (!demoUrl) {
      setError("Demo URL is required.");
      setIsSaveDialogOpen(false);
      return;
    }

    if (!reportUrl) {
      setError("Report URL is required.");
      setIsSaveDialogOpen(false);
      return;
    }

    if (!imageId) {
      setError("Image ID is required.");
      setIsSaveDialogOpen(false);
      return;
    }

    setError("");
    handleUpdateProject();
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
              placeholder="Enter image ID (UUID)"
              onTextChange={setImageId}
              text={imageId}
            />
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

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
        onConfirm={() => router.push("/project")}
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
