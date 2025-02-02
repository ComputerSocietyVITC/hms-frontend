"use client";

import AllTeams from "@/components/AllTeams";
import SelectedTeamInfo from "@/components/SelectedTeamInfo";
import React, { useEffect, useState } from "react";

interface Evaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
}

interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageId: string;
  teamId: string;
  evaluations: Evaluation[];
}

interface Member {
  id: string;
  createdAt: string;
  updatedAt: string;
  authId: string;
  name: string;
  role: string;
  regNum: string;
  phone: string;
  college: string;
  github: string;
  imageId: string;
  isLeader: boolean;
  teamId: string;
}

interface Team {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  imageId: string;
  members: Member[];
  project: Project;
}

export default function Page() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedTeamInfo, setSelectedTeamInfo] = useState<Team | null>(null);

  const response: Team[] = [
    {
      id: "team-001",
      createdAt: "2021-08-01T00:00:00Z",
      updatedAt: "2021-08-01T00:00:00Z",
      name: "Team Alpha",
      imageId: "team-001",
      members: [
        {
          id: "member-001",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-001",
          name: "Alice Johnson",
          role: "USER",
          regNum: "19BCE1001",
          phone: "9876543210",
          college: "VIT",
          github: "https://github.com/alicejohnson",
          imageId: "member-001",
          isLeader: true,
          teamId: "team-001",
        },
        {
          id: "member-002",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-002",
          name: "Bob Smith",
          role: "USER",
          regNum: "19BCE1002",
          phone: "9876543211",
          college: "VIT",
          github: "https://github.com/bobsmith",
          imageId: "member-002",
          isLeader: false,
          teamId: "team-001",
        },
        {
          id: "member-003",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-003",
          name: "Charlie Brown",
          role: "USER",
          regNum: "19BCE1003",
          phone: "9876543212",
          college: "VIT",
          github: "https://github.com/charliebrown",
          imageId: "member-003",
          isLeader: false,
          teamId: "team-001",
        },
        {
          id: "member-004",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-004",
          name: "David Lee",
          role: "USER",
          regNum: "19BCE1004",
          phone: "9876543213",
          college: "VIT",
          github: "https://github.com/davidlee",
          imageId: "member-004",
          isLeader: false,
          teamId: "team-001",
        },
      ],
      project: {
        id: "proj-001",
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
        name: "Project Alpha",
        description: "An AI-driven chatbot",
        imageId: "proj-001",
        teamId: "team-001",
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
      id: "team-002",
      createdAt: "2021-08-01T00:00:00Z",
      updatedAt: "2021-08-01T00:00:00Z",
      name: "Team Beta",
      imageId: "team-002",
      members: [
        {
          id: "member-005",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-005",
          name: "Emily Carter",
          role: "USER",
          regNum: "19BCE2001",
          phone: "9876543220",
          college: "VIT",
          github: "https://github.com/emilycarter",
          imageId: "member-005",
          isLeader: true,
          teamId: "team-002",
        },
        {
          id: "member-006",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-006",
          name: "Frank Wright",
          role: "USER",
          regNum: "19BCE2002",
          phone: "9876543221",
          college: "VIT",
          github: "https://github.com/frankwright",
          imageId: "member-006",
          isLeader: false,
          teamId: "team-002",
        },
        {
          id: "member-007",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-007",
          name: "Grace Hall",
          role: "USER",
          regNum: "19BCE2003",
          phone: "9876543222",
          college: "VIT",
          github: "https://github.com/gracehall",
          imageId: "member-007",
          isLeader: false,
          teamId: "team-002",
        },
        {
          id: "member-008",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-008",
          name: "Hannah Scott",
          role: "USER",
          regNum: "19BCE2004",
          phone: "9876543223",
          college: "VIT",
          github: "https://github.com/hannahscott",
          imageId: "member-008",
          isLeader: false,
          teamId: "team-002",
        },
      ],
      project: {
        id: "proj-002",
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
        name: "Project Beta",
        description: "A blockchain-based voting system",
        imageId: "proj-002",
        teamId: "team-002",
        evaluations: [
          {
            id: "eval-002",
            createdAt: "2021-08-01T00:00:00Z",
            updatedAt: "2021-08-01T00:00:00Z",
            projectId: "proj-002",
            score: 8.5,
          },
        ],
      },
    },
    {
      id: "team-003",
      createdAt: "2021-08-01T00:00:00Z",
      updatedAt: "2021-08-01T00:00:00Z",
      name: "Team Gamma",
      imageId: "team-003",
      members: [
        {
          id: "member-009",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-009",
          name: "Ivy Green",
          role: "USER",
          regNum: "19BCE3001",
          phone: "9876543240",
          college: "VIT",
          github: "https://github.com/ivygreen",
          imageId: "member-009",
          isLeader: true,
          teamId: "team-003",
        },
        {
          id: "member-010",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-010",
          name: "Jack Black",
          role: "USER",
          regNum: "19BCE3002",
          phone: "9876543241",
          college: "VIT",
          github: "https://github.com/jackblack",
          imageId: "member-010",
          isLeader: false,
          teamId: "team-003",
        },
        {
          id: "member-011",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-011",
          name: "Kathy White",
          role: "USER",
          regNum: "19BCE3003",
          phone: "9876543242",
          college: "VIT",
          github: "https://github.com/kathywhite",
          imageId: "member-011",
          isLeader: false,
          teamId: "team-003",
        },
        {
          id: "member-012",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-012",
          name: "Leo King",
          role: "USER",
          regNum: "19BCE3004",
          phone: "9876543243",
          college: "VIT",
          github: "https://github.com/leoking",
          imageId: "member-012",
          isLeader: false,
          teamId: "team-003",
        },
      ],
      project: {
        id: "proj-003",
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
        name: "Project Gamma",
        description: "A machine learning model for image recognition",
        imageId: "proj-003",
        teamId: "team-003",
        evaluations: [
          {
            id: "eval-003",
            createdAt: "2021-08-01T00:00:00Z",
            updatedAt: "2021-08-01T00:00:00Z",
            projectId: "proj-003",
            score: 9.2,
          },
        ],
      },
    },
    {
      id: "team-004",
      createdAt: "2021-08-01T00:00:00Z",
      updatedAt: "2021-08-01T00:00:00Z",
      name: "Team Delta",
      imageId: "team-004",
      members: [
        {
          id: "member-013",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-013",
          name: "Mia Taylor",
          role: "USER",
          regNum: "19BCE4001",
          phone: "9876543250",
          college: "VIT",
          github: "https://github.com/miataylor",
          imageId: "member-013",
          isLeader: true,
          teamId: "team-004",
        },
        {
          id: "member-014",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-014",
          name: "Nina Brown",
          role: "USER",
          regNum: "19BCE4002",
          phone: "9876543251",
          college: "VIT",
          github: "https://github.com/ninabrown",
          imageId: "member-014",
          isLeader: false,
          teamId: "team-004",
        },
        {
          id: "member-015",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-015",
          name: "Oscar White",
          role: "USER",
          regNum: "19BCE4003",
          phone: "9876543252",
          college: "VIT",
          github: "https://github.com/oscarwhite",
          imageId: "member-015",
          isLeader: false,
          teamId: "team-004",
        },
        {
          id: "member-016",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-016",
          name: "Paul Green",
          role: "USER",
          regNum: "19BCE4004",
          phone: "9876543253",
          college: "VIT",
          github: "https://github.com/paulgreen",
          imageId: "member-016",
          isLeader: false,
          teamId: "team-004",
        },
      ],
      project: {
        id: "proj-004",
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
        name: "Project Delta",
        description: "A web application for task management",
        imageId: "proj-004",
        teamId: "team-004",
        evaluations: [
          {
            id: "eval-004",
            createdAt: "2021-08-01T00:00:00Z",
            updatedAt: " 2021-08-01T00:00:00Z",
            projectId: "proj-004",
            score: 8.7,
          },
        ],
      },
    },
    {
      id: "team-005",
      createdAt: "2021-08-01T00:00:00Z",
      updatedAt: "2021-08-01T00:00:00Z",
      name: "Team Epsilon",
      imageId: "team-005",
      members: [
        {
          id: "member-017",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-017",
          name: "Quinn Blue",
          role: "USER",
          regNum: "19BCE5001",
          phone: "9876543260",
          college: "VIT",
          github: "https://github.com/quinnblue",
          imageId: "member-017",
          isLeader: true,
          teamId: "team-005",
        },
        {
          id: "member-018",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-018",
          name: "Rita Gray",
          role: "USER",
          regNum: "19BCE5002",
          phone: "9876543261",
          college: "VIT",
          github: "https://github.com/ritagray",
          imageId: "member-018",
          isLeader: false,
          teamId: "team-005",
        },
        {
          id: "member-019",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-019",
          name: "Sam Red",
          role: "USER",
          regNum: "19BCE5003",
          phone: "9876543262",
          college: "VIT",
          github: "https://github.com/samred",
          imageId: "member-019",
          isLeader: false,
          teamId: "team-005",
        },
        {
          id: "member-020",
          createdAt: "2021-08-01T00:00:00Z",
          updatedAt: "2021-08-01T00:00:00Z",
          authId: "auth-020",
          name: "Tina Black",
          role: "USER",
          regNum: "19BCE5004",
          phone: "9876543263",
          college: "VIT",
          github: "https://github.com/tinablack",
          imageId: "member-020",
          isLeader: false,
          teamId: "team-005",
        },
      ],
      project: {
        id: "proj-005",
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
        name: "Project Epsilon",
        description: "A mobile app for fitness tracking",
        imageId: "proj-005",
        teamId: "team-005",
        evaluations: [
          {
            id: "eval-005",
            createdAt: "2021-08-01T00:00:00Z",
            updatedAt: "2021-08-01T00:00:00Z",
            projectId: "proj-005",
            score: 9.5,
          },
        ],
      },
    },
  ];

  const teams = response.map(({ id, name }) => ({ id, name }));

  const handleTeamClick = (teamId: string) => {
    setSelectedTeam(teamId);
    const teamData = response.find((team) => team.id === teamId) || null;
    setSelectedTeamInfo(teamData);
  };

  useEffect(() => {
    if (selectedTeam) {
      console.log("Selected team:", selectedTeam);
      console.log("Selected team info:", selectedTeamInfo);
    }
  }, [selectedTeam, selectedTeamInfo]);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center w-full bg-white py-3 px-6 border-b border-b-[#D9D9D9]">
        <div className="text-lg font-bold">Hackathon Teams</div>
      </header>
      <div className="flex-grow w-full flex flex-row gap-4 p-4 bg-[#F3F4F6]">
        <AllTeams
          teams={teams}
          onClickUpdate={handleTeamClick}
          customStyle="flex-[1]"
        />
        {selectedTeamInfo && (
          <SelectedTeamInfo selectedTeamInfo={selectedTeamInfo} />
        )}
      </div>
    </div>
  );
}
