"use client";

import AllTeams from "@/components/AllTeams";
import React from "react";

export default function Page() {
  const response = [
    [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
        name: "Team Alpha",
        imageId: "123e4567-e89b-12d3-a456-426614174000",
        members: [
          {
            id: "001",
            createdAt: "2021-08-01T00:00:00Z",
            updatedAt: "2021-08-01T00:00:00Z",
            authId: "auth-001",
            name: "Alice Johnson",
            role: "USER",
            regNum: "19BCE1001",
            phone: "9876543210",
            college: "VIT",
            github: "https://github.com/alicejohnson",
            imageId: "001",
            isLeader: true,
            teamId: "123e4567-e89b-12d3-a456-426614174000",
          },
          {
            id: "002",
            createdAt: "2021-08-01T00:00:00Z",
            updatedAt: "2021-08-01T00:00:00Z",
            authId: "auth-002",
            name: "Bob Smith",
            role: "USER",
            regNum: "19BCE1002",
            phone: "9876543211",
            college: "VIT",
            github: "https://github.com/bobsmith",
            imageId: "002",
            isLeader: false,
            teamId: "123e4567-e89b-12d3-a456-426614174000",
          },
        ],
        project: {
          id: "proj-001",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          name: "Project Alpha",
          description: "An AI-driven chatbot",
          imageId: "proj-img-001",
          teamId: "123e4567-e89b-12d3-a456-426614174000",
          evaluations: [
            {
              id: "eval-001",
              createdAt: "2021-08-01T00:00:00Z",
              updatedAt: "2021-08-01T00:00:00Z",
              projectId: "proj-001",
              score: 9,
            },
          ],
        },
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174001",
        createdAt: "2021-09-10T00:00:00Z",
        updatedAt: "2021-09-10T00:00:00Z",
        name: "Team Beta",
        imageId: "223e4567-e89b-12d3-a456-426614174001",
        members: [
          {
            id: "003",
            createdAt: "2021-09-10T00:00:00Z",
            updatedAt: "2021-09-10T00:00:00Z",
            authId: "auth-003",
            name: "Charlie Davis",
            role: "USER",
            regNum: "19BCE2001",
            phone: "9876543220",
            college: "VIT",
            github: "https://github.com/charliedavis",
            imageId: "003",
            isLeader: true,
            teamId: "223e4567-e89b-12d3-a456-426614174001",
          },
        ],
        project: {
          id: "proj-002",
          createdAt: "2021-09-10T00:00:00Z",
          updatedAt: "2021-09-10T00:00:00Z",
          name: "Project Beta",
          description: "A blockchain-based voting system",
          imageId: "proj-img-002",
          teamId: "223e4567-e89b-12d3-a456-426614174001",
          evaluations: [
            {
              id: "eval-002",
              createdAt: "2021-09-10T00:00:00Z",
              updatedAt: "2021-09-10T00:00:00Z",
              projectId: "proj-002",
              score: 8.5,
            },
          ],
        },
      },
      {
        id: "323e4567-e89b-12d3-a456-426614174002",
        createdAt: "2021-10-20T00:00:00Z",
        updatedAt: "2021-10-20T00:00:00Z",
        name: "Team Gamma",
        imageId: "323e4567-e89b-12d3-a456-426614174002",
        members: [
          {
            id: "004",
            createdAt: "2021-10-20T00:00:00Z",
            updatedAt: "2021-10-20T00:00:00Z",
            authId: "auth-004",
            name: "David Williams",
            role: "USER",
            regNum: "19BCE3001",
            phone: "9876543230",
            college: "VIT",
            github: "https://github.com/davidwilliams",
            imageId: "004",
            isLeader: true,
            teamId: "323e4567-e89b-12d3-a456-426614174002",
          },
          {
            id: "005",
            createdAt: "2021-10-20T00:00:00Z",
            updatedAt: "2021-10-20T00:00:00Z",
            authId: "auth-005",
            name: "Emily Brown",
            role: "USER",
            regNum: "19BCE3002",
            phone: "9876543240",
            college: "VIT",
            github: "https://github.com/emilybrown",
            imageId: "005",
            isLeader: false,
            teamId: "323e4567-e89b-12d3-a456-426614174002",
          },
        ],
        project: {
          id: "proj-003",
          createdAt: "2021-10-20T00:00:00Z",
          updatedAt: "2021-10-20T00:00:00Z",
          name: "Project Gamma",
          description: "A machine learning model for medical diagnosis",
          imageId: "proj-img-003",
          teamId: "323e4567-e89b-12d3-a456-426614174002",
          evaluations: [
            {
              id: "eval-003",
              createdAt: "2021-10-20T00:00:00Z",
              updatedAt: "2021-10-20T00:00:00Z",
              projectId: "proj-003",
              score: 9.2,
            },
          ],
        },
      },
    ],
  ];

  const teams: { id: string; name: string }[] = [];

  for (const group of response) {
    for (const team of group) {
      teams.push({ id: team.id, name: team.name });
    }
  }

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <AllTeams
        teams={teams}
        onClickUpdate={() => {
          console.log("Updated");
        }}
      />
    </div>
  );
}
