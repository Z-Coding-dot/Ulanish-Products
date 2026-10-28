import { useTranslation } from 'react-i18next';
import { Listbox } from './Select';
export function SortSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <Listbox
      compact
      label={t('products.sort')}
      value={value}
      onChange={onChange}
      options={[
        { value: 'newest', label: t('products.newest') },
        { value: 'price-asc', label: t('products.priceAsc') },
        { value: 'price-desc', label: t('products.priceDesc') },
      ]}
    />
  );
}
