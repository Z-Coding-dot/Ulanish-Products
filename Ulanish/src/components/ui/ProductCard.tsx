import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/api/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCatalogMetadata } from '@/context/CatalogContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PriceTag } from './PriceTag';
import { ProductArtwork, isPlaceholderImage, productTone } from './ProductArtwork';
export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { l } = useLanguage();
  const { companies } = useCatalogMetadata();
  const reduced = useReducedMotion();
  const pointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const image = useRef<HTMLDivElement>(null);
  const company = companies.find((c) => c.id === product.companyId);
  const name = l(product.name);
  const primaryImage = product.images[0] ?? '/images/product.svg';
  const tone = productTone(product.categoryId);
  return (
    <motion.article
      className="product-card"
      data-tone={tone}
      whileHover={!reduced && pointer ? { y: -7 } : undefined}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      onPointerMove={(e) => {
        if (!image.current || !pointer || reduced) return;
        const box = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - box.left) / box.width - 0.5) * 6;
        const y = ((e.clientY - box.top) / box.height - 0.5) * -6;
        image.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
      }}
      onPointerLeave={() => {
        if (image.current) image.current.style.transform = 'none';
      }}
    >
      <Link className="product-link" to={`/products/${product.id}`} aria-label={name}>
        <div className="product-media">
          <div ref={image} className="product-visual">
            <ProductArtwork product={product} src={primaryImage} />
            {!isPlaceholderImage(primaryImage) && !isPlaceholderImage(product.images[1]) && (
              <img
                className="product-second"
                src={product.images[1]}
                alt=""
                width={750}
                height={1000}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
          <div className="product-price">
            <PriceTag price={product.price} />
          </div>
        </div>
        <div className="product-info">
          <div className="product-heading">
            <p className="product-company">{company ? l(company.name) : t('common.company')}</p>
            <h3 className="product-name">{name}</h3>
            <p className="product-code">
              {t('common.code')} <bdi>{product.code}</bdi>
            </p>
          </div>
          {product.specs.length > 0 && (
            <dl className="product-card-specs">
              {product.specs.slice(0, 2).map((spec, index) => (
                <div key={index}>
                  <dt>{l(spec.label)}</dt>
                  <dd>{l(spec.value)}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Link>
      <div className="product-actions">
        <Link className="text-link details" to={`/products/${product.id}`}>
          {t('common.details')}
          <ArrowUpRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}
