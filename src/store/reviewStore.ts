"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewState {
  reviews: Review[];
  addReview: (productId: string, userId: string, userName: string, rating: number, comment: string) => void;
  deleteReview: (reviewId: string) => void;
  getReviewsByProductId: (productId: string) => Review[];
  getAllReviews: () => Review[];
  getAverageRating: (productId: string) => number;
  getReviewCount: (productId: string) => number;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],

      addReview: (productId, userId, userName, rating, comment) => {
        const newReview: Review = {
          id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          productId,
          userId,
          userName,
          rating,
          comment,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      },

      getReviewsByProductId: (productId) => {
        return get().reviews
          .filter((review) => review.productId === productId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },

      getAverageRating: (productId) => {
        const reviews = get().reviews.filter((review) => review.productId === productId);
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / reviews.length;
      },

      getReviewCount: (productId) => {
        return get().reviews.filter((review) => review.productId === productId).length;
      },

      deleteReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== reviewId),
        }));
      },

      getAllReviews: () => {
        return get().reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
    }),
    {
      name: "review-storage",
    }
  )
);
