'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, loaded, expirate } = useAuth();

  useEffect(() => {
    if (
      (loaded && !token) ||
      (loaded && expirate && expirate < new Date().getTime())
    ) {
      router.push('/login');
    }
  }, [loaded, token]);

  if (!loaded) return null; // Espera a que cargue el token

  return <>{children}</>;
}
