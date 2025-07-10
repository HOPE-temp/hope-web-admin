import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format/formatDate';
import { EditorAdoptersDialog } from '../EditorAdopterDialog';
import { AdoptersDeleteDialog } from '../AdopterDeleteDialog';

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
      header: 'Nacionalidad',
    },
    {
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2 whitespace-nowrap">
          <EditorAdoptersDialog
            adopter={row.original}
            onEdit={updateAdopters}
          />
          <AdoptersDeleteDialog
            adopter={row.original}
            onDelete={updateAdopters}
          />
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
