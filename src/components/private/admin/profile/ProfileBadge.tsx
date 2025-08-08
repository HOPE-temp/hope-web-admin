import { Badge } from '@/components/ui/badge';
import React from 'react';

type Props = { rol: string; className?: string };

export const ProfileBadge = ({ rol, className }: Props) => {
  const getRoleBadgeVariant = (rol: string) => {
    switch (rol.toLowerCase()) {
      case 'administrador':
        return 'destructive';
      case 'editor':
        return 'default';
      case 'usuario':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  return (
    <Badge variant={getRoleBadgeVariant(rol)} className={className}>
      {rol}
    </Badge>
  );
};
