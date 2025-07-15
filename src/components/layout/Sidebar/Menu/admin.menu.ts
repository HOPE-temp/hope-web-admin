import {
  PawPrint,
  Users,
  Heart,
  Stethoscope,
  UserCog,
  ClipboardList,
  Home,
  User,
} from 'lucide-react';

export const itemsNavAdmin: NavItem[] = [
  {
    href: '/admin',
    label: 'Panel Principal',
    icon: Home,
    active: path => path === '/',
  },
  {
    href: '/admin/animales',
    label: 'Mascotas',
    icon: PawPrint,
    active: path => path.startsWith('/admin/animales'),
  },
  {
    href: '/admin/adopter',
    label: 'Adoptantes',
    icon: Users,
    active: path => path.startsWith('/admin/adopter'),
  },
  {
    href: '/admin/adoption',
    label: 'Adopciones',
    icon: Heart,
    active: path => path.startsWith('/admin/adoption'),
  },
  {
    href: '/admin/checkup',
    label: 'Historial Médico',
    icon: Stethoscope,
    active: path => path.startsWith('/admin/checkup'),
  },
  {
    href: '/admin/usuarios',
    label: 'Usuarios y Roles',
    icon: UserCog,
    active: path => path.startsWith('/admin/usuarios'),
  },
  {
    href: '/admin/actividades',
    label: 'Gestión de Actividades',
    icon: ClipboardList,
    active: path => path.startsWith('admin/actividades'),
  },

  {
    href: '/admin/profile',
    label: 'Mi Perfil',
    icon: User,
    active: path => path.startsWith('/admin/profile'),
  },
];
