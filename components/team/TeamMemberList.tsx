/**
 * Example;
   <TeamMemberList className="w-96" list={[
        {name : 'shivzee' , githubId : "shivam1608" , avatarSrc: "/image.png"},
        {name : 'shivzee' , githubId : "shivam1608" , avatarSrc: "/image.png"},
        {name : 'shivzee' , githubId : "shivam1608" , avatarSrc: "/image.png"},
    ]} />
 */

import {
  TeamMemberListItem,
  TeamMemberListItemProps,
} from "./TeamMemberListItem";

type TeamMemberListProps = {
  list: TeamMemberListItemProps[];
  className?: string;
};

const TeamMemberList = ({ list, className, ...props }: TeamMemberListProps) => {
  return (
    <div
      className={`flex flex-col p-5 rounded-lg border border-gray-700 bg-[#121212] text-white w-full ${className}`}
      {...props}
    >
      <h1 className="pb-3 md:pb-5 text-xl md:text-2xl font-extrabold border-b border-gray-600">
        Team Members
      </h1>

      <div className="flex flex-col mt-3 max-h-96 overflow-y-auto space-y-2">
        {list.map((v, index) => (
          <TeamMemberListItem key={index} {...v} />
        ))}
      </div>
    </div>
  );
};

export default TeamMemberList;
