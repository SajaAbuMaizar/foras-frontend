import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language/LanguageContext";

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  accept?: string;
  helperText?: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  rows,
  accept,
  helperText,
  error,
}) => {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";

  const inputClasses = `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 text-right
    ${
      error
        ? "border-red-500 focus:border-red-600"
        : "border-gray-200 focus:border-blue-500"
    }
    bg-white/50 backdrop-blur-sm
    focus:outline-none focus:ring-4 focus:ring-blue-500/20
    hover:border-gray-300
  `;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
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

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={inputClasses}
        />
      ) : type === "file" ? (
        <div className="relative group">
          <label
            htmlFor={id}
            className={`${inputClasses} cursor-pointer flex items-center justify-between group-hover:border-gray-300`}
          >
            <span className="text-gray-500 truncate">
              {value ? value : "اختر ملف"}
            </span>
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </label>
          <input
            id={id}
            name={name}
            type="file"
            onChange={handleFileChange}
            required={required}
            accept={accept}
            className="sr-only"
          />
        </div>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}

      {helperText && !error && (
        <p className={`text-xs text-gray-500 text-right`}>{helperText}</p>
      )}

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
