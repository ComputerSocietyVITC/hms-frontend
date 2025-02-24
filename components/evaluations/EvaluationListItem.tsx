import { cn } from "@/lib/utils";
import { Evaluation } from "@/types";
import React, { useState, useEffect } from "react";
import DangerButton from "../ui/DangerButton";
import DialogBox from "../ui/DialogBox";
import { Star, Clock } from "react-feather";
import { formatDistanceToNowStrict } from "date-fns";

interface EvaluationListItemProps {
  evaluation: Evaluation;
  onDelete: (id: string) => Promise<void>;
  canDelete: boolean;
  className?: string;
}

const EvaluationListItem = ({
  evaluation,
  onDelete,
  canDelete = true,
  className,
}: EvaluationListItemProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [timeAgo, setTimeAgo] = useState<string>("");

  const getRelativeTimeString = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();

      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInSeconds < 5) {
        return "just now";
      }
      if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      }
      if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
      }
      if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
      }
      if (diffInDays < 30) {
        return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
      }

      return formatDistanceToNowStrict(date, { addSuffix: true });
    } catch {
      return "Invalid date";
    }
  };

  const updateTimeAgo = () => {
    setTimeAgo(getRelativeTimeString(evaluation.updatedAt));
  };

  useEffect(() => {
    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluation.updatedAt]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(evaluation.id);
    } finally {
      setIsDeleting(false);
      setIsConfirmDialogOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between p-6 rounded-lg border border-gray-700 bg-[#121212] text-white",
        className
      )}
    >
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <Star className="size-5 text-yellow-500" />
          <span className="text-xl font-semibold">{evaluation.score}</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="size-4" />
            <span className="text-sm italic font-medium tracking-tight">
              {timeAgo}
            </span>
          </div>
        </div>
      </div>

      {canDelete && (
        <DangerButton
          onClick={() => setIsConfirmDialogOpen(true)}
          buttonText={isDeleting ? "Deleting..." : "Delete"}
          disabled={isDeleting}
        />
      )}

      <DialogBox
        isOpen={isConfirmDialogOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this evaluation? This action cannot be undone."
        positive={false}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmDialogOpen(false)}
      />
    </div>
  );
};

export default EvaluationListItem;
