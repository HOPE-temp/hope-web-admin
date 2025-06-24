import { useEffect, useState } from "react"

export function usePetById(id: string | number) {
  const [pet, setPet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`https://hope-nest-backend-production.up.railway.app/animals/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No encontrado")
        return res.json()
      })
      .then((data) => {
        setPet(data)
        setLoading(false)
      })
      .catch(() => {
        setError("No se pudo cargar la mascota")
        setLoading(false)
      })
  }, [id])

  return { pet, loading, error }
}