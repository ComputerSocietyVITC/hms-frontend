"use client";

import api from "@/api";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectInformation from "@/components/project/ProjectInformation";
import FooterSection from "@/components/ui/FooterSection";
import HeaderComponent from "@/components/ui/HeaderComponent";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, use } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import PositiveButton from "@/components/ui/PositiveButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import EvaluationList from "@/components/evaluations/EvaluationList";

interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
  userId: string;
}

interface Team {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  imageId: string;
}

interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageId: string;
  mimeType: string;
  teamId: string;
  team: Team;
  evaluations: Evaluation[];
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Profile = ({ params }: Props) => {
  const { user, userId, loading, getUser } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [evaluationList, setEvaluationList] = useState<Evaluation[] | null>();
  const router = useRouter();

  const { id } = use(params);

  const getProjectEvaluations = async (projectId: string) => {
    try {
      const response = await api.get(`/evaluation/${projectId}`);

      if (response.status === 200) {
        setEvaluationList(response.data.length > 0 ? response.data : []);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 403:
            setError(
              "You do not have sufficient permissions to view evaluations."
            );
            break;
          case 404:
            setError("Project ID not found");
            break;
          case 500:
            setError("Internal server error. Please try again later.");
            break;
          default:
            setError("An unexpected error occurred.");
        }
      }
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  useEffect(() => {
    if (id) {
      const getProject = async () => {
        if (!id) return;

        try {
          const response = await api.get(`/project/${id}`);
          if (response.status === 200) {
            setProject(response.data);
            await getProjectEvaluations(response.data.id);
          }

          if (!response.data) {
            router.push("/");
          }
        } catch (err: unknown) {
          if (axios.isAxiosError(err) && err.response) {
            switch (err.response.status) {
              case 403:
                setError(
                  "Forbidden. User does not have sufficient permissions."
                );
                break;
              case 404:
                setError("Project not found.");
                break;
              case 500:
                setError("Unexpected Server Error.");
                break;
              default:
                setError(
                  "An unexpected error occurred. Please try again later."
                );
            }
          } else {
            setError("An unexpected error occurred. Please try again later.");
          }
        }
      };

      getProject();
    }
  }, [id, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
      <HeaderComponent />
      <div className="flex flex-grow flex-row w-[80%] mx-auto align-center justify-center mt-16">
        <ProjectCard
          createdAt={
            project?.createdAt
              ? formatDate(project.createdAt)
              : formatDate(new Date().toISOString())
          }
          updatedAt={
            project?.updatedAt
              ? formatDate(project.updatedAt)
              : formatDate(new Date().toISOString())
          }
          name={project?.name || ""}
          imageId={project?.imageId || ""}
          mimeType={project?.mimeType || ""}
          evaluations={evaluationList || []}
          teamName={project?.team?.name || ""}
          customStyle="w-[1/4]"
        />
        <div className="ml-8 flex flex-col gap-4 my-auto">
          <ProjectInformation
            adminView={true}
            teamName={project?.team?.name || "Not in a team"}
            description={project?.description || "No description"}
            customStyle="w-[3/4]"
          />
          <Link href={`/evaluate/${project?.id}`} target="_blank">
            <PositiveButton
              buttonText="Evaluate Project"
              customStyle="w-full"
              onClick={() => {}}
            />
          </Link>
        </div>
      </div>
      {evaluationList && (
        <EvaluationList
          projectId={project?.id || ""}
          currentUserId={userId || ""}
          evaluations={evaluationList}
        />
      )}
      <FooterSection />
    </div>
  );
};

export default Profile;
