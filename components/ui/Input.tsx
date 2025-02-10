"use client";

import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  customStyle?: string;
  text?: string;
  onTextChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  disabled = false,
  customStyle = "",
  text = "",
  onTextChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onTextChange(e.target.value)}
      className={`border border-[#555] rounded-md px-3 py-2 w-full text-[#EAEAEA] bg-[#1E1E1E] placeholder-[#888] disabled:cursor-not-allowed transition-all ${customStyle}`}
      value={text}
    />
  );
};

export default Input;
