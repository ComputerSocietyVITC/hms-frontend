"use client";

import api from "@/api";
import AllTeams from "@/components/allteams/AllTeams";
import DangerButton from "@/components/ui/DangerButton";
import SelectedTeamInfo from "@/components/allteams/SelectedTeamInfo";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Team } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

export default function Page() {
  const [selectedTeamInfo, setSelectedTeamInfo] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [unauthorizedUser, setUnauthorizedUser] = useState(false);

  const { user, getUser, loading } = useAuth();

  useEffect(() => {
    if (!user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            setUnauthorizedUser(true);
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

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeamClick = (teamId: string) => {
    const teamData = teams.find((team) => team.id === teamId) || null;
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        error={error}
        type={unauthorizedUser ? "unauthorized" : "generic"}
      />
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
          onChange={(e) => {
            setSelectedTeamInfo(null);
            setSearchTerm(e.target.value);
          }}
          className="px-3 py-1 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-gray-500"
        />
        <Link
          href={`${user?.role === "EVALUATOR" ? "/evaluatorcontrols" : "/admincontrols"}`}
        >
          <DangerButton buttonText="Go Back" onClick={() => {}} />
        </Link>
      </header>
      <div className="flex-grow w-full flex flex-row gap-4 p-4 bg-[#09090b]">
        <AllTeams
          teams={filteredTeams}
          onClickUpdate={handleTeamClick}
          customStyle="flex-[1]"
        />
        {selectedTeamInfo && (
          <SelectedTeamInfo
            selectedTeamInfo={selectedTeamInfo}
            evaluatorMode={user?.role === "EVALUATOR"}
            onTeamDelete={handleTeamDelete}
            onCloseClick={() => setSelectedTeamInfo(null)}
          />
        )}
      </div>
    </div>
  );
}
