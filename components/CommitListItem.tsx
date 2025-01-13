import Image from "next/image";

/**
 *    Example;
      <CommitListItem commitMessage="Hello World" commitAuthor="Hello" timeStamp="2025-01-10T14:00:00Z" />
 */

export type CommitListItemProps = {
  commitMessage: string;
  commitAuthor: string;
  timeStamp: string;
  className?: string;
};

function getTimeSince(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

const CommitListItem = ({
  commitMessage,
  commitAuthor,
  timeStamp,
  className,
  ...props
}: CommitListItemProps) => {
  const timeSinceCommit = getTimeSince(new Date(timeStamp));

  return (
    <div {...props} className={`flex flex-col py-4 ${className}`}>
      <div className="flex items-start px-4 space-x-4">
        <Image
          width={28}
          height={28}
          src="/git_branch.svg"
          alt="Branch Icon"
          className="self-center"
        />
        <div className="flex flex-col">
          <h1 className="text-base md:text-lg font-semibold">
            {commitMessage}
          </h1>

          <span className="text-xs md:text-sm">
            {commitAuthor} &middot; {timeSinceCommit}
          </span>
        </div>
      </div>
      <hr className="w-3/4 mx-auto border-0 h-px bg-[#D6D6D6] mt-4" />
    </div>
  );
};

export default CommitListItem;
