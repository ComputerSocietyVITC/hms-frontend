import Image from "next/image";
import DangerButton from "../ui/DangerButton";
import Button from "../ui/Button";
import Link from "next/link";
import PositiveButton from "../ui/PositiveButton";
import axios from "axios";
import DialogBox from "../ui/DialogBox";
import { useState } from "react";
import api from "@/api";
import { Project } from "@/types";

export type ProjectListProps = {
  projects: Project[];
  onDelete: (projectId: string) => void;
};

const ProjectList = ({ projects, onDelete }: ProjectListProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const handleClick = async (projectId: string) => {
    onDelete(projectId);
    setIsDeleteDialogOpen(false);

    try {
      const response = await api.delete(`/project/${projectId}`);

      if (response.status !== 200) {
        throw new Error("Failed to delete project");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 403) {
            throw new Error(
              "Forbidden. User does not have sufficient permissions."
            );
          } else if (error.response.status === 404) {
            throw new Error("Project not found.");
          } else if (error.response.status === 500) {
            throw new Error("Unexpected server error.");
          } else {
            throw new Error(
              "An unexpected error occurred. Please try again later."
            );
          }
        } else {
          throw new Error(
            "Please check your network connection and try again."
          );
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-center justify-between p-5 rounded-lg bg-[#121212] border border-gray-700"
        >
          <div className="flex items-center gap-4">
            {project.imageId ? (
              <Image
                src={`/images/${project.imageId}`}
                alt={project.name}
                height={48}
                width={48}
                className="size-12 rounded-full border border-gray-600"
              />
            ) : (
              <div className="size-12 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold text-lg border border-gray-600">
                {project.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col justify-center">
              <h1 className="font-semibold text-lg">{project.name}</h1>
              <span className="text-sm text-gray-400">
                {project.evaluations && project.evaluations.length > 0
                  ? "Evaluated"
                  : "Not Evaluated"}{" "}
                • Created At:{" "}
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href={`/project/${project.id}`} target="_blank">
              <Button buttonText="View Project" onClick={() => {}} />
            </Link>
            <Link href={`/evaluate/${project.id}`} target="_blank">
              <PositiveButton
                buttonText="Evaluate Project"
                onClick={() => {}}
              />
            </Link>
            <DangerButton
              buttonText="Delete Project"
              onClick={() => {
                setSelectedProjectId(project.id);
                setIsDeleteDialogOpen(true);
              }}
              primary={false}
            />
          </div>

          <DialogBox
            isOpen={isDeleteDialogOpen && selectedProjectId === project.id}
            title="Confirm Delete Project"
            message={`Are you sure you want to delete the project ${project.name}?`}
            positive={false}
            onConfirm={() => handleClick(project.id)}
            onCancel={() => setIsDeleteDialogOpen(false)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
