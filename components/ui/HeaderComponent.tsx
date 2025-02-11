/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import DangerButton from "./DangerButton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import DialogBox from "./DialogBox";

const HeaderComponent = () => {
  const { user, getUser } = useAuth();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  useEffect(() => {
    router.prefetch("/admincontrols");
    router.prefetch("/team");
    router.prefetch("/joinTeam");
    router.prefetch("/user");
    router.prefetch("/login");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center w-full bg-[#121212] text-white py-3 px-6 border-b border-gray-700">
      <Link className="text-lg font-bold" href="/">
        IEEE CS VITC / HMS
      </Link>
      <div className="flex space-x-2">
        {user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
          <Link href="/admincontrols">
            <Button buttonText="Go to Admin Controls" onClick={() => {}} />
          </Link>
        )}
        {user &&
          user.role !== "ADMIN" &&
          user.role !== "SUPER_ADMIN" &&
          (user.teamId ? (
            <Link href="/team">
              <Button buttonText="View Team" onClick={() => {}} />
            </Link>
          ) : (
            <Link href="/joinTeam">
              <Button buttonText="Join Team" onClick={() => {}} />
            </Link>
          ))}

        <Link href="/user">
          <Button buttonText="Profile" onClick={() => {}} />
        </Link>
        <DangerButton
          buttonText="Logout"
          onClick={() => setIsDialogOpen(true)}
        />
      </div>

      <DialogBox
        isOpen={isDialogOpen}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        positive={false}
        onConfirm={handleLogout}
        onCancel={() => setIsDialogOpen(false)}
      />
    </header>
  );
};

export default HeaderComponent;
