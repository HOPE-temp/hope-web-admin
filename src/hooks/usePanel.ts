import { useEffect, useState } from "react"

type PanelCounts = {
  animal: number
  adopter: number
  adoption: number
}

export function usePanel() {
  const [counts, setCounts] = useState<PanelCounts | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCounts() {
      setLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem("accessToken")
        const res = await fetch("https://hope-nest-backend-production.up.railway.app/reports/counts", {
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        })
        if (!res.ok) throw new Error("No se pudo obtener los datos del panel")
        const data = await res.json()
        setCounts({
          animal: typeof data.count.animal === "number"
            ? data.count.animal
            : Object.keys(data.count.animal || {}).length,
          adopter: typeof data.count.adopter === "number"
            ? data.count.adopter
            : Object.keys(data.count.adopter || {}).length,
          adoption: typeof data.count.adoption === "number"
            ? data.count.adoption
            : Object.keys(data.count.adoption || {}).length,
        })
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }
    fetchCounts()
  }, [])

  return { counts, loading, error }
}