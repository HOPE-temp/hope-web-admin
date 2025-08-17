import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { AvatarFallback } from './ProfileAvatar';
import { Button } from '@/components/ui/button';
import { Camera, Edit, Save, X } from 'lucide-react';
import { CardDescription } from './ProfileCard';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { FormInputCustom, FormSelectCustom } from '@/components/shared/Input';
import { ProfileBadge } from './ProfileBadge';
import { useForm } from 'react-hook-form';
import { FilterProfileValues, filterProfileSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfile } from '@/context/ProfileContext';

type Props = {};

const defaultValues = {
  firstName: 'Juan Carlos',
  lastName: 'García López',
  username: 'jgarcia',
  phone: '+51 987 654 321',
  address: 'Av. Principal 123, Urb. Los Jardines',
  district: 'Miraflores',
  rol: 'Administrador',
};

export const ProfileCardFormInfo = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user: defaultValues } = useProfile();
  const [profileData, setProfileData] = useState(defaultValues);
  const [editData, setEditData] = useState(profileData);
  const form = useForm<FilterProfileValues>({
    resolver: zodResolver(filterProfileSchema),
    defaultValues,
  });

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
  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const onSubmit = async (data: FilterProfileValues) => {
    // onGetData(data);
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-x-4">
          <div>
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src="/placeholder.svg?height=80&width=80"
                  alt="Foto de perfil"
                />
                {profileData && (
                  <AvatarFallback className="text-lg">
                    {getInitials(profileData.firstName, profileData.lastName)}
                  </AvatarFallback>
                )}
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
              {profileData && (
                <>
                  <CardTitle className="text-xl">
                    {profileData.firstName} {profileData.lastName}
                  </CardTitle>
                  <CardDescription className="text-base">
                    @{profileData.firstName}
                  </CardDescription>
                </>
              )}
            </div>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <FormInputCustom
                  control={form.control}
                  id="firstName"
                  name="firstName"
                  placeholder="Ingresa tu nombre"
                  className="disabled:text-gray-700"
                  disabled={!isEditing}
                />
              </div>

              {/* Apellido */}
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <FormInputCustom
                  control={form.control}
                  id="lastName"
                  name="lastName"
                  placeholder="Ingresa tu apellido"
                  disabled={!isEditing}
                />
              </div>

              {/* Usuario */}
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <FormInputCustom
                  control={form.control}
                  id="username"
                  name="username"
                  placeholder="Nombre de usuario"
                  disabled={!isEditing}
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <FormInputCustom
                  control={form.control}
                  id="phone"
                  name="phone"
                  placeholder="Número de teléfono"
                  disabled={!isEditing}
                />
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <FormInputCustom
                  control={form.control}
                  id="address"
                  name="address"
                  placeholder="Dirección completa"
                  disabled={!isEditing}
                />
              </div>

              {/* Distrito */}
              <div className="space-y-2">
                <Label htmlFor="district">Distrito</Label>
                <FormSelectCustom
                  control={form.control}
                  name="district"
                  options={[{ label: 'Miraflores', value: 'Miraflores' }]}
                  disabled={!isEditing}
                />
              </div>

              {/* Rol */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="rol">Rol</Label>
                <FormSelectCustom
                  control={form.control}
                  name="rol"
                  options={[
                    { label: 'Administrador', value: 'admin' },
                    { label: 'Voluntario', value: 'volunteer' },
                    { label: 'Veterinario', value: 'veterinarian' },
                  ]}
                  disabled={!isEditing}
                />
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
