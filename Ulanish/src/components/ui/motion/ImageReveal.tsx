import { motion, useReducedMotion } from 'framer-motion';
import type { ImgHTMLAttributes } from 'react';
export function ImageReveal(props: ImgHTMLAttributes<HTMLImageElement>) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="overflow-hidden rounded-xl"
      initial={{ opacity: 0, scale: reduced ? 1 : 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <img {...props} />
    </motion.div>
  );
}
