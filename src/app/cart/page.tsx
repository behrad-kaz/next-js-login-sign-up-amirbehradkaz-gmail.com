"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Tag,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle hydration: only render cart items after client-side mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = getTotalPrice();
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  // Filter out items with invalid product data (handles stale localStorage data)
  const validItems = items.filter((item) => item?.product?.id);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "LUXE10") {
      setCouponApplied(true);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setCheckoutSuccess(true);
    clearCart();
  };

  if (checkoutSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">سفارش ثبت شد!</h1>
          <p className="text-slate-400 mb-8">
            ممنون از خریدتان. سفارش شما تأیید شده و ظرف ۲ تا ۳ روز کاری تحویل داده می‌شود.
          </p>
          <Link href="/">
            <Button size="lg">
              ادامه خرید
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            ادامه خرید
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-2xl font-black text-white">سبد خرید</h1>
          <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-sm font-medium">
            {validItems.length} کالا
          </span>
        </div>

        {validItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-slate-600" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-300">سبد خرید خالی است</h2>
              <p className="text-slate-500 mt-2">
                هنوز چیزی اضافه نکرده‌اید
              </p>
            </div>
            <Link href="/">
              <Button size="lg">شروع خرید</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {validItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-5 p-5 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs text-violet-400 font-medium">
                          {item.product.category}
                        </span>
                        <h3 className="text-base font-semibold text-white mt-0.5">
                          {item.product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-left">
                        <p className="text-lg font-bold text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatPrice(item.product.price)} هر عدد
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                <h2 className="text-lg font-bold text-white mb-5">خلاصه سفارش</h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">جمع کالاها</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-400">تخفیف (۱۰٪)</span>
                      <span className="text-emerald-400">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">هزینه ارسال</span>
                    <span className={shipping === 0 ? "text-emerald-400" : "text-white"}>
                      {shipping === 0 ? "رایگان" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between">
                    <span className="font-bold text-white">مبلغ نهایی</span>
                    <span className="text-xl font-black text-violet-400">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mb-5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="کد تخفیف (LUXE10)"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        disabled={couponApplied}
                        className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !coupon}
                      className="px-4 py-2.5 rounded-xl bg-violet-500/20 text-violet-400 text-sm font-medium hover:bg-violet-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      اعمال
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      کد تخفیف اعمال شد! ۱۰٪ تخفیف
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                  loading={loading}
                >
                  <CreditCard className="w-4 h-4" />
                  پرداخت و تسویه
                </Button>

                <p className="text-xs text-slate-500 text-center mt-3">
                  پرداخت امن با رمزنگاری SSL
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
