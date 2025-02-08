/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/api";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  const { user, loading } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        if (isMounted) {
          localStorage.setItem("token", response.data.token);
        }
        router.push("/");
      }

      setError("");
      console.log(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          switch (err.response.status) {
            case 403:
              setError("Invalid credentials. Please try again.");
              break;
            case 404:
              setError("User not found. Please register.");
              break;
            case 500:
              setError("Internal server error. Please try again later.");
              break;
            default:
              setError("An unexpected error occurred.");
          }
        } else {
          setError("Network error or server unreachable.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F3F4F6]">
      <div className="flex flex-col p-4 border rounded-lg bg-white h-auto w-96 border-[#D6D6D6]">
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
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          customStyle="mt-4"
        />
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <Button
          buttonText="Sign In"
          onClick={handleSubmit}
          customStyle="w-full mt-6"
        />
      </div>
    </div>
  );
};

export default LoginComponent;
