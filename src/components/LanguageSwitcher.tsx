'use client';

import { useLanguage } from '@/context/language/LanguageContext';

export default function LanguageSwitcher() {
  const { setLang } = useLanguage();

  return (
    <div className="flex gap-4 mb-6 p-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-sm">
      <button
        onClick={() => setLang('ar')}
        className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  bg-gradient-to-r from-blue-500 to-indigo-500 text-white
                  hover:from-blue-600 hover:to-indigo-600 active:scale-95 transform
                  shadow-md hover:shadow-lg"
      >
        العربية
      </button>
      <button
        onClick={() => setLang('he')}
        className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  bg-gradient-to-r from-emerald-500 to-teal-500 text-white
                  hover:from-emerald-600 hover:to-teal-600 active:scale-95 transform
                  shadow-md hover:shadow-lg"
      >
        עברית
      </button>
    </div>
  );
}
