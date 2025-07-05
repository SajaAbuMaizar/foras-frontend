import React from "react";

interface RadioGroupProps<T extends string> {
  label: string;
  name: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
  required?: boolean;
}

export function RadioGroup<T extends string>({
  label,
  name,
  options,
  value,
  onChange,
  required,
}: RadioGroupProps<T>) {
  return (
    <div className="space-y-2">
      <label className="block font-semibold text-gray-700 mb-2">{label}</label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value as T)}
              required={required}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
