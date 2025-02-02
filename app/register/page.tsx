"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

const Register = () => {
  const [name, setName] = useState("");
  const [regNum, setRegNum] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "USER";
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !regNum || !phone || !college || !email || !password) {
      setError("All fields are required. Please fill in all the fields.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits long.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const formData = { name, role, regNum, phone, college, email, password };
    console.log("Registration Data:", formData);
    setError("");
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
          />
          <InputField
            label="Registration Number"
            type="text"
            placeholder="Enter your registration number"
            onTextChange={(value) => setRegNum(value)}
          />
          <InputField
            label="Phone"
            type="tel"
            placeholder="Enter your phone number"
            onTextChange={(value) => setPhone(value)}
          />
          <InputField
            label="College"
            type="text"
            placeholder="Enter your college"
            onTextChange={(value) => setCollege(value)}
          />
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
          />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <Button
          buttonText="Register"
          onClick={handleSubmit}
          customStyle="w-full mt-6"
        />
      </div>
    </div>
  );
};

export default Register;
