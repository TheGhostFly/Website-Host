import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Home from '@/pages/Home';
import BlogShowcase from '@/pages/BlogShowcase';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useEffect(() => {
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

    // Page load fade-in
    document.fonts.ready.then(() => {
      document.body.classList.add('loaded');
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger after route change
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [location.pathname]);

  const isBlogPage = location.pathname === '/blogs';

  return (
    <div className="relative">
      <CustomCursor />
      {!isBlogPage && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogShowcase />} />
      </Routes>
    </div>
  );
}
