import { PackageSearch } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from './motion/Reveal';
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className="empty-state">
      <PackageSearch size={36} className="text-primary" aria-hidden="true" />
      <h2 className="text-2xl">{title}</h2>
      {description && <p className="text-muted">{description}</p>}
      {action}
    </Reveal>
  );
}
