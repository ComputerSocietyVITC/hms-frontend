import React, { useState, ChangeEvent } from "react";
import axios from "axios";

interface FileUploaderProps {
  onUploadSuccess?: (fileUrl: string) => void;
  onUploadError?: (error: Error) => void;
  label?: string;
  accept?: string;
  darkMode?: boolean;
  uploadEndpoint?: string;
  buttonText?: {
    select: string;
    change: string;
    upload: string;
    uploading: string;
  };
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  label = "File Upload",
  accept = "*/*",
  darkMode = false,
  uploadEndpoint = "/api/upload",
  buttonText = {
    select: "Select File",
    change: "Change File",
    upload: "Upload",
    uploading: "Uploading...",
  },
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setUploadedFileName(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(uploadEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setProgress(percentCompleted);
        },
      });

      setUploading(false);
      setProgress(100);

      if (onUploadSuccess) {
        onUploadSuccess(response.data.fileUrl || response.data.imageId);
      }
    } catch (error) {
      setUploading(false);

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error || "Upload failed";

        if (onUploadError) {
          onUploadError(new Error(errorMessage));
        }
      } else if (onUploadError && error instanceof Error) {
        onUploadError(error);
      }
    }
  };

  const themeClasses = {
    label: darkMode ? "text-gray-300" : "text-gray-700",
    selectButton: darkMode
      ? "bg-[#1a1a1a] text-gray-300 hover:bg-[#252525] border-gray-600"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300",
    uploadButton: darkMode
      ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-offset-[#121212]"
      : "bg-blue-500 hover:bg-blue-600 text-white",
    disabledButton: darkMode
      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
      : "bg-gray-300 text-gray-500 cursor-not-allowed",
    textColor: darkMode ? "text-gray-400" : "text-gray-500",
    progressBg: darkMode ? "bg-gray-700" : "bg-gray-200",
    progressFill: "bg-blue-500",
    successText: darkMode ? "text-green-400" : "text-green-600",
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={`block text-sm font-medium ${themeClasses.label} mb-1`}
        >
          {label}
        </label>
      )}

      <div className="flex items-center">
        <label
          className={`cursor-pointer flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${themeClasses.selectButton}`}
        >
          <span>{file ? buttonText.change : buttonText.select}</span>
          <input
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept={accept}
            disabled={uploading}
          />
        </label>
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`ml-3 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            !file || uploading
              ? themeClasses.disabledButton
              : themeClasses.uploadButton
          }`}
        >
          {uploading ? buttonText.uploading : buttonText.upload}
        </button>
      </div>

      {uploadedFileName && (
        <p className={`text-sm ${themeClasses.textColor} truncate`}>
          Selected: {uploadedFileName}
        </p>
      )}

      {uploading && (
        <div className="mt-1 flex items-center gap-2">
          <div
            className={`w-full ${themeClasses.progressBg} rounded-full h-1.5`}
          >
            <div
              className={`${themeClasses.progressFill} h-1.5 rounded-full transition-all duration-200 ease-in-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className={`text-xs ${themeClasses.textColor}`}>
            {progress}%
          </span>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
