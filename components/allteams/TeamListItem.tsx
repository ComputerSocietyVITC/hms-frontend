import React from "react";
import Image from "next/image";

interface TeamListItemProps {
  teamId: string;
  teamName: string;
  teamAvatar?: string;
  onClick: (teamId: string) => void;
}

const TeamListItem: React.FC<TeamListItemProps> = ({
  teamId,
  teamName,
  teamAvatar,
  onClick,
}) => {
  return (
    <div>
      <div
        className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-neutral-800"
        onClick={() => onClick(teamId)}
      >
        {teamAvatar ? (
          <Image
            src={teamAvatar}
            alt={teamName}
            className="rounded-full object-cover"
            width={42}
            height={42}
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-700 text-white text-lg font-bold rounded-full">
            {teamName.charAt(0).toUpperCase()}
          </div>
        )}

        <span className="text-lg font-medium text-gray-200">{teamName}</span>
      </div>

      <div className="w-full h-[1px] bg-gray-600"></div>
    </div>
  );
};

export default TeamListItem;
