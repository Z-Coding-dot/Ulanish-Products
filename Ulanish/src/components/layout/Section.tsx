import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Container } from './Container';
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('section-space', className)}>
      <Container>{children}</Container>
    </section>
  );
}
