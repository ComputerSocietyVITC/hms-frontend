/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [regNum, setRegNum] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "USER";
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!name || !regNum || !phone || !college || !email || !password) {
      setError("All fields are required. Please fill in all the fields.");
      setSuccess("");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits long.");
      setSuccess("");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        name,
        role,
        regNum,
        phone,
        college,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess("User registered successfully.");
        setError("");
        router.push("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 409) {
            setError("User already exists.");
          } else if (error.response.status === 500) {
            setError("Internal server error. Please try again later.");
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
    <div className="flex items-center justify-center h-screen bg-[#F3F4F6]">
      <div className="flex flex-col p-6 border rounded-lg bg-white h-auto w-[600px] border-[#D6D6D6]">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your name"
            onTextChange={(value) => setName(value)}
            text={name}
          />
          <InputField
            label="Registration Number"
            type="text"
            placeholder="Enter your registration number"
            onTextChange={(value) => setRegNum(value)}
            text={regNum}
          />
          <InputField
            label="Phone"
            type="tel"
            placeholder="Enter your phone number"
            onTextChange={(value) => setPhone(value)}
            text={phone}
          />
          <InputField
            label="College"
            type="text"
            placeholder="Enter your college"
            onTextChange={(value) => setCollege(value)}
            text={college}
          />
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            onTextChange={(value) => setEmail(value)}
            text={email}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            onTextChange={(value) => setPassword(value)}
            text={password}
          />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <Button
          buttonText="Sign Up"
          onClick={handleSubmit}
          customStyle="w-full mt-6"
        />
        <p className="mt-4 text-center block">
          Already have an account?{" "}
          <a
            onClick={() => (window.location.href = "/login")}
            className="font-bold cursor-pointer hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
