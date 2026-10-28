import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '@/utils/formatNumber';
import { useLanguage } from '@/context/LanguageContext';
export function Pagination({
  page,
  total,
  pageSize = 12,
  onChange,
}: {
  page: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
}) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;
  return (
    <nav className="pagination" aria-label={t('common.pagination')}>
      <button
        className="icon-btn"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label={t('common.previous')}
      >
        <ChevronLeft className="rtl-icon" size={20} />
      </button>
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          className="icon-btn"
          aria-label={t('common.page', { number: formatNumber(i + 1, language) })}
          aria-current={page === i + 1 ? 'page' : undefined}
          onClick={() => onChange(i + 1)}
        >
          {formatNumber(i + 1, language)}
        </button>
      ))}
      <button
        className="icon-btn"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        aria-label={t('common.next')}
      >
        <ChevronRight className="rtl-icon" size={20} />
      </button>
    </nav>
  );
}
