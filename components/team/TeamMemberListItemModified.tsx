import Image from "next/image";
import DangerButton from "../ui/DangerButton";
import api from "@/api";
import axios from "axios";
import Button from "../ui/Button";
import Link from "next/link";

export type TeamMemberListItemModifiedProps = {
  githubId: string | null;
  name: string;
  teamName: string | null;
  avatarSrc: string;
  avatarAlt?: string;
  className?: string;
  userId: string;
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
  onDelete,
  ...props
}: TeamMemberListItemModifiedProps) => {
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

  return (
    <div
      {...props}
      className={`${className} flex items-center justify-between p-5 rounded-lg bg-[#121212] border border-gray-700`}
    >
      <div className="flex items-center gap-4">
        <Image
          src={avatarSrc}
          alt={avatarAlt || "team-member-pfp"}
          height={48}
          width={48}
          className="size-12 rounded-full border border-gray-600"
        />
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-lg">{name}</h1>
          <span className="text-sm text-gray-400">
            {githubId || "No GitHub"} • {teamName || "No Team"}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href={`/user/${userId}`} target="_blank">
          <Button buttonText="View Profile" onClick={() => {}} />
        </Link>
        <Link href={`/promoteUser/${userId}`} target="_blank">
          <Button
            buttonText="Promote User"
            onClick={() => {}}
            customStyle="bg-[#16A34A] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#15803D] transition-all"
          />
        </Link>
        <DangerButton
          buttonText="Delete User"
          onClick={handleClick}
          primary={false}
        />
      </div>
    </div>
  );
};
