import React from 'react';
import { ProfileBadge } from './ProfileBadge';

type Props = { rol: string };

const ProfileHeader = ({ rol }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal
        </p>
      </div>
      <ProfileBadge rol={rol} />
    </div>
  );
};

export default ProfileHeader;
