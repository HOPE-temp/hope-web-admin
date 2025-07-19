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
  updateParams: (filter?: FilterActivityDto) => void;
  updateActivities: () => void;
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

  const [activities, setActivities] = useState<Activity[]>([]);
  const [params, setParams] = useState<FilterActivityDto>({});
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getActivity = async (param?: FilterActivityDto) => {
    setLoading(true);
    const res = await findAllActivities(axios, param);
    console.log({res});
    if (res) {
      setActivities(res.items);
      setLimit(res.limit);
      setOffset(res.offset);
      setTotal(res.total);
      setTotal(res.total);
    }
    setLoading(false);
  };
  const updateActivities = () => {
    getActivity(params);
  };

  useEffect(() => {
    getActivity(params);
  }, [params]);

  const updateParams = (filter?: FilterActivityDto) => {
    setParams({ ...params, ...filter });
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        updateParams,
        updateActivities,
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
