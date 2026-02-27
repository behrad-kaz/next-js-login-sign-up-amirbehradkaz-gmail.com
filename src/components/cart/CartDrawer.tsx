"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const total = getTotalPrice();
  const shippingCost = total > 500000 ? 0 : 500000;

  // Filter out items with invalid product data (handles stale localStorage data)
  const validItems = items.filter((item) => item?.product?.id);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer - from left side for RTL */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 z-50 h-full w-full max-w-md bg-slate-900 border-r border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">سبد خرید</h2>
              <p className="text-xs text-slate-400">
                {validItems.length} {validItems.length === 1 ? "کالا" : "کالا"}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {validItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-slate-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-300">سبد خرید خالی است</p>
                <p className="text-sm text-slate-500 mt-1">
                  محصولاتی اضافه کنید تا شروع کنید
                </p>
              </div>
              <Button onClick={closeCart} variant="outline" size="sm">
                ادامه خرید
              </Button>
            </div>
          ) : (
            validItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{item.product.category}</p>
                  <p className="text-sm font-bold text-violet-400 mt-1">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="mr-auto p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {validItems.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-400">
                <span>جمع کل</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>ارسال</span>
                <span className={shippingCost === 0 ? "text-emerald-400" : ""}>
                  {shippingCost === 0 ? "رایگان" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>مبلغ نهایی</span>
                <span className="text-violet-400">{formatPrice(total + shippingCost)}</span>
              </div>
            </div>
            <Link href="/cart" onClick={closeCart}>
              <Button className="w-full" size="lg">
                تسویه حساب
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-sm text-slate-500 hover:text-red-400 transition-colors duration-200"
            >
              پاک کردن سبد
            </button>
          </div>
        )}
      </div>
    </>
  );
}
