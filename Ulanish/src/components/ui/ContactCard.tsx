import type { ReactNode } from 'react';
import { Reveal } from './motion/Reveal';
export function ContactCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="contact-card">
      {icon}
      <div>
        <h3>{title}</h3>
        {children}
      </div>
    </Reveal>
  );
}
