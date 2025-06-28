import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">الصفحة غير موجودة</h2>
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
