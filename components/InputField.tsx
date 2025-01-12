import React from "react";
import Input from "./Input";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  onTextChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  disabled,
  onTextChange,
}) => {
  return (
    <div className="flex flex-col text-[#1E1E1E]">
      <label className="mb-2">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onTextChange={onTextChange}
      />
    </div>
  );
};

export default InputField;
