'use client';
import * as React from 'react';
import { CreatorUserDialog } from '@/components/private/admin/usuarios/CreatorUserDialog';
import { UserProvider } from '@/context/UserContext';
import { PanelUsersTable } from '@/components/private/admin/usuarios/PanelUserTable';
import { ContainerHeader, ContainerPage } from '@/components/shared/Containers';

export default function UsuariosPage() {
  return (
    <UserProvider>
      <ContainerPage>
        <ContainerHeader>
          <h2 className="text-xl font-semibold">Usuarios</h2>
          <CreatorUserDialog />
        </ContainerHeader>
        <PanelUsersTable />
      </ContainerPage>
    </UserProvider>
  );
}
