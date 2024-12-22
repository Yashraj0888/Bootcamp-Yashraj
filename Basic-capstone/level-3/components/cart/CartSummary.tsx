"use client";

import { useCart } from '@/lib/cart';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export function CartSummary() {
  const { total } = useCart();
  const tax = total * 0.1; // 10% tax
  const finalTotal = total + tax;

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button className="mt-6 w-full" size="lg">
        <ShoppingBag className="mr-2 h-4 w-4" />
        Proceed to Checkout
      </Button>
      
      <Link href="/">
        <Button variant="outline" className="mt-4 w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}