import Image from "next/image";

export type TeamMemberListItemProps = {
  githubId: string | null;
  name: string;
  teamName: string | null;
  avatarSrc: string;
  avatarAlt?: string;
  className?: string;
  userId: string;
};

export const TeamMemberListItem = ({
  githubId,
  name,
  teamName,
  avatarSrc,
  avatarAlt,
  className,
  userId,
  ...props
}: TeamMemberListItemProps) => {
  const handleClick = () => {
    console.log("User ID:", userId);
  };

  return (
    <div
      {...props}
      className={`${className} flex items-center space-x-2 p-2 cursor-pointer`}
      onClick={handleClick}
    >
      <Image
        src={avatarSrc}
        alt={avatarAlt || "team-member-pfp"}
        height={64}
        width={64}
        className="size-10 rounded-full"
      />
      <div className="flex flex-col justify-center -space-y-1">
        <h1 className="font-semibold text-base md:text-lg">{name}</h1>
        <span className="text-xs md:text-sm">
          {githubId || "No GitHub ID"} • {teamName || "No Team"}
        </span>
      </div>
    </div>
  );
};