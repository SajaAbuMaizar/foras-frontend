import React from "react";

interface Option<T> { label: string; value: T; }

interface Props<T> {
  name: string;
  options: Option<T>[];
  selected: T;
  onChange: (value: T) => void;
}

export function RadioGroup<T extends string | boolean>({
  name, options, selected, onChange
}: Props<T>) {
  return (
    <div className="flex space-x-4">
      {options.map(o => (
        <label key={o.value.toString()} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={o.value.toString()}
            checked={selected === o.value}
            onChange={() => onChange(o.value)}
            className="form-radio"
          />
          <span className="ml-2">{o.label}</span>
        </label>
      ))}
    </div>
  );
}
