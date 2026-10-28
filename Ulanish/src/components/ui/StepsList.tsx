import { useTranslation } from 'react-i18next';
import { formatNumber } from '@/utils/formatNumber';
import { useLanguage } from '@/context/LanguageContext';
import { Stagger } from './motion/Stagger';
export function StepsList() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  return (
    <Stagger className="steps">
      {[1, 2, 3].map((n) => (
        <div className="step" key={n}>
          <span className="step-number">{formatNumber(n, language).padStart(2, '0')}</span>
          <h3>{t(`home.step${n}`)}</h3>
          <p>{t(`home.step${n}text`)}</p>
        </div>
      ))}
    </Stagger>
  );
}
