import React from "react";

export interface ButtonProps {
  backgroundColor?: string;
  label: string;
  onClick?: () => void;
}

export const Button = ({ backgroundColor, label, onClick }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
