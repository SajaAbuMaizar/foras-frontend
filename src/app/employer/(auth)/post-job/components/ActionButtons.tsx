"use client";

import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";

interface ActionButtonsProps {
  isSubmitting: boolean;
}

export default function ActionButtons({ isSubmitting }: ActionButtonsProps) {
  const router = useRouter();
  const t = useEmployerTranslations();
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex gap-4 justify-center mt-8"
    >
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-2 px-8 py-4 rounded-xl font-semibold
          bg-gradient-to-r from-blue-600 to-purple-600 text-white
          hover:from-blue-700 hover:to-purple-700
          focus:outline-none focus:ring-4 focus:ring-blue-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300 shadow-lg hover:shadow-xl
        `}
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? t.postJobPage.submitting : t.postJobPage.submitButton}
      </motion.button>

      <motion.button
        type="button"
        onClick={() => router.push("/employer/dashboard")}
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-2 px-8 py-4 rounded-xl font-semibold
          bg-gray-200 text-gray-700 hover:bg-gray-300
          focus:outline-none focus:ring-4 focus:ring-gray-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
        `}
      >
        <X className="w-5 h-5" />
        {lang === "ar" ? "إلغاء" : "ביטול"}
      </motion.button>
    </motion.div>
  );
}
