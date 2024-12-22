"use client";

import { useCart } from '@/lib/cart';
import { CartItemCard } from './CartItemCard';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

export function CartItemList() {
  const { items, clearCart } = useCart();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Items ({items.length})</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={clearCart}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Cart
        </Button>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <CartItemCard key={item.product.id} item={item} />
        ))}
      </div>
    </div>
  );
}