"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, CartItem } from "@/types";

interface OrderState {
  orders: Order[];
  addOrder: (userId: string, items: CartItem[], total: number) => void;
  getOrders: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (userId, items, total) => {
        const newOrder: Order = {
          id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId: userId,
          items: items,
          total: total,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },

      getOrders: (userId) => {
        return get().orders.filter((order) => order.userId === userId);
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
