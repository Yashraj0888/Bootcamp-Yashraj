import { getAllCategories, getProductsByCategory } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    name: category.id,
  }));
}

export default function CategoryPage({
  params,
}: {
  params: { name: string };
}) {
  const products = getProductsByCategory(params.name);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <h1 className="mb-8 text-3xl font-bold capitalize">{params.name} Products</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}