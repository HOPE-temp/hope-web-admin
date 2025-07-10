import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format/formatDate';
import { EvaluationAdoptionDialog } from '../EvaluationAdoptionDialog';
import { LinkAnimalAdoptionDialog } from '../LinkAnimalAdoptionDialog';
import { CompleteAdoptionDialog } from '../CompleteAdoptionDialog';

interface AdoptionsColumnsProps {
  updateAdoptions: () => void;
}

export function createAdoptionsColumns({
  updateAdoptions,
}: AdoptionsColumnsProps): ColumnDef<Adoption>[] {
  return [
    {
      accessorKey: 'adopter',
      header: 'Adopter',
      cell: ({ row }) => {
        return row.original.adopter;
      },
    },
    {
      accessorKey: 'statusResult',
      header: 'Resultado',
      cell: ({ row }) => {
        const value = row.original.statusResult as StatusResultApotion;
        const statusResultAdoptionDict = {
          not_evaluated: { name: 'No evaluado', color: 'bg-gray-200' },
          approved: { name: 'Aprobado', color: 'bg-green-200' },
          rejected: { name: 'Rechazado', color: 'bg-orange-200' },
          banned: { name: 'Baneado', color: 'bg-red-200' },
        };
        return (
          <Badge
            variant={'outline'}
            className={`${statusResultAdoptionDict[value].color}`}
          >
            {`${statusResultAdoptionDict[value].name}`}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'statusRequest',
      header: 'Solicitud',
      cell: ({ row }) => {
        const value = row.original.statusRequest as StatusRequestApotion;
        const statusRequestAdoptionDict = {
          created: { name: 'Creado', color: 'bg-gray-200' },
          suitable: { name: 'Apto', color: 'bg-blue-200' },
          selected_animal: {
            name: 'Con mascota',
            color: 'bg-orange-200',
          },
          cancelled: { name: 'Cancelado', color: 'bg-red-200' },
          adoption_completed: { name: 'Completado', color: 'bg-green-200' },
        };
        return (
          <Badge
            variant={'outline'}
            className={`${statusRequestAdoptionDict[value].color}`}
          >
            {`${statusRequestAdoptionDict[value].name}`}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'reviewRequestAt',
      header: 'reviewRequestAt',
      cell: ({ row }) => formatDate(row.original.selectedAnimalAt),
    },
    {
      accessorKey: 'selectedAnimalAt',
      header: 'selectedAnimalAt',
      cell: ({ row }) => formatDate(row.original.selectedAnimalAt),
    },
    {
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2 whitespace-nowrap">
          {row.original.statusResult === 'not_evaluated' && (
            <EvaluationAdoptionDialog
              adoption={row.original}
              onUpdated={updateAdoptions}
            />
          )}
          {row.original.statusRequest === 'suitable' && (
            <LinkAnimalAdoptionDialog
              adoption={row.original}
              onUpdated={updateAdoptions}
            />
          )}
          {row.original.statusRequest === 'selected_animal' && (
            <CompleteAdoptionDialog
              adoption={row.original}
              onUpdated={updateAdoptions}
            />
          )}

          {/* <EditorAdoptionsDialog
              animal={row.original}
              onEdit={updateAdoptions}
            /> */}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
