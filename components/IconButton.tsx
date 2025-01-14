import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  text: string;
  customBackgroundColor?: string;
  customTextColor?: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  customBackgroundColor = "#F5F5F5",
  customTextColor = "#1E1E1E",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full cursor-pointer text-base font-medium shadow-md`}
      style={{
        backgroundColor: customBackgroundColor,
        color: customTextColor,
      }}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {text}
    </button>
  );
};

export default IconButton;
