"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { AvatarCard } from "./components/AvatarCard";
import { RadioGroup } from "./components/RadioGroup";
import { CheckboxGroup } from "./components/CheckboxGroup";
import { LanguageModal } from "./components/LanguageModal";
import { useForm } from "./hooks/useForm";
import {
  CandidateDetails,
  DRIVER_LICENSES,
  SKILLS,
  LANGUAGES,
  Language,
} from "@/types/CandidateDetails";
import { toast } from "react-hot-toast";

const ProfilePage: NextPage = () => {
  const [langModal, setLangModal] = useState(false);
  const { form, update, setAll } = useForm<CandidateDetails>();

  useEffect(() => {
    fetch("/api/candidate/me/profile")
      .then((res) => res.json())
      .then((data) => setAll(data))
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  if (!form) return <div className="text-center mt-24">Loading...</div>;

  const toggleArray = <K extends string>(
    key: keyof CandidateDetails,
    value: K
  ) => {
    const arr = form[key] as unknown as K[];
    update(
      key,
      arr.includes(value)
        ? arr.filter((v) => v !== value)
        : ([...arr, value] as any)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/candidate/me/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("تم تحديث الملف بنجاح");
    } catch {
      toast.error("حصل خطأ أثناء التحديث");
    }
  };

  return (
    <div dir="rtl" className="container mx-auto py-6 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AvatarCard candiadate={form} onEdit={() => setLangModal(true)} />

        <div className="lg:col-span-2 bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">
            الملف الشخصي بالكامل
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded border border-gray-300 focus:border-blue-400"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  className="w-full p-2 rounded border border-gray-300 focus:border-blue-400"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  المنطقة
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded border border-gray-300 focus:border-blue-400"
                  value={form.area}
                  onChange={(e) => update("area", e.target.value)}
                />
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2 text-gray-700">
                هل تعرف العبرية؟
              </h5>
              <RadioGroup<boolean>
                name="knowsHebrew"
                options={[
                  { label: "نعم", value: true },
                  { label: "لا", value: false },
                ]}
                selected={form.knowsHebrew}
                onChange={(v) => update("knowsHebrew", v)}
              />
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2 text-gray-700">
                هل ترغب في المساعدة؟
              </h5>
              <RadioGroup<boolean>
                name="needsHelp"
                options={[
                  { label: "نعم", value: true },
                  { label: "لا", value: false },
                ]}
                selected={form.needsHelp}
                onChange={(v) => update("needsHelp", v)}
              />
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2 text-gray-700">
                رخص القيادة المتوفرة لديك
              </h5>
              <CheckboxGroup
                options={DRIVER_LICENSES}
                selected={form.driverLicenses}
                onToggle={(v) => toggleArray("driverLicenses", v)}
                labelMap={{
                  A2: "A2",
                  A1: "A1",
                  A: "A",
                  B: "B",
                  C1: "C1",
                  C: "C",
                  D: "D",
                  D1: "D1",
                  D2: "D2",
                  D3: "D3",
                  E: "E",
                  "1": "1",
                  ".": "أخرى",
                }}
              />
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2 text-gray-700">
                المهارات
              </h5>
              <CheckboxGroup
                options={SKILLS}
                selected={form.skills}
                onToggle={(v) => toggleArray("skills", v)}
                labelMap={{
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
                }}
              />
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2 text-gray-700 flex items-center gap-2">
                اللغات
                <button
                  type="button"
                  className="ml-2 px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-400 hover:bg-blue-100"
                  onClick={() => setLangModal(true)}
                >
                  إضافة لغة
                </button>
              </h5>
              <div className="flex flex-wrap gap-2">
                {form.languages.length === 0 && (
                  <span className="text-gray-400">لا توجد لغات مضافة</span>
                )}
                {form.languages.map((l) => (
                  <span
                    key={l}
                    className="bg-blue-100 text-blue-700 rounded-full px-4 py-1 text-md flex items-center gap-2"
                  >
                    {l}
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 ml-1"
                      onClick={() =>
                        update(
                          "languages",
                          form.languages.filter((x) => x !== l)
                        )
                      }
                      title="حذف"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 text-lg"
            >
              حفظ التعديلات
            </button>
          </form>
        </div>
      </div>
      <LanguageModal
        show={langModal}
        onClose={() => setLangModal(false)}
        onAdd={(lang) => {
          if (!form.languages.includes(lang)) {
            update("languages", [...form.languages, lang]);
          }
          setLangModal(false);
        }}
        availableLanguages={LANGUAGES.filter(
          (l) => !form.languages.includes(l)
        )}
      />
    </div>
  );
};

export default ProfilePage;
