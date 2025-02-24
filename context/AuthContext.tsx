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
import Loading from "@/components/ui/Loading";

type PathType = string;

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

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  EVALUATOR: "EVALUATOR",
  USER: "USER",
} as const;

export type RoleType = keyof typeof ROLES;

interface RouteConfig {
  PUBLIC: {
    paths: PathType[];
    roles: never[];
  };
  USER: {
    paths: PathType[];
    roles: RoleType[];
  };
  EVALUATOR: {
    paths: PathType[];
    roles: RoleType[];
  };
  ADMIN: {
    paths: PathType[];
    roles: RoleType[];
  };
  SUPER_ADMIN: {
    paths: PathType[];
    roles: RoleType[];
  };
}

export const ROUTE_CONFIG: RouteConfig = {
  PUBLIC: {
    paths: ["/login", "/register"],
    roles: [],
  },
  USER: {
    paths: [
      "/",
      "/user",
      "/editProfile",
      "/team",
      "/createTeam",
      "/joinTeam/[id]",
      "/project",
      "/createproject",
      "/updateProject",
    ],
    roles: [ROLES.USER],
  },
  EVALUATOR: {
    paths: [
      "/",
      "/user",
      "/editProfile",
      "/evaluatorcontrols",
      "/user/[id]",
      "/allteams",
      "/team/[id]",
      "/allprojects",
      "/project/[id]",
      "/evaluate/[id]",
    ],
    roles: [ROLES.EVALUATOR],
  },
  ADMIN: {
    paths: [
      "/",
      "/user",
      "/editProfile",
      "/admincontrols",
      "/allteams",
      "/team/[id]",
      "/allusers",
      "/user/[id]",
      "/allprojects",
      "/project/[id]",
      "/evaluate/[id]",
    ],
    roles: [ROLES.ADMIN],
  },
  SUPER_ADMIN: {
    paths: [
      "/",
      "/user",
      "/editProfile",
      "/admincontrols",
      "/allteams",
      "/team/[id]",
      "/allusers",
      "/user/[id]",
      "/promoteUser/[userId]",
      "/allprojects",
      "/project/[id]",
      "/evaluate/[id]",
    ],
    roles: [ROLES.SUPER_ADMIN],
  },
} as const;

const pathMatches = (routePath: PathType, currentPath: string): boolean => {
  if (routePath === currentPath) return true;

  const routeParts = routePath.split("/");
  const currentParts = currentPath.split("/");

  if (routeParts.length !== currentParts.length) return false;

  return routeParts.every((part: string, i: number) => {
    if (part.startsWith("[") && part.endsWith("]")) return true;
    return part === currentParts[i];
  });
};

const isRouteAccessible = (
  pathname: string,
  userRole: RoleType | null
): boolean => {
  if (
    ROUTE_CONFIG.PUBLIC.paths.some((path: PathType) =>
      pathMatches(path, pathname)
    )
  ) {
    return true;
  }

  if (!userRole) {
    return false;
  }

  const roleAccess: Record<RoleType, RoleType[]> = {
    [ROLES.SUPER_ADMIN]: [ROLES.SUPER_ADMIN],
    [ROLES.ADMIN]: [ROLES.ADMIN],
    [ROLES.EVALUATOR]: [ROLES.EVALUATOR],
    [ROLES.USER]: [ROLES.USER],
  };

  const accessibleRoles = roleAccess[userRole] || [];

  console.log("Access Check:", {
    userRole,
    accessibleRoles,
    pathname,
  });

  for (const [configKey, config] of Object.entries(ROUTE_CONFIG)) {
    if (configKey === "PUBLIC") continue;

    const pathMatch = config.paths.some((path: PathType) =>
      pathMatches(path, pathname)
    );

    if (pathMatch) {
      const hasAccess = config.roles.some((role: RoleType) =>
        accessibleRoles.includes(role)
      );

      if (hasAccess) return true;
    }
  }

  return false;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      if (!token) {
        setLoading(false);
        setUser(null);
        return;
      }

      const decoded = decodeToken(token);
      if (!isTokenValid(decoded)) {
        logout();
        return;
      }

      const res = await api.get("/user");
      setUser(res.data);
      updateTokenData();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403 || status === 404) {
          logout();
        }
      }
    } finally {
      setLoading(false);
    }
  }, [logout, updateTokenData]);

  useEffect(() => {
    getUser();
  }, [getUser]);

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
    if (!ROUTE_CONFIG.PUBLIC.paths.includes(pathname)) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [pathname, getUser]);

  useEffect(() => {
    const handleRouteProtection = async () => {
      if (loading) return;

      if (!user && !ROUTE_CONFIG.PUBLIC.paths.includes(pathname)) {
        console.log("Redirecting to login - no user");
        await router.push("/login");
      } else if (user && !isRouteAccessible(pathname, userRole as RoleType)) {
        console.log("Redirecting to home - not accessible");
        await router.push("/");
      }
    };

    handleRouteProtection();
  }, [loading, user, pathname, router, userRole]);

  if (loading) {
    return <Loading />;
  }

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

export const useRouteAccess = (requiredRoles: RoleType[]) => {
  const { userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userRole || !requiredRoles.includes(userRole as RoleType)) {
      router.push("/");
    }
  }, [userRole, router, requiredRoles]);

  return userRole && requiredRoles.includes(userRole as RoleType);
};
