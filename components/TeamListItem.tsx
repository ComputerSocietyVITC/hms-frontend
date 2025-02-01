import React from "react";

interface TeamListItemProps {
  teamId: string;
  teamName: string;
  teamAvatar: string;
  onClick: (teamId: string) => void;
}

const TeamListItem: React.FC<TeamListItemProps> = ({
  teamId,
  teamName,
  teamAvatar,
  onClick,
}) => {
  return (
    <div className="p-4 cursor-pointer">
      <div className="flex items-center gap-5" onClick={() => onClick(teamId)}>
        <div className="w-12 h-12 flex items-center justify-center bg-[#1E1E1E] text-white text-xl font-bold rounded-full">
          {teamAvatar ? (
            <img
              src={teamAvatar}
              alt={teamName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            teamName.charAt(0).toUpperCase()
          )}
        </div>
        <span className="text-lg font-medium">{teamName}</span>
      </div>

      <div className="w-full h-[1px] bg-[#D6D6D6] mt-4 mx-auto" />
    </div>
  );
};

export default TeamListItem;
