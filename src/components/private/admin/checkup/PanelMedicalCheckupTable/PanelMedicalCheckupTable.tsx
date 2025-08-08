'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  Table as ReactTable,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createMedicalCheckupsColumns } from './Colums';
import { Loader } from 'lucide-react';
import PaginationTable from '@/components/shared/PaginationTable';
import { useMedicalCheckup } from '@/context/MedicalCheckupContext';
import { FilterInputMedicalCheckup } from '../FilterMedicalCheckup';
import VisibilityColums from '@/components/shared/Table/VisibilityColums';
import MedicalCheckupCalendar from '../MedicalCheckupCalendar';
import { Calendar, CalendarEvent } from '@/components/ui/full-calendar';
import { useRouter } from 'next/navigation';
import { LoadingTable } from '@/components/shared/Table/LoadingTable';

interface MedicalCheckupTableProps<TData extends RowData> {}

const dictHeaderMedicalCheckups = {};

export function PanelMedicalCheckupsTable<
  TData extends RowData
>({}: MedicalCheckupTableProps<TData>) {
  const {
    medicalCheckups,
    loading,
    updateParams,
    updateMedicalCheckups,
    limit,
    offset,
    total,
  } = useMedicalCheckup();

  const router = useRouter();

  const columns = React.useMemo(
    () => createMedicalCheckupsColumns({ updateMedicalCheckups }),
    []
  );

  const table = useReactTable<MedicalCheckup>({
    data: medicalCheckups,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const events: CalendarEvent[] = React.useMemo((): CalendarEvent[] => {
    return medicalCheckups
      .filter(checkup => checkup.scheduleStartAt)
      .map(checkup => {
        return {
          id: checkup.id.toFixed(0),
          start: new Date(checkup.scheduleStartAt),
          end: new Date(checkup.scheduleEndAt),
          title: checkup.title,
          color: 'blue',
        };
      });
  }, [medicalCheckups]);

  return (
    <div className="w-full">
      <div className="py-4">
        <FilterInputMedicalCheckup
          onGetData={params =>
            updateParams({ ...params, limit: 10, offset: 0 })
          }
        />
        <VisibilityColums
          dictHeader={dictHeaderMedicalCheckups}
          table={table}
        />
      </div>
      <hr />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
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
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <LoadingTable loading={loading} columns={columns} />
            )}
          </TableBody>
        </Table>
        <br />
        <hr />
        <br />
        <PaginationTable
          limit={limit}
          offset={offset}
          total={total}
          onChange={({ limit, offset }) => updateParams({ limit, offset })}
        />
        <br />
        <Calendar onEventClick={ev => router.push(`/admin/checkup/${ev.id}`)}>
          <MedicalCheckupCalendar events={events} />
        </Calendar>
      </div>
    </div>
  );
}
