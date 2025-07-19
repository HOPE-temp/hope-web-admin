'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import {
  findAllUsers
} from '@/services/hopeBackend/users';

type UserContextType = {
  users: User[];
  updateParams: (filter?: FilterUserDto) => void;
  updateUsers: () => void;
  loading: boolean;
  total: number;
  limit: number;
  offset: number;

};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { axios } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [params, setParams] = useState<FilterUserDto>({});
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getUsers = async (param?: FilterUserDto) => {
    setLoading(true);
    const res = await findAllUsers(axios, param);
    console.log({ res });
    // Si la respuesta es un array directamente:
    setUsers(res.items);
    // Si quieres paginación, deberías modificar el backend para retornar { items, total, ... }
    setLimit(10); // O el valor que uses por defecto
    setOffset(0);
    setTotal(Array.isArray(res) ? res.length : 0);
    setLoading(false);
  };

  const updateUsers = () => {
    getUsers(params);
  };

  useEffect(() => {
    getUsers(params);
  }, [params]);

  const updateParams = (filter?: FilterUserDto) => {
    setParams({ ...params, ...filter });
  };

  return (
    <UserContext.Provider
      value={{
        users,
        updateParams,
        updateUsers,
        loading,
        limit,
        offset,
        total,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}