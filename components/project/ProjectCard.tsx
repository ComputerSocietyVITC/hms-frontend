import { cn, getImageUrl } from "@/lib/utils";
import { Evaluation } from "@/types";
import { HistoryIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Calendar } from "react-feather";

interface ProjectCardProps {
  createdAt: string;
  updatedAt: string;
  name: string;
  imageId: string | null;
  mimeType: string | null;
  evaluations: Evaluation[] | null;
  teamName: string;
  customStyle?: string;
}

const ProjectCard = ({
  createdAt,
  updatedAt,
  name,
  imageId,
  mimeType,
  evaluations,
  teamName,
  customStyle,
}: ProjectCardProps) => {
  return (
    <div
      className={cn(
        `flex flex-col p-8 rounded-lg border border-gray-700 bg-[#121212] text-white justify-center items-center w-fit h-fit my-auto`,
        customStyle
      )}
    >
      {(imageId && mimeType && (
        <Image
          className="size-48 rounded-full"
          width={1024}
          height={1024}
          src={getImageUrl(imageId, mimeType)!}
          alt="profile_img"
        />
      )) || (
        <div className="size-48 flex items-center justify-center rounded-full bg-gray-700 text-white font-black text-6xl border border-gray-600">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex flex-col text-center my-4">
        <h1 className="text-3xl font-black">{name}</h1>
        <h1 className="text-md text-muted-foreground">from {teamName}</h1>
      </div>

      <div className="flex flex-col space-y-2 text-gray-300">
        <div className="flex space-x-2">
          <ZapIcon className="size-6 text-gray-300" />
          <span>
            {evaluations
              ? "Evaluations: " + evaluations.length
              : "No evaluations"}
          </span>
        </div>
        <div className="flex space-x-2">
          <Calendar className="size-6 text-gray-300" />
          <span>
            Created{" "}
            {new Date(createdAt).toLocaleString("default", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex space-x-2">
          <HistoryIcon className="size-6 text-gray-300" />
          <span>
            Last Updated{" "}
            {new Date(updatedAt).toLocaleString("default", {
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

export default ProjectCard;
