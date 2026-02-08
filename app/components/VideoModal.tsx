'use client';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function VideoModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl hover:opacity-70"
      >
        ×
      </button>

      {/* Video */}
      <div className="w-[90%] max-w-3xl aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
  className="w-full h-full rounded-xl"
  src="https://youtu.be/t6aLb14R1VI"
  title="Intro Video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

      </div>
    </div>
  );
}
