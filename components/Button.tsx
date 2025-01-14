import React from "react";

interface ButtonProps {
  customBackgroundColor?: string;
  customTextColor?: string;
  buttonText: string;
  onClick: () => void;
  customStyle?: string;
}

const Button: React.FC<ButtonProps> = ({
  customBackgroundColor = "#1E1E1E",
  customTextColor = "#F5F5F5",
  buttonText,
  onClick,
  customStyle = "",
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: customBackgroundColor,
        color: customTextColor,
      }}
      className={`rounded-lg py-2 px-4 ${customStyle}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
