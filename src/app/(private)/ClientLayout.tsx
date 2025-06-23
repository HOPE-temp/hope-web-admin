"use client";
import Sidebar from "@/components/layout/Sidebar/sidebar";
import SidebarVoluntario from "@/components/layout/Sidebar/sidebarVoluntario";
import Header from "@/components/layout/Header/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    let userRole = null;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userRole = payload.role;
      } catch {
        userRole = localStorage.getItem("role");
      }
    }
    setRole(userRole);

    if (userRole === "voluntario" && window.location.pathname === "/(private)") {
      router.replace("/voluntario");
    }
  }, [router]);

  if (!role) return null;

  return (
    <div className="flex min-h-screen">
      {role === "voluntario" ? <SidebarVoluntario /> : <Sidebar />}
      <main className="flex-1 p-6">
        <Header />
        {children}
      </main>
    </div>
  );
}