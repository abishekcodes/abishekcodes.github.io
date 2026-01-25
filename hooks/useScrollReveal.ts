import { useEffect, useRef, useState, RefObject } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

const useScrollReveal = (options: ScrollRevealOptions = {}): [RefObject<HTMLDivElement | null>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
};

export default useScrollReveal;
