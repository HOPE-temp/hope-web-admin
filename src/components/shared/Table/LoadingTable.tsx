import { TableCell, TableRow } from '@/components/ui/table';
import { Loader } from 'lucide-react';
import React from 'react';

export const LoadingTable = ({
  loading,
  columns,
}: {
  loading: boolean;
  columns: any[];
}) => {
  return loading ? (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        <span className="flex justify-center">
          <Loader className="animate-[spin_1.5s_ease-in-out_infinite]" />
        </span>
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No hay resultados.
      </TableCell>
    </TableRow>
  );
};
