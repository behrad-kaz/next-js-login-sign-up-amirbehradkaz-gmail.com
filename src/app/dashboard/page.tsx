"use client";

import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Star,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import { mockProducts } from "@/lib/data";

export default function DashboardPage() {
  const { users } = useAuthStore();
  const { products } = useProductStore();

  const totalRevenue = products.reduce((sum, p) => sum + p.price * (p.reviewCount / 10), 0);
  const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length;
  const lowStockProducts = products.filter((p) => p.stock <= 10);

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      change: "+12%",
      color: "violet",
    },
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      change: "+8%",
      color: "indigo",
    },
    {
      label: "Est. Revenue",
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      change: "+23%",
      color: "emerald",
    },
    {
      label: "Avg. Rating",
      value: avgRating.toFixed(1),
      icon: Star,
      change: "+0.2",
      color: "amber",
    },
  ];

  const colorMap: Record<string, string> = {
    violet: "bg-violet-500/10 text-violet-400",
    indigo: "bg-indigo-500/10 text-indigo-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    amber: "bg-amber-500/10 text-amber-400",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[stat.color]}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Recent Products</h2>
            <a
              href="/dashboard/products"
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              View all
            </a>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{product.name}</p>
                  <p className="text-xs text-slate-400">{product.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-violet-400">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-xs text-slate-500">Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Low Stock Alert</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
              {lowStockProducts.length} items
            </span>
          </div>
          {lowStockProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Activity className="w-8 h-8 text-emerald-400 mb-2" />
              <p className="text-sm text-slate-400">All products are well stocked!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{product.name}</p>
                    <p className="text-xs text-slate-400">{product.category}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold">
                      {product.stock} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
