"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/language/LanguageContext";

interface SelectOption {
  id?: string | number;
  value?: string;
  code?: string;
  nameAr?: string;
  nameHe?: string;
}

interface BilingualSelectProps {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
}

export default function BilingualSelect({
  id,
  name,
  label,
  options,
  value,
  onChange,
  required,
  error,
}: BilingualSelectProps) {
  const { lang } = useLanguage();

  const getOptionLabel = (option: SelectOption) => {
    return lang === "ar" ? option.nameAr || "" : option.nameHe || "";
  };

  const getOptionValue = (option: SelectOption) => {
    return option.id?.toString() || option.value || option.code || "";
  };

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

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
            ${
              error
                ? "border-red-500 focus:border-red-600"
                : "border-gray-200 focus:border-blue-500"
            }
            bg-white/50 backdrop-blur-sm appearance-none cursor-pointer
            focus:outline-none focus:ring-4 focus:ring-blue-500/20
            hover:border-gray-300 text-right pr-12`}
        >
          <option value="">{lang === "ar" ? "اختر..." : "בחר..."}</option>
          {options.map((option, index) => (
            <option key={index} value={getOptionValue(option)}>
              {getOptionLabel(option)}
            </option>
          ))}
        </select>

        <div
          className={`absolute top-1/2 transform -translate-y-1/2 pointer-events-none ${
            lang === "ar" ? "left-4" : "right-4"
          }`}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>

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
