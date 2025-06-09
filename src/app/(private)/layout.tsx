import type { Metadata } from "next";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/layout/Header/header";

export const metadata: Metadata = {
  title: "HOPE",
  description: "Pagina para adopción de mascotas",
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        {children}
      </main>
    </div>
  );
}
