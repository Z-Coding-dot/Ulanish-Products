import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowUpRight,
  LaptopMinimal,
  Headphones,
  Armchair,
  BriefcaseBusiness,
  ShoppingBag,
  Shapes,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '@/api/types';
import { useLanguage } from '@/context/LanguageContext';
import { isPlaceholderImage } from './ProductArtwork';
const categoryIcons: Record<string, LucideIcon> = {
  digital: LaptopMinimal,
  electronics: Headphones,
  home: Armchair,
  office: BriefcaseBusiness,
  accessories: ShoppingBag,
};
export function CategoryCard({ category }: { category: Category }) {
  const { l } = useLanguage();
  const [failedSource, setFailedSource] = useState<string>();
  const photo = !isPlaceholderImage(category.image) && failedSource !== category.image;
  const Icon = categoryIcons[category.id] ?? Shapes;
  return (
    <Link to={`/products?category=${category.id}`} className="category-tile">
      {photo && (
        <img
          src={category.image}
          alt=""
          width={800}
          height={800}
          loading="lazy"
          sizes="(min-width:1024px) 50vw, 50vw"
          srcSet={`${category.image} 800w`}
          onError={() => setFailedSource(category.image)}
        />
      )}
      <span
        className={photo ? 'category-symbol' : 'category-symbol category-symbol-large'}
        aria-hidden="true"
      >
        <Icon strokeWidth={1.5} />
      </span>
      <div className="flex items-center justify-between gap-3">
        <h3>{l(category.name)}</h3>
        <ArrowUpRight className="rtl:-scale-x-100" size={22} aria-hidden="true" />
      </div>
    </Link>
  );
}
