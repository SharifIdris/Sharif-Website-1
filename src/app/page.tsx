
import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Skills from '@/components/sections/skills';
import Projects from '@/components/sections/projects';
import Certifications from '@/components/sections/certifications';
import Testimonials from '@/components/sections/testimonials';
import Blog from '@/components/sections/blog';
import { getBlogPosts, getCertifications, getProjectCategories, getSkillCategories, getHeroData, getTestimonials } from '@/lib/contentful/client';
import Footer from '@/components/layout/footer';

export default async function Home() {
  const [
    heroData,
    skillCategories,
    projectCategories,
    certifications,
    blogPosts,
    testimonials
  ] = await Promise.all([
    getHeroData(),
    getSkillCategories(),
    getProjectCategories(),
    getCertifications(),
    getBlogPosts(),
    getTestimonials()
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero heroData={heroData} />
        <Services />
        <Skills skillCategories={skillCategories} />
        <Projects projectCategories={projectCategories} />
        <Certifications certifications={certifications} />
        <Testimonials testimonials={testimonials} />
        <Blog blogPosts={blogPosts} />
      </main>
      <Footer />
    </div>
  );
}
