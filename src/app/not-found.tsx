// src/app/not-found.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
      <h3 className="text-green-600 text-8xl font-extrabold">404</h3>
      <Image
        src="/images/perrito-404.png"
        alt="Perrito cavando en busca de la página"
        width={400}
        height={300}
        priority
      />
      <p className="mt-4 text-lg text-gray-600 ">
        Lo sentimos, esta página no existe.
      </p>
      <Link href="/">
        <span className="mt-6 inline-block text-blue-600 hover:underline">
          Volver al inicio
        </span>
      </Link>
    </main>
  );
}
