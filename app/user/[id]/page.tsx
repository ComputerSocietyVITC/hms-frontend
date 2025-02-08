import api from "@/api";
import FooterSection from "@/components/FooterSection";
import HeaderComponent from "@/components/HeaderComponent";
import UserCard from "@/components/UserCard";
import UserInformation from "@/components/UserInformation";

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

const getUserById = async (id: string): Promise<User | null> => {
  try {
    const response = await api.get(`/user/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

type ProfileProps = {
  params: Promise<{
    id: string;
  }>;
};

const Profile = async ({ params }: ProfileProps) => {
  const user = await getUserById((await params).id);

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
      <div className="flex flex-grow px-24 flex-row w-full">
        <UserCard
          id={user.id}
          createdAt={user.createdAt}
          name={user.name}
          teamName={user.teamName}
          college={user.college}
          github={user.github || "https://github.com/notfound"}
          isLeader={user.isLeader}
          customStyle="w-[25%]"
        />
        <UserInformation
          githubId={user.github}
          registrationNumber={user.regNum}
          teamName={user.teamId || "Not in a team"}
          collegeName={user.college}
          phoneNumber={user.phone}
          userId={user.id}
          customStyle="w-[75%] ml-8"
        />
      </div>
      <FooterSection />
    </div>
  );
};

export default Profile;
