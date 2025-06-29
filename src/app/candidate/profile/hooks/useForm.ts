"use client";

import { useState } from "react";

export function useForm<T extends object>() {
  const [form, setForm] = useState<T | null>(null);

  function update<K extends keyof T>(key: K, value: T[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function setAll(newData: T) {
    setForm(newData);
  }

  return { form, update, setAll };
}
