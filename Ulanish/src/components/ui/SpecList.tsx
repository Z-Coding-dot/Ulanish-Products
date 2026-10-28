import { useTranslation } from 'react-i18next';
import type { Product } from '@/api/types';
import { useLanguage } from '@/context/LanguageContext';
export function SpecList({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { l } = useLanguage();
  return (
    <dl className="spec-list" aria-label={t('common.specs')}>
      <div className="spec-row">
        <dt>{t('common.code')}</dt>
        <dd>
          <bdi>{product.code}</bdi>
        </dd>
      </div>
      {product.specs.map((s, i) => (
        <div className="spec-row" key={i}>
          <dt>{l(s.label)}</dt>
          <dd>{l(s.value)}</dd>
        </div>
      ))}
    </dl>
  );
}
