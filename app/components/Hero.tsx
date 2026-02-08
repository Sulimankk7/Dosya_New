'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-28 pb-24 text-center px-6 bg-[var(--bg)] text-[var(--text)]">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
        دوسيات برمجة مبسطة لطلاب الجامعات
      </h1>

      <p className="mt-6 text-base md:text-lg text-gray-600 dark:text-white/70 
                    max-w-2xl mx-auto leading-relaxed">
        شرح + أمثلة + أسئلة امتحانية، معمولة من طالب فاهم وجرب المادة
      </p>

      <div className="mt-10 flex justify-center gap-4 flex-wrap">
        {/* Order */}
        <Link
          href="/order"
          className="px-7 py-3 rounded-xl bg-[var(--primary)] 
                     text-white text-lg font-medium 
                     hover:opacity-90 transition"
        >
          اطلب الدوسية
        </Link>

        {/* Scroll */}
        <a
          href="#courses"
          className="px-7 py-3 rounded-xl border border-gray-300 dark:border-white/20 
                     text-gray-700 dark:text-white 
                     hover:bg-gray-50 dark:hover:bg-white/10 transition"
        >
          شوف المحتوى
        </a>
      </div>

      <div className="mt-20 flex justify-center">
             <div className="animate-[float_2s_ease-in-out_infinite]">
          <img
          src="/hero.png"
          alt="students"
          className="w-[420px] md:w-[520px]"
        />
        </div>
      </div>
    </section>
  );
}
