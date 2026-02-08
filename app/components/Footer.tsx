import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3 text-sm">

        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">
            Dossier
          </h3>
          <p className="text-gray-400 leading-relaxed">
            مشروع طلابي يهدف لتقديم دوسيات مرتبة وواضحة تساعد الطالب
            الجامعي على الفهم والاستعداد للامتحانات بثقة.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">
            روابط سريعة
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white">
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/order" className="hover:text-white">
                اطلب الآن
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-white">
                من نحن
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">
            تواصل معنا
          </h4>
          <p className="text-gray-400 mb-2">
            لأي استفسار أو مساعدة
          </p>
          <a
            href="https://wa.me/962789425056"
            target="_blank"
            className="inline-block mt-2 text-green-400 hover:text-green-300"
          >
            تواصل عبر واتساب
          </a>
        </div>

      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Dossier — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
