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
  const baseClasses = "rounded-lg px-4 py-2 text-base font-medium";

  const primaryClasses = primary
    ? `${backgroundColor || "bg-[#EC221F]"} ${textColor || "text-[#FEE9E7]"}`
    : `bg-transparent ${textColor || "text-[#900B09]"} ${borderColor ? `border ${borderColor}` : "border border-[#900B09]"}`;

  return (
    <button
      className={`${baseClasses} ${primaryClasses} ${primary ? "" : "hover:bg-gray-100"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default DangerButton;
