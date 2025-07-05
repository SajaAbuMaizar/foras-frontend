"use client";

import { motion } from "framer-motion";
import PostJobHeader from "./components/PostJobHeader";
import PostJobForm from "./components/PostJobForm";
import { useLanguage } from "@/context/language/LanguageContext";

export default function PostJobPage() {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 mr-64"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PostJobHeader />
        <PostJobForm />
      </div>
    </motion.div>
  );
}
