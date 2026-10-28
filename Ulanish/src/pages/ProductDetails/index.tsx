import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProduct, useProducts } from '@/hooks/useCatalog';
import { useLanguage } from '@/context/LanguageContext';
import { useCatalogMetadata } from '@/context/CatalogContext';
import { siteConfig } from '@/data/siteConfig';
import { whatsappLink } from '@/utils/whatsapp';
import { useAppDispatch } from '@/redux/store';
import { addToast } from '@/redux/uiSlice';
import { SEO } from '@/components/layout/SEO';
import { Section } from '@/components/layout/Section';
import { ProductGallery } from '@/components/ui/ProductGallery';
import { SpecList } from '@/components/ui/SpecList';
import { StockBadge } from '@/components/ui/StockBadge';
import { PriceTag } from '@/components/ui/PriceTag';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { ProductSkeletons } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button, ButtonLink, ActionLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/motion/Reveal';
export default function ProductDetails() {
  const { id } = useParams();
  const request = useProduct(Number(id));
  const product = request.data;
  const related = useProducts({ company: product?.companyId, pageSize: 8 });
  const { companies } = useCatalogMetadata();
  const { t } = useTranslation();
  const { l, language } = useLanguage();
  const dispatch = useAppDispatch();
  if (request.loading)
    return (
      <Section>
        <ProductSkeletons count={2} />
      </Section>
    );
  if (request.error)
    return (
      <Section>
        <SEO title={t('common.error')} description={t('products.description')} />
        <h1 className="sr-only">{t('common.error')}</h1>
        <EmptyState
          title={t('common.error')}
          action={<Button onClick={request.retry}>{t('common.retry')}</Button>}
        />
      </Section>
    );
  if (!product)
    return (
      <Section>
        <SEO title={t('notFound.product')} description={t('notFound.description')} />
        <h1>{t('notFound.product')}</h1>
        <ButtonLink className="mt-8" to="/products">
          {t('common.browse')}
        </ButtonLink>
      </Section>
    );
  const company = companies.find((c) => c.id === product.companyId);
  const url = window.location.origin + `/products/${product.id}`;
  const wa = whatsappLink(language, product, url);
  const actions = (
    <>
      <ActionLink variant="outline" href={siteConfig.tel}>
        <Phone size={18} aria-hidden="true" />
        {t('common.call')}
      </ActionLink>
      <ActionLink variant="whatsapp" href={wa} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        {t('common.whatsapp')}
      </ActionLink>
    </>
  );
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: l(product.name), url });
      else {
        await navigator.clipboard.writeText(url);
        dispatch(addToast({ id: String(Date.now()), key: 'common.copied' }));
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      dispatch(addToast({ id: String(Date.now()), key: 'common.shareError' }));
    }
  };
  return (
    <>
      <SEO
        title={l(product.name)}
        description={l(product.description)}
        image={product.images[0]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: l(product.name),
          description: l(product.description),
          sku: product.code,
          image: product.images.map((i) => new URL(i, window.location.origin).href),
          brand: company ? { '@type': 'Brand', name: l(company.name) } : undefined,
          offers: {
            '@type': 'Offer',
            priceCurrency: siteConfig.currency,
            price: product.price,
            availability: `https://schema.org/${product.stock === 'in' ? 'InStock' : 'OutOfStock'}`,
            url,
          },
        }}
      />
      <Section>
        <Link to="/products" className="text-link mb-8">
          <ArrowLeft className="rtl-icon" size={18} aria-hidden="true" />
          {t('common.back')}
        </Link>
        <p className="sample-note">{t('common.sample')}</p>
        <div className="details-layout">
          <Reveal>
            <ProductGallery product={product} />
          </Reveal>
          <Reveal mode="slideEnd">
            {company && (
              <Link to={`/products?company=${company.id}`} className="eyebrow">
                {l(company.name)}
              </Link>
            )}
            <h1 className="!text-[clamp(2rem,4vw,3rem)]">{l(product.name)}</h1>
            <div className="mt-5">
              <StockBadge stock={product.stock} />
            </div>
            <div className="mt-7 text-primary">
              <PriceTag price={product.price} />
            </div>
            <SpecList product={product} />
            <div className="detail-actions">{actions}</div>
            <button
              className="text-link mt-4"
              onClick={() => {
                void share();
              }}
            >
              <Share2 size={18} aria-hidden="true" />
              {t('common.share')}
            </button>
            <h2 className="mb-4 mt-10 text-xl">{t('common.description')}</h2>
            <p className="text-muted">{l(product.description)}</p>
          </Reveal>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeading title={t('common.related')} />
        {related.loading ? (
          <ProductSkeletons count={4} />
        ) : related.error ? (
          <EmptyState
            title={t('common.error')}
            action={<Button onClick={related.retry}>{t('common.retry')}</Button>}
          />
        ) : (
          <ProductGrid
            products={(related.data?.items ?? []).filter((p) => p.id !== product.id).slice(0, 4)}
          />
        )}
      </Section>
      <div className="mobile-order">{actions}</div>
    </>
  );
}
