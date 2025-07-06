"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { AvatarCard } from "./components/AvatarCard";
import { RadioGroup } from "./components/RadioGroup";
import { CheckboxGroup } from "./components/CheckboxGroup";
import { LanguageModal } from "./components/LanguageModal";
import { SkillsSection } from "./components/SkillsSection";
import { useForm } from "./hooks/useForm";
import {
  CandidateDetails,
  DRIVER_LICENSES,
  Language,
  Skill,
} from "@/types/CandidateDetails";
import { toast } from "react-hot-toast";
import { Save, Loader2, MapPin, Phone, User, Car, Globe } from "lucide-react";

const ProfilePage: NextPage = () => {
  const [langModal, setLangModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { form, update, setAll } = useForm<CandidateDetails>();

  useEffect(() => {
    fetch("/api/candidate/me/profile")
      .then((res) => res.json())
      .then((data) => {
        setAll(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load profile");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!form) return null;

  const toggleArray = <K extends string>(
    key: keyof CandidateDetails,
    value: K
  ) => {
    const arr = form[key] as K[];
    update(
      key,
      arr.includes(value)
        ? arr.filter((v) => v !== value)
        : ([...arr, value] as K[])
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/candidate/me/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      toast.success("تم تحديث الملف الشخصي بنجاح");
    } catch {
      toast.error("حدث خطأ أثناء التحديث");
    } finally {
      setIsSaving(false);
    }
  };

  const driverLicenseOptions = DRIVER_LICENSES.map((license) => ({
    value: license,
    label: license,
  }));

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          الملف الشخصي
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Card */}
          <div className="lg:col-span-1">
            <AvatarCard
              candidate={form}
              onEdit={() => setLangModal(true)}
              onImageUpdate={(url) => update("avatarUrl", url)}
            />
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User size={24} className="text-blue-600" />
                  المعلومات الأساسية
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      <Phone size={16} className="inline ml-1" />
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      readOnly
                      className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      <MapPin size={16} className="inline ml-1" />
                      المنطقة
                    </label>
                    <input
                      type="text"
                      value={form.area}
                      readOnly
                      className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50"
                    />
                  </div>

                  <div>
                    <RadioGroup
                      label="الجنس"
                      name="gender"
                      options={[
                        { value: "MALE", label: "ذكر" },
                        { value: "FEMALE", label: "أنثى" },
                      ]}
                      value={form.gender}
                      onChange={(value) => update("gender", value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <RadioGroup
                    label="هل تتحدث العبرية؟"
                    name="knowsHebrew"
                    options={[
                      { value: "true", label: "نعم" },
                      { value: "false", label: "لا" },
                    ]}
                    value={String(form.knowsHebrew)}
                    onChange={(value) =>
                      update("knowsHebrew", value === "true")
                    }
                  />

                  <RadioGroup
                    label="هل تحتاج للمساعدة؟"
                    name="needsHelp"
                    options={[
                      { value: "true", label: "نعم" },
                      { value: "false", label: "لا" },
                    ]}
                    value={String(form.needsHelp)}
                    onChange={(value) => update("needsHelp", value === "true")}
                  />
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <SkillsSection
                  skills={form.skills}
                  onToggle={(skill: Skill) => toggleArray("skills", skill)}
                />
              </div>

              {/* Languages Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Globe size={24} className="text-blue-600" />
                    اللغات
                  </h3>
                  <button
                    type="button"
                    onClick={() => setLangModal(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + إضافة لغة
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium flex items-center gap-2"
                    >
                      {lang}
                      <button
                        type="button"
                        onClick={() => toggleArray("languages", lang)}
                        className="hover:text-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Driver Licenses Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Car size={24} className="text-blue-600" />
                  رخص القيادة
                </h3>
                <CheckboxGroup
                  label=""
                  options={driverLicenseOptions}
                  values={form.driverLicenses}
                  onChange={(license) => toggleArray("driverLicenses", license)}
                  columns={3}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Save size={20} />
                  )}
                  {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <LanguageModal
          show={langModal}
          onClose={() => setLangModal(false)}
          onAdd={(lang: Language) => {
            if (!form.languages.includes(lang)) {
              update("languages", [...form.languages, lang]);
            }
          }}
          currentLanguages={form.languages}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
