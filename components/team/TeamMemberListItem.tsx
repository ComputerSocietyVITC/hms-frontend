import Image from "next/image";
import Link from "next/link";

export type TeamMemberListItemProps = {
  githubId: string | null;
  name: string;
  avatarSrc: string;
  userId?: string;
  avatarAlt?: string;
  className?: string;
};

export const TeamMemberListItem = ({
  githubId,
  name,
  avatarSrc,
  userId,
  avatarAlt,
  className,
  ...props
}: TeamMemberListItemProps) => {
  return (
    <Link href={`/user/${userId}`} target="_blank">
      <div
        {...props}
        className={`${className} flex items-center space-x-4 p-2 rounded-md hover:bg-neutral-900 cursor-pointer transition-all`}
      >
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
          <h1 className="font-bold text-lg md:text-xl">{name}</h1>
          <span className="text-sm md:text-base text-gray-400">
            {githubId || "No GitHub ID"}
          </span>
        </div>
      </div>
    </Link>
  );
};
