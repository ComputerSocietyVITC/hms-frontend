import Image from "next/image";
import Link from "next/link";
import DialogBox from "../ui/DialogBox";
import { useState } from "react";
import DangerButton from "../ui/DangerButton";
import { cn } from "@/lib/utils";

export type TeamMemberListItemProps = {
  githubId: string | null;
  name: string;
  avatarSrc: string;
  userId?: string;
  avatarAlt?: string;
  nonClickable?: boolean;
  leaderView?: boolean;
  currentUserId: string;
  removeMember?: (userId: string) => Promise<void>;
  className?: string;
};

export const TeamMemberListItem = ({
  githubId,
  name,
  avatarSrc,
  userId,
  avatarAlt,
  nonClickable,
  leaderView,
  currentUserId,
  removeMember,
  className,
  ...props
}: TeamMemberListItemProps) => {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoveDialogOpen(true);
  };

  const handleRemoveMember = async () => {
    if (!userId || !removeMember) return;

    try {
      setIsRemoving(true);
      await removeMember(userId);
      setIsRemoveDialogOpen(false);
    } catch (error) {
      console.error("Failed to remove member:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const memberInfo = (
    <div className="flex flex-row space-x-4">
      {avatarSrc ? (
        <Image
          src={avatarSrc}
          alt={avatarAlt || "team-member-pfp"}
          height={64}
          width={64}
          className="size-12 md:size-14 rounded-full border border-gray-600"
        />
      ) : (
        <div className="size-12 md:size-14 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold text-lg md:text-xl border border-gray-600">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-lg md:text-xl">
          {userId === currentUserId ? `${name} (You)` : name}
        </h1>
        <span className="text-sm md:text-base text-gray-400">
          {githubId || "No GitHub ID"}
        </span>
      </div>
    </div>
  );

  const removeButton = leaderView && (
    <div onClick={handleRemoveClick}>
      <DangerButton
        buttonText={isRemoving ? "Removing..." : "Remove"}
        onClick={() => {}}
        disabled={isRemoving}
      />
    </div>
  );

  const content = (
    <div
      {...props}
      className={cn(
        "flex items-center justify-between p-2",
        "rounded-md hover:bg-neutral-900",
        "transition-all",
        !nonClickable && "cursor-pointer",
        className
      )}
    >
      {memberInfo}
      {userId !== currentUserId && removeButton}
    </div>
  );

  return (
    <div>
      {nonClickable ? (
        content
      ) : (
        <Link href={`/user/${userId}`} target="_blank">
          {content}
        </Link>
      )}
      {leaderView && (
        <DialogBox
          isOpen={isRemoveDialogOpen}
          title="Confirm Remove"
          message={`Are you sure you want to remove the user ${name} from the team?`}
          positive={false}
          onConfirm={handleRemoveMember}
          onCancel={() => setIsRemoveDialogOpen(false)}
        />
      )}
    </div>
  );
};
