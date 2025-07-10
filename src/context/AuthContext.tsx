'use client';
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStogare';
import { axios } from '@/lib/axiosInstance';
import toast from 'react-hot-toast';
import { AxiosInstance } from 'axios';
import { redirect, useRouter } from 'next/navigation';

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

  const saveAuth = ({ newToken, newRole, newUser }: UserAuth) => {
    setToken(newToken);
    setRole(newRole);
    setUser(newUser);
  };

  useEffect(() => {
    if (token && loaded) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    if (!token && loaded) {
      router.push('/login');
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
