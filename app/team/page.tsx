"use client";

import api from "@/api";
import ContributionStats from "@/components/team/ContributionStats";
import FooterSection from "@/components/ui/FooterSection";
import ProjectInformation from "@/components/team/ProjectInformation";
import RecentCommits from "@/components/team/RecentCommits";
import TeamInformation from "@/components/team/TeamInformation";
import TeamMemberList from "@/components/team/TeamMemberList";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DangerButton from "@/components/ui/DangerButton";
import { useRouter } from "next/navigation";
import { Team, Project } from "@/types";

const TeamPage = () => {
  const [response, setResponse] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const { user, getUser } = useAuth();

  const getTeam = async () => {
    if (!user?.teamId) {
      setError("You are not part of any team.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.get<Team>(`/team/${user.teamId}`);

      if (res.status === 200 && res.data) {
        setResponse(res.data);
        setProject(res.data.project);
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

  const handleMemberRemove = async (userId: string) => {
    if (!response?.id) return;

    try {
      await api.delete(`/team/remove`, {
        data: {
          userId: userId,
        },
      });

      setResponse((prevResponse) => {
        if (!prevResponse) return null;

        return {
          ...prevResponse,
          members: prevResponse.members.filter(
            (member) => member.id !== userId
          ),
        };
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 403:
            throw new Error("You are not authorized to remove team members.");
          case 500:
            throw new Error("Internal Server Error. Please try again later.");
          default:
            throw new Error("Failed to remove team member. Please try again.");
        }
      } else {
        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }
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
      <div className="flex justify-center items-center h-screen bg-[#09090b]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300" />
      </div>
    );
  }

  if (error || !response) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#09090b] text-red-400">
        {error || "No team data available."}
      </div>
    );
  }

  const leader = getLeader();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Your Team</h1>
        <DangerButton buttonText="Go Back" onClick={() => router.push("/")} />
      </header>
      <div className="flex flex-grow flex-col p-8 w-full gap-8">
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
                userId: member.id,
                name: member.name,
                githubId: member.github || "",
                avatarSrc: (member.github && `${member.github}.png`) || "",
              })) || []
            }
            nonClickable={true}
            displayInviteButton={user?.isLeader}
            teamId={response.id}
            displayRemoveButton={user?.isLeader}
            currentUserId={user?.id || ""}
            onMemberRemove={handleMemberRemove}
          />
          <ProjectInformation project={project} teamId={response.id} />
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
