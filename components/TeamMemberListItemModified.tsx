import Image from "next/image";
import DangerButton from "./DangerButton";
import api from "@/api";
import axios from "axios";
import Button from "./Button";

export type TeamMemberListItemModifiedProps = {
  githubId: string | null;
  name: string;
  teamName: string | null;
  avatarSrc: string;
  avatarAlt?: string;
  className?: string;
  userId: string;
};

export const TeamMemberListItemModified = ({
  githubId,
  name,
  teamName,
  avatarSrc,
  avatarAlt,
  className,
  userId,
  ...props
}: TeamMemberListItemModifiedProps) => {
  const handleClick = async () => {
    try {
      const response = await api.delete(`/user/${userId}`);

      if (response.status === 201) {
        window.location.reload();
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
            console.log("An unexpected error occured. Please try again later.");
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
      className={`${className} flex items-center justify-between space-x-2 p-4 mb-4 rounded-lg cursor-pointer bg-white`}
    >
      <div className="flex flex-row gap-4">
        <Image
          src={avatarSrc}
          alt={avatarAlt || "team-member-pfp"}
          height={64}
          width={64}
          className="size-10 rounded-full"
        />
        <div className="flex flex-col justify-center -space-y-1">
          <h1 className="font-semibold text-base md:text-lg">{name}</h1>
          <span className="text-xs md:text-sm">
            {githubId || "No GitHub ID"} • {teamName || "No Team"}
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          buttonText="View Profile"
          onClick={() => {
            window.location.href = `/user/${userId}`;
          }}
        />
        <DangerButton
          buttonText="Delete User"
          onClick={() => {
            handleClick();
          }}
        />
      </div>
    </div>
  );
};
