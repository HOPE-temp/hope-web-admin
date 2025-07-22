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


type FilterUserDto = {
  search?: string;
  rol?: string;
  limit?: number;
  offset?: number;
};

type UserContextType = {
  users: User[];
  allUsers: User[]; 
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

  const [allUsers, setAllUsers] = useState<User[]>([]); 
  const [users, setUsers] = useState<User[]>([]); 
  const [params, setParams] = useState<FilterUserDto>({});
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const filterUsers = (filters: FilterUserDto) => {
    console.log('Aplicando filtros:', filters);
    let filtered = [...allUsers];

    
    const hasActiveFilters = (filters.search && filters.search.trim() !== '') || 
                            (filters.rol && filters.rol !== '');
    
    if (!hasActiveFilters) {
      console.log('No hay filtros activos, mostrando todos los usuarios');
      setUsers(filtered);
      setTotal(filtered.length);
      return;
    }

    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(user => 
        user.info.firstName?.toLowerCase().includes(searchTerm) ||
        user.info.lastName?.toLowerCase().includes(searchTerm) ||
        user.info.email?.toLowerCase().includes(searchTerm) ||
        user.info.username?.toLowerCase().includes(searchTerm) ||
        user.info.documentNumber?.includes(searchTerm)
      );
    }

    if (filters.rol && filters.rol !== '') {
      filtered = filtered.filter(user => user.info.rol === filters.rol);
    }

    console.log('Usuarios después del filtro:', filtered.length, 'de', allUsers.length);
    setUsers(filtered);
    setTotal(filtered.length);
  };

  const getUsers = async () => {
    setLoading(true);
    console.log('Cargando todos los usuarios...');
    
    try {
      const res = await findAllUsers(axios); 
      console.log('Respuesta exitosa del backend:', res);
      setAllUsers(res.items);
      setUsers(res.items); 
      setLimit(10); 
      setOffset(0);
      setTotal(res.items.length);
    } catch (error: any) {
      console.error('Error completo:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status code:', error.response?.status);
      console.error('Config:', error.config);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUsers = () => {
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []); 

  const updateParams = (filter?: FilterUserDto) => {
    console.log('Parámetros de filtro actualizados:', filter);
    console.log('Parámetros anteriores:', params);
    const newParams = { ...params, ...filter };
    setParams(newParams);
    filterUsers(newParams); 
  };

  return (
    <UserContext.Provider
      value={{
        users,
        allUsers,
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