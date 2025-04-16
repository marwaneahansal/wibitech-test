import { useState, ReactNode, useEffect, useCallback } from "react";
import { type User } from "@/lib/types";
import { AuthContext } from "@/hooks/use-auth";

type AuthDataType = { user: User | null; accessToken: string | null };

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  isLoading: boolean;

  setAuthData: ({ user, accessToken }: AuthDataType) => void;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isAuthenticated = !!user && !!accessToken;

  const setAuthData = useCallback(({ user, accessToken }: AuthDataType) => {
    setUser(user);
    setAccessToken(accessToken);

    if (user && accessToken) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
  }, []);

  // Sync auth data stored in localstorage on mount
  useEffect(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
      setAuthData({ user: JSON.parse(storedUser), accessToken: storedToken });
    }
    setIsLoading(false);
  }, [setAuthData]);

  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, isLoading, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
