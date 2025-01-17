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
      <div className="flex border-2 flex-col p-6 rounded-lg bg-[#FFFFFF] w-96 ">
        <div>
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            onTextChange={(value) => setEmail(value)}
          />
        </div>
        <div className="mt-4">
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            onTextChange={(value) => setPassword(value)}
          />
        </div>
        <div className="mt-6">
          <Button
            buttonText="Sign In"
            onClick={handleSubmit}
            customStyle="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
