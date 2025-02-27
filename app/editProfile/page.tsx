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
import Loading from "@/components/ui/Loading";
import FileUploader from "@/components/files/FileUpload";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [regNum, setRegNum] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [github, setGithub] = useState("");
  const [imageId, setImageId] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const { user, userId, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setRegNum(user.regNum || "");
      setPhone(user.phone || "");
      setCollege(user.college || "");
      setGithub(user.github || "");
    }
  }, [user]);

  if (loading || !user) {
    return <Loading />;
  }

  const handleUploadSuccess = (fileUrl: string) => {
    setImageId(fileUrl.split(".")[0]);
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
    if (!name || !regNum || !phone || !college || !github || !imageId) {
      setError("All fields are required. Please fill in all the fields.");
      setSuccess("");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits long.");
      setSuccess("");
      return;
    }

    if (!/^https:\/\/github\.com\/.+/.test(github)) {
      setError("Please enter a valid GitHub URL.");
      setSuccess("");
      return;
    }

    try {
      const response = await api.post(`/user/${userId}`, {
        name,
        regNum,
        phone,
        college,
        github,
        imageId,
        mimeType,
      });

      if (response.status === 201) {
        router.push("/user");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 403) {
            setError("You do not have sufficient permissions.");
          } else if (error.response.status === 409) {
            setError("One or more field(s) conflict(s) with other users.");
          } else if (error.response.status === 500) {
            setError("Internal Server Error. Please try again later.");
          } else {
            setError("An unexpected error occurred.");
          }
        } else {
          setError("Failed to connect to the server.");
        }
        setSuccess("");
      }
    } finally {
      setIsSaveDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Edit your Profile</h1>
        <DangerButton
          buttonText="Cancel"
          onClick={() => setIsCancelDialogOpen(true)}
        />
      </header>

      <main className="flex-grow flex items-center justify-center w-full">
        <div className="flex flex-col p-6 border rounded-lg bg-[#121212] h-auto w-[600px] border-gray-700">
          <div className="mb-4">
            <h2 className="text-3xl font-black">Edit your profile</h2>
            <p className="text-sm text-gray-400">
              Update your profile with the latest information about you 🤖
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Name"
              type="text"
              placeholder="Enter your name"
              onTextChange={setName}
              text={name}
            />
            <InputField
              label="Registration Number"
              type="text"
              placeholder="Enter your registration number"
              onTextChange={setRegNum}
              text={regNum}
            />
            <InputField
              label="Phone"
              type="tel"
              placeholder="Enter your phone number"
              onTextChange={setPhone}
              text={phone}
            />
            <InputField
              label="College"
              type="text"
              placeholder="Enter your college"
              onTextChange={setCollege}
              text={college}
            />
            <InputField
              label="GitHub"
              type="url"
              placeholder="Enter your GitHub profile URL"
              onTextChange={setGithub}
              text={github}
            />
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
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
          <Button
            buttonText="Update Profile"
            onClick={() => setIsSaveDialogOpen(true)}
            customStyle="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white"
            disabled={
              !name || !regNum || !phone || !college || !github || !imageId
            }
          />
        </div>
      </main>

      <DialogBox
        isOpen={isCancelDialogOpen}
        title="Confirm Cancel"
        message="Are you sure you want to cancel editing your profile?"
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

export default EditProfile;
