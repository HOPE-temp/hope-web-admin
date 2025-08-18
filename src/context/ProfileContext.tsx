'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStogare';
import { findMe } from '@/services/hopeBackend/profileMe';

type ProfileContextType = {
  user: UserInfo;
  updateUser: () => void;
  loaded: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { axios, user, setUser, loaded } = useAuth();

  const getUsers = async () => {
    try {
      const res = await findMe(axios);
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      throw error;
    } finally {
    }
  };

  const updateUser = () => {
    getUsers();
  };

  return (
    <ProfileContext.Provider
      value={{
        user: user || {
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          district: '',
          documentNumber: '',
          avatar: '',
          rol: 'admin',
        },
        updateUser,
        loaded,
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
