import React from "react";
import Input from "./Input";

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
      className={`flex flex-col text-[#1E1E1E] ${customStyle}`}
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
