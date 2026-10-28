import { formatPrice } from '@/utils/formatPrice';
import { useLanguage } from '@/context/LanguageContext';
export function PriceTag({ price }: { price: number }) {
  const { language } = useLanguage();
  return (
    <span className="price-tag">
      <bdi>{formatPrice(price, language)}</bdi>
    </span>
  );
}
