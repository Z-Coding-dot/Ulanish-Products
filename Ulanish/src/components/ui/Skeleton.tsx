import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/cn';
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('skeleton', className)} />;
}
export function ProductSkeletons({ count = 8 }: { count?: number }) {
  const { t } = useTranslation();
  return (
    <div className="product-grid" role="status" aria-label={t('common.loading')}>
      <span className="sr-only">{t('common.loading')}</span>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <Skeleton className="skeleton-image" />
          <Skeleton className="mt-4 h-5 w-3/4" />
          <Skeleton className="mt-3 h-4 w-1/2" />
          <Skeleton className="mt-4 h-11" />
        </div>
      ))}
    </div>
  );
}
