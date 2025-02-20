"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "@/api";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { User } from "@/types";
import { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
  role: string;
  exp?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  getUser: () => Promise<void>;
  userId: string | null;
  userRole: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = ["/login", "/register"];

const decodeToken = (token: string): DecodedToken | null => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const isTokenValid = (decoded: DecodedToken | null): boolean => {
  if (!decoded || !decoded.exp) return false;
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp > currentTime;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const logout = useCallback(() => {
    setUser(null);
    setUserId(null);
    setUserRole(null);
    localStorage.removeItem("token");
    router.push("/login");
  }, [router]);

  const updateTokenData = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && isTokenValid(decoded)) {
        setUserId(decoded.userId);
        setUserRole(decoded.role);
      } else {
        console.log("Token is invalid or expired. Logging out...");
        logout();
      }
    } else {
      setUserId(null);
      setUserRole(null);
    }
  }, [logout]);

  const getUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeToken(token);
        if (!isTokenValid(decoded)) {
          logout();
          return;
        }
      }

      const res = await api.get("/user");
      setUser(res.data);
      setLoading(false);
      updateTokenData();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403 || status === 404) {
          logout();
        }
      }
      setLoading(false);
    }
  }, [logout, updateTokenData]);

  useEffect(() => {
    updateTokenData();

    const tokenCheckInterval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeToken(token);
        if (!isTokenValid(decoded)) {
          logout();
        }
      }
    }, 60000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        updateTokenData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(tokenCheckInterval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [logout, updateTokenData]);

  useEffect(() => {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [pathname, getUser]);

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
    <AuthContext.Provider
      value={{
        user,
        loading,
        getUser,
        userId,
        userRole,
        logout,
      }}
    >
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
