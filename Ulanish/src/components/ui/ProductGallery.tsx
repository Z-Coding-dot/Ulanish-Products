import { useState, useRef } from 'react';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/api/types';
import { useLanguage } from '@/context/LanguageContext';
import { Modal } from './Modal';
import { formatNumber } from '@/utils/formatNumber';
export function ProductGallery({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { l, language, dir } = useLanguage();
  const [index, set] = useState(0);
  const [zoom, setZoom] = useState(false);
  const start = useRef(0);
  const images = product.images.length ? product.images : ['/images/product.svg'];
  const next = (step: number) => set((i) => (i + step + images.length) % images.length);
  return (
    <div>
      <div
        className="gallery-main"
        onTouchStart={(e) => {
          start.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const diff = e.changedTouches[0].clientX - start.current;
          if (Math.abs(diff) > 40) next((diff < 0 ? 1 : -1) * (dir === 'rtl' ? -1 : 1));
        }}
      >
        <button
          className="h-full w-full"
          aria-label={t('common.zoom')}
          onClick={() => setZoom(true)}
        >
          <img
            src={images[index]}
            alt={l(product.name)}
            width={800}
            height={1000}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/product.svg';
            }}
          />
        </button>
        <button
          className="icon-btn absolute bottom-4 end-4 bg-white"
          onClick={() => setZoom(true)}
          aria-label={t('common.zoom')}
        >
          <ZoomIn size={20} />
        </button>
      </div>
      <div className="gallery-thumbs">
        {images.map((src, i) => (
          <button
            key={src + i}
            aria-pressed={index === i}
            aria-label={t('common.image', { number: formatNumber(i + 1, language) })}
            onClick={() => set(i)}
          >
            <img src={src} alt="" width={80} height={100} loading="lazy" />
          </button>
        ))}
      </div>
      <Modal open={zoom} onClose={() => setZoom(false)} title={l(product.name)}>
        <img
          className="lightbox-image"
          src={images[index]}
          alt={l(product.name)}
          width={800}
          height={1000}
        />
        <div className="mt-5 flex justify-center gap-3">
          <button className="icon-btn" aria-label={t('common.previous')} onClick={() => next(-1)}>
            <ChevronLeft className="rtl-icon" />
          </button>
          <button className="icon-btn" aria-label={t('common.next')} onClick={() => next(1)}>
            <ChevronRight className="rtl-icon" />
          </button>
        </div>
      </Modal>
    </div>
  );
}
