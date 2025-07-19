"use client"
import * as React from 'react';
import { CreatorUserDialog } from '@/components/private/admin/usuarios/CreatorUserDialog';
import { UserProvider } from "@/context/UserContext"
import { PanelUsersTable } from "@/components/private/admin/usuarios/PanelUserTable"

export default function UsuariosPage() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100 p-6">
              <div className="rounded-lg bg-white shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Usuarios</h2>
            <CreatorUserDialog />
          </div>
          <PanelUsersTable />
        </div>
      </div>
    </UserProvider>
  )
}
