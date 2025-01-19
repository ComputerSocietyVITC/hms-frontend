"use client";

import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  customStyle?: string;
  onTextChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  disabled = false,
  customStyle = "",
  onTextChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onTextChange(e.target.value)}
      className={`border border-[#D9D9D9] rounded-md px-3 py-2 w-full text-[#1E1E1E] placeholder-[#B3B3B3] disabled:cursor-not-allowed ${customStyle}`}
    />
  );
};

export default Input;
