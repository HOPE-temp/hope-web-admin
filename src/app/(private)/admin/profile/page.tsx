'use client';

import ProfileInfo from '@/components/private/admin/profile/ProfileInfo';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/private/admin/profile/ProfileAvatar';
import ProfileDialogUpdate from '@/components/private/admin/profile/ProfileDialogUpdate';
import ProfileDialogPassword from '@/components/private/admin/profile/ProfileDialogPassword';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-2">
      <div className="rounded-lg bg-white shadow p-6 space-y-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>

        {/* Contenedor principal con avatar e info */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 -mt-2">
          {/* Información del usuario */}
          <div className="flex-grow flex justify-center">
            <ProfileInfo />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 mt-4">
          <ProfileDialogUpdate />
          <ProfileDialogPassword />
        </div>
      </div>
    </div>
  );
}
