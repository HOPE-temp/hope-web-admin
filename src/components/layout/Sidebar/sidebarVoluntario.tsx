"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PawPrint, Users, Heart, Stethoscope, UserCog, ClipboardList, Menu, X, Home, User, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  active: (pathname: string) => boolean
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)  

  // Detectar si estamos en móvil o desktop
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Comprobar al cargar
    checkIfMobile()

    // Comprobar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // En desktop, el sidebar siempre está abierto
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true)
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Definir los ítems de navegación con sus permisos por rol
  const navItems: NavItem[] = [
    {
      href: "/voluntario",
      label: "Panel Principal",
      icon: <Home className="h-4 w-4" />,    
      active: (path) => path === "/",
    },
    {
      href: "/animales",
      label: "Mascotas",
      icon: <PawPrint className="h-4 w-4" />,      
      active: (path) => path.startsWith("/animales"),
    },
    {
      href: "/adoptantes",
      label: "Adoptantes",
      icon: <Users className="h-4 w-4" />,      
      active: (path) => path.startsWith("/adoptantes"),
    },
    {
      href: "/admin/adoption",
      label: "Adopciones",
      icon: <Heart className="h-4 w-4" />,      
      active: (path) => path.startsWith("/admin/adoption"),
    },
    {
      href: "/historial-medico",
      label: "Historial Médico",
      icon: <Stethoscope className="h-4 w-4" />,      
      active: (path) => path.startsWith("/historial-medico"),
    },
    {
      href: "/tareas/mis-tareas",
      label: "Tareas",
      icon: <ClipboardList className="h-4 w-4" />,      
      active: (path) => path.startsWith("/tareas/mis-tareas"),
    },
    {
      href: "/perfil",
      label: "Mi Perfil",
      icon: <User className="h-4 w-4" />,      
      active: (path) => path.startsWith("/perfil"),
    },
  ]

  return (
    <>
      <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={cn(
          "flex w-64 flex-col border-r bg-background shadow-sm transition-all duration-300 ease-in-out",
          isMobile ? "fixed inset-y-0 left-0 z-40" : "relative z-0",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0",
          className,
        )}
      >
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Albergue de Mascotas</h2>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                item.active(pathname) ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
