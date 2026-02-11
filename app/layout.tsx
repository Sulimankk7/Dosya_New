import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
export const metadata = {
  icons: {
    icon: '/icon_white.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>

      
    </html>
  );
}
