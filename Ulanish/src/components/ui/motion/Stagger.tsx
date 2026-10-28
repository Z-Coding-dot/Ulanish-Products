import { Children, type ReactNode } from 'react';
import { Reveal } from './Reveal';
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <Reveal delay={Math.min(i % 4, 3) * 0.06}>{child}</Reveal>
      ))}
    </div>
  );
}
