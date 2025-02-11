"use client";

import React, { useEffect } from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
}

interface ProjectInformationInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageId: string;
  teamId: string;
  evaluations: Evaluation[];
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const ProjectInformation = ({
  project,
}: {
  project: ProjectInformationInterface | null;
}) => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return (
    <div className="rounded-lg border border-gray-700 bg-[#121212] text-white p-6 w-full">
      <h1 className="text-2xl font-extrabold pb-4 border-b border-gray-600">
        Project Information
      </h1>

      {!project ? (
        <div className="flex flex-col w-full py-20 items-center justify-center">
          <p className="text-lg text-gray-300 text-center">
            Your team does not have a project.
          </p>
          {user?.isLeader ? (
            <Link href="/newproject">
              <Button
                customStyle="mt-4 w-full bg-blue-600 hover:bg-blue-500"
                buttonText="Create a new project"
                onClick={() => {}}
              />
            </Link>
          ) : (
            <p className="text-gray-300 text-center">
              Ask your team leader to create a project.
            </p>
          )}
        </div>
      ) : (
        <div>
          <div className="mt-4 space-y-3">
            <div>
              <span className="block text-sm text-gray-400">Project Name</span>
              <span className="text-lg font-semibold">{project.name}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">
                Project Description
              </span>
              <p className="text-base">{project.description}</p>
            </div>
            <div>
              <span className="block text-sm text-gray-400">Created On</span>
              <span className="text-base">
                {new Date(project.createdAt).toLocaleDateString(
                  "en-US",
                  options
                )}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-400">
                Current Evaluation Score
              </span>
              <span className="text-lg font-semibold">
                {project.evaluations.length > 0
                  ? project.evaluations[0].score
                  : "N/A"}{" "}
                / 10
              </span>
            </div>
          </div>
        </div>
      )}

      {project && (
        <Button
          buttonText="Edit Project Details"
          customStyle="w-full bg-blue-600 hover:bg-blue-500"
          onClick={() => console.log("Editing project with ID: ", project.id)}
        />
      )}
    </div>
  );
};

export default ProjectInformation;
