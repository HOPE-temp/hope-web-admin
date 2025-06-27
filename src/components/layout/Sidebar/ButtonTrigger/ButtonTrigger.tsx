import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import React from 'react'

export function ButtonTrigger() {
  return (<SidebarTrigger
    hidden
    variant='default'
    className={
      cn("absolute rounded-l-none p-0 top-[4.5rem]",
        "p-5 pl-3 m-0",
        "shadow-lg shadow-indigo-500/50",
        "hover:pl-7 hover:py-6 shadow-xl/20",
        "transition-[padding] delay-150 duration-300",
        "",
        )
      }
  />)
}
