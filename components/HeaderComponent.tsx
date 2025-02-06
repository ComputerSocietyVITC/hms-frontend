"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import DangerButton from "./DangerButton";

const HeaderComponent = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center w-full bg-white py-3 px-6 border-b border-b-[#D9D9D9]">
      <div
        className="text-lg font-bold hover:cursor-pointer"
        onClick={() => router.push("/")}
      >
        Logo
      </div>
      <div className="flex space-x-2">
        <Button
          buttonText="Profile"
          onClick={() => {
            router.push("/user");
          }}
        />
        <DangerButton
          buttonText="Logout"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        />
      </div>
    </header>
  );
};

export default HeaderComponent;
