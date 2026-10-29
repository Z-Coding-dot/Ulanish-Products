import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const HIGHLIGHT_SIZE = 480;

export function SiteBackground() {
  const highlight = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const highContrast = useMediaQuery('(prefers-contrast: more)');

  useEffect(() => {
    const node = highlight.current;
    if (!node || reducedMotion || highContrast) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      x = event.clientX - HIGHLIGHT_SIZE / 2;
      y = event.clientY - HIGHLIGHT_SIZE / 2;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        // Keep the highlighted lines aligned with the stationary background grid.
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        node.style.backgroundPosition = `${-x}px ${-y}px`;
        node.dataset.active = 'true';
        frame = 0;
      });
    };
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      node.dataset.active = 'false';
    };
    const release = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') hide();
    };

    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerdown', move, { passive: true });
    document.addEventListener('pointerup', release, { passive: true });
    document.addEventListener('pointercancel', hide);
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      hide();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerdown', move);
      document.removeEventListener('pointerup', release);
      document.removeEventListener('pointercancel', hide);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, [reducedMotion, highContrast]);

  return (
    <div className="site-background" aria-hidden="true">
      <div
        ref={highlight}
        className="site-background-highlight"
        style={{ width: HIGHLIGHT_SIZE, height: HIGHLIGHT_SIZE }}
      />
    </div>
  );
}
