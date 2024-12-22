"use client";

import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/lib/cart';
import Link from 'next/link';

export function CartButton() {
  const { items, total } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart">
      <Button variant="outline" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {itemCount}
          </span>
        )}
        <span className="ml-2">${total.toFixed(2)}</span>
      </Button>
    </Link>
  );
}