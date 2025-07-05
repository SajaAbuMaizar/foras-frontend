import React from "react";

interface CheckboxGroupProps<T extends string> {
  label: string;
  options: Array<{ value: T; label: string }>;
  values: T[];
  onChange: (value: T) => void;
  columns?: number;
}

export function CheckboxGroup<T extends string>({
  label,
  options,
  values,
  onChange,
  columns = 2,
}: CheckboxGroupProps<T>) {
  return (
    <div className="space-y-3">
      <label className="block font-semibold text-gray-700">{label}</label>
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-3`}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
          >
            <input
              type="checkbox"
              value={option.value}
              checked={values.includes(option.value)}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
