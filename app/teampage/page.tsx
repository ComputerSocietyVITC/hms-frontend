"use client";

import api from "@/api";
import ContributionStats from "@/components/ContributionStats";
import FooterSection from "@/components/FooterSection";
import HeaderComponent from "@/components/HeaderComponent";
import ProjectInformation from "@/components/ProjectInformation";
import RecentCommits from "@/components/RecentCommits";
import TeamInformation from "@/components/TeamInformation";
import TeamMemberList from "@/components/TeamMemberList";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface TeamMember {
  id: string;
  createdAt: string;
  updatedAt: string;
  authId: string;
  name: string;
  role: string;
  regNum: string;
  phone: string;
  college: string;
  github: string | null;
  imageId: string | null;
  isLeader: boolean;
  teamId: string;
}

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

interface TeamResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  imageId: string;
  members: TeamMember[];
  project: Project;
}

const TeamPage = () => {
  const [response, setResponse] = useState<TeamResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, getUser } = useAuth();

  const getTeam = async () => {
    if (!user?.teamId) {
      setError("You are not part of any team.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.get<TeamResponse>(`/team/${user.teamId}`);

      if (res.status === 200 && res.data) {
        setResponse(res.data);
      } else {
        setError("Failed to load team data.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 403:
            setError("You are not authorized to view this page.");
            break;
          case 404:
            setError("Team not found.");
            break;
          case 500:
            setError("Internal Server Error. Please try again later.");
            break;
          default:
            setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      getTeam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getLeader = () => {
    const leader = response?.members?.find((member) => member.isLeader);
    return leader || null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error || !response) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error || "No team data available."}</div>
      </div>
    );
  }

  const leader = getLeader();
  const project = response.project || null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
      <HeaderComponent />
      <div className="flex flex-grow flex-col p-8 w-full gap-4">
        <div className="flex flex-row justify-between gap-8">
          <TeamInformation
            teamName={response.name || "Unnamed Team"}
            createdOn={new Date(response.createdAt)}
            teamLeader={leader?.name || "No Leader Assigned"}
            teamId={response.id}
          />
          <TeamMemberList
            list={
              response.members?.map((member) => ({
                name: member.name || "Unknown Member",
                githubId: member.github || "",
                avatarSrc: member.imageId
                  ? `/api/images/${member.imageId}`
                  : "/avatar.png",
              })) || []
            }
          />
          <ProjectInformation
            projectName={project?.name || "No Project"}
            projectDescription={project?.description || "No Description"}
            createdOn={
              project?.createdAt ? new Date(project.createdAt) : new Date()
            }
            currentScore={project?.evaluations?.[0]?.score ?? 0}
            projectId={project?.id || "N/A"}
          />
        </div>
        <div className="flex flex-row gap-8">
          <RecentCommits list={[]} />
          <ContributionStats />
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default TeamPage;
