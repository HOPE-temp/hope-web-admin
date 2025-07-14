'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { findAllMedicalCheckups } from '@/services/hopeBackend/medicalCheckups';

type MedicalCheckupContextType = {
  medicalCheckups: MedicalCheckup[];
  updateParams: (filter?: FilterMedicalCheckupDto) => void;
  updateMedicalCheckups: () => void;
  loading: boolean;
  limit: number;
  offset: number;
  total: number;
};

const MedicalCheckupContext = createContext<
  MedicalCheckupContextType | undefined
>(undefined);

export function MedicalCheckupProvider({ children }: { children: ReactNode }) {
  const { axios } = useAuth();

  const [medicalCheckups, setMedicalCheckups] = useState<MedicalCheckup[]>([]);
  const [params, setParams] = useState<FilterMedicalCheckupDto>({});
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getMedicalCheckup = async (param?: FilterMedicalCheckupDto) => {
    setLoading(true);
    const res = await findAllMedicalCheckups(axios, param);
    if (res) {
      setMedicalCheckups(res.items);
      setLimit(res.limit);
      setOffset(res.offset);
      setTotal(res.total);
      setTotal(res.total);
    }
    setLoading(false);
  };
  const updateMedicalCheckups = () => {
    getMedicalCheckup(params);
  };

  useEffect(() => {
    getMedicalCheckup(params);
  }, [params]);

  const updateParams = (filter?: FilterMedicalCheckupDto) => {
    setParams({ ...params, ...filter });
  };

  return (
    <MedicalCheckupContext.Provider
      value={{
        medicalCheckups,
        updateParams,
        updateMedicalCheckups,
        loading,
        limit,
        offset,
        total,
      }}
    >
      {children}
    </MedicalCheckupContext.Provider>
  );
}

export function useMedicalCheckup() {
  const context = useContext(MedicalCheckupContext);
  if (!context) {
    throw new Error(
      'useMedicalCheckup must be used within an MedicalCheckupProvider'
    );
  }
  return context;
}
