"use client";

import api from "@/api";
import AllTeams from "@/components/AllTeams";
import SelectedTeamInfo from "@/components/SelectedTeamInfo";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

export default function Page() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedTeamInfo, setSelectedTeamInfo] = useState<Team | null>(null);
  const [teams2, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState("");

  const fetchTeams = async () => {
    try {
      const response = await api.get("/team/all");

      if (response.status === 200) {
        setTeams(response.data);
        console.log(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 403) {
            setError(
              "You do not have sufficient permissions to perform this action."
            );
          } else if (error.response.status === 500) {
            setError("Internal Server Error. Please try again later.");
          } else {
            setError("An unexpected error occured.");
          }
        } else {
          setError("Please check your internet connection.");
        }
      }
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const teams = teams2.map(({ id, name }) => ({ id, name }));

  const handleTeamClick = (teamId: string) => {
    setSelectedTeam(teamId);
    const teamData = teams2.find((team) => team.id === teamId) || null;
    setSelectedTeamInfo(teamData);
  };

  useEffect(() => {
    if (selectedTeam) {
      console.log("Selected team:", selectedTeam);
      console.log("Selected team info:", selectedTeamInfo);
    }
  }, [selectedTeam, selectedTeamInfo]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center w-full bg-white py-3 px-6 border-b border-b-[#D9D9D9]">
        <div className="text-lg font-bold">Hackathon Teams</div>
      </header>
      <div className="flex-grow w-full flex flex-row gap-4 p-4 bg-[#F3F4F6]">
        <AllTeams
          teams={teams}
          onClickUpdate={handleTeamClick}
          customStyle="flex-[1]"
        />
        {selectedTeamInfo && (
          <SelectedTeamInfo selectedTeamInfo={selectedTeamInfo} />
        )}
      </div>
    </div>
  );
}
