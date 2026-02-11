'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { University, Course } from '@/lib/database.types';

const supabase = createClient();

export default function CoursesSection() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const universitiesById = useMemo(() => {
    return new Map(universities.map((u) => [u.UniversityID, u.UniversityName]));
  }, [universities]);

  const normalize = (value: string) =>
    value.toLowerCase().replace(/\s+/g, '');

  const getPdfInfo = (course: Course) => {
    const universityName = universitiesById.get(course.UniversityID) || '';
    const uni = normalize(universityName);
    const courseName = normalize(course.CourseName);

    const isJadara = uni.includes('جدارا');
    const isAjloun = uni.includes('عجلون');
    const isIrbid = uni.includes('اربد') || uni.includes('إربد');
    const isZaytuna = uni.includes('الزيتونه') || uni.includes('الزيتونة');

    const isProg1 =
      courseName.includes('برمجة1') ||
      courseName.includes('البرمجة1') ||
      courseName.includes('برمجه1');

    const isProg2 =
      courseName.includes('برمجة2') ||
      courseName.includes('البرمجة2') ||
      courseName.includes('برمجه2');

    const isCpp =
      courseName.includes('c++') ||
      courseName.includes('cplusplus') ||
      courseName.includes('سي++') ||
      courseName.includes('سيبلسبلس');

    const isSelectedLang =
      courseName.includes('بلغةمختاره') ||
      courseName.includes('بلغةمختارة') ||
      courseName.includes('لغةمختاره') ||
      courseName.includes('لغةمختارة');

    // جامعة جدارا
    if (isJadara && (isProg1 || isProg2)) {
      return {
        available: true,
        href: isProg1
          ? '/pdfs/jadara-programming-1.pdf'
          : '/pdfs/jadara-programming-2.pdf',
      };
    }

    // جامعة عجلون الوطنية
    if (isAjloun && isCpp) {
      return {
        available: true,
        href: '/pdfs/ajloun-cpp.pdf',
      };
    }

    // جامعة اربد الاهلية
    if (isIrbid && (isSelectedLang || isCpp)) {
      return {
        available: true,
        href: isSelectedLang
          ? '/pdfs/irbid-selected-language.pdf'
          : '/pdfs/irbid-cpp.pdf',
      };
    }
    if (isZaytuna && (isProg1 || isProg2)) {
      return {
        available: true,
        href: isProg1
          ? '/pdfs/jadara-programming-1.pdf'
          : '/pdfs/jadara-programming-2.pdf',
      };
    }
    return { available: false, href: '' };
  };

  // Fetch universities
  useEffect(() => {
    const fetchUniversities = async () => {
      const { data } = await supabase
        .from('Universities')
        .select('*')
        .eq('IsActive', true)
        .order('UniversityID');

      if (data && data.length > 0) {
        setUniversities(data);
        setSelectedUniversity(data[0].UniversityID);
      }
      setLoading(false);
    };

    fetchUniversities();
  }, []);

  // Fetch courses
  useEffect(() => {
    if (!selectedUniversity) return;

    const fetchCourses = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('Courses')
        .select('*')
        .eq('UniversityID', selectedUniversity)
        .eq('IsActive', true)
        .order('CourseID');

      setCourses(data || []);
      setLoading(false);
    };

    fetchCourses();
  }, [selectedUniversity]);

  return (
    <section id="courses" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto clay-card px-6 py-12 sm:px-10 space-y-10">

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
            الدوسيات المتاحة
          </h2>
          <p className="text-[var(--text-muted)] mt-2">
            اختر جامعتك واطلب الدوسية
          </p>
        </div>

        <div className="flex justify-center">
          <select
            value={selectedUniversity ?? ''}
            onChange={(e) => setSelectedUniversity(Number(e.target.value))}
            className="clay-select max-w-xs"
          >
            {universities.map((u) => (
              <option key={u.UniversityID} value={u.UniversityID}>
                {u.UniversityName}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-3 text-[var(--text-muted)]">
              جاري تحميل الدوسيات...
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            لا توجد دوسيات متاحة لهذه الجامعة
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {courses.map((course) => {
              const pdfInfo = getPdfInfo(course);
              const isPackage = course.CourseName.includes('باكج');
              return (
                <div
                
                  key={course.CourseID}
className={`
  rounded-xl p-6 transition-all flex flex-col justify-between relative
  ${isPackage
    ? 'bg-[var(--card)] border-2 border-[var(--primary)] shadow-xl'
    : 'bg-[var(--bg)] border-2 border-[var(--primary)]/10 hover:border-[var(--primary)]/30 hover:shadow-lg'
  }
`}

                >
                  <div className="space-y-3">
                    {isPackage && (
  <span className="absolute -top-3 right-4 bg-[var(--primary)] text-white text-xs px-3 py-1 rounded-full font-bold">
    الأكثر اختيارًا
  </span>
)}

                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>

                    <h3 className="text-xl font-bold text-[var(--text)]">
                      {course.CourseName}
                    </h3>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {course.Description}
                    </p>

                  <div className="flex items-center gap-3">
  {isPackage && (
    <span className="text-sm text-[var(--text-muted)] line-through">
      15 د.أ
    </span>
  )}

  <span className="text-2xl font-bold text-[var(--primary)]">
    {course.Price}{' '}
    <span className="text-sm font-normal">د.أ</span>
  </span>
</div>

                  </div>

                  <div className="mt-6 flex flex-col gap-3">

  {/* شوف المحتوى — فقط للكورسات العادية */}
  {!isPackage && pdfInfo.available && (
    <a
      href={pdfInfo.href}
      target="_blank"
      className="w-full text-center py-3 rounded-xl border-2 border-[var(--primary)] text-[var(--primary)] font-bold hover:bg-[var(--primary)] hover:text-white transition-all"
    >
      شوف المحتوى
    </a>
  )}

  {!isPackage && !pdfInfo.available && (
    <button
      disabled
      className="w-full py-3 rounded-xl bg-gray-200 text-gray-500 font-bold cursor-not-allowed"
    >
      رؤية المحتوى غير متاحة
    </button>
  )}

  {/* اطلب الآن — للجميع */}
  <Link
    href={`/order?courseId=${course.CourseID}&universityId=${selectedUniversity}`}
    className="w-full text-center py-3 rounded-xl bg-[var(--primary)] text-white font-bold hover:bg-[var(--primary-dark)] transition-all"
  >
    اطلب الآن
  </Link>

</div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
