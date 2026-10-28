import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { removeToast, type ToastMessage } from '@/redux/uiSlice';
function ToastItem({ toast }: { toast: ToastMessage }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (toast.persistent) return;
    const timer = setTimeout(() => dispatch(removeToast(toast.id)), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.persistent, dispatch]);
  return (
    <div className="toast-item">
      <span>{t(toast.key)}</span>
      {toast.action === 'update' && (
        <button
          className="text-link"
          onClick={() => window.dispatchEvent(new Event('ulanish-update'))}
        >
          {t('pwa.refresh')}
        </button>
      )}
      <button
        className="icon-btn"
        aria-label={t('common.close')}
        onClick={() => dispatch(removeToast(toast.id))}
      >
        <X size={16} />
      </button>
    </div>
  );
}
export function Toast() {
  const toasts = useAppSelector((s) => s.ui.toasts);
  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
