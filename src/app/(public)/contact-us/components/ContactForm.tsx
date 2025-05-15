'use client';

const ContactForm = () => (
  <form className="grid grid-cols-1 gap-4">
    <input
      type="text"
      placeholder="الاسم الكامل"
      required
      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="email"
      placeholder="البريد الالكتروني"
      required
      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      placeholder="رقم الهاتف"
      required
      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      placeholder="الموضوع"
      required
      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <textarea
      placeholder="رسالتك.."
      rows={6}
      required
      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
    >
      ارسال الرسالة
    </button>
  </form>
);

export default ContactForm;
