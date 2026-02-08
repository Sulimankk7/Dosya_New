'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function OrderForm() {
  const searchParams = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    university: '',
    course: preselectedCourse,
    delivery: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form);
    alert('تم إرسال الطلب (مؤقت)');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white dark:bg-[#020617]
                 rounded-2xl p-8 shadow-md space-y-6"
    >
      <h1 className="text-2xl font-bold text-center text-[var(--text)]">
        طلب دوسية جديدة
      </h1>

      {/* Name */}
      <div>
        <label className="block mb-1 text-sm">الاسم الكامل</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border
                     border-gray-300 dark:border-white/20
                     bg-transparent outline-none"
          placeholder="أدخل اسمك الكامل"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-1 text-sm">رقم الهاتف</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border
                     border-gray-300 dark:border-white/20
                     bg-transparent outline-none"
          placeholder="07XXXXXXXX"
        />
      </div>

      {/* University */}
      <div>
        <label className="block mb-1 text-sm">الجامعة</label>
        <select
          name="university"
          value={form.university}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border
                     border-gray-300 dark:border-white/20
                     bg-transparent"
        >
          <option value="">اختر الجامعة</option>
          <option value="الجامعة الأردنية">[]جامعة جدارا </option>
          <option value="الهاشمية">جامعة إربد الأهلية</option>
          <option value="اليرموك">جامعة عجلون الوطنية</option>
        </select>
      </div>

      {/* Course */}
      <div>
        <label className="block mb-1 text-sm">المادة</label>
        <input
          name="course"
          value={form.course}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border
                     border-gray-300 dark:border-white/20
                     bg-transparent"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl
                   bg-[var(--primary)] text-white
                   font-semibold text-lg hover:opacity-90 transition"
      >
        إرسال الطلب
      </button>
    </form>
  );
}
