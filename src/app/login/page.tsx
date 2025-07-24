'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { useLogin } from '@/hooks/useLogin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useLogin();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) setOpen(true);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rol = await login(email, password);
    if (rol) {
      router.push('/admin');
    }
    // if (rol === 'admin') router.push('/admin')
    // else if (rol === 'volunteer') router.push('/voluntario')
    // else if (rol === 'medico') router.push('/medico')
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <section className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <img
          src="https://www.gentedehoy.es/wp-content/uploads/2020/03/Mascota-familia_1.jpg"
          alt=""
          className="object-cover w-full h-64 md:h-full md:max-h-screen"
        />
      </section>
      <section className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form
          className="w-full max-w-sm space-y-6 border border-gray-300 rounded-xl bg-white shadow-lg p-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center space-y-2 pt-6">
            {/* Icono de persona */}
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
              <FaUser className="w-10 h-10" style={{ color: '#5DBFA7' }} />
            </span>
            <h2 className="text-2xl font-semibold text-gray-700">
              Iniciar Sesión
            </h2>
          </div>
          <section className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(v => !v)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-[#5DBFA7] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </section>
          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
          </div>
        </form>
        {/* AlertDialog para mostrar errores */}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error al iniciar sesión</AlertDialogTitle>
              <AlertDialogDescription>{error}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setOpen(false)}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </main>
  );
}
