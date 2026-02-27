"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, CartItem } from "@/types";

interface OrderState {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
  getOrders: () => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (items, total) => {
        const newOrder: Order = {
          id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId: "", // Will be set when we have user auth
          items: items,
          total: total,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },

      getOrders: () => {
        return get().orders;
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
    }),
    {
      name: "order-storage",
    }
  )
);
