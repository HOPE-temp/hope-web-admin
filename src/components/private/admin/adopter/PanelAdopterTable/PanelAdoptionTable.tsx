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
import { createAdoptersColumns } from './Colums';
import { Loader } from 'lucide-react';
import PaginationTable from '@/components/shared/PaginationTable';
import { useAdopter } from '@/context/AdopterContext';
import { FilterInputAdopter } from '@/components/shared/FilterAdopter';
import { LoadingTable } from '@/components/shared/Table/LoadingTable';

interface AdopterTableProps<TData extends RowData> {}

export function PanelAdoptersTable<
  TData extends RowData
>({}: AdopterTableProps<TData>) {
  const {
    adopters,
    loading,
    updateParams,
    updateAdopters,
    limit,
    offset,
    total,
  } = useAdopter();

  const columns = React.useMemo(
    () => createAdoptersColumns({ updateAdopters }),
    []
  );

  const table = useReactTable<Adopter>({
    data: adopters,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="py-4">
        <FilterInputAdopter
          onGetData={params => {
            if (params.documentNumber) {
              updateParams({
                ...params,
                hasDeleted: true,
                limit: 10,
                offset: 0,
              });
            } else {
              updateParams({
                ...params,
                hasDeleted: undefined,
                limit: 10,
                offset: 0,
              });
            }
          }}
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
      </div>
    </div>
  );
}
