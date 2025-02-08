"use client";

import { useEffect, useState, use } from "react";
import api from "@/api";
import FooterSection from "@/components/FooterSection";
import HeaderComponent from "@/components/HeaderComponent";
import UserCard from "@/components/UserCard";
import UserInformation from "@/components/UserInformation";
import DangerButton from "@/components/DangerButton";
import axios from "axios";

type User = {
  id: string;
  createdAt: string;
  name: string;
  college: string;
  teamName: string;
  github: string | null;
  isLeader: boolean;
  regNum: string;
  teamId?: string;
  phone: string;
};

type ProfileProps = {
  params: Promise<{
    id: string;
  }>;
};

const Profile = ({ params }: ProfileProps) => {
  const resolvedParams = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const response = await api.get(`/user/${resolvedParams.id}`);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTeam = async () => {
    if (user && user.teamId) {
      try {
        const response = await api.get(`/team/${user.teamId}`);
        setTeam(response.data.name);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    }
  };

  const handleClick = async () => {
    try {
      const response = await api.delete(`/user/${resolvedParams.id}`);

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 403) {
            console.log(
              "You do not have sufficient permissions to perform this action."
            );
          } else if (error.response.status === 404) {
            console.log("User not found.");
          } else if (error.response.status === 500) {
            console.log("Internal Server Error");
          } else {
            console.log("An unexpected error occured. Please try again later.");
          }
        } else {
          console.log("Please check your network connection and try again.");
        }
      }
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.id]);

  useEffect(() => {
    if (user) {
      getTeam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        User not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6]">
      <HeaderComponent />
      <div className="flex flex-grow flex-row w-[80%] mx-auto align-center justify-center">
        <UserCard
          id={user.id}
          createdAt={user.createdAt}
          name={user.name}
          college={user.college}
          github={user.github || "https://github.com/notfound"}
          isLeader={user.isLeader}
          teamName={team || ""}
          customStyle="w-[1/4]"
        />
        <div className="ml-8 flex flex-col my-auto gap-4">
          <UserInformation
            registrationNumber={user.regNum}
            teamName={team || "Not in a team"}
            collegeName={user.college}
            phoneNumber={user.phone}
            userId={user.id}
            githubId={user.github}
            customStyle="my-0"
          />
          <DangerButton
            buttonText="Delete User"
            onClick={() => {
              handleClick();
            }}
          />
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Profile;
