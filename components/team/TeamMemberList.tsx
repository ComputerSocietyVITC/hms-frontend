/**
 * Example;
   <TeamMemberList className="w-96" list={[
        {name : 'shivzee' , githubId : "shivam1608" , avatarSrc: "/image.png"},
        {name : 'shivzee' , githubId : "shivam1608" , avatarSrc: "/image.png"},
        {name : 'shivzee' , githubId : "shivam1608" , avatarSrc: "/image.png"},
    ]} />
 */

import { useState } from "react";
import CopyLinkDialog from "../ui/CopyLinkDialog";
import PositiveButton from "../ui/PositiveButton";
import {
  TeamMemberListItem,
  TeamMemberListItemProps,
} from "./TeamMemberListItem";

type TeamMemberListProps = {
  teamId?: string;
  list: TeamMemberListItemProps[];
  nonClickable?: boolean;
  displayInviteButton?: boolean;
  className?: string;
};

const TeamMemberList = ({
  teamId,
  list,
  nonClickable,
  displayInviteButton = true,
  className,
  ...props
}: TeamMemberListProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const inviteLink = `${window.location.origin}/joinTeam/${teamId}`;

  return (
    <div
      className={`relative flex flex-col p-5 rounded-lg border border-gray-700 bg-[#121212] text-white w-full ${className}`}
      {...props}
    >
      <div className="flex border-b border-gray-600 items-center justify-between">
        <h1 className="pb-4 text-xl md:text-2xl font-extrabold">
          Team Members
        </h1>
      </div>

      <div className="flex flex-col mt-3 max-h-96 overflow-y-auto space-y-2">
        {list.map((v, index) => (
          <TeamMemberListItem key={index} {...v} nonClickable={nonClickable} />
        ))}
      </div>

      {displayInviteButton && (
        <PositiveButton
          buttonText="Invite"
          onClick={() => setDialogOpen(true)}
          customStyle="absolute bottom-6 z-10"
        />
      )}

      <CopyLinkDialog
        isOpen={dialogOpen}
        inviteLink={inviteLink}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default TeamMemberList;
