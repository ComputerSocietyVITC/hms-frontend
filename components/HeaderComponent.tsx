"use client";

import React, { useEffect } from "react";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import DangerButton from "./DangerButton";
import { useAuth } from "@/context/AuthContext";

const HeaderComponent = () => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const router = useRouter();

  return (
    <header className="flex justify-between items-center w-full bg-[#121212] text-white py-3 px-6 border-b border-gray-700">
      <div
        className="text-lg font-bold hover:cursor-pointer"
        onClick={() => router.push("/")}
      >
        IEEE CS VITC / HMS
      </div>
      <div className="flex space-x-2">
        {user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
          <Button
            buttonText="Go to Admin Controls"
            onClick={() => router.push("/admincontrols")}
          />
        )}
        {user &&
        user.role !== "ADMIN" &&
        user.role !== "SUPER_ADMIN" &&
        user.teamId ? (
          <Button buttonText="View Team" onClick={() => router.push("/team")} />
        ) : (
          <Button
            buttonText="Join Team"
            onClick={() => router.push("/joinTeam")}
          />
        )}
        <Button buttonText="Profile" onClick={() => router.push("/user")} />
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
