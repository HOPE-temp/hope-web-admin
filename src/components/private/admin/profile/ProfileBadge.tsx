import { Badge } from '@/components/ui/badge';
import React from 'react';

type Props = { rol: string; className?: string };

const getRoleBadgeVariant = (rol: string) => {
  switch (rol.toLowerCase()) {
    case 'admin':
      return 'destructive';
    case 'voluntieer':
      return 'default';
    case 'veterinarian':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getRoleTraduccionVariant = (rol: string) => {
  switch (rol.toLowerCase()) {
    case 'admin':
      return 'Administrador';
    case 'voluntieer':
      return 'Voluntario';
    case 'veterinarian':
      return 'Veterinario';
    default:
      return 'Extra';
  }
};

export const ProfileBadge = ({ rol, className }: Props) => {
  return (
    <Badge variant={getRoleBadgeVariant(rol)} className={className}>
      {getRoleTraduccionVariant(rol)}
    </Badge>
  );
};
