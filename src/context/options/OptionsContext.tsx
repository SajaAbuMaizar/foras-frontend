// src/context/options/OptionsContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCities, fetchGenders, fetchIndustries } from '@/lib/api';
import { Option } from '@/types/jobs/postJobTypes';

type OptionsContextType = {
  cities: Option[];
  genders: Option[];
  industries: Option[];
  loading: boolean;
};

const OptionsContext = createContext<OptionsContextType | null>(null);

export const OptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [cities, setCities] = useState<Option[]>([]);
  const [genders, setGenders] = useState<Option[]>([]);
  const [industries, setIndustries] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOptions() {
      setLoading(true);
      const [cities, genders, industries] = await Promise.all([
        fetchCities(),
        fetchGenders(),
        fetchIndustries()
      ]);
      setCities(cities);
      setGenders(genders);
      setIndustries(industries);
      setLoading(false);
    }
    loadOptions();
  }, []);

  return (
    <OptionsContext.Provider value={{ cities, genders, industries, loading }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => {
  const context = useContext(OptionsContext);
  if (!context) throw new Error('useOptions must be used within OptionsProvider');
  return context;
};
