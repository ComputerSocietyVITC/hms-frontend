/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useRouter } from "next/navigation";
import api from "@/api";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Loading from "@/components/ui/Loading";

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
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async () => {
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.status === 200) {
        if (isMounted) {
          localStorage.setItem("token", response.data.token);
        }
        router.push("/");
      }
      setError("");
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
    <div className="flex items-center justify-center h-screen bg-[#09090b]">
      <div className="flex flex-col p-6 border rounded-lg bg-[#121212] text-white h-auto w-96 border-[#303030] shadow-lg">
        <p className="font-black text-3xl">Welcome back</p>
        <p className="text-sm text-gray-400">
          Enter your credentials to access your account
        </p>
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          onTextChange={setEmail}
          text={email}
          customStyle="mt-4"
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          onTextChange={setPassword}
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
          customStyle="w-full mt-6 bg-[#1E1E1E] hover:bg-[#292929] border border-[#404040] text-white font-semibold py-2 rounded-md"
        />
        <p className="mt-4 text-center text-gray-400">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-white cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
