"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/api";
import axios from "axios";
import DangerButton from "@/components/ui/DangerButton";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [regNum, setRegNum] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [github, setGithub] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const imageId = "123e4567-e89b-12d3-a456-426614174000";

  const { user, loading } = useAuth();
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

  const handleSubmit = async () => {
    if (!name || !regNum || !phone || !college || !github) {
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
      const response = await api.post(`/user/${user.id}`, {
        name,
        regNum,
        phone,
        college,
        github,
        imageId,
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
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Edit your Profile</h1>
        <DangerButton
          buttonText="Cancel"
          onClick={() => router.push("/user")}
        />
      </header>

      <main className="flex-grow flex items-center justify-center w-full">
        <div className="flex flex-col p-6 border rounded-lg bg-[#121212] h-auto w-[600px] border-gray-700">
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
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
          <Button
            buttonText="Update Profile"
            onClick={handleSubmit}
            customStyle="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white"
          />
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
