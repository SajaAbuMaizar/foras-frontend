import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language/LanguageContext";

interface SelectOption {
  id?: number;
  value?: string;
  nameAr?: string;
  nameHe?: string;
  labelAr?: string;
  labelHe?: string;
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  required,
  error,
}) => {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";

  const getOptionLabel = (option: SelectOption) => {
    if (lang === "ar") {
      return option.nameAr || option.labelAr || "";
    }
    return option.nameHe || option.labelHe || "";
  };

  const getOptionValue = (option: SelectOption) => {
    return option.id || option.value || "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label
        htmlFor={id}
        className={`block text-sm font-semibold text-gray-700 text-right`}
      >
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
            w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 text-right
            ${
              error
                ? "border-red-500 focus:border-red-600"
                : "border-gray-200 focus:border-blue-500"
            }
            bg-white/50 backdrop-blur-sm appearance-none cursor-pointer
            focus:outline-none focus:ring-4 focus:ring-blue-500/20
            hover:border-gray-300
          `}
        >
          <option value="">{lang === "ar" ? "اختر..." : "בחר..."}</option>
          {options.map((option, index) => (
            <option key={index} value={getOptionValue(option)}>
              {getOptionLabel(option)}
            </option>
          ))}
        </select>

        <div
          className={`absolute top-1/2 transform -translate-y-1/2 pointer-events-none left-4`}
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-xs text-red-500 text-right`}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
