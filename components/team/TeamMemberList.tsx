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
import { TeamMemberListItem } from "./TeamMemberListItem";
import { cn } from "@/lib/utils";

interface TeamMember {
  githubId: string | null;
  name: string;
  avatarSrc: string;
  userId?: string;
  avatarAlt?: string;
  nonClickable?: boolean;
  className?: string;
}

type TeamMemberListProps = {
  teamId?: string;
  list: TeamMember[];
  nonClickable?: boolean;
  displayInviteButton?: boolean;
  displayRemoveButton?: boolean;
  currentUserId: string;
  onMemberRemove?: (userId: string) => Promise<void>;
  className?: string;
};

const TeamMemberList = ({
  teamId,
  list,
  nonClickable,
  displayInviteButton = true,
  displayRemoveButton,
  currentUserId,
  onMemberRemove,
  className,
  ...props
}: TeamMemberListProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const inviteLink = teamId
    ? `${window.location.origin}/joinTeam/${teamId}`
    : "";

  return (
    <div
      className={cn(
        "relative flex flex-col p-5 rounded-lg border border-gray-700 bg-[#121212] text-white w-full",
        className
      )}
      {...props}
    >
      <div className="flex border-b border-gray-600 items-center justify-between">
        <h1 className="pb-4 text-xl md:text-2xl font-extrabold">
          Team Members
        </h1>
      </div>

      <div className="flex flex-col mt-3 max-h-96 overflow-y-auto space-y-2">
        {list.map((member) => (
          <TeamMemberListItem
            key={member.userId || member.githubId || member.name} // Better key strategy
            {...member}
            nonClickable={nonClickable}
            leaderView={displayRemoveButton}
            currentUserId={currentUserId}
            removeMember={onMemberRemove}
          />
        ))}
      </div>

      {displayInviteButton && teamId && (
        <div className="mt-4 flex justify-center">
          <PositiveButton
            buttonText="Invite"
            onClick={() => setDialogOpen(true)}
            customStyle="w-full"
          />
        </div>
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
