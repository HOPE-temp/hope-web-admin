'use client';
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStogare';
import { axios } from '@/lib/axiosInstance';
import toast from 'react-hot-toast';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';

type UserAuth = {
  newToken: string;
  newRole: RoleUser;
  newUser: PrivateUser;
};
type AuthContextType = {
  token: string | null;
  role: RoleUser | null;
  user: PrivateUser | null;
  saveAuth: (auth: UserAuth) => void;
  loaded: boolean;
  axios: AxiosInstance;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken, loaded] = useLocalStorage<string>(
    'accessToken',
    null
  );
  const [role, setRole] = useLocalStorage<RoleUser>('rol', null);
  const [user, setUser] = useLocalStorage<PrivateUser>('user', null);
  const router = useRouter();

  useEffect(() => {
    // Interceptores de error

    axios.interceptors.response.use(
      res => {
        console.log(res);
        return res;
      },
      err => {
        const status = err.response?.status;
        // Si ya se manejó localmente, no hagas nada

        if (typeof window !== 'undefined') {
          switch (status) {
            case 400:
              toast.error('Solicitud incorrecta: Revisa los campos enviados');
              break;
            case 401:
              toast.error('No autorizado: Debes iniciar sesión.');
              router.push('/login');
              break;
            case 200:
              toast.success('¡Todo bien!: Operación completada con éxito.');
              break;
            default:
              toast.error('Error desconocido: Algo salió mal.');
          }
        }

        return Promise.reject(err);
      }
    );
  }, []);

  const saveAuth = ({ newToken, newRole, newUser }: UserAuth) => {
    setToken(newToken);
    setRole(newRole);
    setUser(newUser);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, role, user, saveAuth, loaded, axios }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
