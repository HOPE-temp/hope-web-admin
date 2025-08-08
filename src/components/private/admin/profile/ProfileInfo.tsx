'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Camera, Save, X } from 'lucide-react';
import { ProfileBadge } from './ProfileBadge';
import ProfileHeader from './ProfileHeader';

export default function Component() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: 'Juan Carlos',
    apellido: 'García López',
    usuario: 'jgarcia',
    telefono: '+51 987 654 321',
    direccion: 'Av. Principal 123, Urb. Los Jardines',
    distrito: 'Miraflores',
    rol: 'Administrador',
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <ProfileHeader rol={profileData.rol} />

        {/* Profile Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="Foto de perfil"
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(profileData.nombre, profileData.apellido)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">
                  {profileData.nombre} {profileData.apellido}
                </CardTitle>
                <CardDescription className="text-base">
                  @{profileData.usuario}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <>
                    <Button onClick={handleEdit} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Cambiar Foto
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                {isEditing ? (
                  <Input
                    id="nombre"
                    value={editData.nombre}
                    onChange={e => handleInputChange('nombre', e.target.value)}
                    placeholder="Ingresa tu nombre"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md">
                    {profileData.nombre}
                  </div>
                )}
              </div>

              {/* Apellido */}
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                {isEditing ? (
                  <Input
                    id="apellido"
                    value={editData.apellido}
                    onChange={e =>
                      handleInputChange('apellido', e.target.value)
                    }
                    placeholder="Ingresa tu apellido"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md">
                    {profileData.apellido}
                  </div>
                )}
              </div>

              {/* Usuario */}
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuario</Label>
                {isEditing ? (
                  <Input
                    id="usuario"
                    value={editData.usuario}
                    onChange={e => handleInputChange('usuario', e.target.value)}
                    placeholder="Nombre de usuario"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md">
                    @{profileData.usuario}
                  </div>
                )}
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                {isEditing ? (
                  <Input
                    id="telefono"
                    value={editData.telefono}
                    onChange={e =>
                      handleInputChange('telefono', e.target.value)
                    }
                    placeholder="Número de teléfono"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md">
                    {profileData.telefono}
                  </div>
                )}
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                {isEditing ? (
                  <Input
                    id="direccion"
                    value={editData.direccion}
                    onChange={e =>
                      handleInputChange('direccion', e.target.value)
                    }
                    placeholder="Dirección completa"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md">
                    {profileData.direccion}
                  </div>
                )}
              </div>

              {/* Distrito */}
              <div className="space-y-2">
                <Label htmlFor="distrito">Distrito</Label>
                {isEditing ? (
                  <Select
                    value={editData.distrito}
                    onValueChange={value =>
                      handleInputChange('distrito', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un distrito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Miraflores">Miraflores</SelectItem>
                      <SelectItem value="San Isidro">San Isidro</SelectItem>
                      <SelectItem value="Barranco">Barranco</SelectItem>
                      <SelectItem value="Surco">Surco</SelectItem>
                      <SelectItem value="La Molina">La Molina</SelectItem>
                      <SelectItem value="San Borja">San Borja</SelectItem>
                      <SelectItem value="Jesús María">Jesús María</SelectItem>
                      <SelectItem value="Lince">Lince</SelectItem>
                      <SelectItem value="Magdalena">Magdalena</SelectItem>
                      <SelectItem value="Pueblo Libre">Pueblo Libre</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-3 bg-muted rounded-md">
                    {profileData.distrito}
                  </div>
                )}
              </div>

              {/* Rol */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="rol">Rol</Label>
                {isEditing ? (
                  <Select
                    value={editData.rol}
                    onValueChange={value => handleInputChange('rol', value)}
                  >
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrador">
                        Administrador
                      </SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Usuario">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ProfileBadge rol={profileData.rol} className="text-sm" />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {!isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button onClick={handleEdit} className="flex-1 sm:flex-none">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Camera className="h-4 w-4 mr-2" />
                  Cambiar Foto de Perfil
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Info Card */}
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
      </div>
    </div>
  );
}
