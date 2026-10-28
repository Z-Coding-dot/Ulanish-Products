import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/api/types';
import { useLanguage } from '@/context/LanguageContext';
export function CategoryCard({ category }: { category: Category }) {
  const { l } = useLanguage();
  return (
    <Link to={`/products?category=${category.id}`} className="category-tile">
      <img
        src={category.image}
        alt=""
        width={800}
        height={800}
        loading="lazy"
        sizes="(min-width:1024px) 50vw, 50vw"
        srcSet={`${category.image} 800w`}
      />
      <div className="flex items-center justify-between gap-3">
        <h3>{l(category.name)}</h3>
        <ArrowUpRight className="rtl:-scale-x-100" size={22} aria-hidden="true" />
      </div>
    </Link>
  );
}
