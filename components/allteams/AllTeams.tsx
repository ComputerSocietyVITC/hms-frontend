import React from "react";
import TeamListItem from "./TeamListItem";
import { cn, getImageUrl } from "@/lib/utils";
import { Team } from "@/types";

interface AllTeamsProps {
  teams: Team[];
  onClickUpdate: (teamId: string) => void;
  customStyle?: string;
}

const AllTeams = ({ teams, onClickUpdate, customStyle }: AllTeamsProps) => {
  return (
    <div
      className={cn(
        `flex flex-col border border-gray-700 bg-[#121212] rounded-lg p-6 h-full w-full shadow-lg`,
        customStyle
      )}
    >
      <h2 className="text-3xl font-black text-gray-200">Teams</h2>
      <p className="text-sm text-gray-400">Select a team to view details</p>

      <div className="mt-4 overflow-y-auto h-full">
        {teams.map((team) => (
          <TeamListItem
            key={team.id}
            teamId={team.id}
            teamName={team.name}
            teamAvatar={getImageUrl(team.imageId, team.mimeType)!}
            onClick={(teamId) => onClickUpdate(teamId)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllTeams;
