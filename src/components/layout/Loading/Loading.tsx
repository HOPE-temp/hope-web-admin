'use client';

import * as React from 'react';
import { cn } from '@/lib/utils'; // función para concatenar clases (shadcn)
import { Loader2 } from 'lucide-react';

interface LoadingPerritosProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const LoadingPerritos = React.forwardRef<HTMLDivElement, LoadingPerritosProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          ref={ref}
          className={cn(
            'flex flex-col items-center justify-center space-y-4 p-6',
            className
          )}
          {...props}
        >
          {/* Icono spinner animado */}
          <Loader2 className="w-16 h-16 animate-spin text-green-500" />

          {/* Texto divertido */}
          <p className="text-lg font-semibold text-green-600">
            Cargando perritos...
          </p>
        </div>
      </div>
    );
  }
);

LoadingPerritos.displayName = 'LoadingPerritos';

export { LoadingPerritos };
