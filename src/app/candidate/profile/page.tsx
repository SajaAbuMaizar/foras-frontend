// app/profile/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { AvatarCard } from './components/AvatarCard';
import { RadioGroup } from './components/RadioGroup';
import { CheckboxGroup } from './components/CheckboxGroup';
import { LanguageModal } from './components/LanguageModal';
import { useForm } from './hooks/useForm';
import { CandidateDetails, DriverLicense, Skill, Language } from '@/types/CandidateDetails';
import { toast } from 'react-hot-toast';

const ProfilePage: NextPage = () => {
    const [langModal, setLangModal] = useState(false);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [licenses, setLicenses] = useState<DriverLicense[]>([]);

    const { form, update, setAll } = useForm<CandidateDetails>();

    useEffect(() => {
        fetch("/api/candidate/me/profile")
            .then(res => res.json())
            .then(data => setAll(data))
            .catch(err => toast.error("Failed to load profile"));
    }, []);


    if (!form) return <div className="text-center mt-24">Loading...</div>;

    const toggleArray = <K extends string>(key: keyof CandidateDetails, value: K) => {
        const arr = form[key] as unknown as K[];
        update(key, arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] as any);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/candidate/me/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error();
            toast.success('Profile updated');
        } catch {
            toast.error('Failed to update profile');
        }
    };

    return (
        <div dir="rtl" className="container mx-auto py-6 mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AvatarCard candiadate={form} onEdit={() => setLangModal(true)} />

                <div className="lg:col-span-2 bg-white shadow rounded p-6">
                    <h2 className="text-2xl mb-4">الملف الشخصي</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h5>هل تعرف العبرية؟</h5>
                            <RadioGroup<boolean>
                                name="knowsHebrew"
                                options={[{ label: 'نعم', value: true }, { label: 'لا', value: false }]}
                                selected={form.knowsHebrew}
                                onChange={v => update('knowsHebrew', v)}
                            />
                        </div>

                        <div>
                            <h5>هل ترغب في المساعدة؟</h5>
                            <RadioGroup<boolean>
                                name="needsHelp"
                                options={[{ label: 'نعم', value: true }, { label: 'لا', value: false }]}
                                selected={form.needsHelp}
                                onChange={v => update('needsHelp', v)}
                            />
                        </div>

                        <div>
                            <h5>رخصة القيادة</h5>
                            <CheckboxGroup
                                options={licenses}
                                selected={form.driverLicenses}
                                onToggle={v => toggleArray('driverLicenses', v)}
                            />
                        </div>

                        <div>
                            <h5>المهارات</h5>
                            <CheckboxGroup
                                options={skills}
                                selected={form.skills}
                                onToggle={v => toggleArray('skills', v)}
                            />
                        </div>

                        <div>
                            <h5>اللغات</h5>
                            <div className="flex flex-wrap gap-2 my-2">
                                {form.languages.map((l, i) => (
                                    <span key={i} className="bg-gray-200 px-3 py-1 rounded-full">{l}</span>
                                ))}
                            </div>
                            <button type="button"
                                onClick={() => setLangModal(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded">
                                إضافة لغة
                            </button>
                        </div>

                        <div>
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
                                حفظ التغييرات
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
                        update('languages', [...form.languages, lang] as CandidateDetails['languages']);
                    }
                    setLangModal(false);
                }} />
        </div>
    );
};

export default ProfilePage;