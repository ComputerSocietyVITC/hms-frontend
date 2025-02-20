"use client";

import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AdminControls = () => {
  const { userRole, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#09090b]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300" />
      </div>
    );
  }

  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
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
          <Link href="/allteams">
            <Button
              buttonText="View All Teams"
              onClick={() => {}}
              customStyle="w-[400px]"
            />
          </Link>
          <Link href="/allusers">
            <Button
              buttonText="View All Users"
              onClick={() => {}}
              customStyle="w-[400px]"
            />
          </Link>
          <Link href="/allprojects">
            <Button
              buttonText="View All Projects"
              onClick={() => {}}
              customStyle="w-[400px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminControls;
