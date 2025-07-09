import { useAuth } from '@/context/AuthContext';
import { countsReport } from '@/services/hopeBackend/reports';
import { useEffect, useState } from 'react';

type PanelCounts = {
  animal: number;
  adopter: number;
  adoption: number;
};

export function usePanel() {
  const { axios } = useAuth();
  const [counts, setCounts] = useState<PanelCounts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      setLoading(true);
      setError(null);
      try {
        const data = await countsReport(axios);
        setCounts({
          animal:
            typeof data.count.animal === 'number'
              ? data.count.animal
              : Object.keys(data.count.animal || {}).length,
          adopter:
            typeof data.count.adopter === 'number'
              ? data.count.adopter
              : Object.keys(data.count.adopter || {}).length,
          adoption:
            typeof data.count.adoption === 'number'
              ? data.count.adoption
              : Object.keys(data.count.adoption || {}).length,
        });
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  return { counts, loading, error };
}
