'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { findAllActivities } from '@/services/hopeBackend/activities';

type ActivityContextType = {
  activities: Activity[];
  allActivities: Activity[];
  updateParams: (filter?: FilterActivityDto) => void;
  updateActivities: () => void;
  refreshActivities: () => Promise<void>;
  loading: boolean;
  limit: number;
  offset: number;
  total: number;
};

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

export function ActivityProvider({ children }: { children: ReactNode }) {
  const { axios } = useAuth();

  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [params, setParams] = useState<FilterActivityDto>({});
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getActivity = async (param?: FilterAdopterDto) => {
    setLoading(true);

    try {
      const res = await findAllActivities(axios, params); // Sin parámetros
      if (res) {
        setAllActivities(res.items);
        setActivities(res.items); // Inicialmente mostrar todas
        setLimit(res.limit || 10);
        setOffset(res.offset || 0);
        setTotal(res.items.length);
      }
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshActivities = async () => {
    await getActivity();
  };

  const updateActivities = () => {
    getActivity(params);
  };

  useEffect(() => {
    getActivity(params);
  }, [params]);

  const updateParams = (filter?: FilterAdopterDto) => {
    setParams({ ...params, ...filter });
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        allActivities,
        updateParams,
        updateActivities,
        refreshActivities,
        loading,
        limit,
        offset,
        total,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}
