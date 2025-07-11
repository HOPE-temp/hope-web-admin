import { useAuth } from '@/context/AuthContext';
import {
  findAllUsers,
  createUser,
  updatePrivateUser,
  deleteUser,
} from '@/services/hopeBackend/users';
import { useEffect, useState, useCallback } from 'react';

export interface UserTableRow {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  address: string | null;
  documentNumber: string;
  rol: string;
  username: string;
}

export type CreateUserInput = {
  username: string;
  firstName: string;
  location: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  documentNumber: string;
  rol: string;
};

export type UpdateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  rol: string;
};

export function useUsers() {
  const [users, setUsers] = useState<UserTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { axios } = useAuth();
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await findAllUsers(axios);
      const data = res.items;
      console.log({ res });
      const mapped: UserTableRow[] = data.map((u: any) => ({
        id: u.id,
        lastName: u.info.lastName,
        firstName: u.info.firstName,
        email: u.info.email,
        phone: u.info.phone,
        address: u.info.address,
        documentNumber: u.info.documentNumber,
        rol: u.info.rol,
        username: u.info.username,
      }));
      setUsers(mapped);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const creatorUser = async (input: CreateUserDto) => {
    try {
      await createUser(axios, input);

      await fetchUsers();
    } catch (err: any) {
      throw new Error(err.message || 'Error desconocido');
    }
  };

  const updatorUser = async (id: number, input: UpdatePrivateUserDto) => {
    try {
      const res = await updatePrivateUser(axios, id, input);

      await fetchUsers();
      return res;
    } catch (err: any) {
      throw new Error(err.message || 'Error desconocido');
    }
  };

  const deleterUser = async (id: number) => {
    try {
      await deleteUser(axios, id);

      await fetchUsers();
    } catch (err: any) {
      throw new Error(err.message || 'Error desconocido');
    }
  };
  return { users, loading, error, creatorUser, updatorUser, deleterUser };
}
