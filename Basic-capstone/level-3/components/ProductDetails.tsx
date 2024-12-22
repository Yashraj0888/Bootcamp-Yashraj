import { useState } from 'react';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div>
        <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
        <p className="mb-6 text-2xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
        <p className="mb-6 text-muted-foreground">{product.description}</p>
        <p className="mb-6">
          Category:{' '}
          <Link
            href={`/category/${product.category.toLowerCase()}`}
            className="text-primary hover:underline"
          >
            {product.category}
          </Link>
        </p>
        
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        <Button size="lg" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}