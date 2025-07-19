'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { findAllAnimals } from '@/services/hopeBackend/animals';

type AnimalContextType = {
  animals: Animal[];
  updateParams: (filter?: FilterAnimalDto) => void;
  updateAnimals: () => void;
  loading: boolean;
  limit: number;
  offset: number;
  total: number;
};

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export function AnimalProvider({ children }: { children: ReactNode }) {
  const { axios } = useAuth();

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [params, setParams] = useState<FilterAnimalDto>({});
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getAnimals = async (param?: FilterAnimalDto) => {
    setLoading(true);
    const res = await findAllAnimals(axios, param);
    console.log({res});
    setAnimals(res.items);
    setLimit(res.limit);
    setOffset(res.offset);
    setTotal(res.total);
    setLoading(false);
  };

  const updateAnimals = () => {
    getAnimals(params);
  };

  useEffect(() => {
    getAnimals(params);
  }, [params]);

  const updateParams = (filter?: FilterAnimalDto) => {
    setParams({ ...params, ...filter });
  };

  return (
    <AnimalContext.Provider
      value={{
        animals,
        updateParams,
        updateAnimals,
        loading,
        limit,
        offset,
        total,
      }}
    >
      {children}
    </AnimalContext.Provider>
  );
}

export function useAnimal() {
  const context = useContext(AnimalContext);
  if (!context) {
    throw new Error('useAnimal must be used within an AnimalProvider');
  }
  return context;
}
