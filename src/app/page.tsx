import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Skills from '@/components/sections/skills';
import Projects from '@/components/sections/projects';
import Certifications from '@/components/sections/certifications';
import Testimonials from '@/components/sections/testimonials';
import Blog from '@/components/sections/blog';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Skills />
        <Projects />
        <Certifications />
        <Testimonials />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
