'use client';
import ProfileHeader from '@/components/private/admin/profile/ProfileHeader';
import { ProfileCardFormInfo } from '@/components/private/admin/profile/ProfileCardFormInfo';
import { ProfileCardConfig } from '@/components/private/admin/profile/ProfileCardConfig';
import { ProfileProvider } from '@/context/ProfileContext';

export default function Page() {
  return (
    <ProfileProvider>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <ProfileHeader />

          {/* Profile Card */}
          <ProfileCardFormInfo />

          {/* Additional Info Card */}
          <ProfileCardConfig />
        </div>
      </div>
    </ProfileProvider>
  );
}
