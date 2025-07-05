"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/language/LanguageContext";

interface BilingualTextareaProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  error?: string;
}

export default function BilingualTextarea({
  id,
  name,
  label,
  value,
  onChange,
  required,
  placeholder,
  rows = 4,
  error,
}: BilingualTextareaProps) {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={
          placeholder || (lang === "ar" ? "أدخل الوصف..." : "הכנס תיאור...")
        }
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
          ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-200 focus:border-blue-500"
          }
          bg-white/50 backdrop-blur-sm resize-none
          focus:outline-none focus:ring-4 focus:ring-blue-500/20
          hover:border-gray-300 text-right`}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
