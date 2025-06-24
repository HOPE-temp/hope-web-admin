import { useEffect, useState } from "react"

export function usePets() {
  const [pets, setPets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch("https://hope-nest-backend-production.up.railway.app/animals")
      .then((res) => res.json())
      .then((data) => {
        setPets(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Error al cargar mascotas")
        setLoading(false)
      })
  }, [])

  return { pets, loading, error }
}