import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-dark)] text-white/80">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3 text-sm">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <rect x="14" y="8" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
                <line x1="18" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="2" />
                <line x1="18" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2" />
                <line x1="18" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">DOSYA</span>
          </div>
          <p className="text-white/60 leading-relaxed">
            مشروع طلابي يهدف لتقديم دوسيات مرتبة وواضحة تساعد الطالب
            الجامعي على الفهم والاستعداد للامتحانات بثقة.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-white mb-4">
            روابط سريعة
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-white transition-colors cursor-pointer">
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/order" className="hover:text-white transition-colors cursor-pointer">
                اطلب الآن
              </Link>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition-colors cursor-pointer">
                من نحن
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white mb-4">
            تواصل معنا
          </h4>
          <p className="text-white/60 mb-4">
            لأي استفسار أو مساعدة
          </p>
          <a
            href="https://wa.me/962789425056"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            تواصل عبر واتساب
          </a>
        </div>

      </div>

      <div className="border-t border-white/10 text-center py-5 text-sm text-white/50">
        © {new Date().getFullYear()} DOSYA — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
