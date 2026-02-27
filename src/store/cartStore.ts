"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Helper to get only valid items (filter out stale data)
      getValidItems: () => {
        return get().items.filter((item) => item?.product?.id && item?.product?.image);
      },

      addItem: (product, quantity = 1) => {
        if (!product?.id || typeof product?.price !== 'number') return;
        set((state) => {
          // Filter out invalid items first
          const validItems = state.items.filter((item) => item?.product?.id && item?.product?.image);
          const existing = validItems.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: validItems.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
                  : i
              ),
            };
          }
          return { items: [...validItems, { product, quantity }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i?.product?.id && i.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i?.product?.id && i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => {
        const validItems = get().items.filter((item) => item?.product?.id && item?.product?.image);
        return validItems.reduce(
          (sum, item) => sum + (item?.quantity || 0),
          0
        );
      },

      getTotalPrice: () => {
        const validItems = get().items.filter((item) => item?.product?.id && item?.product?.image);
        return validItems.reduce(
          (sum, item) => sum + ((item?.product?.price || 0) * (item?.quantity || 0)),
          0
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
