import React from "react";
import TeamListItem from "./TeamListItem";
import { cn } from "@/lib/utils";

interface Team {
  id: string;
  name: string;
}

interface AllTeamsProps {
  teams: Team[];
  onClickUpdate: (teamId: string) => void;
  customStyle?: string;
}

const AllTeams: React.FC<AllTeamsProps> = ({
  teams,
  onClickUpdate,
  customStyle,
}) => {
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
            onClick={(teamId) => onClickUpdate(teamId)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllTeams;
