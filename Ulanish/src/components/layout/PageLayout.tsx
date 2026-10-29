import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './Navbar';
import { MobileHeader } from './MobileHeader';
import { BottomTabBar } from './BottomTabBar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ScrollProgress } from './ScrollProgress';
import { WhatsAppFab } from './WhatsAppFab';
import { SearchOverlay } from './SearchOverlay';
import { Toast } from '@/components/ui/Toast';
import { ProductSkeletons } from '@/components/ui/Skeleton';
import { PageTransition } from '@/components/ui/motion/PageTransition';
import { SiteBackground } from './SiteBackground';
export function PageLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <>
      <SiteBackground />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-white focus:p-4"
      >
        {t('common.skip')}
      </a>
      <ScrollProgress />
      <ScrollToTop />
      <header className="site-header">
        <Navbar />
        <MobileHeader />
      </header>
      <main id="main-content" tabIndex={-1} className="site-main min-h-[60dvh] outline-none">
        <PageTransition key={location.pathname}>
          <Suspense
            fallback={
              <div className="container-site py-16">
                <ProductSkeletons />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
      <BottomTabBar />
      <WhatsAppFab />
      <SearchOverlay />
      <Toast />
    </>
  );
}
