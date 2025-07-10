import React, { useState, useRef } from "react";
import { Upload, X, Building2, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { employerProfileService } from "@/services/employer/profileService";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

interface LogoUploadProps {
  currentLogoUrl: string | null;
  onLogoUpdate: (logoUrl: string) => void;
  onLogoDelete: () => void;
}

export const LogoUpload: React.FC<LogoUploadProps> = ({
  currentLogoUrl,
  onLogoUpdate,
  onLogoDelete,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useEmployerTranslations();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error(t.profile.errors.invalidFileType);
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t.profile.errors.fileTooLarge);
      return;
    }

    setIsUploading(true);
    try {
      const result = await employerProfileService.uploadLogo(file);
      onLogoUpdate(result.logoUrl);
      toast.success(t.profile.success.logoUploaded);
    } catch (error) {
      toast.error(t.profile.errors.uploadFailed);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await employerProfileService.deleteLogo();
      onLogoDelete();
      toast.success(t.profile.success.logoDeleted);
    } catch (error) {
      toast.error(t.profile.errors.deleteFailed);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {t.profile.sections.companyLogo}
      </h2>

      <div className="space-y-4">
        {/* Logo Preview */}
        <div className="relative w-32 h-32 mx-auto">
          {currentLogoUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={currentLogoUrl}
                alt="Company Logo"
                fill
                className="object-contain rounded-lg"
              />
              {!isDeleting && (
                <button
                  onClick={handleDelete}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || isDeleting}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium
              ${
                !isUploading && !isDeleting
                  ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
              transition-colors duration-200
            `}
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            <span>
              {isUploading
                ? t.common.uploading
                : currentLogoUrl
                ? t.profile.actions.changeLogo
                : t.profile.actions.uploadLogo}
            </span>
          </button>

          <p className="text-sm text-gray-500 mt-2">
            {t.profile.logoRequirements}
          </p>
        </div>
      </div>
    </div>
  );
};
