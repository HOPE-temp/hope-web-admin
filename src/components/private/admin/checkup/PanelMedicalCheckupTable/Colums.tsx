import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format/formatDate';

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
      accessorKey: 'scheduleStartAt',
      header: 'Fecha Inicio',
    },
    {
      accessorKey: 'scheduleEndAt',
      header: 'Fecha Fin',
    },
    {
      accessorKey: 'animal.id',
      header: 'Mascotas',
    },
    // {
    //   accessorKey: 'statusRequest',
    //   header: 'Solicitud',
    //
    // },

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
