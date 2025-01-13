import CommitListItem, { CommitListItemProps } from "./CommitListItem";

/**
 * Example;
   <RecentCommits list={[
        {commitMessage : "fix: hover button issue" , commitAuthor : "shivzee" , timeStamp : "2025-01-10T14:00:00Z"},
        {commitMessage : "feat: add revision 2" , commitAuthor : "shivzee" , timeStamp : "2025-01-11T14:00:00Z"},
        {commitMessage : "lint: linting" , commitAuthor : "shivzee" , timeStamp : "2025-01-12T14:00:00Z"},
    ]} />
 */

type RecentCommitsProps = {
  list: CommitListItemProps[];
  className?: string;
};

const RecentCommits = ({ list, className, ...props }: RecentCommitsProps) => {
  return (
    <div
      className={`flex flex-col p-3 md:p-4 rounded-lg border border-[#D9D9D9] ${className}`}
      {...props}
    >
      <h1 className="pb-2 md:pb-4 text-lg md:text-2xl font-bold">
        Recent Commits
      </h1>

      <div className="flex flex-col max-h-96 overflow-y-auto">
        {list.map((v, _) => {
          return <CommitListItem key={_} {...v} />;
        })}
      </div>
    </div>
  );
};

export default RecentCommits;
