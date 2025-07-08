import { useState, useCallback } from "react";
import { Upload, X, Image } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  currentImage: File | null;
  label?: string;
  required?: boolean;
  variant?: "card" | "button"; // 'card' for job image, 'button' for company logo
}

export default function ImageUpload({
  onImageSelect,
  currentImage,
  label,
  required = false,
  variant = "card",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
          onImageSelect(file);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
        onImageSelect(null);
      }
    },
    [onImageSelect]
  );

  const handleRemove = useCallback(() => {
    setPreview(null);
    onImageSelect(null);
  }, [onImageSelect]);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {variant === "card" ? (
        preview ? (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="max-w-xs max-h-48 rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full
                       hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label
            className="flex flex-col items-center justify-center w-full h-48 
                          border-2 border-dashed border-gray-300 rounded-lg 
                          cursor-pointer hover:border-blue-500 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Image className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">לחץ להעלאה</span>
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF עד 10MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
        )
      ) : (
        <div className="flex items-center">
          <label
            className="cursor-pointer rounded-md border border-gray-300 bg-white w-full py-2 px-3 
                      text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      flex items-center gap-1"
          >
            <Upload className="h-4 w-4" />
            העלאת תמונה
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>

          {preview && (
            <div className="relative ml-4">
              <img
                src={preview}
                alt="Preview"
                className="h-16 w-16 rounded-md object-cover border border-gray-200"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 
                         text-white hover:bg-red-600 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
