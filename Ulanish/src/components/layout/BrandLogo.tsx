import { cn } from '@/utils/cn';

export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      className={cn('brand-logo', className)}
      src="/brand-mark.svg"
      alt=""
      aria-hidden="true"
      width={240}
      height={240}
    />
  );
}
