"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import { useRouter } from "next/navigation";
import api from "@/api";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

type UserRole = "SUPER_ADMIN" | "ADMIN" | "EVALUATOR" | "USER";

const PromoteUserPage: React.FC = () => {
  const { user, getUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  const [userID, setUserID] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("USER");
  const [error, setError] = useState("");

  const roles: UserRole[] = ["SUPER_ADMIN", "ADMIN", "EVALUATOR", "USER"];

  const promoteUser = async () => {
    try {
      setError("");
      const response = await api.post(`/user/promote/${userID}`, {
        role: selectedRole,
      });

      if (response.status === 201) {
        router.push("/admincontrols");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 403) {
            setError("You do not have sufficient permissions.");
          } else if (err.response.status === 404) {
            setError("User not found");
          } else {
            setError("An unexpected error occured.");
          }
        } else {
          setError("Failed to connect to the server.");
        }
      }
    }
  };

  const handleSubmit = () => {
    if (!userID.trim()) {
      setError("Please enter a User ID");
      return;
    }
    promoteUser();
  };

  return (
    <div className="bg-[#09090b] w-full h-screen flex flex-col">
      <header className="w-full bg-[#121212] text-white flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">Promote User</h1>
        <DangerButton
          buttonText="Go Back"
          onClick={() => router.push("/admincontrols")}
        />
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-[#121212] text-white p-4 rounded-lg w-96 border-[#303030] shadow-lg h-auto">
          <div className="mb-4">
            <h2 className="text-3xl font-black">Promote a user</h2>
            <p className="text-sm text-gray-400">
              Enter the User ID and role to promote
            </p>
          </div>
          <InputField
            label="User ID"
            type="text"
            placeholder="Enter User ID"
            text={userID}
            onTextChange={setUserID}
          />
          <div className="mt-4">
            <label className="font-bold">User Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="border border-[#303030] bg-[#1E1E1E] text-[#EAEAEA] rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#EAEAEA] mt-2"
            >
              {roles.map((role) => (
                <option
                  key={role}
                  value={role}
                  className="bg-[#1E1E1E] text-[#EAEAEA]"
                >
                  {role.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            buttonText="Promote User"
            customStyle="w-full mt-6"
            onClick={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default PromoteUserPage;
