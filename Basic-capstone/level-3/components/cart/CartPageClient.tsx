"use client";

import { useCart } from '@/lib/cart';
import { CartItemList } from './CartItemList';
import { CartSummary } from './CartSummary';
import { Button } from '../ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function CartPageClient() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Start shopping to add items to your cart</p>
        <Link href="/" className="mt-8 inline-block">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartItemList />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}