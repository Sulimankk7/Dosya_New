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
  const [error, setError] = useState('');
  const [cartItems, setCartItems] = useState<Array<{ courseId: number; quantity: number }>>([]);
  const [cartUniversityId, setCartUniversityId] = useState<number | null>(null);

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

  const selectedUniversity = universities.find((u) => u.UniversityID === Number(universityId));
  const selectedCourse = courses.find((c) => c.CourseID === Number(courseId));
  const cartUniversity = universities.find((u) => u.UniversityID === cartUniversityId);

  const addToCart = () => {
    if (!universityId || !courseId) {
      setError('يرجى اختيار الجامعة والمادة');
      return;
    }

    const uniId = Number(universityId);
    if (cartUniversityId && cartUniversityId !== uniId) {
      setError('لا يمكن اختيار أكثر من جامعة في سلة واحدة');
      return;
    }

    if (!selectedCourse) {
      setError('المادة غير موجودة');
      return;
    }

    setError('');
    setCartUniversityId(uniId);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.courseId === selectedCourse.CourseID);
      if (existing) {
        return prev.map((item) =>
          item.courseId === selectedCourse.CourseID
            ? { ...item, quantity: item.quantity + Math.max(1, quantity) }
            : item
        );
      }
      return [...prev, { courseId: selectedCourse.CourseID, quantity: Math.max(1, quantity) }];
    });

    setCourseId('');
    setQuantity(1);
  };

  const updateCartItemQuantity = (courseId: number, nextQty: number) => {
    if (nextQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.courseId === courseId ? { ...item, quantity: nextQty } : item))
    );
  };

  const removeCartItem = (courseId: number) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => item.courseId !== courseId);
      if (next.length === 0) setCartUniversityId(null);
      return next;
    });
  };

  /* =====================================================
     Submit order to Supabase
  ===================================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (cartItems.length === 0) {
      setError('السلة فارغة');
      return;
    }

    const uniId = cartUniversityId;
    if (!uniId) {
      setError('السلة فارغة');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const groupTag = `#G${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const mergedNotes = notes ? `${notes}\n${groupTag}` : groupTag;

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

      // 2. Create orders for all cart items
      const orderResults = await Promise.all(
        cartItems.map(async (item) => {
          const { data, error: orderError } = await supabase
            .from('Orders')
            .insert({
              StudentID: studentData.StudentID,
              UniversityID: uniId,
              CourseID: item.courseId,
              Quantity: item.quantity,
              DeliveryMethodID: 1, // Default delivery method
              StatusID: 1, // Default: pending
              Notes: mergedNotes,
            })
            .select('OrderID')
            .single();

          if (orderError) throw orderError;
          return data;
        })
      );

      // 3. Send Telegram notification
      const courseSummary = cartItems
        .map((item) => {
          const course = courses.find((c) => c.CourseID === item.courseId);
          const name = course?.CourseName || `Course #${item.courseId}`;
          return `${name} x${item.quantity}`;
        })
        .join('، ');

      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const uniName = cartUniversity?.UniversityName || selectedUniversity?.UniversityName || '';

      await sendTelegramNotification({
        fullName,
        phoneNumber,
        universityName: uniName,
        courseName: courseSummary,
        quantity: totalQuantity,
        orderId: orderResults[0].OrderID,
      });

      window.location.href = `/success?orderId=${orderResults[0].OrderID}`;
    } catch {
      setError('صار خطأ أثناء إرسال الطلب، حاول مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =====================================================
     ملخص الطلب (عرض فقط)
  ===================================================== */
  const cartSubtotal = cartItems.reduce((sum, item) => {
    const course = courses.find((c) => c.CourseID === item.courseId);
    return sum + (course?.Price ?? 0) * item.quantity;
  }, 0);
  const deliveryFee = (() => {
    const id = cartUniversityId;

    if (id === 9) return 0; // Jadara
    if (id === 10) return 2; // Ajloun National
    if (id === 11) return 1; // Irbid National

    return cartUniversity?.DeliveryFee ?? 0;
  })();
  const total = cartSubtotal + deliveryFee;

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
                if (cartItems.length > 0 && cartUniversityId && Number(e.target.value) !== cartUniversityId) {
                  setError('لا يمكن تغيير الجامعة والسلة غير فارغة');
                  return;
                }
                setUniversityId(Number(e.target.value));
                setCourseId('');
              }}
              required
              disabled={cartItems.length > 0}
              className="clay-select disabled:opacity-50 disabled:cursor-not-allowed"
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

          <button
            type="button"
            onClick={addToCart}
            disabled={!universityId || !courseId}
            className="w-full py-3 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer clay-btn-cta hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إضافة إلى السلة
          </button>
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
<h6>تأكد من اضافة المواد الى السلة قبل ارسال الطلب</h6>

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

        {/* Cart */}
        {cartItems.length > 0 && (
          <div className="mt-8 p-5 rounded-xl bg-[var(--bg)] border-2 border-[var(--primary)]/20">
            <h3 className="font-bold text-lg mb-4 text-[var(--primary)]">السلة</h3>
            <div className="space-y-3 text-sm">
              {cartItems.map((item) => {
                const course = courses.find((c) => c.CourseID === item.courseId);
                if (!course) return null;
                return (
                  <div key={item.courseId} className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-medium">{course.CourseName}</div>
                      <div className="text-[var(--text-muted)]">{course.Price} د.أ</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCartItemQuantity(item.courseId, item.quantity - 1)}
                        className="px-3 py-1 rounded-lg border border-[var(--primary)]/30"
                      >
                        -
                      </button>
                      <span className="min-w-[24px] text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartItemQuantity(item.courseId, item.quantity + 1)}
                        className="px-3 py-1 rounded-lg border border-[var(--primary)]/30"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeCartItem(item.courseId)}
                        className="px-3 py-1 rounded-lg border border-red-300 text-red-600"
                      >
                        إزالة
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-[var(--text-muted)] text-xs mt-3">
              لتغيير الجامعة، قم بإفراغ السلة أولاً.
            </div>
          </div>
        )}

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="mt-8 p-5 rounded-xl bg-[var(--bg)] border-2 border-[var(--primary)]/20">
            <h3 className="font-bold text-lg mb-4 text-[var(--primary)] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              ملخص الطلب
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">إجمالي المواد</span>
                <span className="font-medium">{cartSubtotal} د.أ</span>
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
