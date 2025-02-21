import React from "react";
import Input from "./Input";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  customStyle?: string;
  text?: string;
  onTextChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  disabled,
  customStyle,
  text,
  onKeyDown,
  onTextChange,
}) => {
  return (
    <div
      className={cn(`flex flex-col text-[#EAEAEA]`, customStyle)}
      onKeyDown={onKeyDown}
    >
      <label className="mb-2 font-bold">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onTextChange={onTextChange}
        text={text}
      />
    </div>
  );
};

export default InputField;
