import Image from "next/image";

export type TeamMemberListItemProps = {
  githubId: string | null;
  name: string;
  avatarSrc: string;
  avatarAlt?: string;
  className?: string;
};

export const TeamMemberListItem = ({
  githubId,
  name,
  avatarSrc,
  avatarAlt,
  className,
  ...props
}: TeamMemberListItemProps) => {
  return (
    <div
      {...props}
      className={`${className} flex items-center space-x-4 p-2 rounded-md hover:bg-neutral-900 cursor-pointer transition-all`}
    >
      <Image
        src={avatarSrc}
        alt={avatarAlt || "team-member-pfp"}
        height={64}
        width={64}
        className="size-12 md:size-14 rounded-full border border-gray-600"
      />
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-lg md:text-xl">{name}</h1>
        <span className="text-sm md:text-base text-gray-400">
          {githubId || "No GitHub ID"}
        </span>
      </div>
    </div>
  );
};
