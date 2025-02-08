/* eslint-disable react-hooks/exhaustive-deps */
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
    if (!user?.teamId) return;
    try {
      const res = await api.get<TeamResponse>(`/team/${user.teamId}`);

      if (res.status === 200) {
        setResponse(res.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 403:
            setError("You are not authorized to view this page.");
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
  }, [user]);

  const getLeader = () => {
    return response?.members?.find((member) => member.isLeader) || {};
  };

  if (loading || !response) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
      <HeaderComponent />
      <div className="flex flex-grow flex-col p-8 w-full gap-4">
        <div className="flex flex-row justify-between gap-8">
          <TeamInformation
            teamName={response.name}
            createdOn={new Date(response.createdAt)}
            teamLeader={(getLeader() as TeamMember).name || "Unknown Leader"}
            teamId={response.id}
          />
          <TeamMemberList
            list={response.members.map((member) => ({
              name: member.name,
              githubId: member.github || "",
              avatarSrc: "/avatar.png",
            }))}
          />
          <ProjectInformation
            projectName={response.project?.name || "No Project"}
            projectDescription={
              response.project?.description || "No Description"
            }
            createdOn={
              response.project?.createdAt
                ? new Date(response.project.createdAt)
                : new Date()
            }
            currentScore={response.project?.evaluations?.[0]?.score || 0}
            projectId={response.project?.id || "N/A"}
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
