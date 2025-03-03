"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import DialogBox from "./DialogBox";
import api from "@/api";
import { Project } from "@/types";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

const HeaderComponent = () => {
  const { user, userRole } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getProject = async () => {
      if (userRole === "USER") {
        try {
          const response = await api.get("/project");

          if (response.status === 200) {
            setProject(response.data);
          }
        } catch {}
      }
    };

    getProject();
  }, [userRole]);

  useEffect(() => {
    router.prefetch("/admincontrols");
    router.prefetch("/team");
    router.prefetch("/user");
    router.prefetch("/login");
    router.prefetch("/evaluatorcontrols");
    router.prefetch("/createproject");
    router.prefetch("/createTeam");
    router.prefetch("/project");
  }, [router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getUserInitials = () => {
    if (user && user.name) {
      const nameParts = user.name.split(" ");
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return user.name[0].toUpperCase();
    }
    return "U";
  };

  return (
    <header className="flex justify-between items-center w-full bg-[#121212] text-white py-4 px-6 border-b border-gray-700">
      <Link className="text-lg font-bold" href="/">
        IEEE CS VITC / HMS
      </Link>

      <div className="flex items-center">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center rounded-full hover:ring-1 focus:ring-1 hover:ring-white focus:ring-white"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {user?.imageId && user?.mimeType ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={getImageUrl(user?.imageId, user?.mimeType)!}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center font-medium">
                {getUserInitials()}
              </div>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1c1c1c] rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="font-medium text-lg text-white truncate">
                  {user?.name}
                </p>
                <p className="text-gray-400 text-sm truncate">{user?.regNum}</p>
              </div>

              <Link
                href="/user"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Your profile
              </Link>

              {(userRole === "ADMIN" || userRole === "SUPER_ADMIN") && (
                <Link
                  href="/admincontrols"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white "
                >
                  Admin Controls
                </Link>
              )}

              {userRole === "EVALUATOR" && (
                <Link
                  href="/evaluatorcontrols"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Evaluator Controls
                </Link>
              )}

              {user && userRole === "USER" && (
                <>
                  {user.teamId ? (
                    <Link
                      href="/team"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      View Team
                    </Link>
                  ) : (
                    <Link
                      href="/createTeam"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Create Team
                    </Link>
                  )}

                  {user.teamId &&
                    (project ? (
                      <Link
                        href="/project"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white "
                      >
                        View Project
                      </Link>
                    ) : (
                      user.isLeader && (
                        <Link
                          href="/createproject"
                          className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          Create Project
                        </Link>
                      )
                    ))}
                </>
              )}

              <div className="border-t border-gray-700 mt-1"></div>

              <button
                onClick={() => setIsDialogOpen(true)}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      <DialogBox
        isOpen={isDialogOpen}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        positive={false}
        onConfirm={handleLogout}
        onCancel={() => setIsDialogOpen(false)}
      />
    </header>
  );
};

export default HeaderComponent;
