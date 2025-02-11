"use client";

import React, { useRef, useState } from "react";
import Button from "./Button";

interface CopyLinkDialogProps {
  isOpen: boolean;
  inviteLink: string;
  onClose: () => void;
}

const CopyLinkDialog: React.FC<CopyLinkDialogProps> = ({
  isOpen,
  inviteLink,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <h2 className="text-2xl font-semibold">Invite Link</h2>
        <p className="text-gray-400 mt-2">
          Share this link to invite users to your team:
        </p>
        <div className="mt-4 flex items-center justify-between bg-[#1E1E1E] text-gray-300 px-3 py-2 rounded-md border border-gray-700">
          <span className="truncate">{inviteLink}</span>
          <button
            onClick={handleCopy}
            className="text-blue-400 hover:text-blue-300"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button buttonText="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CopyLinkDialog;
