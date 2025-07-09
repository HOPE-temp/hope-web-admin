import type { Metadata } from 'next';
import { AppSidebar } from '@/components/layout/Sidebar/sidebarAlter';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ButtonTrigger } from '@/components/layout/Sidebar/ButtonTrigger';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'HOPE',
  description: 'Pagina para adopción de mascotas',
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ButtonTrigger />
      <AppSidebar />
      <main className="w-full overflow-x-auto">
        <div className="">
          <Header />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
