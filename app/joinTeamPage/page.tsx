import React, { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import DangerButton from "@/components/DangerButton";

const JoinTeamPage: React.FC = () => {
  const [teamID, setTeamID] = useState("");

  const handleSubmit = () => {
    console.log("Team ID:", teamID);
  };

  return (
    <div className="bg-[#F3F4F6] w-full h-screen flex flex-col">
      {/* Header */}
      <header
        className="w-full bg-white flex items-center justify-between px-6"
        style={{ height: "10vh" }}
      >
        <h1 className="text-lg font-medium">Join a Team</h1>
        <DangerButton
          buttonText="Cancel"
          onClick={() => console.log("Cancelled")}
        />
      </header>

      <main className="flex justify-center items-center flex-1">
        <div className="bg-white p-8 rounded-lg shadow-md w-[800px] max-w-md">
          <InputField
            label="Team ID"
            type="text"
            placeholder="Enter Team ID"
            onTextChange={(value) => setTeamID(value)}
          />

          <div className="mt-4">
            <Button
              buttonText="Join Team"
              onClick={handleSubmit}
              customBackgroundColor="#1E1E1E"
              customTextColor="#FFFFFF"
              customStyle="w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinTeamPage;
