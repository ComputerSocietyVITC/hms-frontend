"use client";

import React, { useRef } from "react";
import Button from "./Button";
import DangerButton from "./DangerButton";

interface DialogBoxProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 transition"
      onMouseDown={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-[#121212] text-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-gray-400">{message}</p>
        <div className="mt-6 flex justify-end space-x-3">
          <Button buttonText="Cancel" onClick={onCancel} />
          <DangerButton buttonText="Confirm" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
