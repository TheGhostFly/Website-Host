import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';
import TerminalCard from '@/components/TerminalCard';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 12, suffix: '+', label: 'Articles Written' },
  { value: 3, suffix: '', label: 'Brands Managed' },
  { value: 1, suffix: '', label: 'Year Learning AI' },
];

function AnimatedCounter({
  value,
  suffix,
  started,
}: {
  value: number;
  suffix: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(Math.round(obj.val));
      },
    });
  }, [started, value]);

  return (
    <span className="font-dm font-bold text-3xl md:text-4xl text-gold tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [terminalStarted, setTerminalStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Stats entrance
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => setCountersStarted(true),
      });

      // Terminal card entrance
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          setTimeout(() => setTerminalStarted(true), 500);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <div className="container-main">
        {/* Section label */}
        <ScrollReveal>
          <span className="font-dm text-xs font-medium uppercase tracking-[0.08em] text-gold mb-12 block">
            ABOUT
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div>
            <ScrollReveal delay={0.1}>
              <h2 className="font-dm font-medium text-2xl md:text-[2.5rem] leading-tight md:leading-[1.2] tracking-[-0.02em] text-white-primary max-w-[480px] mb-6">
                Writer by craft. Editor by discipline. AI explorer by curiosity.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-serif text-base leading-relaxed text-white-primary/85 max-w-[440px] mb-12">
                I started with words — blogs that made people feel seen, scripts
                that held attention, social copy that sparked action. Now I
                manage editorial pipelines, coordinate content teams, and obsess
                over how AI can amplify (not replace) human creativity.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-8 md:gap-12">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    started={countersStarted}
                  />
                  <span className="font-dm text-xs font-medium uppercase tracking-[0.06em] text-white-primary/50">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Terminal Card */}
          <ScrollReveal direction="left" delay={0.3} distance={40}>
            <TerminalCard startTyping={terminalStarted} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
