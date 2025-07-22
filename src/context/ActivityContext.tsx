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


type FilterActivityDto = {
  search?: string;
  finished?: boolean;
  admin?: boolean;
  limit?: number;
  offset?: number;
};

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
  const filterActivities = (filters: FilterActivityDto) => {
    console.log('Aplicando filtros de actividades:', filters);
    let filtered = [...allActivities];
    const hasActiveFilters = (filters.search && filters.search.trim() !== '') || 
                            (filters.finished !== undefined) ||
                            (filters.admin !== undefined);
    
    if (!hasActiveFilters) {
      console.log('No hay filtros activos, mostrando todas las actividades');
      setActivities(filtered);
      setTotal(filtered.length);
      return;
    }
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(activity => 
        activity.title?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.finished !== undefined) {
      filtered = filtered.filter(activity => activity.finished === filters.finished);
    }

    if (filters.admin !== undefined) {
      filtered = filtered.filter(activity => activity.admin === filters.admin);
    }

    console.log('Actividades después del filtro:', filtered.length, 'de', allActivities.length);
    setActivities(filtered);
    setTotal(filtered.length);
  };

  const getActivity = async () => {
    setLoading(true);
    console.log('Cargando todas las actividades...');
    
    try {
      const res = await findAllActivities(axios); // Sin parámetros
      console.log('Respuesta exitosa del backend (actividades):', res);
      if (res) {
        setAllActivities(res.items);
        setActivities(res.items); // Inicialmente mostrar todas
        setLimit(res.limit || 10);
        setOffset(res.offset || 0);
        setTotal(res.items.length);
      }
    } catch (error: any) {
      console.error('Error completo (actividades):', error);
      console.error('Response data:', error.response?.data);
      console.error('Status code:', error.response?.status);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshActivities = async () => {
    await getActivity();
  };

  const updateActivities = () => {
    console.log('Re-aplicando filtros actuales de actividades...');
    filterActivities(params);
  };

  useEffect(() => {
    getActivity();
  }, []);

  const updateParams = (filter?: FilterActivityDto) => {
    console.log('Parámetros de filtro de actividades actualizados:', filter);
    console.log('Parámetros anteriores:', params);
    const newParams = { ...params, ...filter };
    setParams(newParams);
    filterActivities(newParams);
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
