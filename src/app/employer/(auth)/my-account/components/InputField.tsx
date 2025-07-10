import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { UpdateEmployerProfileRequest } from "@/types/employer/profile";

interface InputFieldProps {
  label: string;
  name: keyof UpdateEmployerProfileRequest;
  register: UseFormRegister<UpdateEmployerProfileRequest>;
  error?: FieldError;
  type?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  error,
  type = "text",
  required = false,
  dir,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        dir={dir}
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? "border-red-500" : "border-gray-300"}
          transition-colors duration-200
        `}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
