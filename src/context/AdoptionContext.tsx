'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { findAllAdoptions } from '@/services/hopeBackend/adoptions';

type AdoptionContextType = {
  adoptions: Adoption[];
  updateParams: (filter?: FilterAdoptionDto) => void;
  updateAdoptions: () => void;
  loading: boolean;
  limit: number;
  offset: number;
  total: number;
};

const AdoptionContext = createContext<AdoptionContextType | undefined>(
  undefined
);

export function AdoptionProvider({ children }: { children: ReactNode }) {
  const { axios, token } = useAuth();

  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [params, setParams] = useState<FilterAdoptionDto>({});
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getAdoption = async (param?: FilterAdoptionDto) => {
    setLoading(true);
    const res = await findAllAdoptions(axios, param);
    if (res) {
      setAdoptions(res.items);
      setLimit(res.limit);
      setOffset(res.offset);
      setTotal(res.total);
      setTotal(res.total);
    }
    setLoading(false);
  };
  const updateAdoptions = () => {
    getAdoption(params);
  };

  useEffect(() => {
    getAdoption(params);
  }, [params]);

  const updateParams = (filter?: FilterAdoptionDto) => {
    setParams({ ...params, ...filter });
  };

  return (
    <AdoptionContext.Provider
      value={{
        adoptions,
        updateParams,
        updateAdoptions,
        loading,
        limit,
        offset,
        total,
      }}
    >
      {children}
    </AdoptionContext.Provider>
  );
}

export function useAdoption() {
  const context = useContext(AdoptionContext);
  if (!context) {
    throw new Error('useAdoption must be used within an AdoptionProvider');
  }
  return context;
}
