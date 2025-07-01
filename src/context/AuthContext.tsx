import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, AuthContextType, AuthProviderProps } from "../types";
import { getCookie, setCookie } from "../utils/cookieManager";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialUser = null,
  apiEndpoint = "/api/auth",
  storageKey = "auth-user",
}) => {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // SSR-safe initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem(storageKey);
        if (storedUser && !initialUser) {
          setCookie("storedUser", storedUser);
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.warn("Failed to load user from localStorage:", err);
      }
      setIsInitialized(true);
    }
  }, [storageKey, initialUser]);

  // Persist user to localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      if (user) {
        setCookie(storageKey, JSON.stringify(user));
        localStorage.setItem(storageKey, JSON.stringify(user));
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  }, [user, storageKey, isInitialized]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const token = getCookie("auth");
    console.log("auth from cookies", token);
    console.warn("auth from cookies", token);
    alert(token)
    try {
      const response = await fetch(`${apiEndpoint}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch(`${apiEndpoint}/logout`, { method: "POST" });
    } catch (err) {
      console.warn("Logout request failed:", err);
    } finally {
      setUser(null);
      setError(null);
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    isInitialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
