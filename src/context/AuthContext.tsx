"use client";
import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStogare";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  loaded: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken, loaded] = useLocalStorage<string>("accessToken", null);

  return (
    <AuthContext.Provider value={{ token, setToken, loaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}