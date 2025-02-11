"use client";

import api from "@/api";
import Button from "@/components/ui/Button";
import DangerButton from "@/components/ui/DangerButton";
import DialogBox from "@/components/ui/DialogBox";
import InputField from "@/components/ui/InputField";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type UserRole = "SUPER_ADMIN" | "ADMIN" | "EVALUATOR" | "USER";

const DynamicPromoteUser = ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false);
  const { user, getUser } = useAuth();
  const router = useRouter();

  const [userID, setUserID] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("USER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const roles: UserRole[] = ["SUPER_ADMIN", "ADMIN", "EVALUATOR", "USER"];

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setError("");
        const { userId } = await params;

        if (!userId) {
          setError("User ID is required");
          return;
        }

        const response = await api.get(`/user/${userId}`);
        if (response.status === 200) {
          setUserID(response.data.id);
        } else {
          setError("User not found");
        }
      } catch {
        setError("An unexpected error occurred while fetching user.");
      }
    };

    fetchUser();
  }, [params]);

  const promoteUser = async () => {
    if (!userID.trim()) {
      setError("Please enter a User ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await api.post(`/user/promote/${userID}`, {
        role: selectedRole,
      });

      if (response.status === 201) {
        router.push("/admincontrols");
      } else {
        setError("Failed to promote user.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.status === 403
            ? "You do not have sufficient permissions."
            : err.response?.status === 404
              ? "User not found."
              : "An unexpected error occurred."
        );
      } else {
        setError("Failed to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#09090b] w-full h-screen flex flex-col">
      <header className="w-full bg-[#121212] text-white flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <h1 className="text-lg font-bold">Promote User</h1>
        <Link href="/admincontrols">
          <DangerButton buttonText="Go Back" onClick={() => {}} />
        </Link>
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-[#121212] text-white p-4 rounded-lg w-96 border-[#303030] shadow-lg h-auto">
          <h2 className="text-3xl font-black">Promote a user</h2>
          <p className="text-sm text-gray-400 mb-4">
            Enter the User ID and role to promote
          </p>

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
                <option key={role} value={role} className="bg-[#1E1E1E]">
                  {role.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <Button
            buttonText={loading ? "Promoting..." : "Promote User"}
            customStyle="w-full mt-6"
            onClick={() => setIsPromoteDialogOpen(true)}
            disabled={loading}
          />
        </div>
      </main>

      <DialogBox
        isOpen={isPromoteDialogOpen}
        title="Confirm Promote"
        message="Are you sure you want to promote the user?"
        positive={true}
        onConfirm={promoteUser}
        onCancel={() => setIsPromoteDialogOpen(false)}
      />
    </div>
  );
};

export default DynamicPromoteUser;
