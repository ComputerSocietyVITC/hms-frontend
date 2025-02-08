"use client";

import api from "@/api";
import FooterSection from "@/components/FooterSection";
import HeaderComponent from "@/components/HeaderComponent";
import UserCard from "@/components/UserCard";
import UserInformation from "@/components/UserInformation";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
}

interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  authId: string;
  name: string;
  role: string;
  regNum: string;
  phone: string;
  college: string;
  github: string;
  imageId: string | null;
  isLeader: boolean;
  teamId: string | null;
  evaluations: Evaluation;
}

const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get("/users/all");
      setUsers(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          setError("You don't have permission to view this page.");
        } else {
          setError(
            err.response?.data?.message || "An unexpected error occurred."
          );
        }
      } else {
        setError("Failed to connect to the server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
      <HeaderComponent />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8">
            {users.map((user) => (
              <div key={user.id} className="flex flex-col md:flex-row w-full">
                <UserCard
                  id={user.id}
                  createdAt={user.createdAt}
                  name={user.name}
                  college={user.college}
                  github={user.github}
                  isLeader={user.isLeader}
                  customStyle="w-full md:w-1/4"
                />
                <UserInformation
                  registrationNumber={user.regNum}
                  teamName="Team Innovators"
                  collegeName={user.college}
                  phoneNumber={user.phone}
                  userId={user.id}
                  githubId={user.github}
                  customStyle="w-full md:w-3/4 mt-4 md:mt-0 md:ml-8"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Page;
