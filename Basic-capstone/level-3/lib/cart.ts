import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          const newItems = existingItem
            ? state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...state.items, { product, quantity: 1 }];

          return {
            items: newItems,
            total: newItems.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            ),
          };
        });
      },
      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.product.id !== productId
          );
          return {
            items: newItems,
            total: newItems.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            ),
          };
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          return {
            items: newItems,
            total: newItems.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            ),
          };
        });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);