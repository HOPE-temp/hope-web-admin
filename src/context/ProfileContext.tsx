'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { findAllUsers } from '@/services/hopeBackend/users';
import { useLocalStorage } from '@/hooks/useLocalStogare';

type ProfileContextType = {
  user?: PrivateUser;
  updateUser: (user: PrivateUser) => void;
  loading: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { axios } = useAuth();

  const [user, setUser, loading] = useLocalStorage<PrivateUser>('user', null);

  const getUsers = async () => {
    try {
      const res = await findAllUsers(axios);
    } catch (error: any) {
      throw error;
    } finally {
    }
  };

  const updateUser = (user: PrivateUser) => {
    setUser(user);
    getUsers();
  };

  return (
    <ProfileContext.Provider
      value={{
        user: user || undefined,
        updateUser,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
