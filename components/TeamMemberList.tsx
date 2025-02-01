import {
  TeamMemberListItem,
  TeamMemberListItemProps,
} from "./TeamMemberListItem";

/**
 * Example;
   <TeamMemberList className="w-96" list={[
        {name : 'shivzee' , githubId : "shivam1608" , avatarSrc: "/image.png"},
        {name : 'shivzee' , githubId : "shivam1608" , avatarSrc: "/image.png"},
        {name : 'shivzee' , githubId : "shivam1608" , avatarSrc: "/image.png"},
    ]} />
 */

type TeamMemberListProps = {
  list: TeamMemberListItemProps[];
  className?: string;
};

const TeamMemberList = ({ list, className, ...props }: TeamMemberListProps) => {
  return (
    <div
      className={`flex flex-col p-3 md:p-4 rounded-lg border border-[#D9D9D9] bg-white w-full ${className}`}
      {...props}
    >
      <h1 className="pb-2 md:pb-4 text-lg md:text-2xl font-bold">
        Team Members
      </h1>

      <div className="flex flex-col max-h-96 overflow-y-auto">
        {list.map((v, _) => {
          return <TeamMemberListItem key={_} {...v} />;
        })}
      </div>
    </div>
  );
};

export default TeamMemberList;
