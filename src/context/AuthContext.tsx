'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStogare';
import Axios from '@/lib/axiosInstance';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { LoadingPerritos } from '@/components/layout/Loading/Loading';

type UserAuth = {
  newToken: string;
  newRole: RoleUser;
  newUser: PrivateUser;
  newExpirate: number;
};
type AuthContextType = {
  token: string | null;
  role: RoleUser | null;
  user: PrivateUser | null;
  expirate: number | null;
  saveAuth: (auth: UserAuth) => void;
  loaded: boolean;
  axios: AxiosInstance;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [axios, setAxios] = useState<Axios>(new Axios());
  const [token, setToken, loaded] = useLocalStorage<string>(
    'accessToken',
    null
  );
  const [role, setRole] = useLocalStorage<RoleUser>('rol', null);
  const [user, setUser] = useLocalStorage<PrivateUser>('user', null);
  const [expirate, setExpirate] = useLocalStorage<number>('expirate', null);
  const router = useRouter();

  const saveAuth = ({ newToken, newRole, newUser, newExpirate }: UserAuth) => {
    setToken(newToken);
    setRole(newRole);
    setUser(newUser);
    setExpirate(newExpirate);
  };

  useEffect(() => {
    if (loaded) {
      axios.set404(router);
    }
  }, [loaded]);

  useEffect(() => {
    if (token && loaded) {
      axios.setAuthorization(token);
    }
    if (!token && loaded) {
      axios.deleteAuthorization(router);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        expirate,
        saveAuth,
        loaded,
        axios: axios.axiosInstance,
      }}
    >
      {!loaded ? <LoadingPerritos /> : children}
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
