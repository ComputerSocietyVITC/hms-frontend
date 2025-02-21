import Image from "next/image";
import DangerButton from "../ui/DangerButton";
import api from "@/api";
import axios from "axios";
import Button from "../ui/Button";
import Link from "next/link";
import PositiveButton from "../ui/PositiveButton";
import DialogBox from "../ui/DialogBox";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type TeamMemberListItemModifiedProps = {
  githubId: string | null;
  name: string;
  teamName: string | null;
  avatarSrc: string;
  avatarAlt?: string;
  className?: string;
  userId: string;
  userRole: string;
  currentUserId: string | undefined;
  onDelete: (userId: string) => void;
};

export const TeamMemberListItemModified = ({
  githubId,
  name,
  teamName,
  avatarSrc,
  avatarAlt,
  className,
  userId,
  userRole,
  currentUserId,
  onDelete,
  ...props
}: TeamMemberListItemModifiedProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleClick = async () => {
    onDelete(userId);

    try {
      const response = await api.delete(`/user/${userId}`);

      if (response.status !== 201) {
        throw new Error("Failed to delete user");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 403) {
            console.log(
              "You do not have sufficient permissions to perform this action."
            );
          } else if (error.response.status === 404) {
            console.log("User not found.");
          } else if (error.response.status === 500) {
            console.log("Internal Server Error");
          } else {
            console.log(
              "An unexpected error occurred. Please try again later."
            );
          }
        } else {
          console.log("Please check your network connection and try again.");
        }
      }
    }
  };

  const getRoleMessage = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "We never touch grass 🙂‍↕️🤚🏻";
      case "ADMIN":
        return "We are in an identity crisis 🔮";
      case "EVALUATOR":
        return "We will fail you 🕊️";
      default:
        return "";
    }
  };

  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-between p-5 rounded-lg bg-[#121212] border border-gray-700",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={avatarAlt || "team-member-pfp"}
            height={48}
            width={48}
            className="size-12 rounded-full border border-gray-600"
          />
        ) : (
          <div className="size-12 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold text-lg border border-gray-600">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-lg">
            {name + (userId === currentUserId ? " (You)" : "")}
          </h1>
          <span className="text-sm text-gray-400">
            {githubId || "No GitHub"} • {teamName || "No Team"}{" "}
            {userRole !== "USER" && `• ${getRoleMessage(userRole)}`}
          </span>
        </div>
      </div>

      {userId !== currentUserId && (
        <div className="flex gap-3">
          <Link href={`/user/${userId}`} target="_blank">
            <Button buttonText="View Profile" onClick={() => {}} />
          </Link>
          <Link href={`/promoteUser/${userId}`} target="_blank">
            <PositiveButton buttonText="Promote User" onClick={() => {}} />
          </Link>
          <DangerButton
            buttonText="Delete User"
            onClick={() => setIsDeleteDialogOpen(true)}
            primary={false}
          />
        </div>
      )}

      <DialogBox
        isOpen={isDeleteDialogOpen}
        title="Confirm Delete User"
        message={`Are you sure you want to delete the user ${name}?`}
        positive={false}
        onConfirm={handleClick}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};
