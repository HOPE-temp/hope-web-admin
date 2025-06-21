"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil, Trash2, ChevronDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers, UserTableRow, CreateUserInput, EditUserInput } from "@/hooks/useUser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const initialForm: CreateUserInput = {
  username: "",
  location: "",
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  phone: "",
  address: "",
  documentNumber: "",
  rol: "",
};

const editInitialForm: EditUserInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  rol: "",
};

export default function UsuariosTable() {
  const { users, loading, error, createUser, updateUser } = useUsers();
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState(initialForm);
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);

  // Estados para edición
  const [editOpen, setEditOpen] = React.useState(false);
  const [editForm, setEditForm] = React.useState(editInitialForm);
  const [editUserId, setEditUserId] = React.useState<number | null>(null);
  const [editSubmitting, setEditSubmitting] = React.useState(false);
  const [editFormError, setEditFormError] = React.useState<string | null>(null);
  const [editFormSuccess, setEditFormSuccess] = React.useState<string | null>(null);

  // Estados para eliminación
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = React.useState<number | null>(null);

  // ----------- COLUMNS (dentro del componente) -----------
  const columns: ColumnDef<UserTableRow>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "username", header: "Usuario" },
    { accessorKey: "firstName", header: "Nombres" },
    { accessorKey: "lastName", header: "Apellidos" },
    { accessorKey: "documentNumber", header: "DNI" },
    { accessorKey: "address", header: "Dirección" },
    { accessorKey: "phone", header: "Telefono" },
    { accessorKey: "email", header: "E-mail" },
    { accessorKey: "rol", header: "Rol" },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            title="Editar"
            onClick={() => handleEditClick(row.original)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            title="Eliminar"
            onClick={() => {
              setDeleteUserId(row.original.id);
              setDeleteOpen(true);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  // ----------- FIN DIALOG DE EDICIÓN -----------

  // Filtrado simple por nombre, apellido, usuario o email
  const filteredUsers = React.useMemo(() => {
    if (!globalFilter) return users;
    const filter = globalFilter.toLowerCase();
    return users.filter(
      (u) =>
        u.firstName?.toLowerCase().includes(filter) ||
        u.lastName?.toLowerCase().includes(filter) ||
        u.username?.toLowerCase().includes(filter) ||
        u.email?.toLowerCase().includes(filter)
    );
  }, [users, globalFilter]);

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  // Manejo del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      await createUser(form);
      setFormSuccess("Usuario registrado correctamente");
      setForm(initialForm);
      setTimeout(() => {
        setOpen(false);
        setFormSuccess(null);
      }, 1200);
    } catch (err: any) {
      setFormError(err.message || "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setForm(initialForm);
      setFormError(null);
      setFormSuccess(null);
      setSubmitting(false);
    }
  };

  // ----------- EDICIÓN -----------
  const handleEditClick = (user: UserTableRow) => {
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      rol: user.rol || "",
    });
    setEditUserId(user.id);
    setEditOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditSubmitting(true);
    setEditFormError(null);
    setEditFormSuccess(null);
    try {
      if (!editUserId) throw new Error("Usuario no seleccionado");
      await updateUser(editUserId, editForm);
      setEditFormSuccess("Usuario actualizado correctamente");
      setTimeout(() => {
        setEditOpen(false);
        setEditFormSuccess(null);
      }, 1200);
    } catch (err: any) {
      setEditFormError(err.message || "Error desconocido");
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleEditDialogChange = (isOpen: boolean) => {
    setEditOpen(isOpen);
    if (!isOpen) {
      setEditForm(editInitialForm);
      setEditFormError(null);
      setEditFormSuccess(null);
      setEditSubmitting(false);
      setEditUserId(null);
    }
  };

  // Función para eliminar usuario
  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    // Aquí deberías llamar a tu función del hook para eliminar el usuario
    // await deleteUser(deleteUserId);
    setDeleteOpen(false);
    setDeleteUserId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Dialog open={editOpen} onOpenChange={handleEditDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Modifica los campos y guarda los cambios.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nombres</Label>
                <Input id="firstName" name="firstName" value={editForm.firstName} onChange={handleEditChange} required />
              </div>
              <div>
                <Label htmlFor="lastName">Apellidos</Label>
                <Input id="lastName" name="lastName" value={editForm.lastName} onChange={handleEditChange} required />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" value={editForm.email} onChange={handleEditChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" name="phone" value={editForm.phone} onChange={handleEditChange} required />
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" name="address" value={editForm.address} onChange={handleEditChange} />
              </div>
              <div>
                <Label htmlFor="rol">Rol</Label>
                <select
                  id="rol"
                  name="rol"
                  value={editForm.rol}
                  onChange={handleEditChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Selecciona un rol</option>
                  <option value="admin">Administrador</option>
                  <option value="volunteer">Voluntario</option>
                  <option value="veterinarian">Veterinario</option>
                </select>
              </div>
            </div>
            {editFormError && <div className="text-red-500 text-sm">{editFormError}</div>}
            {editFormSuccess && <div className="text-green-600 text-sm">{editFormSuccess}</div>}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={editSubmitting}>
                {editSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="rounded-lg bg-white shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Usuarios</h2>
          <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Registrar Usuario
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Usuario</DialogTitle>
                <DialogDescription>
                  Completa los campos para crear un nuevo usuario.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="documentNumber">DNI</Label>
                    <Input id="documentNumber" name="documentNumber" value={form.documentNumber} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="username">Usuario</Label>
                    <Input id="username" name="username" value={form.username} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="firstName">Nombres</Label>
                    <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" name="address" value={form.address} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="location">Ubicación</Label>
                    <Input id="location" name="location" value={form.location ?? ""} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" name="phone" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="rol">Rol</Label>
                    <select
                      id="rol"
                      name="rol"
                      value={form.rol}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-md px-3 py-2"
                    >
                      <option value="">Selecciona un rol</option>
                      <option value="admin">Administrador</option>
                      <option value="volunteer">Voluntario</option>
                      <option value="veterinarian">Veterinario</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
                  </div>
                </div>
                {formError && <div className="text-red-500 text-sm">{formError}</div>}
                {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Registrando..." : "Registrar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Buscar usuario..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {loading ? (
          <div className="text-center py-10">Cargando usuarios...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No hay resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteUser}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
