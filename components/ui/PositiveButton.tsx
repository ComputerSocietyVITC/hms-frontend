import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps {
  buttonText: string;
  onClick: () => void;
  customStyle?: string;
  disabled?: boolean;
}

const PositiveButton: React.FC<ButtonProps> = ({
  buttonText,
  onClick,
  customStyle,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `rounded-lg py-2 px-4 bg-[#16A34A] hover:bg-[#15803D] border border-[#404040] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all`,
        customStyle
      )}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default PositiveButton;
