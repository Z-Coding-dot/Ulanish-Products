import { useMatch } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useProduct } from '@/hooks/useCatalog';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useLanguage } from '@/context/LanguageContext';
import { whatsappLink } from '@/utils/whatsapp';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
export function WhatsAppFab() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const match = useMatch('/products/:id');
  const product = useProduct(Number(match?.params.id ?? 0));
  const position = useScrollPosition();
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="floating-actions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.2 }}
    >
      {position > 400 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="fab"
          aria-label={t('common.top')}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduced ? ('instant' as ScrollBehavior) : 'smooth',
            })
          }
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
      <a
        className="fab fab-whatsapp group relative"
        aria-label={t('common.chat')}
        href={whatsappLink(
          language,
          product.data ?? undefined,
          window.location.origin + window.location.pathname,
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon width={26} height={26} />
        <span className="fab-label">{t('common.chat')}</span>
      </a>
    </motion.div>
  );
}
