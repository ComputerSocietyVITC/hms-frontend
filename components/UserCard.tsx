import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Calendar, GitHub, MapPin } from "react-feather";

export type User = {
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
  imageId: string;
  isLeader: boolean;
  teamId: string;
};

// Mock Request
const getMe: () => Promise<User> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "123e4567-e89b-12d3-a456-426614174000",
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
        authId: "123e4567-e89b-12d3-a456-426614174000",
        name: "shivzee",
        role: "USER",
        regNum: "24BLC1308",
        phone: "9876543210",
        college: "VIT",
        github: "https://github.com/shivam1608",
        imageId: "123e4567-e89b-12d3-a456-426614174000",
        isLeader: true,
        teamId: "123e4567-e89b-12d3-a456-426614174000",
      });
    }, 1000);
  });
};

const UserCard = async () => {
  const user = await getMe();

  const info = [
    {
      Icon: MapPin,
      Text: user.college,
    },
    {
      Icon: GitHub,
      Text: (
        <Link
          className="hover:text-[#1A237E]"
          href={user.github}
          target="_blank"
        >
          {user.github.match(/github\.com\/([^/]+)/)?.[1]}
        </Link>
      ),
    },
    {
      Icon: Calendar,
      Text: `Joined ${new Date(user.createdAt).toLocaleString("default", { day: "numeric", month: "long", year: "numeric" })}`,
    },
  ];

  return (
    <div className="flex flex-col p-8 rounded-lg border border-[#D9D9D9] justify-center items-center w-fit space-y-2">
      <Image
        className="size-48 rounded-full"
        width={1024}
        height={1024}
        src={`${user.github}.png`}
        alt="profile_img"
      ></Image>

      <div className="flex flex-col -space-y-1">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <span className="text-base">
          {user.isLeader ? "Team Leader" : "Member"}
        </span>
      </div>

      <div className="flex flex-col space-y-2 text-[#1E1E1E]">
        {info.map((v, _) => (
          <div key={_} className="flex space-x-2">
            <v.Icon className="size-6" color="#1E1E1E" />
            <span>{v.Text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
