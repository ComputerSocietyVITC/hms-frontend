import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Calendar, GitHub, MapPin } from "react-feather";

interface UserCardProps {
  id: string;
  createdAt: string;
  name: string;
  college: string;
  github: string;
  isLeader: boolean;
  teamName: string;
  customStyle?: string;
}

const UserCard = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  createdAt,
  name,
  college,
  github,
  isLeader,
  teamName,
  customStyle,
}: UserCardProps) => {
  const info = [
    {
      Icon: MapPin,
      Text: college,
    },
    {
      Icon: GitHub,
      Text: (
        <Link
          className="hover:text-[#1A237E]"
          href={github || "https://github.com/notfound"}
          target="_blank"
        >
          {github && github.match(/github\.com\/([^/]+)/)?.[1]}
        </Link>
      ),
    },
    {
      Icon: Calendar,
      Text: `Joined ${new Date(createdAt).toLocaleString("default", { day: "numeric", month: "long", year: "numeric" })}`,
    },
  ];

  return (
    <div
      className={`flex flex-col p-8 rounded-lg border border-[#D9D9D9] bg-white justify-center items-center w-fit h-fit my-auto ${customStyle}`}
    >
      <Image
        className="size-48 rounded-full"
        width={1024}
        height={1024}
        src={`${github || "https://github.com/notfound"}.png`}
        alt="profile_img"
      />

      <div className="flex flex-col -space-y-1 text-center my-4">
        <h1 className="text-2xl font-bold mb-1">{name}</h1>
        {teamName !== "" && (
          <span className="text-base">{`${isLeader ? "Team Leader" : "Member"} of ${teamName}`}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2 text-[#1E1E1E]">
        {info.map((v, index) => (
          <div key={index} className="flex space-x-2">
            <v.Icon className="size-6" color="#1E1E1E" />
            <span>{v.Text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
