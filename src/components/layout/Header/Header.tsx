'use client';
import { PawPrint, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('fullName');
    setFullName(name || '');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <header className="flex items-center justify-between rounded-xl bg-white/80 shadow px-6 py-4 mb-6 border">
      <div className="flex items-center gap-3 ml-4">
        <PawPrint className="w-8 h-8 text-[#5DBFA7]" />
        <span className="text-2xl font-bold text-gray-800">HOPE Admin</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-base text-gray-600 hidden sm:block">
          ¡Bienvenido{user ? `, ${user.firstName} ${user.lastName}` : ''}!
        </span>
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="Perfil" />
            <AvatarFallback>
              <UserCircle className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
