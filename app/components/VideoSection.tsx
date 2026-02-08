'use client';

import { useState } from 'react';

export default function VideoSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Section */}
      <section className="py-24 px-6 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto text-center space-y-10">

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
            شاهد الفيديو التعريفي
          </h2>

          {/* Video Thumbnail */}
          <div
            onClick={() => setOpen(true)}
            className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden
                       cursor-pointer group shadow-xl"
          >
            {/* Thumbnail Image */}
            <img
              src="/video-thumb.jpg"
              alt="Intro Video"
              className="w-full aspect-video object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

            {/* Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="w-20 h-20 rounded-full bg-[var(--primary)]
                           flex items-center justify-center
                           scale-100 group-hover:scale-110 transition"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="24,18 24,46 46,32"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              <p className="text-white/80 text-sm">
                انقر للمشاهدة
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/80 backdrop-blur-sm
                     animate-fadeIn"
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-white text-4xl
                       hover:opacity-70 transition"
          >
            ×
          </button>

          {/* Video */}
          <div
            className="w-[95%] max-w-5xl aspect-video bg-black
                       rounded-xl overflow-hidden
                       animate-scaleIn"
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/t6aLb14R1VI?autoplay=1"
              title="Intro Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
