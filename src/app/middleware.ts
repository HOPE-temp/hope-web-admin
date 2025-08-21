// middleware.ts (en la raíz del proyecto, junto a /app o /pages)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir pasar sin redirección si es /forgot-password o /help
  if (pathname === '/forgot-password' || pathname === '/help') {
    return NextResponse.next();
  }

  // Para todas las demás rutas sigue uso client-side, sin redireccionar desde middleware.
  return NextResponse.next();
}

// Configura en qué rutas se aplica el middleware (puedes ajustar el matcher)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'], // Aplica a todas las rutas excepto recursos estáticos y api
};
