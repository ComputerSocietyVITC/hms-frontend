import FooterSection from "@/components/FooterSection";
import HeaderComponent from "@/components/HeaderComponent";
import UserCard from "@/components/UserCard";
import UserInformation from "@/components/UserInformation";
import React from "react";

const page = () => {
  const response = {
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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
      <HeaderComponent />
      <div className="flex flex-grow px-24 flex-row w-full">
        <UserCard
          id={response.id}
          createdAt={response.createdAt}
          name={response.name}
          college={response.college}
          github={response.github}
          isLeader={response.isLeader}
          customStyle="w-1/4"
        />
        <UserInformation
          registrationNumber={response.regNum}
          teamName="Team Innovators"
          collegeName={response.college}
          phoneNumber={response.phone}
          userId={response.id}
          customStyle="w-3/4 ml-8"
        />
      </div>
      <FooterSection />
    </div>
  );
};

export default page;
