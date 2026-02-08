"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5217/api/admin/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: username.trim(),
            password: password.trim(),
          }),
        }
      );

      if (res.status === 401) {
        throw new Error("INVALID_CREDENTIALS");
      }

      if (!res.ok) {
        throw new Error("SERVER_ERROR");
      }

      router.push("/admin/orders");
    } catch (err: any) {
      if (err.message === "INVALID_CREDENTIALS") {
        setError("بيانات الدخول غير صحيحة");
      } else {
        setError("حصل خطأ غير متوقع، حاول مرة أخرى");
      }

      await new Promise((r) => setTimeout(r, 800));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#020617] flex flex-col items-center justify-center px-4">
      {/* Icon */}
      <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.5 21a6.5 6.5 0 0113 0"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dossier Admin
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        لوحة التحكم الإدارية
      </p>

      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-[#0B1220] rounded-2xl shadow-xl p-6 sm:p-8">
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 text-right text-gray-700 dark:text-gray-300">
              اسم المستخدم
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="off"
                className="w-full border border-gray-300 dark:border-white/10
                           bg-white dark:bg-[#020617]
                           text-gray-900 dark:text-white
                           rounded-lg px-4 py-2 pr-10
                           focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                👤
              </span>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-right text-gray-700 dark:text-gray-300">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                onCopy={(e) => e.preventDefault()}
                className="w-full border border-gray-300 dark:border-white/10
                           bg-white dark:bg-[#020617]
                           text-gray-900 dark:text-white
                           rounded-lg px-4 py-2 pr-10
                           focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                🔒
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 rounded-lg transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-400">
        © Dosya 2026 - لوحة التحكم الإدارية
      </p>
    </div>
  );
}
