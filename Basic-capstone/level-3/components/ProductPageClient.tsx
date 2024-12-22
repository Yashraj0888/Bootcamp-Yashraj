"use client";

import { Product } from '@/lib/products';
import { ProductDetails } from './ProductDetails';
import { RecommendedProducts } from './RecommendedProducts';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CartButton } from './CartButton';

interface ProductPageClientProps {
  product: Product;
  allProducts: Product[];
}

export function ProductPageClient({ product, allProducts }: ProductPageClientProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <CartButton />
      </div>
      
      <ProductDetails product={product} />
      <RecommendedProducts currentProduct={product} products={allProducts} />
    </div>
  );
}