import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format/formatDate';
import { FollowupCompleteDialog } from '../FollowupCompleteDialog';
import { FollowupCancelDialog } from '../FollowupCancelDialog';
import { RescheduleFollowupDialog } from '../RescheduleFollowupDialog';
import { CheckupFollowupDialog } from '../CheckupFollowupDialog';
import { CalendarCheck2 } from 'lucide-react';

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
        return (
          <p className=" truncate w-32 sm:w-auto">{row.original.adoption.id}</p>
        );
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
      accessorKey: 'scheduleStartAt',
      header: 'Fecha seguimiento',
      cell: ({ row }) => {
        return row.original.activities.length > 0 ? (
          row.original.activities.map(({ scheduleStartAt }) => {
            const date = scheduleStartAt;
            return date ? (
              <span className="flex items-center gap-1">
                <CalendarCheck2 className="w-4 h-4" />
                {new Date(date).toLocaleString()}
              </span>
            ) : (
              '-'
            );
          })
        ) : (
          <Badge className="bg-gray-500">Sin Seguimineto</Badge>
        );
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
            color: 'bg-orange-200',
          },
          cancelled: { name: 'Cancelado', color: 'bg-red-300' },
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
          {!['cancelled', 'verified', 'scheduled_sterilization'].includes(
            row.original.statusFollowup
          ) && (
            <CheckupFollowupDialog
              followup={row.original}
              onCheckup={updateFollowups}
            />
          )}
          {!['cancelled', 'verified', 'scheduled_sterilization'].includes(
            row.original.statusFollowup
          ) && (
            <RescheduleFollowupDialog
              followup={row.original}
              onUpdated={updateFollowups}
            />
          )}

          {!['cancelled', 'verified', 'scheduled_sterilization'].includes(
            row.original.statusFollowup
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
