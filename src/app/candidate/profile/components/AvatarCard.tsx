import React, { useState } from "react";
import { CandidateDetails } from "@/types/CandidateDetails";
import { Camera, User, Edit3 } from "lucide-react";
import { toast } from "react-hot-toast";

interface Props {
  candidate: CandidateDetails;
  onEdit: () => void;
  onImageUpdate: (url: string) => void;
}

export const AvatarCard: React.FC<Props> = ({
  candidate,
  onEdit,
  onImageUpdate,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("/api/candidate/me/avatar", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      const { avatarUrl } = await res.json();
      onImageUpdate(avatarUrl);
      toast.success("تم تحديث الصورة بنجاح");
    } catch {
      toast.error("فشل تحميل الصورة");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl p-8 text-center border border-blue-100 hover:shadow-2xl transition-all duration-300">
      <div className="relative group">
        <div className="relative w-40 h-40 mx-auto">
          {candidate.avatarUrl ? (
            <img
              src={candidate.avatarUrl}
              alt="avatar"
              className="w-full h-full rounded-full border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-lg object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-lg">
              <User size={60} className="text-white" />
            </div>
          )}

          <label className="absolute inset-0 rounded-full cursor-pointer group-hover:bg-black group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <Camera
              size={32}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>

          {isUploading && (
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        <button
          onClick={onEdit}
          className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
        >
          <Edit3 size={16} />
          تعديل اللغات
        </button>
      </div>

      <h5 className="mt-6 font-bold text-2xl bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent">
        {candidate.name}
      </h5>
      <p className="text-gray-600 text-lg mt-2">{candidate.phone}</p>
      <p className="text-gray-500 mt-1">{candidate.area}</p>

      <div className="mt-4 flex justify-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            candidate.gender === "MALE"
              ? "bg-blue-100 text-blue-800"
              : "bg-pink-100 text-pink-800"
          }`}
        >
          {candidate.gender === "MALE" ? "ذكر" : "أنثى"}
        </span>
        {candidate.knowsHebrew && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            يتحدث العبرية
          </span>
        )}
      </div>
    </div>
  );
};
