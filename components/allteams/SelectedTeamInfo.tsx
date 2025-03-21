"use client";

import React, { useState } from "react";
import { TeamMemberListItem } from "@/components/team/TeamMemberListItem";
import DangerButton from "../ui/DangerButton";
import Button from "../ui/Button";
import Link from "next/link";
import DialogBox from "../ui/DialogBox";
import { Team } from "@/types";
import { getGithubUsername, getImageUrl } from "@/lib/utils";

interface SelectedTeamInfoProps {
  selectedTeamInfo: Team;
  evaluatorMode?: boolean;
  onTeamDelete: (id: string) => void;
  onCloseClick: () => void;
}

const SelectedTeamInfo: React.FC<SelectedTeamInfoProps> = ({
  selectedTeamInfo,
  evaluatorMode = false,
  onTeamDelete,
  onCloseClick,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleTeamDelete = async () => {
    onTeamDelete(selectedTeamInfo.id);
  };

  return (
    <div className="relative p-6 border border-gray-700 rounded-lg bg-[#121212] text-white flex-[3] h-fit shadow-lg">
      <DangerButton
        buttonText="Close"
        onClick={onCloseClick}
        className="absolute right-6 top-4"
      />
      {selectedTeamInfo.project && (
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-200">
            {selectedTeamInfo.project.name}
          </h2>
          <p className="text-gray-400 text-lg">
            by <span className="font-semibold">{selectedTeamInfo.name}</span>
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-300">
              Project Description
            </h3>
            <p className="text-gray-400 mt-1 leading-relaxed">
              {selectedTeamInfo.project.description}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-300">Team Members</h3>
          <ul className="mt-2 space-y-3">
            {selectedTeamInfo.members.map((member) => {
              const githubUsername = getGithubUsername(member.github);

              return (
                <TeamMemberListItem
                  key={member.id}
                  name={
                    member.isLeader ? `${member.name} (Leader)` : member.name
                  }
                  githubId={githubUsername}
                  avatarSrc={
                    getImageUrl(member.imageId, member.mimeType) ||
                    (githubUsername &&
                      `https://github.com/${githubUsername}.png`) ||
                    ""
                  }
                  userId={member.id}
                  currentUserId={""}
                />
              );
            })}
          </ul>
        </div>

        {selectedTeamInfo.project && (
          <div>
            <h3 className="text-xl font-semibold text-gray-300">
              Project Details
            </h3>
            <div className="mt-2 text-gray-400 space-y-2">
              <p>
                <span className="font-semibold text-gray-300">Created:</span>{" "}
                {new Date(
                  selectedTeamInfo.project.createdAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="font-semibold text-gray-300">
                  Last Updated:
                </span>{" "}
                {new Date(
                  selectedTeamInfo.project.updatedAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="font-semibold text-gray-300">
                  Current Evaluation Score:
                </span>{" "}
                {(selectedTeamInfo.project.evaluations &&
                  `${selectedTeamInfo.project.evaluations[0]?.score} / 10`) ||
                  "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {selectedTeamInfo.project && (
          <Link href={`project/${selectedTeamInfo.project.id}`}>
            <Button buttonText="View Project" onClick={() => {}} />
          </Link>
        )}
        <Link href={`team/${selectedTeamInfo.id}`}>
          <Button buttonText="View Team" onClick={() => {}} />
        </Link>
        {!evaluatorMode && (
          <DangerButton
            buttonText="Delete Team"
            onClick={() => setIsDeleteDialogOpen(true)}
            primary={false}
          />
        )}
      </div>

      <DialogBox
        isOpen={isDeleteDialogOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete the team ${selectedTeamInfo.name}?`}
        positive={false}
        onConfirm={handleTeamDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default SelectedTeamInfo;
