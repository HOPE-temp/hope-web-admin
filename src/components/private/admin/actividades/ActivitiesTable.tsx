'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowData,
  type ColumnDef,
  useReactTable,
  type FilterFn,
} from '@tanstack/react-table';
import { ChevronDown, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useActivity } from '@/context/ActivityContext';
import { createActivitiesColumns } from './ActivitiesColumns';

interface ActivitiesTableProps<TData extends RowData> {}

const globalActivityFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true;
  const value = filterValue.toLowerCase();
  return (
    (row.original.title?.toLowerCase().includes(value) ?? false) ||
    (row.original.resourceUrl?.toLowerCase().includes(value) ?? false)
  );
};

export function ActivitiesTable<
  TData extends RowData
>({}: ActivitiesTableProps<TData>) {
  const { activities, updateActivities } = useActivity();

  const columns = createActivitiesColumns({
    updateActivities,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [adminFilter, setAdminFilter] = React.useState<string>('all');

  const table = useReactTable<Activity>({
    data: activities,
    columns,
    filterFns: {
      globalActivityFilter,
    },
    globalFilterFn: globalActivityFilter,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  // Filtrar por estado
  React.useEffect(() => {
    if (statusFilter === 'all') {
      table.getColumn('finished')?.setFilterValue(undefined);
    } else {
      table.getColumn('finished')?.setFilterValue(statusFilter === 'finished');
    }
  }, [statusFilter, table]);

  // Filtrar por tipo admin
  React.useEffect(() => {
    if (adminFilter === 'all') {
      table.getColumn('admin')?.setFilterValue(undefined);
    } else {
      table.getColumn('admin')?.setFilterValue(adminFilter === 'admin');
    }
  }, [adminFilter, table]);

  const getFilteredStats = () => {
    const filteredData = table
      .getFilteredRowModel()
      .rows.map(row => row.original);
    return {
      total: filteredData.length,
      finished: filteredData.filter((item: any) => item.finished).length,
      pending: filteredData.filter((item: any) => !item.finished).length,
      admin: filteredData.filter((item: any) => item.admin).length,
    };
  };

  const stats = getFilteredStats();

  return (
    <div className="w-full space-y-4">
      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-primary">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {stats.finished}
          </div>
          <div className="text-sm text-muted-foreground">Finalizadas</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">
            {stats.pending}
          </div>
          <div className="text-sm text-muted-foreground">Pendientes</div>
        </div>
      </div>

      {/* Controles de filtrado */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por título o recurso..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Estado:{' '}
                {statusFilter === 'all'
                  ? 'Todos'
                  : statusFilter === 'finished'
                  ? 'Finalizadas'
                  : 'Pendientes'}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={statusFilter === 'all'}
                onCheckedChange={() => setStatusFilter('all')}
              >
                Todos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === 'finished'}
                onCheckedChange={() => setStatusFilter('finished')}
              >
                Finalizadas
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === 'pending'}
                onCheckedChange={() => setStatusFilter('pending')}
              >
                Pendientes
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Tipo:{' '}
                {adminFilter === 'all'
                  ? 'Todos'
                  : adminFilter === 'admin'
                  ? 'Solo Admin'
                  : 'Regulares'}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={adminFilter === 'all'}
                onCheckedChange={() => setAdminFilter('all')}
              >
                Todos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={adminFilter === 'admin'}
                onCheckedChange={() => setAdminFilter('admin')}
              >
                Solo Admin
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={adminFilter === 'regular'}
                onCheckedChange={() => setAdminFilter('regular')}
              >
                Regulares
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Columnas
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id === 'imageUrl'
                      ? 'Imagen'
                      : column.id === 'resourceUrl'
                      ? 'Recurso'
                      : column.id === 'scheduleStartAt'
                      ? 'Inicio'
                      : column.id === 'scheduleEndAt'
                      ? 'Fin'
                      : column.id === 'finished'
                      ? 'Estado'
                      : column.id === 'admin'
                      ? 'Tipo'
                      : column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabla */}
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
                <TableRow
                  key={row.id}
                  activities-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
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
                  colSpan={Array.isArray(columns) ? columns.length : 1}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-muted-foreground">
                      No se encontraron actividades
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Intenta ajustar los filtros de búsqueda
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} actividad(es) seleccionadas
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
