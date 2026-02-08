import Link from "next/link";

export default function AdminSessionExpiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          انتهت الجلسة
        </h1>

        <p className="text-gray-600 mb-6">
          انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى للمتابعة.
        </p>

        <Link
          href="/admin/login"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          تسجيل الدخول من جديد
        </Link>
      </div>
    </div>
  );
}
