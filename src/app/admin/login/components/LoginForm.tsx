"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock, FaPhone } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth/AuthHooks";

const AdminLoginForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { refreshUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.withRetry(() =>
        apiClient.post("/api/auth/admin/login", { phone, password })
      );

      toast.success("تم تسجيل الدخول بنجاح");
      await refreshUser(); // Refresh user context after login
      router.push("/admin/dashboard"); // Redirect to dashboard
    } catch (error: any) {
      const message = error.response?.data?.message || "فشل تسجيل الدخول";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        تسجيل دخول المدير
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="tel"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
            isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          } transition-colors`}
        >
          {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
