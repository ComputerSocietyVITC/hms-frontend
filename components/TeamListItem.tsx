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
    <div className="mx-2 my-6 cursor-pointer">
      <div className="flex items-center gap-4" onClick={() => onClick(teamId)}>
        {teamAvatar ? (
          <Image
            src={teamAvatar}
            alt={teamName}
            className="rounded-full object-cover"
            width={36}
            height={36}
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-[#1E1E1E] text-white text-xl font-bold rounded-full">
            {teamName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-lg font-medium">{teamName}</span>
      </div>

      <div className="w-full h-[1px] bg-[#D6D6D6] mt-4" />
    </div>
  );
};

export default TeamListItem;
