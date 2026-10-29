import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { heroSlides } from '@/data/sample';
import { useLanguage } from '@/context/LanguageContext';
import { formatNumber } from '@/utils/formatNumber';
import { ButtonLink } from '../Button';
export function HeroSlider() {
  const { t } = useTranslation();
  const { dir, language } = useLanguage();
  const [index, set] = useState(0);
  const [paused, pause] = useState(false);
  const [interaction, setInteraction] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const reduced = useReducedMotion();
  const touch = useRef({ x: 0, y: 0 });
  const running = !paused && !interaction && !hidden && !reduced;
  const slide = heroSlides[index];
  const change = (step: number) => set((i) => (i + step + heroSlides.length) % heroSlides.length);
  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => set((i) => (i + 1) % heroSlides.length), 6000);
    return () => clearTimeout(timer);
  }, [index, running]);
  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label={t('home.eyebrow')}
      onMouseEnter={() => setInteraction(true)}
      onMouseLeave={() => setInteraction(false)}
      onFocusCapture={() => setInteraction(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setInteraction(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          change(dir === 'rtl' ? -1 : 1);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          change(dir === 'rtl' ? 1 : -1);
        }
      }}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const diff = e.changedTouches[0].clientX - touch.current.x;
        const vertical = e.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(diff) > 50 && Math.abs(diff) > Math.abs(vertical) * 1.2)
          change((diff < 0 ? 1 : -1) * (dir === 'rtl' ? -1 : 1));
      }}
    >
      <AnimatePresence initial={false}>
        {heroSlides.map(
          (s, i) =>
            i === index && (
              <motion.img
                key={s.id}
                className="hero-bg"
                src={s.image}
                srcSet={`${s.imageSmall} 800w, ${s.image} 1600w`}
                sizes="100vw"
                width={1600}
                height={900}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.removeAttribute('srcset');
                  e.currentTarget.src = '/images/hero.svg';
                }}
                {...{ fetchpriority: i === 0 ? 'high' : 'auto' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: reduced ? 0.15 : 0.9 },
                }}
              />
            ),
        )}
      </AnimatePresence>
      <div className="hero-overlay" />
      <div className="hero-scrim" />
      <div className="hero-content" aria-live={running ? 'off' : 'polite'}>
        <motion.div
          key={slide.id}
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          <motion.span
            className="hero-eyebrow"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <span aria-hidden="true" />
            {t('home.eyebrow')}
          </motion.span>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <h1>{t(slide.title)}</h1>
          </motion.div>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            {t(slide.subtitle)}
          </motion.p>
          <motion.div
            className="hero-actions"
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <ButtonLink to={slide.category ? `/products?category=${slide.category}` : '/products'}>
              {t('common.browse')}
              <ArrowUpRight size={18} className="rtl:-scale-x-100" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/contact" variant="white">
              {t('nav.contact')}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>
      <div className="hero-footer">
        <div className="hero-counter" aria-hidden="true">
          <span>{formatNumber(index + 1, language).padStart(2, '0')}</span>
          <span className="hero-counter-divider" />
          <span>{formatNumber(heroSlides.length, language).padStart(2, '0')}</span>
        </div>
        <div className="hero-controls">
          <button
            className="hero-arrow"
            onClick={() => change(-1)}
            aria-label={t('common.previous')}
          >
            <ArrowLeft size={20} className="rtl-icon" aria-hidden="true" />
          </button>
          <div className="hero-dots">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                aria-label={t('hero.slide', { number: formatNumber(i + 1, language) })}
                aria-current={index === i ? 'true' : undefined}
                onClick={() => set(i)}
              >
                <span>
                  {i === index && (
                    <motion.b
                      key={`${index}-${running}`}
                      initial={{ scaleX: running ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: running ? 6 : 0, ease: 'linear' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <button className="hero-arrow" onClick={() => change(1)} aria-label={t('common.next')}>
            <ArrowRight size={20} className="rtl-icon" aria-hidden="true" />
          </button>
          <button
            className="hero-arrow"
            onClick={() => pause((v) => !v)}
            aria-label={t(paused ? 'hero.play' : 'hero.pause')}
            aria-pressed={paused}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>
      </div>
    </section>
  );
}
