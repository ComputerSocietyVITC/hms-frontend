"use client";

import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AdminControls = () => {
  const router = useRouter();

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
