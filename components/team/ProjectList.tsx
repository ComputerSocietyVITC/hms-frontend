"use client";

import React from "react";
import Link from "next/link";
import Button from "../ui/Button";
import DangerButton from "../ui/DangerButton";

interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
}

interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageId: string;
  teamId: string;
  evaluations: Evaluation[];
}

export type ProjectListProps = {
  projects: Project[];
  onDelete: (projectId: string) => void;
};

const ProjectList = ({ projects, onDelete }: ProjectListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="p-4 bg-gray-800 rounded-lg shadow-md text-white flex justify-between items-center border border-gray-700"
        >
          <div>
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p className="text-sm text-gray-400">
              Created At: {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm">
              Status: {project.evaluations.length > 0 ? "Evaluated" : "Not Evaluated"}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/project/${project.id}`}>
              <Button buttonText="View Project" onClick={() => {}} />
            </Link>
            <Button
              buttonText="Evaluate Project"
              customStyle="bg-yellow-600 hover:bg-yellow-500"
              onClick={() => console.log(`Evaluating project with ID: ${project.id}`)}
            />
            <DangerButton
              buttonText="Delete Project"
              onClick={() => onDelete(project.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
