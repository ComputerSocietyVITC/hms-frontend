/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const { user, getUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0A0A0A]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
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
    <div className="flex items-center justify-center h-screen bg-[#09090b]">
      <div className="flex flex-col p-6 border rounded-lg bg-[#121212] text-white h-auto w-[600px] border-[#303030] shadow-lg">
        <p className="font-black text-3xl">Create an Account</p>
        <p className="text-sm text-gray-400">
          Enter your details to register and join us
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
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
            label="Email"
            type="email"
            placeholder="Enter your email"
            onTextChange={setEmail}
            text={email}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            onTextChange={setPassword}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            text={password}
          />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <Button
          buttonText="Sign Up"
          onClick={handleSubmit}
          customStyle="w-full mt-6 bg-[#1E1E1E] hover:bg-[#292929] border border-[#404040] text-white font-semibold py-2 rounded-md"
        />
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-white cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
