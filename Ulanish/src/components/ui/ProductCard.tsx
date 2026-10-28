import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/api/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCatalogMetadata } from '@/context/CatalogContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { siteConfig } from '@/data/siteConfig';
import { whatsappLink } from '@/utils/whatsapp';
import { StockBadge } from './StockBadge';
import { PriceTag } from './PriceTag';
import { WhatsAppIcon } from './WhatsAppIcon';
export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { l, language } = useLanguage();
  const { companies } = useCatalogMetadata();
  const reduced = useReducedMotion();
  const pointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const image = useRef<HTMLDivElement>(null);
  const company = companies.find((c) => c.id === product.companyId);
  const name = l(product.name);
  const url = new URL(`/products/${product.id}`, window.location.origin).href;
  return (
    <motion.article
      className="product-card"
      whileHover={!reduced && pointer ? { y: -4 } : undefined}
      transition={{ duration: 0.3 }}
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
      <Link to={`/products/${product.id}`} aria-label={name}>
        <div
          ref={image}
          className="product-media"
          style={{
            filter: product.stock === 'out' ? 'saturate(.5)' : undefined,
            transition: 'transform .25s',
          }}
        >
          <img
            src={product.images[0] ?? '/images/product.svg'}
            srcSet={`${product.images[0] ?? '/images/product.svg'} 800w`}
            sizes="(min-width:1280px) 280px, (min-width:768px) 30vw, 47vw"
            alt=""
            width={800}
            height={1000}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/product.svg';
            }}
          />
          {product.images[1] && (
            <img
              className="product-second"
              src={product.images[1]}
              alt=""
              width={750}
              height={1000}
              loading="lazy"
            />
          )}
          <div className="product-badges">
            <span className="badge bg-white text-ink">
              {company ? l(company.name) : t('common.company')}
            </span>
            <StockBadge stock={product.stock} />
          </div>
          <div className="product-price">
            <PriceTag price={product.price} />
          </div>
        </div>
        <h3 className="product-name">{name}</h3>
        <p className="product-code">
          {t('common.code')} <bdi>{product.code}</bdi>
        </p>
      </Link>
      <div className="product-actions">
        <a
          className="icon-btn bg-whatsapp text-white hover:!bg-green-900"
          href={whatsappLink(language, product, url)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(product.stock === 'in' ? 'common.whatsapp' : 'common.availability')}
        >
          <WhatsAppIcon />
        </a>
        <a className="icon-btn text-primary" href={siteConfig.tel} aria-label={t('common.call')}>
          <Phone size={18} aria-hidden="true" />
        </a>
        <Link className="text-link details" to={`/products/${product.id}`}>
          {t('common.details')}
          <ArrowUpRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}
