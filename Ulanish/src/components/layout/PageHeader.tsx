import { Reveal } from '@/components/ui/motion/Reveal';
import { Breadcrumbs } from './Breadcrumbs';
export function PageHeader({ title }: { title: string }) {
  return (
    <section className="page-header">
      <Reveal>
        <h1>{title}</h1>
        <Breadcrumbs title={title} />
      </Reveal>
    </section>
  );
}
