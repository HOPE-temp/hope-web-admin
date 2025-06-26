import type { Metadata } from "next";
import ClientLayout from "./ClientLayout"; // Nuevo componente para lógica de cliente
import { AppSidebar } from "@/components/layout/Sidebar/sidebarAlter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "HOPE",
  description: "Pagina para adopción de mascotas",
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-x-auto realtive">
          <SidebarTrigger
            hidden
            variant='default'
            className={
              cn("absolute rounded-l-none p-0 top-3",
                "p-4 pl-3 m-0",
                "shadow-lg shadow-indigo-500/50",
                "hover:pl-6 shadow-xl/20",
                "transition delay-150 duration-300 ease-in-out"
                )
              }
          />
        <div className="p-1">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
