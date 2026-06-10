import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  start?: boolean;
}

export function useTypewriter({
  text,
  speed = 80,
  delay = 0,
  onComplete,
  start = true,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTyping = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (indexRef.current < text.length) {
          indexRef.current++;
          setDisplayedText(text.slice(0, indexRef.current));
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);
    }, delay);
  }, [text, speed, delay, onComplete, hasStarted]);

  useEffect(() => {
    if (start) {
      startTyping();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [start, startTyping]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);
    setHasStarted(false);
  }, []);

  return { displayedText, isComplete, hasStarted, startTyping, reset };
}
