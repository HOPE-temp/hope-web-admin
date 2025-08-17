import React from 'react';
import { ProfileBadge } from './ProfileBadge';
import { useProfile } from '@/context/ProfileContext';

type Props = {};

const ProfileHeader = () => {
  const { user } = useProfile();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal
        </p>
      </div>
      {user?.rol && <ProfileBadge rol={user?.rol} />}
    </div>
  );
};

export default ProfileHeader;
