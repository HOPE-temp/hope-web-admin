'use client';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';

export default function Page() {
  const { token } = useAuth();
  if (token) {
    redirect('/admin');
  }
  redirect('/login');
}
