'use client';

import SigninForm from './components/SigninForm';
import SigninImage from './components/SigninImage';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/language/LanguageContext';
import { translations } from '@/translations';

export default function EmployerSigninPage() {
  const { lang } = useLanguage();
  const t = translations[lang].signinPage;

  return (
    <main dir="rtl" className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
      <LanguageSwitcher />

      <section className="bg-white rounded-lg shadow-md w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <SigninImage />
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-6">{t.title}</h2>
          <SigninForm />
        </div>
      </section>
    </main>
  );
}
