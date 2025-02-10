/**
 * Example;
   <RecentCommits list={[
        {commitMessage : "fix: hover button issue" , commitAuthor : "shivzee" , timeStamp : "2025-01-10T14:00:00Z"},
        {commitMessage : "feat: add revision 2" , commitAuthor : "shivzee" , timeStamp : "2025-01-11T14:00:00Z"},
        {commitMessage : "lint: linting" , commitAuthor : "shivzee" , timeStamp : "2025-01-12T14:00:00Z"},
    ]} />
 */

import CommitListItem, { CommitListItemProps } from "./CommitListItem";

type RecentCommitsProps = {
  list: CommitListItemProps[];
  className?: string;
};

const RecentCommits = ({ list, className, ...props }: RecentCommitsProps) => {
  return (
    <div
      className={`flex flex-col p-3 md:p-4 rounded-lg border border-gray-700 bg-[#121212] text-white w-full ${className}`}
      {...props}
    >
      <h1 className="text-2xl font-extrabold pb-4 border-b border-gray-600">
        Recent Commits
      </h1>

      <div className="flex flex-col max-h-96 overflow-y-auto">
        {list.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-gray-400">
            No recent commits found.
          </div>
        ) : (
          <div className="flex flex-col max-h-96 overflow-y-auto">
            {list
              .sort(
                (a, b) =>
                  new Date(b.timeStamp).getTime() -
                  new Date(a.timeStamp).getTime()
              )
              .map((v, index) => (
                <CommitListItem key={index} {...v} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentCommits;
