import { api } from '@/lib/axios';

export const updateEmployerLanguage = async (lang: 'ar' | 'he') => {
  return api.post('/api/employer/change-lang', { lang });
};
