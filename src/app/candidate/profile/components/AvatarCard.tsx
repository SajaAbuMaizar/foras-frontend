import React from "react";
import { CandidateDetails } from "@/types/CandidateDetails";

interface Props { candiadate: CandidateDetails; onEdit: () => void; }

export const AvatarCard: React.FC<Props> = ({ candiadate, onEdit }) => (
  <div className="bg-white rounded-xl shadow p-6 text-center">
    <img src={candiadate.avatarUrl} alt="avatar" className="w-36 h-36 rounded-full mx-auto" />
    <h5 className="mt-4 font-semibold text-lg">{candiadate.name}</h5>
    <p className="text-gray-500">{candiadate.phone}</p>
    <p className="text-gray-500">{candiadate.area}</p>
    <button
      onClick={onEdit}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
      تعديل
    </button>
  </div>
);
