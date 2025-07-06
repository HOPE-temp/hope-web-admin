"use client";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStogare";
import axios from '@/lib/axiosInstance'

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  loaded: boolean;
  role: RoleUser | null;
  setRole: (token: RoleUser | null) => void;
  axios: Axios.AxiosInstance;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken, loaded] = useLocalStorage<string>("accessToken", null);
  const [role, setRole] = useLocalStorage<RoleUser>("rol", null);

  useEffect(()=>{
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common.Authorization
    }
  }, [token])


  return (
    <AuthContext.Provider value={{ token, setToken, role, setRole, loaded, axios }}>
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