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
  <h4 className="font-bold text-white mb-2">
    تواصل معنا
  </h4>

  <p className="text-white/60 mb-2 text-sm">
    لأي استفسار أو مساعدة
  </p>

  <div className="flex flex-col gap-2">
    {/* WhatsApp */}
    <a
      href="https://wa.me/962789425056"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487z" />
      </svg>
      تواصل عبر واتساب
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/dosya__jo?igsh=MTVlY2h3cmlsMm5mMg=="
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium
                 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                 hover:opacity-90 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5A4.26 4.26 0 003.5 7.75v8.5A4.26 4.26 0 007.75 20.5h8.5a4.26 4.26 0 004.25-4.25v-8.5A4.26 4.26 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a1.13 1.13 0 110 2.26 1.13 1.13 0 010-2.26z"/>
      </svg>
      Dosya JO
    </a>
  </div>
</div>


      </div>

      <div className="border-t border-white/10 text-center py-5 text-sm text-white/50">
        © {new Date().getFullYear()} DOSYA — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
