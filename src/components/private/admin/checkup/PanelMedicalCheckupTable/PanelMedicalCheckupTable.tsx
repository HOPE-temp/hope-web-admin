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
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <span className="flex justify-center">
                    <Loader className="animate-[spin_1.5s_ease-in-out_infinite]" />
                  </span>
                </TableCell>
              </TableRow>
            )}
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
      </div>
    </div>
  );
}
