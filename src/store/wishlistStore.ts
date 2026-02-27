"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface WishlistItem {
  userId: string;
  product: Product;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (userId: string, product: Product) => void;
  removeItem: (userId: string, productId: string) => void;
  toggleItem: (userId: string, product: Product) => void;
  isInWishlist: (userId: string, productId: string) => boolean;
  getUserWishlist: (userId: string) => Product[];
  getUserWishlistCount: (userId: string) => number;
  clearWishlist: (userId: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (userId, product) => {
        if (!product?.id || !userId) return;
        set((state) => {
          if (state.items.some((item) => item.userId === userId && item.product.id === product.id)) {
            return state;
          }
          return { items: [...state.items, { userId, product }] };
        });
      },

      removeItem: (userId, productId) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.userId === userId && item.product.id === productId)),
        }));
      },

      toggleItem: (userId, product) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(userId, product.id)) {
          removeItem(userId, product.id);
        } else {
          addItem(userId, product);
        }
      },

      isInWishlist: (userId, productId) => {
        return get().items.some((item) => item.userId === userId && item.product.id === productId);
      },

      getUserWishlist: (userId) => {
        return get().items
          .filter((item) => item.userId === userId)
          .map((item) => item.product);
      },

      getUserWishlistCount: (userId) => {
        return get().items.filter((item) => item.userId === userId).length;
      },

      clearWishlist: (userId) => {
        set((state) => ({
          items: state.items.filter((item) => item.userId !== userId),
        }));
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
