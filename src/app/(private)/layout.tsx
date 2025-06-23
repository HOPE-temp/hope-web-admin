import type { Metadata } from "next";
import ClientLayout from "./ClientLayout"; // Nuevo componente para lógica de cliente

export const metadata: Metadata = {
  title: "HOPE",
  description: "Pagina para adopción de mascotas",
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
