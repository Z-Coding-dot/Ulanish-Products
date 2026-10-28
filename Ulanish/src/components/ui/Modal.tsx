import { useEffect, useRef, useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/cn';
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  drawer?: boolean;
}
export function Modal({ open, onClose, title, children, drawer = false }: ModalProps) {
  const { t } = useTranslation();
  const panel = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const root = document.getElementById('root');
    const oldInert = root?.inert ?? false;
    document.body.style.overflow = 'hidden';
    if (root) root.inert = true;
    panel.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
      }
      if (e.key === 'Tab') {
        const nodes = panel.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled),a[href],input,textarea,[tabindex="0"]',
        );
        if (!nodes?.length) {
          e.preventDefault();
          return;
        }
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first || document.activeElement === panel.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('keydown', key);
      document.body.style.overflow = overflow;
      if (root) root.inert = oldInert;
      previous?.focus();
    };
  }, [open]);
  if (!open) return null;
  return createPortal(
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        tabIndex={-1}
        className={cn('modal-panel', drawer && 'drawer-panel')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 id={id} className="modal-title">
          {title}
        </h2>
        <button className="icon-btn modal-close" aria-label={t('common.close')} onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
