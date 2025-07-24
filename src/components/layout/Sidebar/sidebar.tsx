'use client';
import { useMemo } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { navbarItems } from './Menu';
import Link from 'next/link';

export function AppSidebar() {
  const { role } = useAuth();

  const items = useMemo(() => {
    if (role) {
      return navbarItems(role);
    }
    return [];
  }, [role]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="relative">
            <SidebarTrigger className="absolute right-0" />
          </SidebarGroupContent>
          <SidebarGroupLabel>
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">Albergue de Mascotas</h2>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items &&
                items.map(item => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
