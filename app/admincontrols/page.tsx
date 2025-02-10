"use client";

import Button from "@/components/ui/Button";
import DangerButton from "@/components/DangerButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminControls = () => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#09090b]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300" />
      </div>
    );
  }

  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#09090b] text-red-400">
        You do not have the permissions to view this page
      </div>
    );
  }

  return (
    <div className="bg-[#09090b] w-full h-screen flex flex-col text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">Admin Controls</h1>
        <DangerButton buttonText="Go Back" onClick={() => router.push("/")} />
      </header>
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center">
          <Button
            buttonText="View All Teams"
            onClick={() => router.push("/allteams")}
            customStyle="w-[400px]"
          />
          <Button
            buttonText="View All Users"
            onClick={() => router.push("/allusers")}
            customStyle="w-[400px]"
          />
          <Button
            buttonText="Promote a User"
            onClick={() => router.push("/promoteUser")}
            customStyle="w-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminControls;
