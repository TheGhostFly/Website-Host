import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import WebGPUSphere from '@/components/WebGPUSphere';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const preTitleRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [fontsReady, setFontsReady] = useState(false);

  // Wait for fonts
  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsReady(true);
    });
  }, []);

  // Hero entrance animation timeline
  useEffect(() => {
    if (!fontsReady) return;

    const tl = gsap.timeline();

    // 1. Pre-title fade in at 200ms
    tl.fromTo(
      preTitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.2
    );

    // 2. Name fade in at 600ms
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.6
    );

    // 4. Bio at 2200ms
    tl.fromTo(
      bioRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      2.2
    );

    // 5. CTAs at 2600ms
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      2.6
    );

    // 6. Scroll indicator at 3000ms
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 0.3, duration: 0.5, ease: 'power2.out' },
      3.0
    );
  }, [fontsReady]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* WebGPU Sphere Background */}
      <WebGPUSphere />

      {/* Content */}
      <div className="relative z-[1] container-main w-full">
        <div className="flex flex-col items-center md:items-end md:text-right pt-24 md:pt-0">
          {/* Pre-title */}
          <span
            ref={preTitleRef}
            className="font-dm text-sm font-medium uppercase tracking-[0.12em] text-white-primary/40 mb-3 opacity-0"
          >
            HEY, I'M
          </span>

          {/* Name */}
          <h1
            ref={nameRef}
            className="font-dm font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[4.5rem] tracking-[-0.03em] text-white-primary mb-4 opacity-0"
          >
            KOSH
          </h1>

          {/* Typewriter subtitle */}
          <div className="font-mono text-base md:text-lg text-gold mb-6 min-h-[1.5em]">
            {fontsReady ? (
              <TypewriterText
                text="Content Writer. Editor. AI Explorer."
                speed={80}
                delay={1000}
              />
            ) : (
              '\u00A0'
            )}
          </div>

          {/* Bio */}
          <p
            ref={bioRef}
            className="font-serif text-base md:text-lg leading-relaxed text-white-primary/85 max-w-[380px] mb-8 opacity-0"
          >
            I craft words that connect, manage content that scales, and build
            with AI before it's mainstream.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 opacity-0"
          >
            <a
              href="#work"
              onClick={(e) => handleNavClick(e, '#work')}
              className="font-dm text-[13px] font-medium uppercase tracking-[0.06em] bg-gold text-near-black px-8 py-3 rounded transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] text-center"
            >
              See My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="font-dm text-[13px] font-medium uppercase tracking-[0.06em] border border-gold text-gold px-8 py-3 rounded transition-all duration-300 hover:bg-gold/10 text-center"
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-dm text-[10px] font-medium uppercase tracking-[0.1em] text-white-primary/30">
          scroll
        </span>
        <div className="w-[1px] h-6 bg-white-primary/30 animate-bounce-arrow" />
      </div>
    </section>
  );
}

// Inline Typewriter component that handles its own timing
function TypewriterText({
  text,
  speed,
  delay,
}: {
  text: string;
  speed: number;
  delay: number;
}) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          index++;
          setDisplayed(text.slice(0, index));
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return (
    <>
      {displayed}
      <span className="animate-caret-blink">|</span>
    </>
  );
}
