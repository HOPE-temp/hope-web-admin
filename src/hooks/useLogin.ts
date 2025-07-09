import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function useLogin() {
  const { setToken, setRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Credenciales incorrectas');
      const data = await res.json();
      setToken(data.accessToken);
      setRole(data.user.rol);
      localStorage.setItem('fullName', data.user.fullName);
      return data.user.rol;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
