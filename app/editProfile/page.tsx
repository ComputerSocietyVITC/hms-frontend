/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [regNum, setRegNum] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [github, setGithub] = useState("");
  const [imageId, setImageId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

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
      const response = await axios.put("http://localhost:3000/user/editProfile", {
        name,
        regNum,
        phone,
        college,
        github,
        imageId,
      });

      if (response.status === 200) {
        setSuccess("Profile updated successfully.");
        setError("");
      }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError("Failed to update profile. Please try again later.");
          setSuccess("");
        }
      }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F3F4F6]">
      <div className="flex flex-col p-6 border rounded-lg bg-white h-auto w-[600px] border-[#D6D6D6]">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your name"
            onTextChange={setName}
          />
          <InputField
            label="Registration Number"
            type="text"
            placeholder="Enter your registration number"
            onTextChange={setRegNum}
          />
          <InputField
            label="Phone"
            type="tel"
            placeholder="Enter your phone number"
            onTextChange={setPhone}
          />
          <InputField
            label="College"
            type="text"
            placeholder="Enter your college"
            onTextChange={setCollege}
          />
          <InputField
            label="GitHub"
            type="url"
            placeholder="Enter your GitHub profile URL"
            onTextChange={setGithub}
          />
          <InputField
            label="Image ID"
            type="text"
            placeholder="Enter your image ID"
            onTextChange={setImageId}
          />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <Button
          buttonText="Update Profile"
          onClick={handleSubmit}
          customStyle="w-full mt-6"
        />
      </div>
    </div>
  );
};

export default EditProfile;
