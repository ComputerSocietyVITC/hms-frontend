import React from "react";
import TeamListItem from "./TeamListItem";

interface Team {
  id: string;
  name: string;
}

interface AllTeamsProps {
  teams: Team[];
  onClickUpdate: (teamId: string) => void;
}

const AllTeams: React.FC<AllTeamsProps> = ({ teams, onClickUpdate }) => {
  return (
    <div className="flex flex-col border border-[#D9D9D9] bg-white rounded-md p-8 h-full w-full">
      <span className="text-2xl font-bold">Teams</span>
      <span className="text-md">Select a team to view details</span>
      <div className="mt-4 overflow-y-auto h-full">
        {teams.map((team) => (
          <TeamListItem
            key={team.id}
            teamId={team.id}
            teamName={team.name}
            teamAvatar="https://github.com/ComputerSocietyVITC.png"
            onClick={(teamId) => {
              console.log(teamId);
              onClickUpdate(teamId);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AllTeams;
