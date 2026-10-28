import type { Product } from '@/api/types';
import { ProductCard } from './ProductCard';
import { Stagger } from './motion/Stagger';
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Stagger className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </Stagger>
  );
}
