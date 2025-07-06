import { useState } from 'react'

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) throw new Error('Credenciales incorrectas')
      const data = await res.json()
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('rol', data.user.rol)
      localStorage.setItem('fullName', data.user.fullName)
      return data.user.rol
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}