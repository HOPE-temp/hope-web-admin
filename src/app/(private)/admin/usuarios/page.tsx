"use client";

import * as React from "react";
import { useUsers, UserTableRow } from "@/hooks/useUser";
import { UserTable } from "@/components/private/admin/usuarios/UserTable";
import { UserActions } from "@/components/private/admin/usuarios/UserActions";
import { UserCreateDialog } from "@/components/private/admin/usuarios/UserCreateDialog";
import { ColumnDef} from "@tanstack/react-table";

export default function UsuariosPage() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  // Columnas de la tabla
  const columns = React.useMemo<ColumnDef<UserTableRow>[]>(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "username", header: "Usuario" },
    { accessorKey: "firstName", header: "Nombres" },
    { accessorKey: "lastName", header: "Apellidos" },
    { accessorKey: "documentNumber", header: "DNI" },
    { accessorKey: "address", header: "Dirección" },
    { accessorKey: "phone", header: "Teléfono" },
    { accessorKey: "email", header: "E-mail" },
    { accessorKey: "rol", header: "Rol" },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <UserActions
          user={row.original}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ], [users, updateUser, deleteUser]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="rounded-lg bg-white shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Usuarios</h2>
          <UserCreateDialog createUser={createUser} />
        </div>
        {loading ? (
          <div className="text-center py-10">Cargando usuarios...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <UserTable<UserTableRow> data={users} columns={columns} />
        )}
      </div>
    </div>
  );
}