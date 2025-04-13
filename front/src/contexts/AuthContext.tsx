import { useState, ReactNode, useEffect } from "react";
import { type User } from "@/lib/types";
import { AuthContext } from "@/hooks/use-auth";

type AuthDataType = { user: User | null; accessToken: string | null };

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuthData: ({ user, accessToken }: AuthDataType) => void;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isAuthenticated = !!user && !!accessToken;

  // Sync auth data stored in localstorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
      setAuthData({ user: JSON.parse(storedUser), accessToken: storedToken });
    }
  }, []);

  const setAuthData = ({ user, accessToken }: AuthDataType) => {
    setUser(user);
    setAccessToken(accessToken);

    if (user && accessToken) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
