/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import api from "@/api";
import ContributionStats from "@/components/team/ContributionStats";
import FooterSection from "@/components/ui/FooterSection";
import HeaderComponent from "@/components/ui/HeaderComponent";
import ProjectInformation from "@/components/team/ProjectInformation";
import RecentCommits from "@/components/team/RecentCommits";
import TeamInformation from "@/components/team/TeamInformation";
import TeamMemberList from "@/components/team/TeamMemberList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Team, User } from "@/types";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { getImageUrl } from "@/lib/utils";

const TeamPage = ({ params }: { params: Promise<{ teamId: string }> }) => {
  const [response, setResponse] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getTeam = async () => {
    try {
      const { teamId } = await params;

      if (!teamId) {
        setError("Team ID is required");
        return;
      }

      const res = await api.get<Team>(`/team/${teamId}`);

      if (res.status === 200) {
        setResponse(res.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 403:
            setError("You are not authorized to view this team.");
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
    getTeam();
  }, [params]);

  const getLeader = () => {
    return response?.members?.find((member) => member.isLeader) || {};
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!response) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#09090b] text-white">
        No team data available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
      <HeaderComponent />
      <div className="flex flex-grow flex-col p-8 w-full gap-8">
        <div className="flex flex-row justify-between gap-8">
          <TeamInformation
            teamName={response.name}
            createdOn={new Date(response.createdAt)}
            teamLeader={(getLeader() as User).name || "Unknown Leader"}
            teamId={response.id}
          />
          <TeamMemberList
            list={response.members.map((member) => ({
              name: member.name,
              githubId: member.github || "",
              avatarSrc:
                getImageUrl(member.imageId, member.mimeType) ||
                (member.github && `https://github.com/${member.github}.png`) ||
                "",
              userId: member.id,
            }))}
            displayInviteButton={false}
            currentUserId={""}
          />
          <ProjectInformation project={response.project} teamId={response.id} />
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
