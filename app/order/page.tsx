'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function OrderPage() {
  const searchParams = useSearchParams();

  const courseIdFromUrl = searchParams.get('courseId');
  const universityIdFromUrl = searchParams.get('universityId');

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [universityId, setUniversityId] = useState<number | ''>('');
  const [courseId, setCourseId] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");


  /* =====================================================
     Preselect university & course from URL
  ===================================================== */
  useEffect(() => {
    if (universityIdFromUrl) {
      setUniversityId(Number(universityIdFromUrl));
    }
    if (courseIdFromUrl) {
      setCourseId(Number(courseIdFromUrl));
    }
  }, [universityIdFromUrl, courseIdFromUrl]);

  /* =====================================================
     Courses mapping (static – MVP)
  ===================================================== */
  const coursesByUniversity: Record<
    number,
    { id: number; name: string }[]
  > = {
    9: [
      { id: 6, name: 'برمجة 1' },
      { id: 7, name: 'برمجة 2' },
      { id: 8, name: 'تراكيب البيانات' },
      { id: 16, name: 'بنك أسئلة تراكيب البيانات' },
      { id: 17, name: 'بنك أسئلة برمجة' },
    ],
    10: [
      { id: 11, name: 'C++' },
      { id: 17, name: 'بنك أسئلة برمجة' },
    ],
    11: [
      { id: 11, name: 'C++' },
      { id: 14, name: 'برمجة بلغة مختارة' },
      { id: 8, name: 'تراكيب البيانات' },
      { id: 16, name: 'بنك أسئلة تراكيب البيانات' },
      { id: 17, name: 'بنك أسئلة برمجة' },
    ],
  };

  /* =====================================================
     Filter courses based on selected university
  ===================================================== */
  const filteredCourses = useMemo(() => {
    if (!universityId) return [];
    return coursesByUniversity[Number(universityId)] ?? [];
  }, [universityId]);

  /* =====================================================
     Submit order
  ===================================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    const payload = {
      fullName,
      phoneNumber,
      universityID: Number(universityId),
      courseID: Number(courseId),
      quantity,
      deliveryMethodID: 1,
      notes,
    };

    try {
      const res = await fetch('http://localhost:5217/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      window.location.href = `/success?orderId=${data.orderId}`;
    } catch {
  setError("صار خطأ أثناء إرسال الطلب، حاول مرة أخرى");
} finally {
  setIsSubmitting(false);
}

  };

  /* =====================================================
     ملخص الطلب (عرض فقط)
  ===================================================== */
  const universityNames: Record<number, string> = {
    9: 'جامعة جدارا',
    10: 'جامعة عجلون الوطنية',
    11: 'جامعة إربد الأهلية',
  };

  const coursePrices: Record<number, number> = {
    6: 5,
    7: 5,
    8: 6,
    11: 5,
    14: 5,
    16: 1,
    17: 1,
  };

  const selectedUniversityName =
    universityId ? universityNames[Number(universityId)] : '';

  const coursePrice =
    courseId ? coursePrices[Number(courseId)] ?? 0 : 0;

  const getDeliveryFee = (universityName: string) => {
    if (universityName === 'جامعة إربد الأهلية') return 1;
    if (universityName === 'جامعة عجلون الوطنية') return 2;
    return 0;
  };

  const deliveryFee = getDeliveryFee(selectedUniversityName);
  const total = coursePrice * quantity + deliveryFee;

  /* =====================================================
     UI
  ===================================================== */
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-[#020617] rounded-2xl shadow p-5 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white">
          طلب الدوسية
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

          <input
            type="text"
            placeholder="الاسم الكامل"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-[#020617] text-gray-900 dark:text-white"
          />

          <input
            type="tel"
            placeholder="رقم الهاتف"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-[#020617] text-gray-900 dark:text-white"
          />

          <select
            value={universityId}
            onChange={(e) => {
              setUniversityId(Number(e.target.value));
              setCourseId('');
            }}
            required
            className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-[#020617] text-gray-900 dark:text-white"
          >
            <option value="">اختر الجامعة</option>
            <option value={9}>جامعة جدارا</option>
            <option value={10}>جامعة عجلون الوطنية</option>
            <option value={11}>جامعة إربد الأهلية</option>
          </select>

          <select
            value={courseId}
            onChange={(e) => setCourseId(Number(e.target.value))}
            required
            disabled={!universityId}
            className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-[#020617] text-gray-900 dark:text-white disabled:opacity-50"
          >
            <option value="">اختر المادة</option>
            {filteredCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              الكمية
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-[#020617] text-gray-900 dark:text-white"
            />
          </div>

          <textarea
            placeholder="ملاحظات (اختياري)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-[#020617] text-gray-900 dark:text-white"
          />

{error && (
  <p className="text-red-500 text-sm text-center">
    {error}
  </p>
)}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold transition
              ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[var(--primary)] text-white hover:opacity-90'
              }
            `}
          >
            {isSubmitting ? 'جاري إرسال الطلب...' : 'إرسال الطلب'}
          </button>

        </form>

        {courseId && universityId && (
          <div className="mt-6 border rounded-lg p-4 bg-gray-50 dark:bg-[#0b1220] text-gray-900 dark:text-white">
            <h3 className="font-bold mb-3">ملخص الطلب</h3>

            <div className="flex justify-between text-sm mb-2">
              <span>سعر الدوسية</span>
              <span>{coursePrice} د.أ</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>الكمية</span>
              <span>{quantity}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>التوصيل</span>
              <span>{deliveryFee} د.أ</span>
            </div>

            <div className="flex justify-between font-bold mt-3">
              <span>المجموع</span>
              <span>{total} د.أ</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
