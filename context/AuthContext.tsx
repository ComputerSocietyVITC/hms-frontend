"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/api";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  authId: string;
  college: string;
  createdAt: string;
  github: string | null;
  id: string;
  imageId: string | null;
  isLeader: boolean;
  name: string;
  phone: string;
  regNum: string;
  role: "ADMIN" | "EVALUATOR" | "SUPER_ADMIN" | "USER";
  teamId: string | null;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  getUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = async () => {
    try {
      const res = await api.get("/user");
      setUser(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          setUser(null);
          if (window.location.pathname !== "/register") {
            router.push("/login");
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
