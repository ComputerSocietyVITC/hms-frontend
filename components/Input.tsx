"use client";

import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  onTextChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  disabled = false,
  onTextChange,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onTextChange(e.target.value)}
        className={`
        border border-[#D9D9D9] 
        rounded-md 
        p-2 w-full
        text-[#1E1E1E] 
        placeholder-[#B3B3B3]
        disabled:cursor-not-allowed
        `}
      />
    </div>
  );
};

export default Input;
