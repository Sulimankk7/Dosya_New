'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type University = {
  universityID: number;
  universityName: string;
};

type Course = {
  courseID: number;
  courseName: string;
  description: string;
  price: number;
};

export default function CoursesSection() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5217/api/universities')
      .then(res => res.json())
      .then(data => {
        setUniversities(data);
        if (data.length > 0) {
          setSelectedUniversity(data[0].universityID);
        }
      });
  }, []);

  useEffect(() => {
    if (!selectedUniversity) return;

    setLoading(true);
    fetch(`http://localhost:5217/api/courses?universityId=${selectedUniversity}`)
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedUniversity]);

  return (
    <section id="courses" className="py-24 px-4 sm:px-6">
      <div
        className="max-w-7xl mx-auto
                   border border-gray-200 dark:border-white/10
                   rounded-2xl
                   bg-white dark:bg-[#020617]
                   px-6 py-12 sm:px-10 space-y-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
          الدوسيات المتاحة
        </h2>

        <div className="flex justify-center">
          <select
            value={selectedUniversity ?? ''}
            onChange={(e) => setSelectedUniversity(Number(e.target.value))}
            className="px-6 py-3 rounded-xl border
                       bg-white dark:bg-[#020617]
                       text-gray-900 dark:text-white"
          >
            {universities.map((u) => (
              <option key={u.universityID} value={u.universityID}>
                {u.universityName}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">جاري تحميل الدوسيات...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.courseID}
                className="bg-white dark:bg-[#020617]
                           border border-gray-200 dark:border-white/10
                           rounded-2xl p-8 shadow-sm
                           flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {course.courseName}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-white/70">
                    {course.description}
                  </p>

                  <p className="text-lg font-semibold text-[var(--primary)]">
                    {course.price} دنانير
                  </p>
                </div>

                <Link
                  href={`/order?courseId=${course.courseID}&universityId=${selectedUniversity}`}
                  className="block w-full text-center py-3 rounded-xl
                             border-2 border-[var(--primary)]
                             text-[var(--primary)] font-semibold
                             hover:bg-[var(--primary)] hover:text-white
                             transition"
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
