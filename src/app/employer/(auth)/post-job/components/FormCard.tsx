"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormCardProps {
  title: string;
  children: ReactNode;
}

export default function FormCard({ title, children }: FormCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </motion.div>
  );
}
