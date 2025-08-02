import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';

export function ButtonTrigger() {
  return (
    <SidebarTrigger
      hidden
      variant="default"
      className={cn(
        'fixed rounded-l-none p-0 top-[1.2rem]',
        'p-5 pl-3 m-0',
        'shadow-2xl ',
        'hover:pl-7 hover:py-6',
        'transition-[padding] delay-150 duration-300',
        'transition-[display] delay-150 duration-300'
      )}
    />
  );
}
