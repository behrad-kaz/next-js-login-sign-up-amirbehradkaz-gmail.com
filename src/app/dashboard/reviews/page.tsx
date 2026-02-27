"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Trash2,
  Search,
  Filter,
  MessageSquare,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useReviewStore } from "@/store/reviewStore";
import { useProductStore } from "@/store/productStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import AdminGuard from "@/components/dashboard/AdminGuard";

function ReviewsContent() {
  const { currentUser } = useAuthStore();
  const { getAllReviews, deleteReview } = useReviewStore();
  const { products } = useProductStore();
  
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  
  const reviews = getAllReviews();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product?.name || "محصول نامشخص";
  };

  const getProductImage = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product?.image || "";
  };

  const filteredReviews = reviews.filter((review) => {
    const productName = getProductName(review.productId).toLowerCase();
    const userName = review.userName.toLowerCase();
    const comment = review.comment.toLowerCase();
    const searchLower = search.toLowerCase();
    return productName.includes(searchLower) || userName.includes(searchLower) || comment.includes(searchLower);
  });

  const handleDeleteReview = (reviewId: string) => {
    if (confirm("آیا از حذف این نظر اطمینان دارید؟")) {
      deleteReview(reviewId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">مدیریت نظرات</h1>
            <p className="text-slate-400 mt-2">مدیریت نظرات کاربران درباره محصولات</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 rounded-xl">
            <MessageSquare className="w-5 h-5 text-violet-400" />
            <span className="text-violet-400 font-medium">{reviews.length} نظر</span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در نظرات..."
              className="w-full px-12 py-4 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-xl text-slate-400">نظری یافت نشد</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="p-6 bg-slate-900/50 border border-white/10 rounded-2xl"
              >
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <Link
                    href={`/product/${review.productId}`}
                    className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800"
                  >
                    <Image
                      src={getProductImage(review.productId)}
                      alt={getProductName(review.productId)}
                      fill
                      className="object-cover hover:scale-110 transition-transform"
                      sizes="80px"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${review.productId}`}
                          className="text-lg font-bold text-white hover:text-violet-400 transition-colors"
                        >
                          {getProductName(review.productId)}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-slate-500">•</span>
                          <span className="text-sm text-slate-400">{review.userName}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-sm text-slate-500">
                            {new Date(review.createdAt).toLocaleDateString("fa-IR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                        title="حذف نظر"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-slate-300 mt-3">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <AdminGuard>
      <ReviewsContent />
    </AdminGuard>
  );
}
