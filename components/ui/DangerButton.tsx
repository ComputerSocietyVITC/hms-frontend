import React from "react";

interface DangerButtonProps {
  onClick: () => void;
  buttonText: string;
  primary?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  disabled?: boolean;
}

const DangerButton: React.FC<DangerButtonProps> = ({
  onClick,
  buttonText,
  primary = true,
  backgroundColor,
  textColor,
  borderColor,
  disabled,
}) => {
  const baseClasses =
    "rounded-lg px-4 py-2 text-base font-medium transition-all";

  const primaryClasses = primary
    ? `${backgroundColor || "bg-[#B91C1C] hover:bg-[#991B1B]"} ${textColor || "text-[#FEE2E2]"}`
    : `bg-transparent ${textColor || "text-[#F87171]"} ${
        borderColor ? `border ${borderColor}` : "border border-[#F87171]"
      } hover:bg-[#1E1E1E]`;

  return (
    <button
      className={`${baseClasses} ${primaryClasses} ${primary ? "" : "hover:bg-opacity-30"} disabled:opacity-50`}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default DangerButton;
