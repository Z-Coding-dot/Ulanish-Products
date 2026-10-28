import type { ReactNode } from 'react';
import { Reveal } from './motion/Reveal';
export function SectionHeading({
  title,
  eyebrow,
  description,
  action,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p className="mt-4 text-muted">{description}</p>}
      </div>
      {action}
    </Reveal>
  );
}
