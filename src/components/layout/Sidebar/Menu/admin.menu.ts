import { 
  PawPrint,
  Users,
  Heart,
  Stethoscope,
  UserCog,
  ClipboardList,
  Home,
  User,
} from "lucide-react"

export const itemsNavAdmin: NavItem[] = [
  {
    href: "/admin",
    label: "Panel Principal",
    icon: Home,
    active: (path) => path === "/",
  },
  {
    href: "/animales",
    label: "Mascotas",
    icon: PawPrint,
    active: (path) => path.startsWith("/animales"),
  },
  {
    href: "admin/adopter",
    label: "Adoptantes",
    icon: Users,
    active: (path) => path.startsWith("admin/adopter"),
  },
  {
    href: "/adopciones",
    label: "Adopciones",
    icon: Heart,
    active: (path) => path.startsWith("/adopciones"),
  },
  {
    href: "/historial-medico",
    label: "Historial Médico",
    icon: Stethoscope,
    active: (path) => path.startsWith("/historial-medico"),
  },
  {
    href: "/admin/usuarios",
    label: "Usuarios y Roles",
    icon: UserCog,
    active: (path) => path.startsWith("/usuarios"),
  },
  {
    href: "/admin/actividades",
    label: "Gestión de Actividades",
    icon: ClipboardList,
    active: (path) => path.startsWith("/actividades"),
  },
  {
    href: "/tareas/mis-tareas",
    label: "Mis Tareas",
    icon: ClipboardList,
    active: (path) => path.startsWith("/tareas/mis-tareas"),
  },
  {
    href: "/perfil",
    label: "Mi Perfil",
    icon: User,
    active: (path) => path.startsWith("/perfil"),
  },
]