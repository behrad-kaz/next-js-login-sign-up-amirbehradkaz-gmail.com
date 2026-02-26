"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { mockUsers, ADMIN_EMAIL } from "@/lib/data";

interface AuthState {
  currentUser: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: mockUsers,
      isAuthenticated: false,

      login: (email, password) => {
        const { users } = get();
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!user) {
          return { success: false, error: "Invalid email or password" };
        }
        set({ currentUser: user, isAuthenticated: true });
        return { success: true };
      },

      signup: (name, email, password) => {
        const { users } = get();
        const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          return { success: false, error: "An account with this email already exists" };
        }
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          role: email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user",
          createdAt: new Date().toISOString(),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        };
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
          isAuthenticated: true,
        }));
        return { success: true };
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },

      addUser: (user) => {
        set((state) => ({ users: [...state.users, user] }));
      },

      updateUser: (id, updates) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
          currentUser:
            state.currentUser?.id === id
              ? { ...state.currentUser, ...updates }
              : state.currentUser,
        }));
      },

      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        }));
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        users: state.users,
      }),
    }
  )
);
