import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface City {
  code: string;
  nameAr: string;
}

export interface Gender {
  value: string;
  labelAr: string;
}

export interface Industry {
  code: string;
  nameAr: string;
}

export function useOptions() {
  const [cities, setCities] = useState<City[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [citiesRes, gendersRes, industriesRes] = await Promise.all([
          fetch("/api/cities"),
          fetch("/api/enums/genders"),
          fetch("/api/industries"),
        ]);

        const [citiesData, gendersData, industriesData] = await Promise.all([
          citiesRes.json(),
          gendersRes.json(),
          industriesRes.json(),
        ]);

        setCities(citiesData);
        setGenders(gendersData);
        setIndustries(industriesData);
      } catch (error) {
        toast.error("فشل تحميل بيانات النماذج");
      } finally {
        setLoading(false);
      }
    }

    fetchOptions();
  }, []);

  return { cities, genders, industries, loading };
}
