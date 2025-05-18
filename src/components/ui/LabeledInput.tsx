import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";

interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  icon?: IconType;
}

export default function LabeledInput({
  error,
  icon: Icon,
  ...props
}: LabeledInputProps) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
        <input
          {...props}
          className={`w-full pl-10 border-b border-gray-300 p-3 focus:outline-none focus:border-black`}
        />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}