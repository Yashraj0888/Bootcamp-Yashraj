import { Product } from '@/lib/products';
import { ProductCard } from './ProductCard';

interface RecommendedProductsProps {
  currentProduct: Product;
  products: Product[];
}

export function RecommendedProducts({ currentProduct, products }: RecommendedProductsProps) {
  const recommendations = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        (product.category === currentProduct.category ||
          product.tags?.some((tag) => currentProduct.tags?.includes(tag)))
    )
    .slice(0, 4);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="mb-8 text-2xl font-bold">Recommended Products</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}