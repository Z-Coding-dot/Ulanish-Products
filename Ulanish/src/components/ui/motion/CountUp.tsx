import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { formatNumber } from '@/utils/formatNumber';
import { useLanguage } from '@/context/LanguageContext';
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [number, set] = useState(value);
  const { language } = useLanguage();
  useEffect(() => {
    if (!inView || reduced) return;
    const control = animate(0, value, { duration: 0.5, onUpdate: (n) => set(Math.round(n)) });
    return () => control.stop();
  }, [value, inView, reduced]);
  return <span ref={ref}>{formatNumber(number, language)}</span>;
}
