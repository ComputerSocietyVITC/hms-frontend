"use client";
import React from "react";
import Button from "./Button";
const HeaderComponent = () => {
  return (
    <header className="fixed top-0 left-0 z-50 flex justify-between items-center w-full bg-white py-3 px-6">
      <div className="text-lg">Logo</div>
      <div className="flex space-x-4">
        <Button
          customBackgroundColor="#1E1E1E"
          customTextColor="#F5F5F5"
          buttonText="Button"
          onClick={() => {}}
        />
        <Button
          customBackgroundColor="#1E1E1E"
          customTextColor="#F5F5F5"
          buttonText="Button"
          onClick={() => {}}
        />
      </div>
    </header>
  );
};

export default HeaderComponent;
