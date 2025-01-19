"use client";
import React from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log({ email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F3F4F6]">
      <div className="flex flex-col p-4 border rounded-lg bg-white h-auto w-96 border-[#D6D6D6]">
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          onTextChange={(value) => setEmail(value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          onTextChange={(value) => setPassword(value)}
          customStyle="mt-4"
        />
        <Button
          buttonText="Sign In"
          onClick={handleSubmit}
          customStyle="w-full mt-6"
        />
      </div>
    </div>
  );
};

export default Login;
