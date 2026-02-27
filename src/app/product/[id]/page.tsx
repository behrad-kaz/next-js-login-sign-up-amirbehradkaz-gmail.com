"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  Star,
  Heart,
  ShoppingCart,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useReviewStore } from "@/store/reviewStore";
import { useProductStore } from "@/store/productStore";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const { currentUser, isAuthenticated } = useAuthStore();
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { getReviewsByProductId, addReview, getAverageRating, getReviewCount } = useReviewStore();
  const { products, fetchProducts } = useProductStore();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const product: Product | undefined = products.find((p) => p.id === productId);
  const reviews = getReviewsByProductId(productId);
  const avgRating = getAverageRating(productId);
  const reviewCount = getReviewCount(productId);
  
  // Use lazy initializer to avoid hydration mismatch
  const [mounted, setMounted] = useState(() => {
    if (typeof window !== 'undefined') return true;
    return false;
  });

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-white">محصول یافت نشد</p>
        <Link href="/">
          <Button>بازگشت به فروشگاه</Button>
        </Link>
      </div>
    );
  }

  const allImages = product.images && product.images.length > 0 
    ? [product.image, ...product.images] 
    : [product.image];
    
  const isLiked = currentUser ? isInWishlist(currentUser.id, product.id) : false;

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const handleToggleWishlist = () => {
    if (!currentUser) return;
    toggleItem(currentUser.id, product);
  };

  const handleSubmitReview = () => {
    if (!isAuthenticated || !currentUser || !newComment.trim()) return;
    
    addReview(
      product.id,
      currentUser.id,
      currentUser.name,
      newRating,
      newComment.trim()
    );
    setNewComment("");
    setNewRating(5);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            فروشگاه
          </Link>
          <ChevronLeft className="w-4 h-4 text-slate-600" />
          <Link href={`/?category=${product.category}`} className="text-slate-400 hover:text-white transition-colors">
            {product.category}
          </Link>
          <ChevronLeft className="w-4 h-4 text-slate-600" />
          <span className="text-white truncate max-w-xs">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-800">
              <Image
                src={allImages[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold rounded-lg">
                  {discount}% تخفیف
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === index 
                        ? "border-violet-500" 
                        : "border-transparent hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="info" className="mb-3">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(avgRating || product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-400">
                {((avgRating || product.rating)).toFixed(1)} ({reviewCount + product.reviewCount} نظر)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-violet-400">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-slate-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">
                    موجود در انبار ({product.stock} عدد)
                  </span>
                </>
              ) : (
                <span className="text-red-400 font-medium">ناموجود</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-slate-400">تعداد:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-xl font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 ml-2" />
                افزودن به سبد خرید
              </Button>
              <button
                onClick={handleToggleWishlist}
                className={`p-4 rounded-xl border transition-all ${
                  isLiked
                    ? "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {product.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?search=${tag}`}
                    className="px-3 py-1.5 bg-white/5 text-slate-400 text-sm rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8">نظرات کاربران</h2>

          {/* Add Review Form */}
          {isAuthenticated && currentUser ? (
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">ثبت نظر جدید</h3>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-slate-400">امتیاز:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-600 hover:text-amber-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="نظر خود را بنویسید..."
                className="w-full h-24 px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none mb-4"
              />

              <Button onClick={handleSubmitReview} disabled={!newComment.trim()}>
                <Send className="w-4 h-4 ml-2" />
                ارسال نظر
              </Button>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8 text-center">
              <p className="text-slate-400">
                برای ثبت نظر، ابتدا{" "}
                <Link href="/login" className="text-violet-400 hover:underline">
                  وارد حساب کاربری
                </Link>{" "}
                شوید
              </p>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">هنوز نظری ثبت نشده است</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-slate-900/50 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">{review.userName}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(review.createdAt).toLocaleDateString("fa-IR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
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
                  </div>
                  <p className="text-slate-300">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
