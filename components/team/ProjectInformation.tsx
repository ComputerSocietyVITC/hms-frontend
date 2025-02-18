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
  teamId,
}: {
  project: ProjectInformationInterface | null;
  teamId: string;
}) => {
  const { user, getUser } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canCreateProject = user?.isLeader && user?.teamId === teamId;
  const notFromTeam = user?.teamId !== teamId;

  return (
    <div className="rounded-lg border border-gray-700 bg-[#121212] text-white p-6 w-full">
      <h1 className="text-2xl font-extrabold pb-4 border-b border-gray-600">
        Project Information
      </h1>

      {!project ? (
        <div className="flex flex-col w-full py-20 items-center justify-center">
          {notFromTeam ? (
            <p className="text-lg text-gray-300 text-center">
              This team does not have a project.
            </p>
          ) : (
            <>
              {canCreateProject ? (
                <Link href="/createproject">
                  <Button
                    customStyle="mt-4 w-full bg-blue-600 hover:bg-blue-500"
                    buttonText="Create a new project"
                    onClick={() => {}}
                  />
                </Link>
              ) : (
                <span>
                  <p className="text-gray-300 text-center">
                    Your team does not have a project.
                  </p>
                  <p>Ask your team leader to create a project.</p>
                </span>
              )}
            </>
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
                {project.evaluations
                  ? project.evaluations.length > 0
                    ? `${project.evaluations[0].score} / 10`
                    : "N/A"
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}

      {project && (
        <Link href="/project">
          <Button
            buttonText="View Project"
            customStyle="w-full bg-blue-600 hover:bg-blue-500 mt-4"
            onClick={() => {}}
          />
        </Link>
      )}
    </div>
  );
};

export default ProjectInformation;
