"use client";

import { useCart } from '@/lib/cart';
import Image from 'next/image';
import { Button } from '../ui/button';
import { MinusIcon, PlusIcon, Trash2 } from 'lucide-react';
import { CartItem } from '@/lib/cart';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCart();
  const subtotal = item.quantity * item.product.price;

  return (
    <div className="flex gap-4 rounded-lg border p-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="font-semibold">{item.product.name}</h3>
          <p className="font-semibold">${subtotal.toFixed(2)}</p>
        </div>
        
        <p className="mt-1 text-sm text-muted-foreground">
          ${item.product.price.toFixed(2)} each
        </p>

        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8 text-destructive"
            onClick={() => removeItem(item.product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}