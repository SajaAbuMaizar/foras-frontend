"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language/LanguageContext";

export default function LoadingOverlay() {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-blue-600" />
        </motion.div>
        <p className="text-lg font-semibold text-gray-700">
          {lang === "ar" ? "جاري نشر الوظيفة..." : "מפרסם משרה..."}
        </p>
      </motion.div>
    </motion.div>
  );
}
