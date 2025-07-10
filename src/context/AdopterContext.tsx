'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { findAllAdopters } from '@/services/hopeBackend/adopters';

type AdopterContextType = {
  adopters: Adopter[];
  updateParams: (filter?: FilterAdopterDto) => void;
  updateAdopters: () => void;
  loading: boolean;
  limit: number;
  offset: number;
  total: number;
};

const AdopterContext = createContext<AdopterContextType | undefined>(undefined);

export function AdopterProvider({ children }: { children: ReactNode }) {
  const { axios } = useAuth();

  const [adopters, setAdopters] = useState<Adopter[]>([]);
  const [params, setParams] = useState<FilterAdopterDto>({});
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getAdopter = async (param?: FilterAdopterDto) => {
    setLoading(true);
    const res = await findAllAdopters(axios, param);
    if (res) {
      setAdopters(res.items);
      setLimit(res.limit);
      setOffset(res.offset);
      setTotal(res.total);
      setTotal(res.total);
    }
    setLoading(false);
  };
  const updateAdopters = () => {
    getAdopter(params);
  };

  useEffect(() => {
    getAdopter(params);
  }, [params]);

  const updateParams = (filter?: FilterAdopterDto) => {
    setParams({ ...params, ...filter });
  };

  return (
    <AdopterContext.Provider
      value={{
        adopters,
        updateParams,
        updateAdopters,
        loading,
        limit,
        offset,
        total,
      }}
    >
      {children}
    </AdopterContext.Provider>
  );
}

export function useAdopter() {
  const context = useContext(AdopterContext);
  if (!context) {
    throw new Error('useAdopter must be used within an AdopterProvider');
  }
  return context;
}
