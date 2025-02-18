/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import DangerButton from "./DangerButton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import DialogBox from "./DialogBox";
import api from "@/api";

interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
}

interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageId: string;
  teamId: string;
  evaluations: Evaluation[];
}

const HeaderComponent = () => {
  const { user, getUser } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await api.get("/project");

        if (response.status === 200) {
          setProject(response.data);
        }
      } catch {}
    };

    getProject();
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
    <header className="flex justify-between items-center w-full bg-[#121212] text-white py-4 px-6 border-b border-gray-700">
      <Link className="text-lg font-bold" href="/">
        IEEE CS VITC / HMS
      </Link>
      <div className="flex space-x-2">
        {user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
          <Link href="/admincontrols">
            <Button buttonText="Go to Admin Controls" onClick={() => {}} />
          </Link>
        )}

        {user && user.role === "EVALUATOR" && (
          <Link href="/evaluatorcontrols">
            <Button buttonText="Go to Admin Controls" onClick={() => {}} />
          </Link>
        )}

        {user &&
          user.role === "USER" &&
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
          user.role === "USER" &&
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
