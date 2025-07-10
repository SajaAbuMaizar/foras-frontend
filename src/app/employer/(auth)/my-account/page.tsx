"use client";

import React, { useEffect, useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileForm } from "./components/ProfileForm";
import { LogoUpload } from "./components/LogoUpload";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { employerProfileService } from "@/services/employer/profileService";
import { EmployerProfile } from "@/types/employer/profile";
import { toast } from "react-hot-toast";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

export default function MyAccountPage() {
  const [profile, setProfile] = useState<EmployerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const t = useEmployerTranslations();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await employerProfileService.getProfile();
      setProfile(data);
    } catch (error) {
      toast.error(t.profile.errors.loadFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = (updatedProfile: EmployerProfile) => {
    setProfile(updatedProfile);
  };

  const handleLogoUpdate = (logoUrl: string) => {
    if (profile) {
      setProfile({ ...profile, companyLogoUrl: logoUrl });
    }
  };

  const handleLogoDelete = () => {
    if (profile) {
      setProfile({ ...profile, companyLogoUrl: null });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t.profile.errors.notFound}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4" dir="rtl">
      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-1">
          <LogoUpload
            currentLogoUrl={profile.companyLogoUrl}
            onLogoUpdate={handleLogoUpdate}
            onLogoDelete={handleLogoDelete}
          />
        </div>

        <div className="lg:col-span-2">
          <ProfileForm profile={profile} onUpdate={handleProfileUpdate} />
        </div>
      </div>
    </div>
  );
}
