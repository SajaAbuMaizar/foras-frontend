"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^05\d{8}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhone(formData.phoneNumber)) {
      toast.error("يرجى إدخال رقم هاتف صحيح (05XXXXXXXX)");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from contact form submission:", data);

      if (response.ok) {
        toast.success(data.message || "تم إرسال رسالتك بنجاح");
        // Reset form
        setFormData({
          fullName: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "حدث خطأ أثناء إرسال الرسالة");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="الاسم الكامل"
        required
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSubmitting}
      />

      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="رقم الهاتف (05XXXXXXXX)"
        required
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSubmitting}
      />

      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="الموضوع"
        required
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSubmitting}
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="رسالتك..."
        rows={6}
        required
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        disabled={isSubmitting}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`font-semibold py-2 px-4 rounded transition duration-300 ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
      </button>
    </form>
  );
};

export default ContactForm;
