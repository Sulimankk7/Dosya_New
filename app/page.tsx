import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import CoursesSection from './components/CoursesSection';
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import AboutSection from "./components/AboutSection";



export default function Home() {
  return (
    <>
      <Hero />
      <CoursesSection />
      <TestimonialsCarousel />
      <AboutSection />
    </>
  );
}
