'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStogare';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token] = useLocalStorage<string>('token', null);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  return <>{children}</>;
}