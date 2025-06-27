'use client';

import { useLanguage } from '@/context/language/LanguageContext';
import { translations } from '@/translations';

export default function SigninImage() {
  const { lang } = useLanguage();
  const t = translations[lang].signinPage;

  return (
    <div className="hidden md:flex md:w-1/2 justify-center items-center bg-gray-50 p-6">
      <div>
        <img
          src="/images/employer/signin-image.jpg"
          alt={t.imageAlt}
          className="rounded-md"
        />
        <a
          href="/employer/signup"
          className="block mt-4 text-center text-blue-700 hover:underline"
        >
          {t.createAccount}
        </a>
      </div>
    </div>
  );
}
