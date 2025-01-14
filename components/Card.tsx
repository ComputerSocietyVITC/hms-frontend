import React from "react";
import Button from "./Button";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonOnClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <div className="bg-[#F5F5F5] text-[#2C2C2C] rounded-lg p-4 w-80 h-80 flex flex-col justify-between">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex justify-end">
        <Button onClick={buttonOnClick} buttonText={buttonText} />
      </div>
    </div>
  );
};

export default Card;
