'use client';

export default function LanguageSwitcher() {
  const changeLanguage = (lang: string) => {
    const form = document.getElementById('language-form') as HTMLFormElement;
    const input = document.getElementById('lang-input') as HTMLInputElement;
    input.value = lang;
    form.submit();
  };

  return (
    <form id="language-form" action="/employer/change-lang" method="post" className="flex gap-2 mb-4">
      <input type="hidden" id="lang-input" name="lang" />
      <button type="button" onClick={() => changeLanguage('ar')} className="text-sm text-blue-600 hover:underline">العربية</button>
      <button type="button" onClick={() => changeLanguage('he')} className="text-sm text-blue-600 hover:underline">עברית</button>
    </form>
  );
}
