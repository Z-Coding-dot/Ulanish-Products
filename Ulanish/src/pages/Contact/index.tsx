import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
import { whatsappLink } from '@/utils/whatsapp';
import { normalizeArabicScript } from '@/utils/normalizeArabicScript';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { SEO } from '@/components/layout/SEO';
import { ContactCard } from '@/components/ui/ContactCard';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button, ActionLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/motion/Reveal';
type FormValues = { name: string; phone: string; message: string; website: string };
export default function Contact() {
  const { t } = useTranslation();
  const { l, language } = useLanguage();
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t('validation.name')),
        phone: z
          .string()
          .refine(
            (value) =>
              /^\+?[\d\s()-]{7,24}$/.test(normalizeArabicScript(value)) &&
              normalizeArabicScript(value).replace(/\D/g, '').length >= 7 &&
              normalizeArabicScript(value).replace(/\D/g, '').length <= 15,
            t('validation.phone'),
          ),
        message: z
          .string()
          .trim()
          .min(10, t('validation.message'))
          .max(1500, t('validation.message')),
        website: z.string(),
      }),
    [t],
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { name: '', phone: '', message: '', website: '' },
  });
  const [ready, setReady] = useState(false);
  const [link, setLink] = useState('');
  const submit = (values: FormValues) => {
    if (values.website) return;
    const url = whatsappLink(language, undefined, undefined, t('contact.template', values));
    setLink(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setReady(true);
  };
  return (
    <>
      <SEO title={t('contact.title')} description={t('contact.description')} />
      <PageHeader
        title={t('contact.title')}
        description={t('contact.description')}
        image="/images/hero-collection.webp"
      />
      <Section>
        <div className="contact-layout">
          <div>
            <Reveal>
              <span className="eyebrow">{t('nav.contact')}</span>
              <h2>{t('contact.formTitle')}</h2>
              <p className="mt-4 text-muted">{t('contact.description')}</p>
            </Reveal>
            <ContactCard icon={<MapPin size={24} />} title={t('common.address')}>
              <a
                className="text-link"
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l(siteConfig.address)}
              </a>
            </ContactCard>
            <ContactCard icon={<Phone size={24} />} title={t('common.phone')}>
              <a className="text-link" href={siteConfig.tel}>
                <bdi>{siteConfig.phone}</bdi>
              </a>
            </ContactCard>
            <ContactCard
              icon={<WhatsAppIcon width={26} height={26} />}
              title={t('common.whatsappName')}
            >
              <a
                className="text-link"
                href={whatsappLink(language)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('common.chat')}
              </a>
            </ContactCard>
          </div>
          <Reveal>
            <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
              <h2 className="text-2xl">{t('contact.formTitle')}</h2>
              <p className="text-sm text-muted">{t('contact.formIntro')}</p>
              <Input
                id="contact-name"
                label={t('contact.name')}
                placeholder={t('contact.namePlaceholder')}
                autoComplete="name"
                error={errors.name?.message}
                required
                {...register('name')}
              />
              <Input
                id="contact-phone"
                label={t('common.phone')}
                placeholder={t('contact.phonePlaceholder')}
                type="tel"
                autoComplete="tel"
                dir="ltr"
                error={errors.phone?.message}
                required
                {...register('phone')}
              />
              <Textarea
                id="contact-message"
                label={t('common.message')}
                placeholder={t('contact.messagePlaceholder')}
                error={errors.message?.message}
                required
                {...register('message')}
              />
              <div hidden aria-hidden="true">
                <label htmlFor="contact-website">{t('contact.website')}</label>
                <input
                  id="contact-website"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </div>
              <Button type="submit" variant="whatsapp" className="w-full">
                <WhatsAppIcon />
                {t('contact.send')}
              </Button>
              {ready && (
                <div role="status" className="text-sm">
                  <p>{t('contact.opened')}</p>
                  <a className="text-link" href={link} target="_blank" rel="noopener noreferrer">
                    {t('contact.send')}
                  </a>
                </div>
              )}
            </form>
          </Reveal>
        </div>
        <Reveal className="map-block mt-16">
          <MapPin size={32} className="text-primary" aria-hidden="true" />
          <h2>{t('about.visit')}</h2>
          <p>{l(siteConfig.address)}</p>
          <ActionLink
            href={siteConfig.mapsUrl}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('common.maps')}
            <ArrowUpRight size={18} aria-hidden="true" />
          </ActionLink>
        </Reveal>
      </Section>
    </>
  );
}
