import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

type Props = {};

export const ProfileCardConfig = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Información Adicional</CardTitle>
        <CardDescription>
          Configuraciones y preferencias de cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Cambiar Contraseña</p>
            <p className="text-sm text-muted-foreground">
              Actualiza tu contraseña regularmente para mayor seguridad
            </p>
          </div>
          <Button variant="outline" size="sm">
            Cambiar
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Verificación en Dos Pasos</p>
            <p className="text-sm text-muted-foreground">
              Añade una capa extra de seguridad a tu cuenta
            </p>
          </div>
          <Button variant="outline" size="sm">
            Configurar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
