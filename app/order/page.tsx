'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { sendTelegramNotification } from '@/lib/telegram';
import type { University, Course } from '@/lib/database.types';

function OrderForm() {
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);

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

  // Data from Supabase
  const [universities, setUniversities] = useState<University[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  /* =====================================================
     Fetch universities and courses from Supabase
  ===================================================== */
  useEffect(() => {
    const fetchData = async () => {
      const [uniRes, courseRes] = await Promise.all([
        supabase.from('Universities').select('*').eq('IsActive', true),
        supabase.from('Courses').select('*').eq('IsActive', true),
      ]);

      if (uniRes.data) setUniversities(uniRes.data);
      if (courseRes.data) setCourses(courseRes.data);
    };

    fetchData();
  }, [supabase]);

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
     Filter courses based on selected university
  ===================================================== */
  const filteredCourses = useMemo(() => {
    if (!universityId) return [];
    return courses.filter((c) => c.UniversityID === Number(universityId));
  }, [universityId, courses]);

  /* =====================================================
     Submit order to Supabase
  ===================================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      // 1. Create student first
      const { data: studentData, error: studentError } = await supabase
        .from('Students')
        .insert({
          FullName: fullName,
          PhoneNumber: phoneNumber,
        })
        .select('StudentID')
        .single();

      if (studentError) throw studentError;

      // 2. Create order with student reference
      const { data: orderData, error: orderError } = await supabase
        .from('Orders')
        .insert({
          StudentID: studentData.StudentID,
          UniversityID: Number(universityId),
          CourseID: Number(courseId),
          Quantity: quantity,
          DeliveryMethodID: 1, // Default delivery method
          StatusID: 1, // Default: pending
          Notes: notes || null,
        })
        .select('OrderID')
        .single();

      if (orderError) throw orderError;

      // 3. Send Telegram notification
      const selectedUni = universities.find(u => u.UniversityID === Number(universityId));
      const selectedCrs = courses.find(c => c.CourseID === Number(courseId));

      await sendTelegramNotification({
        fullName,
        phoneNumber,
        universityName: selectedUni?.UniversityName || '',
        courseName: selectedCrs?.CourseName || '',
        quantity,
        orderId: orderData.OrderID,
      });

      window.location.href = `/success?orderId=${orderData.OrderID}`;
    } catch {
      setError("صار خطأ أثناء إرسال الطلب، حاول مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =====================================================
     ملخص الطلب (عرض فقط)
  ===================================================== */
  const selectedUniversity = universities.find((u) => u.UniversityID === Number(universityId));
  const selectedCourse = courses.find((c) => c.CourseID === Number(courseId));

  const coursePrice = selectedCourse?.Price ?? 0;
  const deliveryFee = (() => {
    const id = selectedUniversity?.UniversityID;

    if (id === 9) return 0; // ????? ?????
    if (id === 10) return 2; // ????? ????? ???????
    if (id === 11) return 1; // ????? ???? ???????

    return selectedUniversity?.DeliveryFee ?? 0;
  })();
  const total = coursePrice * quantity + deliveryFee;

  /* =====================================================
     UI
  ===================================================== */
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 min-h-screen">
      <div className="w-full max-w-xl mx-auto clay-card p-6 sm:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)] text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
            طلب الدوسية
          </h1>
          <p className="text-[var(--text-muted)] mt-2">اطلب ملخصاتك الآن</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text)]">
              الاسم الكامل
            </label>
            <input
              type="text"
              placeholder="أدخل اسمك الكامل"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="clay-input"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text)]">
              رقم الهاتف
            </label>
            <input
              type="tel"
              placeholder="07XXXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="clay-input"
            />
          </div>

          {/* University Select */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text)]">
              الجامعة
            </label>
            <select
              value={universityId}
              onChange={(e) => {
                setUniversityId(Number(e.target.value));
                setCourseId('');
              }}
              required
              className="clay-select"
            >
              <option value="">اختر الجامعة</option>
              {universities.map((uni) => (
                <option key={uni.UniversityID} value={uni.UniversityID}>
                  {uni.UniversityName}
                </option>
              ))}
            </select>
          </div>

          {/* Course Select */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text)]">
              المادة
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(Number(e.target.value))}
              required
              disabled={!universityId}
              className="clay-select disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">اختر المادة</option>
              {filteredCourses.map((course) => (
                <option key={course.CourseID} value={course.CourseID}>
                  {course.CourseName} - {course.Price} د.أ
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text)]">
              الكمية
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="clay-input"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[var(--text)]">
              ملاحظات (اختياري)
            </label>
            <textarea
              placeholder="أي ملاحظات إضافية..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="clay-input resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 cursor-pointer
              ${isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'clay-btn-cta hover:scale-[1.02] active:scale-[0.98]'
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                جاري الإرسال...
              </span>
            ) : (
              'إرسال الطلب'
            )}
          </button>

        </form>

        {/* Order Summary */}
        {courseId && universityId && (
          <div className="mt-8 p-5 rounded-xl bg-[var(--bg)] border-2 border-[var(--primary)]/20">
            <h3 className="font-bold text-lg mb-4 text-[var(--primary)] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              ملخص الطلب
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">سعر الدوسية</span>
                <span className="font-medium">{coursePrice} د.أ</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">الكمية</span>
                <span className="font-medium">{quantity}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">التوصيل</span>
                <span className="font-medium">{deliveryFee === 0 ? 'مجاني' : `${deliveryFee} د.أ`}</span>
              </div>

              <div className="border-t border-[var(--primary)]/20 pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold text-[var(--primary)]">
                  <span>المجموع</span>
                  <span>{total} د.أ</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function LoadingFallback() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-[#020617] rounded-2xl shadow p-5 sm:p-8">
        <div className="text-center text-gray-500">جاري التحميل...</div>
      </div>
    </section>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OrderForm />
    </Suspense>
  );
}

