"use client";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStogare";
import axios from '@/lib/axiosInstance'
import { useAlertUIStore } from "@/lib/stores/alert.store";

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

  // Interceptores de error
    axios.interceptors.response.use(
      res => res,
      error => {
        const status = error.response?.status
        if (typeof window !== 'undefined') {
          const { showAlert } = useAlertUIStore.getState();

          switch (status) {
            case 400:
              showAlert({
                title: "Solicitud incorrecta",
                description: "Revisa los campos enviados.",
                variant: "destructive",
              });
              break;
            case 401:
              showAlert({
                title: "No autorizado",
                description: "Debes iniciar sesión.",
                variant: "destructive",
              });
              break;
            case 200:
              showAlert({
                title: "¡Todo bien!",
                description: "Operación completada con éxito.",
                variant: "default",
              });
              break;
            default:
              showAlert({
                title: "Error desconocido",
                description: "Algo salió mal.",
                variant: "destructive",
              });
            }
          }

        return Promise.reject(error)
      }
    )
  },[])

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