"use client";

import api from "@/api";
import AllTeams from "@/components/allteams/AllTeams";
import DangerButton from "@/components/ui/DangerButton";
import SelectedTeamInfo from "@/components/allteams/SelectedTeamInfo";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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
  const [selectedTeamInfo, setSelectedTeamInfo] = useState<Team | null>(null);
  const [teams2, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTeams = async () => {
    try {
      const response = await api.get("/team/all");

      if (response.status === 200) {
        setTeams(response.data);
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
            setError("An unexpected error occurred.");
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

  const filteredTeams = teams2.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const teams = filteredTeams.map(({ id, name }) => ({ id, name }));

  const handleTeamClick = (teamId: string) => {
    const teamData = teams2.find((team) => team.id === teamId) || null;
    setSelectedTeamInfo(teamData);
  };

  const handleTeamDelete = async (deletedTeamId: string) => {
    try {
      await api.delete(`/team/${deletedTeamId}`);

      setTeams((prevTeams) =>
        prevTeams.filter((team) => team.id !== deletedTeamId)
      );

      setSelectedTeamInfo((prevSelected) =>
        prevSelected?.id === deletedTeamId ? null : prevSelected
      );
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-white">
      <header className="w-full bg-[#121212] flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <div className="text-lg font-bold">Hackathon Teams</div>
        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-gray-500"
        />
        <Link href="/admincontrols">
          <DangerButton buttonText="Go Back" onClick={() => {}} />
        </Link>
      </header>
      <div className="flex-grow w-full flex flex-row gap-4 p-4 bg-[#09090b]">
        <AllTeams
          teams={teams}
          onClickUpdate={handleTeamClick}
          customStyle="flex-[1]"
        />
        {selectedTeamInfo && (
          <SelectedTeamInfo
            selectedTeamInfo={selectedTeamInfo}
            onTeamDelete={handleTeamDelete}
          />
        )}
      </div>
    </div>
  );
}
