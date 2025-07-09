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
import { useAuth } from '@/context/AuthContext';
import { findAllAnimals } from '@/services/hopeBackend/animals';
import { FilterInputAnimal } from '../FilterAnimal';
import { createAnimalsColumns } from './Colums';
import { Loader } from 'lucide-react';

interface AnimalTableProps<TData extends RowData> {}

export function PanelAnimalsTable<
  TData extends RowData
>({}: AnimalTableProps<TData>) {
  const { axios } = useAuth();
  const [animal, setAnimal] = React.useState<Animal[]>([]);
  const [loading, setLoading] = React.useState(false);

  const columns = React.useMemo(() => createAnimalsColumns({}), []);

  const table = useReactTable({
    data: animal,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const getAnimals = async (param?: FilterAnimalDto) => {
    setLoading(true);
    const res = await findAllAnimals(axios, param);
    setAnimal(res);
    setLoading(false);
  };

  const handleFilter = (param: FilterAnimalDto) => {
    console.log({ param });
    getAnimals(param);
  };

  React.useEffect(() => {
    getAnimals();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <FilterInputAnimal onGetData={data => handleFilter(data)} />
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
      </div>
    </div>
  );
}
