import ContributionStats from "@/components/ContributionStats";
import FooterSection from "@/components/FooterSection";
import HeaderComponent from "@/components/HeaderComponent";
import ProjectInformation from "@/components/ProjectInformation";
import RecentCommits from "@/components/RecentCommits";
import TeamInformation from "@/components/TeamInformation";
import TeamMemberList from "@/components/TeamMemberList";
import React from "react";

const TeamPage = () => {
  const response = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    createdAt: "2021-08-01T00:00:00Z",
    updatedAt: "2021-08-01T00:00:00Z",
    name: "Team Name",
    imageId: "123e4567-e89b-12d3-a456-426614174000",
    members: [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
        authId: "123e4567-e89b-12d3-a456-426614174000",
        name: "John Doe",
        role: "USER",
        regNum: "19BCE1234",
        phone: "9876543210",
        college: "VIT",
        github: "https://github.com/example",
        imageId: "123e4567-e89b-12d3-a456-426614174000",
        isLeader: true,
        teamId: "123e4567-e89b-12d3-a456-426614174000",
      },
    ],
    project: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: "2021-08-01T00:00:00Z",
      updatedAt: "2021-08-01T00:00:00Z",
      name: "Project Name",
      description: "Project Description",
      imageId: "123e4567-e89b-12d3-a456-426614174000",
      teamId: "123e4567-e89b-12d3-a456-426614174000",
      evaluations: [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          projectId: "123e4567-e89b-12d3-a456-426614174000",
          score: 10,
        },
      ],
    },
  };

  const getLeader = () => {
    return response.members.find((member) => member.isLeader)!;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
      <HeaderComponent />
      <div className="flex flex-grow flex-col p-8 w-full gap-4">
        <div className="flex flex-row justify-between gap-8">
          <TeamInformation
            teamName={response.name}
            createdOn={new Date(response.createdAt)}
            teamLeader={getLeader().name}
            teamId={response.id}
          />
          <TeamMemberList
            list={[
              {
                name: "Member 1",
                githubId: "id1",
                avatarSrc: "/image.png",
              },
              {
                name: "Member 2",
                githubId: "id2",
                avatarSrc: "/image.png",
              },
              {
                name: "Member 3",
                githubId: "id3",
                avatarSrc: "/image.png",
              },
            ]}
          />
          <ProjectInformation
            projectName={response.project.name}
            projectDescription={response.project.description}
            createdOn={new Date(response.project.createdAt)}
            currentScore={response.project.evaluations[0].score}
            projectId={response.project.id}
          />
        </div>
        <div className="flex flex-row gap-8">
          <RecentCommits
            list={[
              {
                commitMessage: "fix: hover button issue",
                commitAuthor: "shivzee",
                timeStamp: "2025-01-10T14:00:00Z",
              },
              {
                commitMessage: "feat: add revision 2",
                commitAuthor: "shivzee",
                timeStamp: "2025-01-11T14:00:00Z",
              },
              {
                commitMessage: "lint: linting",
                commitAuthor: "shivzee",
                timeStamp: "2025-01-12T14:00:00Z",
              },
              {
                commitMessage: "lint: linting",
                commitAuthor: "shivzee",
                timeStamp: "2025-01-12T14:00:00Z",
              },
            ]}
          />
          <ContributionStats />
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default TeamPage;
