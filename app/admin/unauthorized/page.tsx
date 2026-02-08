import Link from "next/link";

export default function AdminUnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          غير مصرح لك
        </h1>

        <p className="text-gray-600 mb-6">
          لا تملك الصلاحية للوصول إلى هذه الصفحة.
        </p>

        <Link
          href="/admin/login"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
}
