import { env } from "@/config/env";
import { useEffect, useState, useCallback } from "react"
// TODO: idiomas de campos en español
export interface AnimalTableRow {
  id: number;
  images: string[] | null;
  nickname: string;
  type: string;
  breed: string;
  size: string;
  sex: string;
  birthdate: string;
  status: string;
  descriptionHistory: string;
  isSterilized: boolean;
}

export interface CreateAnimalInput {
  nickname: string
  type: string
  breed: string
  size: string
  sex: string
  status: string
  birthdate: string
  descriptionHistory: string
  isSterilized: boolean
}

export interface EditAnimalInput {
  nickname: string
  breed: string
  size: string
  sex: string
  birthdate: string
  descriptionHistory: string
  isSterilized: boolean
}

export interface EditAnimalStatusInput {
  status: string
}

export function useAnimals() {
  const [animals, setAnimals] = useState<AnimalTableRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnimals = useCallback(async () => {
    setLoading(true)
    setError(null)
    console.log({env:process.env})
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch(env.backend.hostname + "/animals", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) throw new Error("Error al obtener animales")
      const data = await res.json()
    console.log({data})
      setAnimals(data)
    } catch (err: any) {
      setError(err.message || "Error desconocido")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAnimals()
  }, [fetchAnimals])

  const createAnimal = async (input: CreateAnimalInput) => {
    const token = localStorage.getItem("accessToken")
    const res = await fetch(process.env.HOPE_BACKEND_HOSTNAME + "/animals", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
    if (!res.ok) throw new Error("Error al registrar animal")
    await fetchAnimals()
    return await res.json()
  }

  const updateAnimal = async (id: number, input: EditAnimalInput) => {
    const token = localStorage.getItem("accessToken")
    const res = await fetch(`${process.env.HOPE_BACKEND_HOSTNAME}/animals/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
    if (!res.ok) throw new Error("Error al editar animal")
    await fetchAnimals()
    return await res.json()
  }

  const updateAnimalStatus = async (id: number, input: EditAnimalStatusInput) => {
    const token = localStorage.getItem("accessToken")
    const res = await fetch(`${process.env.HOPE_BACKEND_HOSTNAME}/animals/${id}/status`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Error al editar estado:", errorData);
      throw new Error(errorData.message || "Error al editar estado");
    }
    await fetchAnimals()
    return await res.json()
  }

  const deleteAnimal = async (id: number) => {
    const token = localStorage.getItem("accessToken")
    const res = await fetch(`${process.env.HOPE_BACKEND_HOSTNAME}/animals/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    if (!res.ok) throw new Error("Error al eliminar animal")
    await fetchAnimals()
    return true
  }

  const uploadImage = async (id: number, file: File) => {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.HOPE_BACKEND_HOSTNAME}/animals/${id}/upload_image`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) throw new Error("Error al subir imagen");
    await fetchAnimals();
    return await res.json();
  };

  return { animals, loading, error, createAnimal, updateAnimal, updateAnimalStatus, deleteAnimal, uploadImage }
}