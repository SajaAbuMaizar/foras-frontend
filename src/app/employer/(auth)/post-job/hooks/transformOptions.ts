// app/job-application/utils/transformOptions.ts
import { City, Field, Option, Language } from '@/types/postJobTypes';

export function transformCitiesToOptions(cities: City[], lang: Language = 'he'): Option[] {
  return cities.map(city => ({
    value: city.langHebrew,
    label: lang === 'he' ? city.langHebrew : city.arabic
  }));
}

export function transformFieldsToOptions(fields: Field[], lang: Language = 'he'): Option[] {
  return fields.map(field => ({
    value: field.langHebrew,
    label: lang === 'he' ? field.langHebrew : field.arabic
  }));
}