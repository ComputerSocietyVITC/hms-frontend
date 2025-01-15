import Image from "next/image";

/**
 * Example;
   <TeamMemberListItem name="shivzee" githubId="shivam1608" avatarSrc="/image.png" />
 */

export type TeamMemberListItemProps = {
  githubId: string;
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
    <div {...props} className={`${className} flex items-center space-x-2 p-2`}>
      <Image
        src={avatarSrc}
        alt={avatarAlt || "team-member-pfp"}
        height={64}
        width={64}
        className="size-10 rounded-full"
      ></Image>
      <div className="flex flex-col justify-center -space-y-1">
        <h1 className="font-semibold text-base md:text-lg">{name}</h1>
        <span className="text-xs md:text-sm">{githubId}</span>
      </div>
    </div>
  );
};
