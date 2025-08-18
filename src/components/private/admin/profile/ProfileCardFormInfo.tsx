import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { AvatarFallback } from './ProfileAvatar';
import { Button } from '@/components/ui/button';
import { Camera, Edit, Save, X } from 'lucide-react';
import { CardDescription } from './ProfileCard';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  FormComboboxCustom,
  FormInputCustom,
  FormSelectCustom,
} from '@/components/shared/Input/InputCustom';
import { useForm } from 'react-hook-form';
import { FormValues, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfile } from '@/context/ProfileContext';

import optionDistrict from '@/components/private/admin/common/DataDistrict.json';
import { updateMe } from '@/services/hopeBackend/profileMe';
import { useAuth } from '@/context/AuthContext';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

type Props = {};

export const ProfileCardFormInfo = (props: Props) => {
  const { axios } = useAuth();
  const { user: profileData, updateUser } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: profileData,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateUser();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await updateMe(axios, data);
      setTimeout(() => {
        handleSave();
      }, 1200);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          toast.error('Ya existe un adopteante con ese nombre.');
        }
      }
    }
  };

  useEffect(() => {
    form.reset(profileData);
  }, [profileData]);

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
                    @{profileData.username}
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
                <Button onClick={() => form.handleSubmit(onSubmit)()} size="sm">
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
                <FormComboboxCustom
                  control={form.control}
                  name="district"
                  options={optionDistrict}
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
            {/* {!isEditing && (
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
            )} */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
