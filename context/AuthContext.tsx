"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/api";
import { useRouter, usePathname } from "next/navigation";
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

const PUBLIC_ROUTES = ["/login", "/register"];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const getUser = async () => {
    try {
      const res = await api.get("/user");
      setUser(res.data);
      setLoading(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403 || status === 404) {
          setUser(null);
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!loading) {
      if (!user && !PUBLIC_ROUTES.includes(pathname)) {
        router.push("/login");
      } else if (user && PUBLIC_ROUTES.includes(pathname)) {
        router.push("/");
      }
    }
  }, [loading, user, pathname, router]);

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
