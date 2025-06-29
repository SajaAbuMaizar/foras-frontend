"use client";

import { Phone, MapPin, Languages, Award, Car, User } from "lucide-react";

interface CandidateResult {
  id: number;
  name: string;
  phone: string;
  cityName: string;
  gender: string;
  knowsHebrew: boolean;
  needsHelp: boolean;
  skills: string[];
  driverLicenses: string[];
  languages: string[];
  avatarUrl?: string;
}

interface Props {
  candidate: CandidateResult;
}

export default function CandidateCard({ candidate }: Props) {
  const skillsMap: Record<string, string> = {
    cook: "طبخ",
    hotel: "فندقة",
    technology: "تكنولوجيا",
    management: "إدارة",
    construction: "بناء",
    customers: "خدمة عملاء",
    sales: "مبيعات",
    order: "تحضير طلبات",
    saver: "منقذ سباحة",
    barman: "بارمان",
    barista: "باريستا",
    electricity: "كهرباء",
    condition: "مكيّفات",
    cars: "سيارات",
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.length === 10 && phone.startsWith("05")) {
      return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
    return phone;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex-shrink-0">
            {candidate.avatarUrl ? (
              <img
                className="h-16 w-16 rounded-full border-2 border-white object-cover"
                src={candidate.avatarUrl}
                alt={candidate.name}
              />
            ) : (
              <div className="h-16 w-16 rounded-full border-2 border-white bg-white flex items-center justify-center">
                <User size={32} className="text-blue-500" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              {candidate.name}
            </h3>
            <div className="flex items-center text-blue-100 text-sm mt-1">
              <MapPin size={16} className="ml-1" />
              <span>{candidate.cityName}</span>
            </div>
          </div>
          <div className="text-right">
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                candidate.gender === "MALE"
                  ? "bg-blue-200 text-blue-800"
                  : "bg-pink-200 text-pink-800"
              }`}
            >
              {candidate.gender === "MALE" ? "ذكر" : "أنثى"}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Contact Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Phone size={16} className="ml-2" />
            <a
              href={`tel:${candidate.phone}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {formatPhoneNumber(candidate.phone)}
            </a>
          </div>
          <div className="text-sm text-gray-500">#{candidate.id}</div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              candidate.knowsHebrew
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            العبرية: {candidate.knowsHebrew ? "نعم" : "لا"}
          </span>
          {candidate.needsHelp && (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
              يحتاج مساعدة
            </span>
          )}
        </div>

        {/* Skills */}
        {candidate.skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award size={16} className="text-gray-600" />
              <h4 className="font-medium text-gray-900 text-sm">المهارات</h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md"
                >
                  {skillsMap[skill] || skill}
                </span>
              ))}
              {candidate.skills.length > 4 && (
                <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                  +{candidate.skills.length - 4} أخرى
                </span>
              )}
            </div>
          </div>
        )}

        {/* Driver Licenses */}
        {candidate.driverLicenses.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Car size={16} className="text-gray-600" />
              <h4 className="font-medium text-gray-900 text-sm">رخص القيادة</h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {candidate.driverLicenses.map((license, index) => (
                <span
                  key={index}
                  className="inline-flex px-2 py-1 text-xs bg-green-50 text-green-700 rounded-md font-mono"
                >
                  {license}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {candidate.languages.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Languages size={16} className="text-gray-600" />
              <h4 className="font-medium text-gray-900 text-sm">اللغات</h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {candidate.languages.map((language, index) => (
                <span
                  key={index}
                  className="inline-flex px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-md"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty State for Skills/Licenses/Languages */}
        {candidate.skills.length === 0 &&
          candidate.driverLicenses.length === 0 &&
          candidate.languages.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              لا توجد مهارات أو رخص أو لغات مسجلة
            </div>
          )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 border-t">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">مرشح رقم {candidate.id}</div>
          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
            عرض الملف الكامل
          </button>
        </div>
      </div>
    </div>
  );
}
