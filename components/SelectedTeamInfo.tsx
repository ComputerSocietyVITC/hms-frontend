"use client";

import React from "react";
import { TeamMemberListItem } from "@/components/TeamMemberListItem";
import DangerButton from "./DangerButton";
import api from "@/api";
import axios from "axios";

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

interface Member {
  id: string;
  createdAt: string;
  updatedAt: string;
  authId: string;
  name: string;
  role: string;
  regNum: string;
  phone: string;
  college: string;
  github: string;
  imageId: string;
  isLeader: boolean;
  teamId: string;
}

interface Team {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  imageId: string;
  members: Member[];
  project: Project;
}

interface SelectedTeamInfoProps {
  selectedTeamInfo: Team;
  onTeamDelete: () => void;
}

const SelectedTeamInfo: React.FC<SelectedTeamInfoProps> = ({
  selectedTeamInfo,
  onTeamDelete,
}) => {
  const extractGitHubUsername = (url: string | null | undefined): string => {
    if (!url) return "GitHub ID not set";

    const regex = /https:\/\/github\.com\/([^\/]+)/;
    const match = url.match(regex);

    return match ? match[1] : "Invalid URL";
  };

  const handleTeamDelete = async () => {
    try {
      const response = await api.delete(`/team/${selectedTeamInfo.id}`);

      if (response.status === 200) {
        onTeamDelete();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  };

  return (
    <div className="p-4 border rounded-md border-[#D9D9D9] bg-white flex-[3] h-fit">
      {selectedTeamInfo.project && (
        <div>
          <h2 className="text-2xl font-bold">
            {selectedTeamInfo.project.name}
          </h2>
          <p>by {selectedTeamInfo.name}</p>
          <div className="mt-4">
            <p className="font-bold">Project Description</p>
            <p>{selectedTeamInfo.project.description}</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2">
        <div>
          <h3 className="font-semibold mt-4">Team Members</h3>
          <ul>
            {selectedTeamInfo.members.map((member) => (
              <TeamMemberListItem
                key={member.id}
                name={member.isLeader ? `${member.name} (Leader)` : member.name}
                githubId={extractGitHubUsername(member.github)}
                avatarSrc="https://github.com/example.png"
              />
            ))}
          </ul>
        </div>
        {selectedTeamInfo.project && (
          <div>
            <h3 className="font-semibold mt-4">Project Details</h3>
            <p>
              Created:{" "}
              {new Date(selectedTeamInfo.project.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
              <br />
              Last Updated:{" "}
              {new Date(selectedTeamInfo.project.updatedAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
              <br />
              Current Evaluation:{" "}
              {selectedTeamInfo.project.evaluations[0]?.score || "N/A"} / 10
            </p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <DangerButton buttonText="Delete Team" onClick={handleTeamDelete} />
      </div>
    </div>
  );
};

export default SelectedTeamInfo;
