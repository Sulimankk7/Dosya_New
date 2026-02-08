'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { University, Course } from '@/lib/database.types';

const supabase = createClient();

export default function CoursesSection() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch universities on mount
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

  // Fetch courses when university changes
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

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
            الدوسيات المتاحة
          </h2>
          <p className="text-[var(--text-muted)] mt-2">اختر جامعتك واطلب الدوسية</p>
        </div>

        {/* University Selector */}
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

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-3 text-[var(--text-muted)]">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              جاري تحميل الدوسيات...
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            لا توجد دوسيات متاحة لهذه الجامعة
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.CourseID}
                className="bg-[var(--bg)] rounded-xl p-6 border-2 border-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all hover:shadow-lg flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Course Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>

                  {/* Course Name */}
                  <h3 className="text-xl font-bold text-[var(--text)]">
                    {course.CourseName}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {course.Description}
                  </p>

                  {/* Price */}
                  <p className="text-2xl font-bold text-[var(--primary)]">
                    {course.Price} <span className="text-sm font-normal">د.أ</span>
                  </p>
                </div>

                <Link
                  href={`/order?courseId=${course.CourseID}&universityId=${selectedUniversity}`}
                  className="mt-6 block w-full text-center py-3 rounded-xl bg-[var(--primary)] text-white font-bold hover:bg-[var(--primary-dark)] transition-all cursor-pointer"
                >
                  اطلب الآن
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
