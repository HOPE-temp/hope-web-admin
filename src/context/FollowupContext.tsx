'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { findAllFollowups } from '@/services/hopeBackend/followups';

type FollowupContextType = {
  followups: AdoptedAnimal[];
  updateParams: (filter?: FilterFollowupDto) => void;
  updateFollowups: () => void;
  loading: boolean;
  limit: number;
  offset: number;
  total: number;
};

const FollowupContext = createContext<FollowupContextType | undefined>(
  undefined
);

export function FollowupProvider({ children }: { children: ReactNode }) {
  const { axios, token } = useAuth();

  const [followups, setFollowups] = useState<AdoptedAnimal[]>([]);
  const [params, setParams] = useState<FilterFollowupDto>({});
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getFollowup = async (param?: FilterFollowupDto) => {
    setLoading(true);
    const res = await findAllFollowups(axios, param);
    if (res) {
      setFollowups(res.items);
      setLimit(res.limit);
      setOffset(res.offset);
      setTotal(res.total);
      setTotal(res.total);
    }
    setLoading(false);
  };
  const updateFollowups = () => {
    getFollowup(params);
  };

  useEffect(() => {
    getFollowup(params);
  }, [params]);

  const updateParams = (filter?: FilterFollowupDto) => {
    setParams({ ...params, ...filter });
  };

  return (
    <FollowupContext.Provider
      value={{
        followups,
        updateParams,
        updateFollowups,
        loading,
        limit,
        offset,
        total,
      }}
    >
      {children}
    </FollowupContext.Provider>
  );
}

export function useFollowup() {
  const context = useContext(FollowupContext);
  if (!context) {
    throw new Error('useFollowup must be used within an FollowupProvider');
  }
  return context;
}
