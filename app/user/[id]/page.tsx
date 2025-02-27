"use client";

import { useEffect, useState, use } from "react";
import api from "@/api";
import FooterSection from "@/components/ui/FooterSection";
import HeaderComponent from "@/components/ui/HeaderComponent";
import UserCard from "@/components/user/UserCard";
import UserInformation from "@/components/user/UserInformation";
import DangerButton from "@/components/ui/DangerButton";
import axios from "axios";
import Link from "next/link";
import Button from "@/components/ui/Button";
import DialogBox from "@/components/ui/DialogBox";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

type ProfileProps = {
  params: Promise<{
    id: string;
  }>;
};

const Profile = ({ params }: ProfileProps) => {
  const resolvedParams = use(params);
  const [visitedUser, setVisitedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<string | null>(null);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  const [isRemoveFromTeamDialogOpen, setIsRemoveFromTeamDialogOpen] =
    useState(false);

  const { user, getUser, userRole } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVisitedUser = async () => {
    try {
      const response = await api.get(`/user/${resolvedParams.id}`);
      if (response.status === 200) {
        setVisitedUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTeam = async () => {
    if (visitedUser && visitedUser.teamId) {
      try {
        const response = await api.get(`/team/${visitedUser.teamId}`);
        setTeam(response.data.name);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/user/${resolvedParams.id}`);

      if (response.status === 201) {
        router.push("/allusers");
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
            console.log(
              "An unexpected error occurred. Please try again later."
            );
          }
        } else {
          console.log("Please check your network connection and try again.");
        }
      }
    }
  };

  const handleRemove = async () => {
    if (visitedUser?.teamId) {
      try {
        const response = await api.delete(`/team/${visitedUser.teamId}/remove`);

        console.log(response);

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
              console.log(
                "An unexpected error occurred. Please try again later."
              );
            }
          } else {
            console.log("Please check your network connection and try again.");
          }
        }
      }
    }
  };

  useEffect(() => {
    getVisitedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.id]);

  useEffect(() => {
    if (visitedUser) {
      getTeam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitedUser]);

  if (loading) {
    return <Loading />;
  }

  if (!visitedUser) {
    return (
      <Error error="User not found. Please check the URL and try again." />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white">
      <HeaderComponent />
      <div className="flex flex-grow flex-row w-[80%] mx-auto align-center justify-center mt-10">
        <UserCard
          id={visitedUser.id}
          createdAt={visitedUser.createdAt}
          name={visitedUser.name}
          college={visitedUser.college}
          github={visitedUser.github}
          isLeader={visitedUser.isLeader}
          imageId={visitedUser.imageId}
          mimeType={visitedUser.mimeType}
          teamName={team || ""}
          customStyle="w-[1/4]"
        />
        <div className="ml-8 flex flex-col my-auto gap-4">
          <UserInformation
            registrationNumber={visitedUser.regNum}
            teamName={team || "Not in a team"}
            collegeName={visitedUser.college}
            phoneNumber={visitedUser.phone}
            userId={visitedUser.id}
            githubId={visitedUser.github}
            adminView={true}
            customStyle="w-[3/4]"
          />
          {userRole === "EVALUATOR" && (
            <Link href={`/team/${visitedUser.teamId}`} target="_blank">
              <Button
                buttonText="View Team"
                onClick={() => {}}
                customStyle="w-full"
              />
            </Link>
          )}
          {(userRole === "ADMIN" || userRole === "SUPER_ADMIN") &&
            visitedUser &&
            visitedUser.teamId && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Link href={`/team/${visitedUser.teamId}`} target="_blank">
                    <Button
                      buttonText="View Team"
                      onClick={() => {}}
                      customStyle="w-full"
                    />
                  </Link>
                  <DangerButton
                    buttonText="Remove from Team"
                    onClick={() => setIsRemoveFromTeamDialogOpen(true)}
                    primary={false}
                  />
                </div>
                <DangerButton
                  buttonText="Delete User"
                  onClick={() => setIsDeleteUserDialogOpen(true)}
                  primary={true}
                />
              </div>
            )}
        </div>
      </div>
      <FooterSection />

      <DialogBox
        isOpen={isDeleteUserDialogOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete the user ${visitedUser.name}?`}
        positive={false}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteUserDialogOpen(false)}
      />

      <DialogBox
        isOpen={isRemoveFromTeamDialogOpen}
        title="Confirm Remove"
        message={`Are you sure you want to remove the user ${visitedUser.name} from their team ${team}?`}
        positive={false}
        onConfirm={handleRemove}
        onCancel={() => setIsRemoveFromTeamDialogOpen(false)}
      />
    </div>
  );
};

export default Profile;
