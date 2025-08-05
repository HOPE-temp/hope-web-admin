import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format/formatDate';
import { CalendarCheck2 } from 'lucide-react';

interface MedicalCheckupsColumnsProps {
  updateMedicalCheckups: () => void;
}

export function createMedicalCheckupsColumns({
  updateMedicalCheckups,
}: MedicalCheckupsColumnsProps): ColumnDef<MedicalCheckup>[] {
  return [
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => {
        const value = row.original.status as StatusMedicalCheckup;
        const statusMedicalCheckupDict = {
          registered: { name: 'Registrado', color: 'bg-gray-200' },
          in_attention: { name: 'En atencion', color: 'bg-blue-200' },
          completed: {
            name: 'Completado',
            color: 'bg-green-200',
          },
          cancelled: { name: 'Cancelado', color: 'bg-red-200' },
        };
        return (
          <Badge
            variant={'outline'}
            className={`${statusMedicalCheckupDict[value].color}`}
          >
            {`${statusMedicalCheckupDict[value].name}`}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'title',
      header: 'Titulo',
    },
    {
      accessorKey: 'scheduleStartAt',
      header: 'Fecha Inicio',
      cell: ({ row }) => {
        const date = row.original.scheduleStartAt;
        return date ? (
          <span className="flex items-center gap-1">
            <CalendarCheck2 className="w-4 h-4" />
            {new Date(date).toLocaleString()}
          </span>
        ) : (
          '-'
        );
      },
    },
    {
      accessorKey: 'scheduleEndAt',
      header: 'Fecha Fin',
      cell: ({ row }) => {
        const date = row.original.scheduleEndAt;
        return date ? (
          <span className="flex items-center gap-1">
            <CalendarCheck2 className="w-4 h-4" />
            {new Date(date).toLocaleString()}
          </span>
        ) : (
          '-'
        );
      },
    },
    {
      accessorKey: 'animal.id',
      header: 'Mascotas',
    },

    {
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2 whitespace-nowrap">
          {/* <EditorMedicalCheckupsDialog
              animal={row.original}
              onEdit={updateMedicalCheckups}
            /> */}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
