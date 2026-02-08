'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type Testimonial = {
  text: string;
  author: string;
};

export default function TestimonialsCarousel() {
  const testimonials: Testimonial[] = [    {
      text: "نزلت المادة 96 الحمد لله، اعتمادي كان كامل على الدوسية وكانت مرتبة وواضحة.",
      author: "طالب – جامعة جدارا",
    },
    {
      text: "الدوسية ساعدتني أفهم المادة بدون ما أرجع للمحاضرات، الشرح سلس ومباشر.",
      author: "طالبة – جامعة جدارا",
    },
    {
      text: "جبت 95 بالبرمجة، الدوسية كانت السبب الرئيسي، شكرًا كثير.",
      author: "طالب – جامعة جدارا",
    },
    {
      text: "أسلوب الشرح ممتاز، خصوصًا لطلاب أول فصل، كل شيء واضح وبسيط.",
      author: "طالبة – جامعة جدارا",
    },
    {
      text: "وفّرت علي وقت وجهد كبير، واعتمدت عليها بالفينال بشكل كامل.",
      author: "طالب – جامعة جدارا",
    },
    {
      text: "لو في برمجة 2 دوسية بنفس المستوى، أكيد راح أشتريها.",
      author: "طالب – جامعة جدارا",
    },
    {
      text: "جبت 83.5 بالمادة، والدوسية كانت داعم أساسي إلي.",
      author: "طالبة – جامعة جدارا",
    },
    {
      text: "الحلو إن الشرح ما فيه تطويل، كل معلومة بمكانها.",
      author: "طالب – جامعة جدارا",
    },];

  return (
    <section id="feedback" className="py-20 px-4 sm:px-6">
      <div
        className="max-w-6xl mx-auto
                   border border-gray-200 dark:border-white/10
                   rounded-2xl
                   bg-white dark:bg-[#020617]
                   px-6 py-12 sm:px-10 text-center"
      >
        <h2 className="text-2xl font-bold mb-10 text-gray-900 dark:text-white">
          آراء الطلاب
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          loop
          speed={6000}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
            <div className="text-green-500 text-xl mb-3">✔</div>
              <div className="h-full bg-gray-50 dark:bg-[#0B1220]
                              border border-gray-200 dark:border-white/10
                              rounded-xl p-6 shadow-sm
                              text-right flex flex-col justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.text}
                </p>

                <div className="mt-6 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {item.author}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
