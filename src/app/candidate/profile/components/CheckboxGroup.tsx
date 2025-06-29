import React from "react";

interface Props<T extends string> {
  options: T[];
  selected: T[];
  onToggle: (value: T) => void;
  labelMap?: Record<T, string>;
}

export function CheckboxGroup<T extends string>({
  options,
  selected,
  onToggle,
  labelMap = {} as any,
}: Props<T>) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => (
        <label key={opt} className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className="form-checkbox accent-blue-500 w-5 h-5"
          />
          <span className="ml-2 text-gray-700 text-lg">
            {labelMap[opt] || opt}
          </span>
        </label>
      ))}
    </div>
  );
}
