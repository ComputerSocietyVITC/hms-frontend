import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface ErrorProps {
  error: string;
  type?: "unauthorized" | "notFound" | "generic";
  showIcon?: boolean;
}

const messages = {
  unauthorized: [
    "🔐 Whoopsie! VIP area detected - Your name's not on the list!",
    "🚫 Hey there, sneaky! This is like trying to use your friend's Netflix account",
    "⛔ Hold up! This is like trying to crash a party without the secret handshake",
    "🎭 Nice try, incognito! But we need to see some digital ID",
    "🚪 Knock knock! Who's there? Not your access credentials!",
  ],
  notFound: [
    "🔍 Hmm... This page is playing hide and seek (and it's winning)",
    "🌪️ Toto, I've a feeling we're not in Kansas anymore",
    "🕳️ Looks like this page took a wrong turn at Albuquerque",
    "👻 Spooky... This page has vanished into thin air",
    "🗺️ We've looked high and low, but this page is being a ninja",
  ],
  generic: [
    "🤖 Beep boop... Computer says no",
    "🎭 Plot twist! Something went dramatically wrong",
    "🌟 Houston, we've got a situation",
    "🎪 Welcome to the error circus! We're still training our digital acrobats",
    "🎲 Looks like the internet gremlins are at it again",
  ],
};

const Error: React.FC<ErrorProps> = ({
  error,
  type = "generic",
  showIcon = true,
}) => {
  const [quirkyMessage, setQuirkyMessage] = useState("");

  useEffect(() => {
    const getQuirkyMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages[type].length);
      return messages[type][randomIndex];
    };

    setQuirkyMessage(getQuirkyMessage());
  }, [type]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] p-4"
    >
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center space-y-4 animate-in slide-in-from-top duration-500">
          {showIcon && (
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
          )}

          <div className="bg-red-50 border-red-500 p-4 shadow-lg mt-8">
            <div className="flex items-center space-x-2">
              <span className="text-red-800 font-semibold text-lg text-center">
                {quirkyMessage || "🦇"}
              </span>
            </div>
            <p
              className={cn(
                "text-red-700 text-center",
                quirkyMessage && "mt-2"
              )}
            >
              {quirkyMessage && error}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
