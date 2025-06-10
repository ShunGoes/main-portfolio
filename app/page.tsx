import Hero from '@/components/hero';
import About from '@/components/about';
import Contact from '@/components/contact';
import Skills from '@/components/skills';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Skills />
      <Contact />
    </div>
  );
}