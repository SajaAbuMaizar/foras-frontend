// src/components/ui/LabeledInput.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";

interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  icon?: IconType;
  label?: string;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ error, icon: Icon, label, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            {...props}
            className={`w-full ${
              Icon ? "pr-10" : "pr-3"
            } pl-3 py-3 border-2 rounded-lg focus:outline-none transition-all ${
              error
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
            } ${className}`}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;
