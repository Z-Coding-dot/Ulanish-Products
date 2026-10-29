import { useState } from 'react';
import {
  Database,
  Headphones,
  LampDesk,
  NotebookPen,
  ShoppingBag,
  Speaker,
  LayoutDashboard,
  Milk,
  PanelsTopLeft,
  WalletCards,
  Lightbulb,
  Calculator,
  BedDouble,
  FolderOpen,
  Luggage,
  BatteryCharging,
  Boxes,
  Utensils,
  PenTool,
  KeyRound,
  Keyboard,
  CalendarDays,
  ShoppingBasket,
  NotebookTabs,
  PackageOpen,
  type LucideIcon,
} from 'lucide-react';
import type { Product } from '@/api/types';
import { cn } from '@/utils/cn';

// Representative sample icons, shared by cards, galleries, and search thumbnails.
const sampleIcons: Record<number, LucideIcon> = {
  115: Database,
  116: Headphones,
  117: LampDesk,
  118: NotebookPen,
  119: ShoppingBag,
  120: Speaker,
  121: LayoutDashboard,
  122: Milk,
  123: PanelsTopLeft,
  124: WalletCards,
  125: Lightbulb,
  126: Calculator,
  127: BedDouble,
  128: FolderOpen,
  129: Luggage,
  130: BatteryCharging,
  131: Boxes,
  132: Utensils,
  133: PenTool,
  134: KeyRound,
  135: Keyboard,
  136: CalendarDays,
  137: ShoppingBasket,
  138: NotebookTabs,
};
const tones: Record<string, 'pink' | 'cyan' | 'orange'> = {
  digital: 'pink',
  electronics: 'cyan',
  home: 'orange',
  office: 'cyan',
};
export const productTone = (categoryId: string) => tones[categoryId] ?? 'pink';
export const isPlaceholderImage = (src?: string) =>
  !src || /\/images\/(product|category-portrait|category-square)\.svg$/.test(src.split(/[?#]/)[0]);

export function ProductArtwork({
  product,
  src = product.images[0],
  alt = '',
  compact = false,
  className,
  width = 800,
  height = 1000,
  loading = 'lazy',
  sizes,
}: {
  product: Product;
  src?: string;
  alt?: string;
  compact?: boolean;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}) {
  const [failedSource, setFailedSource] = useState<string>();
  if (src && !isPlaceholderImage(src) && failedSource !== src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        sizes={sizes}
        className={className}
        onError={() => setFailedSource(src)}
      />
    );
  }
  const Icon = sampleIcons[product.id] ?? PackageOpen;
  return (
    <div
      className={cn('product-example', compact && 'product-example--compact', className)}
      data-tone={productTone(product.categoryId)}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      {compact ? (
        <Icon strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <>
          <span className="product-example-ring" />
          <span className="product-example-object">
            <Icon strokeWidth={1.25} aria-hidden="true" />
          </span>
          <span className="product-example-base" />
        </>
      )}
    </div>
  );
}
