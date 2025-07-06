import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api-client";

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
        const [citiesData, gendersData, industriesData] = await Promise.all([
          apiClient.withRetry(() => apiClient.get<City[]>("/api/cities")),
          apiClient.withRetry(() =>
            apiClient.get<Gender[]>("/api/enums/genders")
          ),
          apiClient.withRetry(() =>
            apiClient.get<Industry[]>("/api/industries")
          ),
        ]);

        setCities(citiesData);
        setGenders(gendersData);
        setIndustries(industriesData);
      } catch {
        toast.error("فشل تحميل بيانات النماذج");
      } finally {
        setLoading(false);
      }
    }

    fetchOptions();
  }, []);

  return { cities, genders, industries, loading };
}
