import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format/formatDate';
import { FollowupCompleteDialog } from '../FollowupCompleteDialog';
import { FollowupCancelDialog } from '../FollowupCancelDialog';
import { RescheduleFollowupDialog } from '../RescheduleFollowupDialog';
import { CheckupFollowupDialog } from '../CheckupFollowupDialog';

interface FollowupsColumnsProps {
  updateFollowups: () => void;
}

export function createFollowupsColumns({
  updateFollowups,
}: FollowupsColumnsProps): ColumnDef<AdoptedAnimal>[] {
  return [
    {
      accessorKey: 'adopter',
      header: 'Adopter',
      cell: ({ row }) => {
        return row.original.adoption.id;
      },
    },
    {
      accessorKey: 'animal',
      header: 'Mascota',
      cell: ({ row }) => {
        return row.original.animal.nickname;
      },
    },
    {
      accessorKey: 'animal',
      header: 'Fecha seguimiento',
      cell: ({ row }) => {
        return row.original?.activities[0]?.scheduleStartAt;
      },
    },
    {
      accessorKey: 'statusFollowup',
      header: 'Estado',
      cell: ({ row }) => {
        const value = row.original
          .statusFollowup as StatusFollowupAdoptedAnimal;
        const statusResultFollowupDict = {
          scheduled_followup: {
            name: 'Seguimiento agendado',
            color: 'bg-gray-200',
          },
          verified: { name: 'Verificado', color: 'bg-green-200' },
          scheduled_sterilization: {
            name: 'Esterilizacion agendada',
            color: 'bg-red-200',
          },
          cancelled: { name: 'Cancelado', color: 'bg-red-800' },
        };
        return (
          <Badge
            variant={'outline'}
            className={`${statusResultFollowupDict[value].color}`}
          >
            {`${statusResultFollowupDict[value].name}`}
          </Badge>
        );
      },
    },

    {
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2 whitespace-nowrap">
          {!(
            row.original.statusFollowup === 'cancelled' ||
            row.original.statusFollowup === 'verified'
          ) && (
            <CheckupFollowupDialog
              followup={row.original}
              onCheckup={updateFollowups}
            />
          )}
          {!(
            row.original.statusFollowup === 'cancelled' ||
            row.original.statusFollowup === 'verified'
          ) && (
            <RescheduleFollowupDialog
              followup={row.original}
              onUpdated={updateFollowups}
            />
          )}

          {!(
            row.original.statusFollowup === 'cancelled' ||
            row.original.statusFollowup === 'verified'
          ) && (
            <FollowupCompleteDialog
              followup={row.original}
              onComplete={updateFollowups}
            />
          )}
          {!(
            row.original.statusFollowup === 'cancelled' ||
            row.original.statusFollowup === 'verified'
          ) && (
            <FollowupCancelDialog
              followup={row.original}
              onCancel={updateFollowups}
            />
          )}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
