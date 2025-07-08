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
  ColumnDef,
  useReactTable,
  FilterFn,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/context/AuthContext';
import { FilterInputAnimal } from './FilterAnimal';
import { findAllAnimals } from '@/services/hopeBackend/animals';

interface AnimalTableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
}

const globalAnimalFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true;
  const value = filterValue.toLowerCase();
  return (
    (row.original.name?.toLowerCase().includes(value) ?? false) ||
    (row.original.species?.toLowerCase().includes(value) ?? false) ||
    (row.original.breed?.toLowerCase().includes(value) ?? false)
  );
};

export function AnimalsTable<TData extends RowData>({
  data,
  columns,
}: AnimalTableProps<TData>) {
  const { axios } = useAuth();
  const [animal, setAnimal] = React.useState<Animal[]>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    filterFns: { globalAnimalFilter },
    globalFilterFn: globalAnimalFilter,
    onGlobalFilterChange: setGlobalFilter,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const getAnimals = async (param?: FilterAnimalDto) => {
    const res = await findAllAnimals(axios, param);
    setAnimal(res);
  };

  const handleFilter = (param: FilterAnimalDto) => {
    getAnimals(param);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <FilterInputAnimal onGetData={data => handleFilter(data)} />
      </div>
      <div>
        <Input
          placeholder="Buscar animal, especie o raza..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
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
      </div>
    </div>
  );
}
