import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Calendar, GitHub, MapPin } from "react-feather";

interface UserCardProps {
  id: string;
  createdAt: string;
  name: string;
  college: string;
  github: string | null;
  isLeader: boolean;
  teamName: string;
  customStyle?: string;
}

const UserCard = ({
  createdAt,
  name,
  college,
  github,
  isLeader,
  teamName,
  customStyle,
}: UserCardProps) => {
  const githubUsername = github?.match(/github\.com\/([^/]+)/)?.[1] || null;

  return (
    <div
      className={cn(
        `flex flex-col p-8 rounded-lg border border-gray-700 bg-[#121212] text-white justify-center items-center w-fit h-fit my-auto`,
        customStyle
      )}
    >
      {githubUsername ? (
        <Image
          className="size-48 rounded-full"
          width={1024}
          height={1024}
          src={`https://github.com/${githubUsername}.png`}
          alt="profile_img"
        />
      ) : (
        <div className="size-48 flex items-center justify-center rounded-full bg-gray-700 text-white font-black text-6xl border border-gray-600">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex flex-col text-center my-4">
        <h1 className="text-3xl font-black">{name}</h1>
        {teamName !== "" && (
          <span className="text-sm text-gray-400">{`${isLeader ? "Team Leader" : "Member"} of ${teamName}`}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2 text-gray-300">
        <div className="flex space-x-2">
          <MapPin className="size-6 text-gray-300" />
          <span>{college}</span>
        </div>
        {githubUsername ? (
          <div className="flex space-x-2">
            <GitHub className="size-6 text-gray-300" />
            <Link
              className="hover:text-gray-300"
              href={`https://github.com/${githubUsername}`}
              target="_blank"
            >
              {githubUsername}
            </Link>
          </div>
        ) : (
          <div className="flex space-x-2">
            <GitHub className="size-6 text-gray-300" />
            <span>No GitHub ID</span>
          </div>
        )}
        <div className="flex space-x-2">
          <Calendar className="size-6 text-gray-300" />
          <span>
            Joined{" "}
            {new Date(createdAt).toLocaleString("default", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
