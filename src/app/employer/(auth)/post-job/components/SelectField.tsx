// app/job-application/components/SelectField.tsx
import React, { useEffect } from 'react';
import { Option } from '@/types/postJobTypes';


type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
};

export default function SelectField({
  id,
  name,
  label,
  options,
  required = false,
}: SelectFieldProps) {
  useEffect(() => {
    if ((window as any).$?.fn?.select2) {
      (window as any).$(`#${id}`).select2({
        theme: 'bootstrap',
      });
    }

    return () => {
      if ((window as any).$?.fn?.select2) {
        (window as any).$(`#${id}`).select2('destroy');
      }
    };
  }, [id]);

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        className="form-select location"
        id={id}
        name={name}
        required={required}
        defaultValue=""
      >
        <option value="" disabled>
          {`Select ${label}`}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nameAr}
          </option>
        ))}
      </select>
    </div>
  );
}
