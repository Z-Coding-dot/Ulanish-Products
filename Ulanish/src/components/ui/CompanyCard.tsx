import { Link } from 'react-router-dom';
import type { Company } from '@/api/types';
import { useLanguage } from '@/context/LanguageContext';
export function CompanyCard({ company }: { company: Company }) {
  const { l } = useLanguage();
  return (
    <Link to={`/products?company=${company.id}`} className="company-chip">
      <span className="company-monogram" aria-hidden="true">
        {l(company.name).slice(0, 1)}
      </span>
      <span>{l(company.name)}</span>
    </Link>
  );
}
