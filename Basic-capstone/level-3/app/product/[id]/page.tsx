import { getAllProducts, getProductById } from '@/lib/products';
import { ProductPageClient } from '@/components/ProductPageClient';

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);
  const allProducts = getAllProducts();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return <ProductPageClient product={product} allProducts={allProducts} />;
}