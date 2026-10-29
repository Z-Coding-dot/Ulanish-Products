import { useState, useRef } from 'react';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/api/types';
import { useLanguage } from '@/context/LanguageContext';
import { Modal } from './Modal';
import { formatNumber } from '@/utils/formatNumber';
import { ProductArtwork, isPlaceholderImage } from './ProductArtwork';
export function ProductGallery({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { l, language, dir } = useLanguage();
  const [index, set] = useState(0);
  const [zoom, setZoom] = useState(false);
  const start = useRef(0);
  const images = product.images.filter((src) => !isPlaceholderImage(src));
  const current = images[Math.min(index, images.length - 1)];
  if (!images.length) {
    return (
      <div className="gallery-main gallery-placeholder">
        <ProductArtwork product={product} alt={l(product.name)} />
        <p className="gallery-example-caption">{t('images.exampleProduct')}</p>
      </div>
    );
  }
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
          <ProductArtwork
            product={product}
            src={current}
            alt={l(product.name)}
            width={800}
            height={1000}
            loading="eager"
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
            <ProductArtwork product={product} src={src} compact width={80} height={100} />
          </button>
        ))}
      </div>
      <Modal open={zoom} onClose={() => setZoom(false)} title={l(product.name)}>
        <div className="gallery-lightbox">
          <ProductArtwork
            product={product}
            className="lightbox-image"
            src={current}
            alt={l(product.name)}
            width={800}
            height={1000}
          />
        </div>
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
