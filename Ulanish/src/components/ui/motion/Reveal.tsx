import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useDirection } from '@/hooks/useDirection';
export type RevealMode = 'fadeUp' | 'fadeIn' | 'slideStart' | 'slideEnd' | 'scale';
export function Reveal({
  children,
  className,
  mode = 'fadeUp',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  mode?: RevealMode;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const dir = useDirection();
  const x =
    mode === 'slideStart'
      ? dir === 'rtl'
        ? 24
        : -24
      : mode === 'slideEnd'
        ? dir === 'rtl'
          ? -24
          : 24
        : 0;
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: reduced ? 0 : x,
        y: !reduced && mode === 'fadeUp' ? 24 : 0,
        scale: !reduced && mode === 'scale' ? 0.98 : 1,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduced ? 0.15 : 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
