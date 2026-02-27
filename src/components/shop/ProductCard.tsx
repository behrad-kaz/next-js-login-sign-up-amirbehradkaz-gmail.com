"use client";

import Image from "next/image";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const [addedToCart, setAddedToCart] = useState(false);

  const isLiked = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-700/50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleToggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="px-2 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-lg shadow-lg">
              -{discount}٪
            </span>
          )}
          {product.stock <= 10 && product.stock > 0 && (
            <span className="px-2 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-lg">
              موجودی کم
            </span>
          )}
          {product.stock === 0 && (
            <span className="px-2 py-1 bg-red-500/90 text-white text-xs font-bold rounded-lg">
              ناموجود
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <Badge variant="info" className="mb-1.5">
              {product.category}
            </Badge>
            <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-600"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">
            {product.rating} ({product.reviewCount} نظر)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-white">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            addedToCart
              ? "bg-emerald-500 text-white"
              : product.stock === 0
              ? "bg-white/5 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-95"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {addedToCart ? "اضافه شد!" : product.stock === 0 ? "ناموجود" : "افزودن به سبد"}
        </button>
      </div>
    </div>
  );
}
