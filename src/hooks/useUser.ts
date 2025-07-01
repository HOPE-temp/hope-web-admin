import { useEffect, useState, useCallback } from "react"


export interface UserTableRow {
  id: number
  lastName: string
  firstName: string
  email: string
  phone: string
  address: string | null
  documentNumber: string
  rol: string
  username: string
}


export type CreateUserInput = {
  username: string;  
  firstName: string;
  location : string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  documentNumber: string;
  rol: string;
};

export type UpdateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  rol: string;
};

export function useUsers() {
  const [users, setUsers] = useState<UserTableRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  
  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch("https://hope-nest-backend-production.up.railway.app/users", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) throw new Error("Error al obtener usuarios")
      const data = await res.json()
      const mapped: UserTableRow[] = data.map((u: any) => ({
        id: u.id,
        lastName: u.info.lastName,
        firstName: u.info.firstName,
        email: u.info.email,
        phone: u.info.phone,
        address: u.info.address,
        documentNumber: u.info.documentNumber,
        rol: u.info.rol,
        username: u.info.username,
      }))
      setUsers(mapped)
    } catch (err: any) {
      setError(err.message || "Error desconocido")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

 
  const createUser = async (input: CreateUserInput) => {
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch("https://hope-nest-backend-production.up.railway.app/users", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || "Error al crear usuario")
      }
      await fetchUsers() 
      return await res.json()
    } catch (err: any) {
      throw new Error(err.message || "Error desconocido")
    }
  }

  
  const updateUser = async (id: number, input: UpdateUserInput) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://hope-nest-backend-production.up.railway.app/users/${id}/private`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al editar usuario");
      }
      await fetchUsers();
      return await res.json();
    } catch (err: any) {
      throw new Error(err.message || "Error desconocido");
    }
  }


  const deleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch(`https://hope-nest-backend-production.up.railway.app/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || "Error al eliminar usuario")
      }
      await fetchUsers() 
    } catch (err: any) {
      throw new Error(err.message || "Error desconocido")
    }
  }
  return { users, loading, error, createUser, updateUser, deleteUser }
}