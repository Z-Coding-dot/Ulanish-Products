import { useTranslation } from 'react-i18next';
import { formatNumber } from '@/utils/formatNumber';
import { useLanguage } from '@/context/LanguageContext';
import { Stagger } from './motion/Stagger';
import { PackageSearch, MessagesSquare, PackageCheck } from 'lucide-react';
export function StepsList() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  return (
    <Stagger className="steps">
      {[PackageSearch, MessagesSquare, PackageCheck].map((Icon, index) => (
        <div className="step" key={index}>
          <div className="step-heading">
            <span className="step-number">
              {formatNumber(index + 1, language).padStart(2, '0')}
            </span>
            <Icon size={36} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
          </div>
          <h3>{t(`home.step${index + 1}`)}</h3>
          <p>{t(`home.step${index + 1}text`)}</p>
        </div>
      ))}
    </Stagger>
  );
}
