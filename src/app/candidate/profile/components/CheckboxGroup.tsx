import React from "react";

interface Props<T extends string> {
  options: T[];
  selected: T[];
  onToggle: (value: T) => void;
  labelMap?: Record<T, string>;
}

export function CheckboxGroup<T extends string>({
  options, selected, onToggle, labelMap = {} as any
}: Props<T>) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map(opt => (
        <label key={opt} className="inline-flex items-center">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className="form-checkbox"
          />
          <span className="ml-2">{labelMap[opt] || opt}</span>
        </label>
      ))}
    </div>
  );
}
