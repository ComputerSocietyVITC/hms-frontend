import React from "react";

interface ButtonProps {
  customBackgroundColor?: string;
  customTextColor?: string;
  customBorderColor?: string;
  buttonText: string;
  onClick: () => void;
  customStyle?: string;
}

const Button: React.FC<ButtonProps> = ({
  customBackgroundColor = "#1E1E1E",
  customTextColor = "#F5F5F5",
  customBorderColor,
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
        border: customBorderColor && `1px solid ${customBorderColor}`,
      }}
      className={`rounded-lg py-2 px-4 ${customStyle}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
