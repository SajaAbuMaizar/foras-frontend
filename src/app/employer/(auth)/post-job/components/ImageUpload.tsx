"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/context/language/LanguageContext";

interface ImageUploadProps {
  id: string;
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  onImageChange?: (preview: string | null) => void;
  preview?: string | null;
}

export default function ImageUpload({
  id,
  name,
  label,
  helperText,
  required,
  onImageChange,
  preview,
}: ImageUploadProps) {
  const { lang } = useLanguage();
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const input = document.getElementById(id) as HTMLInputElement;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;

        if (onImageChange) {
          const reader = new FileReader();
          reader.onloadend = () => {
            onImageChange(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const clearImage = () => {
    if (onImageChange) {
      onImageChange(null);
    }
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative rounded-xl border-2 border-dashed transition-all duration-300
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${preview ? "p-2" : "p-8"}
        `}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
            </motion.div>
            <p className="text-sm text-gray-600 text-center">
              {lang === "ar"
                ? "اسحب وأفلت الصورة هنا أو انقر للاختيار"
                : "גרור ושחרר תמונה כאן או לחץ לבחירה"}
            </p>
          </label>
        )}

        <input
          id={id}
          name={name}
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required={required && !preview}
          className="sr-only"
        />
      </div>

      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </motion.div>
  );
}
