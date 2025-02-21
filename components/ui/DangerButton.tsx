import React from "react";
import { cn } from "@/lib/utils";

interface DangerButtonProps {
  onClick: () => void;
  buttonText: string;
  primary?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  disabled?: boolean;
  className?: string;
}

const DangerButton: React.FC<DangerButtonProps> = ({
  onClick,
  buttonText,
  primary = true,
  backgroundColor,
  textColor,
  borderColor,
  disabled,
  className,
}) => {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2",
        "text-base font-medium",
        "transition-all",
        "disabled:opacity-50",

        primary && [
          backgroundColor || "bg-[#B91C1C] hover:bg-[#991B1B]",
          textColor || "text-[#FEE2E2]",
        ],

        !primary && [
          "bg-transparent",
          textColor || "text-[#F87171]",
          borderColor ? `border ${borderColor}` : "border border-[#F87171]",
          "hover:bg-[#1E1E1E]",
          "hover:bg-opacity-30",
        ],

        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default DangerButton;
