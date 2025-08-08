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
import { createFollowupsColumns } from './Colums';
import { Loader } from 'lucide-react';
import PaginationTable from '@/components/shared/PaginationTable';
import { useFollowup } from '@/context/FollowupContext';
import { FilterInputFollowup } from '../FilterFollowup';
import { LoadingTable } from '@/components/shared/Table/LoadingTable';

interface FollowupTableProps<TData extends RowData> {
  filter: { id?: string };
}

export function PanelFollowupsTable<TData extends RowData>({
  filter,
}: FollowupTableProps<TData>) {
  const {
    followups,
    loading,
    updateParams,
    updateFollowups,
    limit,
    offset,
    total,
  } = useFollowup();

  const columns = React.useMemo(
    () => createFollowupsColumns({ updateFollowups }),
    []
  );

  const table = useReactTable<AdoptedAnimal>({
    data: followups,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="py-4">
        <FilterInputFollowup
          defaultFilter={filter}
          onGetData={params =>
            updateParams({ ...params, limit: 10, offset: 0 })
          }
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
