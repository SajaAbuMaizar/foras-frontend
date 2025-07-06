"use client";

import { motion } from "framer-motion";

interface BilingualCheckboxProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BilingualCheckbox({
  id,
  name,
  label,
  checked,
  onChange,
}: BilingualCheckboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3"
    >
      <div className="relative">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="
            w-5 h-5 rounded border-2 border-gray-300 text-blue-600
            focus:ring-4 focus:ring-blue-500/20 focus:ring-offset-0
            transition-all duration-200 cursor-pointer
          "
        />
        <motion.div
          initial={false}
          animate={checked ? { scale: 1 } : { scale: 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </div>

      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
      >
        {label}
      </label>
    </motion.div>
  );
}
