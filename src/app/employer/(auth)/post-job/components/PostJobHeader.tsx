"use client";

import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

export default function PostJobHeader() {
  const t = useEmployerTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.postJobPage.title}
          </h1>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-6 w-6 text-purple-500" />
        </motion.div>
      </div>
      <p className="text-gray-600 text-lg">
        {t.postJobPage.subtitle || "Create a new job opportunity"}
      </p>
    </motion.div>
  );
}
