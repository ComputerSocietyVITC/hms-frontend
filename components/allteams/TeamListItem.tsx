import React from "react";
import Image from "next/image";

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
    <div>
      <div
        className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-neutral-800"
        onClick={() => onClick(teamId)}
      >
        <Image
          src={teamAvatar}
          alt={teamName}
          className="rounded-full object-cover w-12 h-12"
          width={48}
          height={48}
        />
        <span className="text-lg font-medium text-gray-200">{teamName}</span>
      </div>

      <div className="w-full h-[1px] bg-gray-600"></div>
    </div>
  );
};

export default TeamListItem;
