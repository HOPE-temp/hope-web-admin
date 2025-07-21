import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function useLogin() {
  const { saveAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_HOPE_BACKEND_HOSTNAME || "https://hope-nest-backend.onrender.com";
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Credenciales incorrectas');
      const data = await res.json();
      saveAuth({
        newRole: data.user.rol,
        newToken: data.accessToken,
        newUser: data.user,
        newExpirate: new Date().getTime() + 1000 * 60 * 60 * 24,
      });
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
