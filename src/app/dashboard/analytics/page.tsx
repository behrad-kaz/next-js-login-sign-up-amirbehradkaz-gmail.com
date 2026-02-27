"use client";

import { useProductStore } from "@/store/productStore";
import { useAuthStore } from "@/store/authStore";
import { formatPrice } from "@/lib/utils";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

export default function AnalyticsPage() {
  const { products } = useProductStore();
  const { users } = useAuthStore();

  const categoryStats = products.reduce(
    (acc, p) => {
      if (!acc[p.category]) acc[p.category] = { count: 0, revenue: 0 };
      acc[p.category].count++;
      acc[p.category].revenue += p.price;
      return acc;
    },
    {} as Record<string, { count: number; revenue: number }>
  );

  const topProducts = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);

  const totalRevenue = products.reduce(
    (sum, p) => sum + p.price * (p.reviewCount / 10),
    0
  );

  const colors = [
    "from-violet-500 to-indigo-500",
    "from-pink-500 to-rose-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-violet-500",
  ];

  const maxCount = Math.max(...Object.values(categoryStats).map((s) => s.count));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">آمار و تحلیل</h1>
        <p className="text-slate-400 mt-1">نمای کلی عملکرد فروشگاه</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20">
          <div className="flex items-center justify-between mb-3">
            <BarChart3 className="w-5 h-5 text-violet-400" />
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              +۲۳٪
            </span>
          </div>
          <p className="text-3xl font-black text-white">{formatPrice(totalRevenue)}</p>
          <p className="text-sm text-slate-400 mt-1">درآمد تخمینی</p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-pink-500/20">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-5 h-5 text-pink-400" />
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              +۱۲٪
            </span>
          </div>
          <p className="text-3xl font-black text-white">{products.length}</p>
          <p className="text-sm text-slate-400 mt-1">کل محصولات</p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <PieChart className="w-5 h-5 text-emerald-400" />
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              +۸٪
            </span>
          </div>
          <p className="text-3xl font-black text-white">{users.length}</p>
          <p className="text-sm text-slate-400 mt-1">کاربران ثبت‌نام‌شده</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-6">محصولات بر اساس دسته‌بندی</h2>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([cat, stats], i) => (
              <div key={cat}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-300">{cat}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">
                      {formatPrice(stats.revenue)}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {stats.count} محصول
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${colors[i % colors.length]} transition-all duration-700`}
                    style={{ width: `${(stats.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-6">برترین محصولات بر اساس نظرات</h2>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={product.id} className="flex items-center gap-4">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    i === 0
                      ? "bg-amber-500/20 text-amber-400"
                      : i === 1
                      ? "bg-slate-400/20 text-slate-400"
                      : i === 2
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-white/5 text-slate-500"
                  }`}
                >
                  #{i + 1}
                </span>
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{product.name}</p>
                  <p className="text-xs text-slate-400">{product.reviewCount} نظر</p>
                </div>
                <div className="text-left flex-shrink-0">
                  <p className="text-sm font-bold text-violet-400">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-xs text-amber-400">★ {product.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
