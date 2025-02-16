import React from "react";

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-[#121212] text-white rounded-lg p-4 w-80 h-80 flex flex-col justify-between shadow-lg border border-gray-700">
      <div className="flex flex-col">
        <h1 className="text-xl font-black">{title}</h1>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default Card;
