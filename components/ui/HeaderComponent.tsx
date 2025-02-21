"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import DangerButton from "./DangerButton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import DialogBox from "./DialogBox";
import api from "@/api";
import { Project } from "@/types";

const HeaderComponent = () => {
  const { user, userRole } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      if (userRole === "USER") {
        try {
          const response = await api.get("/project");

          if (response.status === 200) {
            setProject(response.data);
          }
        } catch {}
      }
    };

    getProject();
  }, [userRole]);

  useEffect(() => {
    router.prefetch("/admincontrols");
    router.prefetch("/team");
    router.prefetch("/user");
    router.prefetch("/login");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center w-full bg-[#121212] text-white py-4 px-6 border-b border-gray-700">
      <Link className="text-lg font-bold" href="/">
        IEEE CS VITC / HMS
      </Link>
      <div className="flex space-x-2">
        {(userRole === "ADMIN" || userRole === "SUPER_ADMIN") && (
          <Link href="/admincontrols">
            <Button buttonText="Go to Admin Controls" onClick={() => {}} />
          </Link>
        )}

        {userRole === "EVALUATOR" && (
          <Link href="/evaluatorcontrols">
            <Button buttonText="Go to Evaluator Controls" onClick={() => {}} />
          </Link>
        )}

        {user &&
          userRole === "USER" &&
          user.teamId &&
          (project ? (
            <Link href="/project">
              <Button buttonText="View Project" onClick={() => {}} />
            </Link>
          ) : (
            user.isLeader && (
              <Link href="/createproject">
                <Button buttonText="Create Project" onClick={() => {}} />
              </Link>
            )
          ))}

        {user &&
          userRole === "USER" &&
          (user.teamId ? (
            <Link href="/team">
              <Button buttonText="View Team" onClick={() => {}} />
            </Link>
          ) : (
            <Link href="/createTeam">
              <Button buttonText="Create Team" onClick={() => {}} />
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
