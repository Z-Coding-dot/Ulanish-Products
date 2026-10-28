import { Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Listbox } from '@/components/ui/Select';
import type { Language } from '@/api/types';
export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  return (
    <Listbox
      label={t('common.language')}
      compact
      mobileSheet
      value={language}
      onChange={(v) => setLanguage(v as Language)}
      icon={<Globe2 size={18} aria-hidden="true" />}
      options={[
        { value: 'en', label: 'English', code: 'EN' },
        { value: 'fa-AF', label: 'دری', code: 'FA' },
        { value: 'ps', label: 'پښتو', code: 'PS' },
      ]}
    />
  );
}
