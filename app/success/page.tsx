'use client';

import Link from 'next/link';
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {

  // 🎉 Confetti on load
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#22c55e", "#16a34a", "#4ade80"],
    });
  }, []);

  return (
    <section
      className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6
                 bg-gray-50 dark:bg-[#020617]"
    >
      <div
        className="w-full max-w-md
                   bg-white dark:bg-[#0B1220]
                   rounded-2xl shadow-lg
                   p-8 text-center space-y-6"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <span className="text-green-500">✔</span>
          تم إرسال طلبك بنجاح
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-white/70 leading-relaxed text-sm sm:text-base">
          🌟 شكرًا لك
          <br />
          تم استلام طلب الدوسية بنجاح
          <br />
          سيتم التواصل معك عبر واتساب في أقرب وقت
        </p>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <Link
            href="/"
            className="block w-full py-3 rounded-xl
                       bg-green-500 text-white font-semibold
                       hover:bg-green-600 transition"
          >
            العودة إلى الصفحة الرئيسية
          </Link>

          <a
            href="https://wa.me/962789425056"
            target="_blank"
            className="block w-full py-3 rounded-xl
                       border border-green-500
                       text-green-600 dark:text-green-400
                       hover:bg-green-500/10 transition"
          >
            تواصل معنا عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
