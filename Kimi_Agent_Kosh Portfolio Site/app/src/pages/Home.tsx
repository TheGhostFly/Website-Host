import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Work from '@/sections/Work';
import Skills from '@/sections/Skills';
import Tools from '@/sections/Tools';
import Blog from '@/sections/Blog';
import Services from '@/sections/Services';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Re-initialize Lenis for home page
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after page mount
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Tools />
        <Blog />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
