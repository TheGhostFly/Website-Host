import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'down';
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  distance = 40,
  duration = 0.7,
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    };

    switch (direction) {
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
      case 'left':
        fromVars.x = distance;
        break;
      case 'right':
        fromVars.x = -distance;
        break;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, fromVars);
    });

    return () => ctx.revert();
  }, [direction, distance, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
