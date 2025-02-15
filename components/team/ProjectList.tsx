import Image from "next/image";
import DangerButton from "../ui/DangerButton";
import Button from "../ui/Button";
import Link from "next/link";
import PositiveButton from "../ui/PositiveButton";
import DialogBox from "../ui/DialogBox";
import { useState } from "react";

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const handleClick = async (projectId: string) => {
    onDelete(projectId);
    setIsDeleteDialogOpen(false);
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
                {project.evaluations.length > 0 ? "Evaluated" : "Not Evaluated"}{" "}
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
            <Link href={`/evaluateProject/${project.id}`} target="_blank">
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
