import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  direction?: 'up' | 'left' | 'right' | 'down';
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  childSelector?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    direction = 'up',
    distance = 40,
    duration = 0.7,
    delay = 0,
    stagger = 0,
    ease = 'power2.out',
    start = 'top 80%',
    childSelector,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = childSelector ? el.querySelectorAll(childSelector) : el;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease,
      stagger: stagger || undefined,
      scrollTrigger: {
        trigger: el,
        start,
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
      gsap.from(targets, fromVars);
    });

    return () => ctx.revert();
  }, [direction, distance, duration, delay, stagger, ease, start, childSelector]);

  return ref;
}
