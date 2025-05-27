import React from 'react';

type InputFieldProps = {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'file' | 'number';
  required?: boolean;
  rows?: number;
  accept?: string;
  helperText?: string;
};

export default function InputField({
  id,
  name,
  label,
  type,
  required = false,
  rows,
  accept,
  helperText,
}: InputFieldProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="uppercase tracking-inherit mb-2 text-[18px] font-bold text-[#566a7f]">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="block w-full px-3.5 py-1.5 text-[0.9375rem] font-normal leading-[1.53] text-[#697a8d] bg-white border border-[#d9dee3] rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
          id={id}
          name={name}
          rows={rows}
          required={required}
        />
      ) : (
        <input
          type={type}
          className="block w-full px-3.5 py-1.5 text-[0.9375rem] font-normal leading-[1.53] text-[#697a8d] bg-white border border-[#d9dee3] rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
          id={id}
          name={name}
          required={required}
          accept={accept}
        />
      )}
      {helperText && (
        <small className="form-text text-muted">{helperText}</small>
      )}
    </div>
  );
}