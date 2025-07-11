import { useAuth } from '@/context/AuthContext';
import {
  createActivity,
  deleteActivity,
  findAllActivities,
  updateActivity,
} from '@/services/hopeBackend/activities';
import { useEffect, useState, useCallback } from 'react';
export interface ActivityTableRow {
  id: number;
  title: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  resourceUrl: string | null;
  scheduleStartAt: string | null;
  scheduleEndAt: string | null;
  finished: boolean;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateActivityInput = {
  title: string;
};

export function useActivities() {
  const { axios } = useAuth();
  const [activities, setActivities] = useState<ActivityTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await findAllActivities(axios);

      const data = res.items;
      const mapped: ActivityTableRow[] = data.map((a: any) => ({
        id: a.id,
        title: a.title,
        imageUrl: a.imageUrl,
        imagePublicId: a.imagePublicId,
        resourceUrl: a.resourceUrl,
        scheduleStartAt: a.scheduleStartAt,
        scheduleEndAt: a.scheduleEndAt,
        finished: a.finished,
        admin: a.admin,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      }));
      setActivities(mapped);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const creatorActivity = async (input: CreateActivityInput) => {
    try {
      const res = createActivity(axios, input);
      await fetchActivities();
      return res;
    } catch (err: any) {
      throw new Error(err.message || 'Error desconocido');
    }
  };

  const updatorActivity = async (id: number, input: UpdateActivityDto) => {
    try {
      const res = await updateActivity(axios, id, input);

      await fetchActivities();
      return res;
    } catch (err: any) {
      throw new Error(err.message || 'Error desconocido');
    }
  };

  const deleterActivity = async (id: number) => {
    try {
      await deleteActivity(axios, id);
      await fetchActivities();
    } catch (err: any) {
      throw new Error(err.message || 'Error desconocido');
    }
  };

  const finisherActivity = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(
        `${process.env.HOPE_BACKEND_HOSTNAME}/activities/${id}/finish`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al finalizar actividad');
      }
      await fetchActivities();
      return await res.json();
    } catch (err: any) {
      throw new Error(err.message || 'Error desconocido');
    }
  };

  const updaloaderImageActivity = async (id: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('accessToken');
      const res = await fetch(
        `${process.env.HOPE_BACKEND_HOSTNAME}/activities/${id}/upload_image`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al finalizar actividad');
      }
      await fetchActivities();
      return await res.json();
    } catch (err: any) {
      throw new Error(err.message || 'Error desconocido');
    }
  };

  return {
    activities,
    loading,
    error,
    creatorActivity,
    updatorActivity,
    deleterActivity,
    finisherActivity,
    updaloaderImageActivity,
  };
}
