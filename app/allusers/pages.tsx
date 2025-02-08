import FooterSection from "@/components/FooterSection";
import HeaderComponent from "@/components/HeaderComponent";
import UserCard from "@/components/UserCard";
import UserInformation from "@/components/UserInformation";
import React from "react";

interface Evaluations {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  score: number;
}

interface User {
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
  imageId: string | null;
  isLeader: boolean;
  teamId: string | null;
  evaluations: Evaluations;
}

const users: User[] = [
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
    evaluations: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      createdAt: "2021-08-01T00:00:00Z",
      updatedAt: "2021-08-01T00:00:00Z",
      projectId: "123e4567-e89b-12d3-a456-426614174000",
      score: 10,
    },
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    createdAt: "2021-08-02T00:00:00Z",
    updatedAt: "2021-08-02T00:00:00Z",
    authId: "223e4567-e89b-12d3-a456-426614174001",
    name: "Jane Smith",
    role: "USER",
    regNum: "19BCE5678",
    phone: "9876543211",
    college: "MIT",
    github: "https://github.com/jane-smith",
    imageId: "223e4567-e89b-12d3-a456-426614174001",
    isLeader: false,
    teamId: "223e4567-e89b-12d3-a456-426614174001",
    evaluations: {
      id: "223e4567-e89b-12d3-a456-426614174001",
      createdAt: "2021-08-02T00:00:00Z",
      updatedAt: "2021-08-02T00:00:00Z",
      projectId: "223e4567-e89b-12d3-a456-426614174001",
      score: 9,
    },
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    createdAt: "2021-08-03T00:00:00Z",
    updatedAt: "2021-08-03T00:00:00Z",
    authId: "323e4567-e89b-12d3-a456-426614174002",
    name: "Alice Johnson",
    role: "USER",
    regNum: "20BCE2345",
    phone: "9876543212",
    college: "MIT",
    github: "https://github.com/alicejohnson",
    imageId: "323e4567-e89b-12d3-a456-426614174002",
    isLeader: true,
    teamId: "323e4567-e89b-12d3-a456-426614174003",
    evaluations: {
      id: "423e4567-e89b-12d3-a456-426614174005",
      createdAt: "2021-08-03T00:00:00Z",
      updatedAt: "2021-08-03T00:00:00Z",
      projectId: "523e4567-e89b-12d3-a456-426614174006",
      score: 8,
    },
  },
  {
    id: "423e4567-e89b-12d3-a456-426614174003",
    createdAt: "2021-08-04T00:00:00Z",
    updatedAt: "2021-08-04T00:00:00Z",
    authId: "423e4567-e89b-12d3-a456-426614174003",
    name: "Bob Williams",
    role: "USER",
    regNum: "20BCE6789",
    phone: "9876543213",
    college: "Stanford",
    github: "https://github.com/bobwilliams",
    imageId: "423e4567-e89b-12d3-a456-426614174003",
    isLeader: false,
    teamId: "423e4567-e89b-12d3-a456-426614174004",
    evaluations: {
      id: "523e4567-e89b-12d3-a456-426614174007",
      createdAt: "2021-08-04T00:00:00Z",
      updatedAt: "2021-08-04T00:00:00Z",
      projectId: "623e4567-e89b-12d3-a456-426614174008",
      score: 7,
    },
  }
];

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
      <HeaderComponent />
      <div className="flex flex-wrap px-24 w-full gap-8 justify-center">
        {users.map((user) => (
          <div key={user.id} className="flex flex-row w-full">
            <UserCard
              id={user.id}
              createdAt={user.createdAt}
              name={user.name}
              college={user.college}
              github={user.github}
              isLeader={user.isLeader}
              customStyle="w-1/4"
            />
            <UserInformation
              registrationNumber={user.regNum}
              teamName="Team Innovators"
              collegeName={user.college}
              phoneNumber={user.phone}
              userId={user.id}
              customStyle="w-3/4 ml-8"
            />
          </div>
        ))}
      </div>
      <FooterSection />
    </div>
  );
};

export default Page;