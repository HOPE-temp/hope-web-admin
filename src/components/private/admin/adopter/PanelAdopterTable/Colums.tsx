import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format/formatDate';
import { EditorAdoptersDialog } from '../EditorAdopterDialog';
import { AdoptersDeleteDialog } from '../AdopterDeleteDialog';
import { EvaluationAdopterDialog } from '../EvaluationAdopterDialog';

interface AdoptersColumnsProps {
  updateAdopters: () => void;
}

export function createAdoptersColumns({
  updateAdopters,
}: AdoptersColumnsProps): ColumnDef<Adopter>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'firstName',
      header: 'Nombre',
    },
    {
      accessorKey: 'lastName',
      header: 'Apellido',
    },
    {
      accessorKey: 'documentNumber',
      header: 'DNI',
    },
    {
      accessorKey: 'phone',
      header: 'Celular',
    },
    {
      accessorKey: 'address',
      header: 'Dirección',
    },
    {
      accessorKey: 'district',
      header: 'Distrito',
    },
    {
      accessorKey: 'nationality',
      header: 'País',
    },
    {
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-1 whitespace-nowrap">
          {row.original.deletedAt && 'Eliminado'}
          {row.original.isBanned && 'Baneado'}
          {!row.original.deletedAt && !row.original.isBanned && (
            <EditorAdoptersDialog
              adopter={row.original}
              onEdit={updateAdopters}
            />
          )}
          {!row.original.deletedAt && !row.original.isBanned && (
            <AdoptersDeleteDialog
              adopter={row.original}
              onDelete={updateAdopters}
            />
          )}
          {!row.original.deletedAt && !row.original.isBanned && (
            <EvaluationAdopterDialog
              adopter={row.original}
              onUpdated={updateAdopters}
            />
          )}
          {/* <EditorAdoptersDialog
              animal={row.original}
              onEdit={updateAdopters}
            /> */}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
