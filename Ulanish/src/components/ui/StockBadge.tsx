import { useTranslation } from 'react-i18next';
import { Badge } from './Badge';
export function StockBadge({ stock }: { stock: 'in' | 'out' }) {
  const { t } = useTranslation();
  return (
    <Badge className={stock === 'in' ? 'stock-in' : 'stock-out'}>
      <span className="stock-dot" aria-hidden="true" />
      {t(stock === 'in' ? 'common.inStock' : 'common.outStock')}
    </Badge>
  );
}
