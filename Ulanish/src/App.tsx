import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const ContentPage = lazy(() => import('@/pages/ContentPage'));
const Search = lazy(() => import('@/pages/Search'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Offline = lazy(() => import('@/pages/Offline'));
export default function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms" element={<ContentPage />} />
        <Route path="policies" element={<ContentPage />} />
        <Route path="reseller-terms" element={<ContentPage />} />
        <Route path="search" element={<Search />} />
        <Route path="offline" element={<Offline />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
