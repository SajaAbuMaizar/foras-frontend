import React from "react";

type CheckBoxFieldProps = {
  id: string;
  name: string;
  label: string;
};

export default function CheckBoxField({ id, name, label }: CheckBoxFieldProps) {
  return (
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id={id} name={name} />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
