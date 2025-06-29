import React from "react";
import { CandidateDetails } from "@/types/CandidateDetails";

interface Props {
  candiadate: CandidateDetails;
  onEdit: () => void;
}

export const AvatarCard: React.FC<Props> = ({ candiadate, onEdit }) => (
  <div className="bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-lg p-8 text-center border border-blue-100">
    <div className="relative">
      <img
        src={candiadate.avatarUrl}
        alt="avatar"
        className="w-36 h-36 rounded-full mx-auto border-4 border-blue-200 shadow-lg object-cover"
      />
      <button
        onClick={onEdit}
        className="absolute bottom-2 right-1/2 translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition"
      >
        تعديل الصورة / اللغات
      </button>
    </div>
    <h5 className="mt-6 font-bold text-2xl text-blue-800">{candiadate.name}</h5>
    <p className="text-gray-500 text-lg">{candiadate.phone}</p>
    <p className="text-gray-400">{candiadate.area}</p>
  </div>
);
