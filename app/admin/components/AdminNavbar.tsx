"use client";

import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5217/api/admin/auth/logout", {
  method: "POST",
  credentials: "include",
});

router.push("/admin/login");

    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <header className="w-full h-16 bg-gradient-to-b from-[#070B16] to-[#020617] border-b border-white/10 flex items-center px-6">
      
      {/* Right side – Title */}
      <div className="flex-1 text-right">
        <h1 className="text-lg font-bold text-white">
          لوحة التحكم – الطلبات
        </h1>
        <p className="text-xs text-white/50">
          Dossier Admin Panel
        </p>
      </div>

      {/* Left side – Logout */}
      <button
        onClick={handleLogout}
        className="text-sm text-red-400 hover:text-red-500 transition font-medium"
      >
       Logout
      </button>

    </header>
  );
}
