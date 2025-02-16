import React, { useEffect, useState } from "react";
import Card from "../ui/Card";
import api from "@/api";

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageId: string | null;
  teamId: string;
}

const CardList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/showcase/projects");

        const sortedProjects = response.data
          .sort(
            (a: Project, b: Project) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 6);
        setProjects(sortedProjects);
      } catch (err) {
        setError("Failed to fetch projects");
        console.error("Error fetching projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        {error}
      </div>
    );
  }

  const chunkArray = (arr: Project[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const projectRows = chunkArray(projects, 3);

  return (
    <div className="w-full p-4 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center mb-4">Recent Projects</h1>
      {projectRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row justify-center gap-8 w-full"
        >
          {row.map((project) => (
            <div key={project.id} className="max-w-sm">
              <Card title={project.name} description={project.description} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CardList;
