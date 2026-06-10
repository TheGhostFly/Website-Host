import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOOLS = [
  'ChatGPT',
  'Claude',
  'Notion',
  'Canva',
  'Figma',
  'Google Docs',
  'Trello',
  'DaVinci Resolve',
  'CapCut',
  'Perplexity',
];

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const badges = badgesRef.current;
    if (!el || !badges) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const items = badges.querySelectorAll('.tool-badge');
          gsap.from(items, {
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            ease: 'power2.out',
            stagger: {
              each: 0.06,
              from: 'center',
            },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tools" ref={sectionRef} className="section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="font-dm font-medium text-2xl md:text-[2.5rem] leading-tight md:leading-[1.2] tracking-[-0.02em] text-white-primary mb-4">
            MY TOOLKIT
          </h2>
          <p className="font-serif italic text-base text-white-primary/50">
            The stack that powers my work
          </p>
        </div>

        {/* Tool Badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap justify-center gap-3 max-w-[800px] mx-auto mb-12"
        >
          {TOOLS.map((tool) => (
            <span
              key={tool}
              className="tool-badge font-dm text-sm font-medium text-gold bg-gold/[0.08] border border-gold/15 px-5 py-2.5 rounded-md transition-all duration-250 hover:bg-gold/[0.15] hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] hover:-translate-y-0.5"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Quote */}
        <p className="font-serif italic text-base md:text-lg text-white-primary/50 text-center max-w-[480px] mx-auto">
          Tools don't make the creator. But the right ones make the work
          unstoppable.
        </p>
      </div>
    </section>
  );
}
