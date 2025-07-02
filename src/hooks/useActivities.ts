import { useEffect, useState, useCallback } from "react";
// TODO: subir imagenes de actividades
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

export type UpdateActivityInput = {
  title: string;
  resourceUrl: string;
  scheduleStartAt: string;
  scheduleEndAt: string;
  admin: boolean;
};

export function useActivities() {
  const [activities, setActivities] = useState<ActivityTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("https://hope-nest-backend-production.up.railway.app/activities", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Error al obtener actividades");
      const data = await res.json();
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
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const createActivity = async (input: CreateActivityInput) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("https://hope-nest-backend-production.up.railway.app/activities", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al crear actividad");
      }
      await fetchActivities();
      return await res.json();
    } catch (err: any) {
      throw new Error(err.message || "Error desconocido");
    }
  };

  const updateActivity = async (id: number, input: UpdateActivityInput) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://hope-nest-backend-production.up.railway.app/activities/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al editar actividad");
      }
      await fetchActivities();
      return await res.json();
    } catch (err: any) {
      throw new Error(err.message || "Error desconocido");
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://hope-nest-backend-production.up.railway.app/activities/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al eliminar actividad");
      }
      await fetchActivities(); 
    } catch (err: any) {
      throw new Error(err.message || "Error desconocido");
    }
  };

  const finishActivity = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://hope-nest-backend-production.up.railway.app/activities/${id}/finish`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al finalizar actividad");
      }
      await fetchActivities();
      return await res.json();
    } catch (err: any) {
      throw new Error(err.message || "Error desconocido");
    }
  };

  return { activities, loading, error, createActivity, updateActivity, deleteActivity, finishActivity };
}