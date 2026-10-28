import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export function Breadcrumbs({
  title,
  parent,
}: {
  title: string;
  parent?: { label: string; to: string };
}) {
  const { t } = useTranslation();
  return (
    <nav className="breadcrumbs" aria-label={title}>
      <Link className="inline-flex min-h-11 items-center" to="/">
        {t('nav.home')}
      </Link>
      <ChevronRight size={14} className="rtl-icon" aria-hidden="true" />
      {parent && (
        <>
          <Link className="inline-flex min-h-11 items-center" to={parent.to}>
            {parent.label}
          </Link>
          <ChevronRight size={14} className="rtl-icon" aria-hidden="true" />
        </>
      )}
      <span aria-current="page">{title}</span>
    </nav>
  );
}
