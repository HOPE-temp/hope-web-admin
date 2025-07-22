import { User2, Mail, Phone, MapPin, BadgeInfo, Image as ImageIcon, Edit, Trash2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { EditorUserDialog } from "../EditorUserDialog"
import { UserDeleteDialog } from "../UserDeleteDialog"

interface UserColumnsProps {
  updateUsers: () => void
}

export function createUserColumns({
  updateUsers,
}: UserColumnsProps): ColumnDef<any>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      enableHiding: true,
    },
    {
      accessorKey: "Avatar",
      header: "Avatar",
      enableHiding: true,
      cell: ({ row }) => {
        const avatar = row.original.info?.avatar
        const username = row.original.info?.username
        return (
          <div className="flex items-center justify-center w-10 h-10">
            {avatar ? (
              <img
                src={avatar}
                alt={username}
                className="w-10 h-10 rounded-full object-cover"
                onError={e => {
                  e.currentTarget.style.display = "none"
                  if (e.currentTarget.nextElementSibling) {
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex"
                  }
                }}
              />
            ) : (
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "Nombre",
      header: "Nombre",
      enableHiding: true,
      cell: ({ row }) => row.original.info?.firstName,
    },
    {
      accessorKey: "Apellido",
      header: "Apellido",
      enableHiding: true,
      cell: ({ row }) => row.original.info?.lastName,
    },
    {
      accessorKey: "Email",
      header: "Email",
      enableHiding: true,
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <Mail className="w-4 h-4" />
          {row.original.info?.email}
        </span>
      ),
    },
    {
      accessorKey: "Teléfono",
      header: "Teléfono",
      enableHiding: true,
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <Phone className="w-4 h-4" />
          {row.original.info?.phone}
        </span>
      ),
    },
    {
      accessorKey: "Usuario",
      header: "Usuario",
      enableHiding: true,
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <User2 className="w-4 h-4" />
          {row.original.info?.username}
        </span>
      ),
    },
    {
      accessorKey: "DNI",
      header: "DNI",
      enableHiding: true,
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <BadgeInfo className="w-4 h-4" />
          {row.original.info?.documentNumber}
        </span>
      ),
    },
    {
      accessorKey: "Rol",
      header: "Rol",
      enableHiding: true,
      cell: ({ row }) => {
        const rol = row.original.info?.rol as keyof typeof rolDict | undefined
        const rolDict = {
          user: { name: "Usuario", color: "bg-blue-100 text-blue-800" },
          admin: { name: "Administrador", color: "bg-green-100 text-green-800" },
          moderator: { name: "Moderador", color: "bg-yellow-100 text-yellow-800" },
        }
        return (
          <Badge className={rol && rolDict[rol]?.color ? rolDict[rol].color : "bg-gray-100 text-gray-800"}>
            {rol && rolDict[rol]?.name ? rolDict[rol].name : rol}
          </Badge>
        )
      },
    },
    {
      accessorKey: "Dirección",
      header: "Dirección",
      enableHiding: true,
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {row.original.info?.address || "-"}
        </span>
      ),
    },
    {
      accessorKey: "Ubicación",
      header: "Ubicación",
      enableHiding: true,
      cell: ({ row }) => row.original.info?.location || "-",
    },
    {
      accessorKey: "Creado",
      header: "Creado",
      enableHiding: true,
      cell: ({ row }) => {
        const date = row.original.createdAt
        return date ? new Date(date).toLocaleDateString() : "-"
      },
    },
    {
      id: "acciones",
      header: "Acciones",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <div className="flex gap-2">
            <EditorUserDialog
              user={row.original} onEdit={updateUsers}
            />
            <UserDeleteDialog user={row.original} onDelete={updateUsers} />
          </div>
        </div>

      ),
      enableSorting: false,
    },
  ]
}