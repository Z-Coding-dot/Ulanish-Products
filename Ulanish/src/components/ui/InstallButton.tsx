import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { Modal } from './Modal';
export function InstallButton() {
  const { t } = useTranslation();
  const { visible, sheet, close, install } = useInstallPrompt();
  return (
    <>
      {visible && (
        <button
          className="btn btn-white mt-5"
          onClick={() => {
            void install();
          }}
        >
          <Download size={18} aria-hidden="true" />
          {t('pwa.install')}
        </button>
      )}
      <Modal open={sheet} onClose={close} title={t('pwa.iosTitle')}>
        <p>{t('pwa.iosText')}</p>
      </Modal>
    </>
  );
}
