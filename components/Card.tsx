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
    <div className="bg-[#1E1E1E] text-white rounded-lg p-4 w-full max-w-sm flex flex-col justify-between gap-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm">{description}</p>
      <Button
        onClick={buttonOnClick}
        buttonText={buttonText}
        customBackgroundColor="#F5F5F5"
        customTextColor="#2C2C2C"
      />
    </div>
  );
};

export default Card;
