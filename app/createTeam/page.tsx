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
import Loading from "@/components/ui/Loading";
import FileUploader from "@/components/files/FileUpload";

const CreateTeamPage: React.FC = () => {
  const [name, setName] = useState("");
  const [imageId, setImageID] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { user, loading, getUser } = useAuth();

  useEffect(() => {
    if (user?.teamId) {
      router.push("/team");
    }
  }, [user]);

  const handleUploadSuccess = (fileUrl: string) => {
    setImageID(fileUrl.split(".")[0]);
    setMimeType(fileUrl.split(".")[1]);
  };

  const handleUploadError = (error: Error) => {
    setError("Error uploading file: " + error.message);
  };

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
    try {
      const response = await api.put("/team", {
        name: name,
        imageId: imageId,
        mimeType: mimeType,
      });

      if (response.status === 201) {
        await getUser();

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#09090b] w-full h-screen flex flex-col text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">Create a Team</h1>
        <DangerButton buttonText="Cancel" onClick={handleBack} />
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

          <div className="mt-4">
            <FileUploader
              label="Team Image"
              accept="image/*"
              darkMode={true}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              uploadEndpoint="/api/upload"
              buttonText={{
                select: "Select Image",
                change: "Change Image",
                upload: "Upload",
                uploading: "Uploading...",
              }}
            />

            {imageId && (
              <div className="mt-1 text-xs text-green-400">
                Image uploaded successfully! ID: {imageId.split("/").pop()}
              </div>
            )}
          </div>

          {error && (
            <div className="mt-3 text-sm text-red-400 text-center">{error}</div>
          )}

          <Button
            buttonText="Create Team"
            onClick={handleSubmit}
            customStyle="w-full mt-4"
            disabled={!name || !imageId}
          />
        </div>
      </main>
    </div>
  );
};

export default CreateTeamPage;
