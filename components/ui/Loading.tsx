import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  message = "Loading...",
}) => {
  const dotSize = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col justify-center items-center h-screen bg-[#09090b] space-y-4"
    >
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`${dotSize[size]} bg-gray-400 rounded-full animate-bounce`}
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      {message && (
        <p className="text-gray-400 text-sm md:text-base">{message}</p>
      )}
    </div>
  );
};

export default Loading;
