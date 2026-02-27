"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  User,
  Heart,
  Package,
  Settings,
  Camera,
  ArrowRight,
  Trash2,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useOrderStore } from "@/store/orderStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "profile";
  
  const { currentUser, isAuthenticated, updateUser } = useAuthStore();
  const { getUserWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { getOrders } = useOrderStore();
  const { addItem: addToCart, openCart } = useCartStore();

  // Get user-specific data
  const userWishlist = currentUser ? getUserWishlist(currentUser.id) : [];
  const userOrders = currentUser ? getOrders(currentUser.id) : [];
  
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(tab);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const handleUpdateName = () => {
    if (newName.trim() && currentUser) {
      updateUser(currentUser.id, { name: newName.trim() });
      setEditingName(false);
      setNewName("");
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      updateUser(currentUser.id, { avatar: reader.result as string });
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    if (currentUser) {
      updateUser(currentUser.id, { avatar: undefined });
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    openCart();
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: "bg-amber-500/20", text: "text-amber-400", label: "در انتظار" },
      processing: { bg: "bg-blue-500/20", text: "text-blue-400", label: "در حال پردازش" },
      shipped: { bg: "bg-violet-500/20", text: "text-violet-400", label: "ارسال شده" },
      delivered: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "تحویل داده شده" },
      cancelled: { bg: "bg-red-500/20", text: "text-red-400", label: "لغو شده" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  if (!mounted || !isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">پروفایل کاربری</h1>
          <p className="text-slate-400 mt-2">مدیریت حساب کاربری، علاقه‌مندی‌ها و سفارشات</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  {currentUser.avatar ? (
                    <div className="relative">
                      <Image
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover border-4 border-violet-500/30"
                      />
                      <button
                        onClick={handleRemoveAvatar}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className={`absolute bottom-0 right-0 w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-violet-600 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {uploading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                <h2 className="text-lg font-bold text-white mt-4">{currentUser.name}</h2>
                <p className="text-sm text-slate-400">{currentUser.email}</p>
                <span className="mt-2 px-3 py-1 bg-violet-500/20 text-violet-400 text-xs rounded-full">
                  {currentUser.role === "admin" ? "مدیر" : "کاربر"}
                </span>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === "profile"
                      ? "bg-violet-500/20 text-violet-400"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <User className="w-5 h-5" />
                  پروفایل
                </button>
                <button
                  onClick={() => setActiveTab("likes")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === "likes"
                      ? "bg-violet-500/20 text-violet-400"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span className="flex-1 text-right">علاقه‌مندی‌ها</span>
                  {userWishlist.length > 0 && (
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                      {userWishlist.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === "orders"
                      ? "bg-violet-500/20 text-violet-400"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="flex-1 text-right">سفارشات</span>
                  {userOrders.length > 0 && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                      {userOrders.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === "settings"
                      ? "bg-violet-500/20 text-violet-400"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  تنظیمات
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">اطلاعات شخصی</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">نام و نام خانوادگی</label>
                    {editingName ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder={currentUser.name}
                          className="flex-1 px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                        />
                        <Button onClick={handleUpdateName} size="sm">ذخیره</Button>
                        <Button onClick={() => setEditingName(false)} variant="outline" size="sm">لغو</Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p className="text-lg text-white">{currentUser.name}</p>
                        <button
                          onClick={() => { setEditingName(true); setNewName(currentUser.name); }}
                          className="text-sm text-violet-400 hover:text-violet-300"
                        >
                          ویرایش
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">ایمیل</label>
                    <p className="text-lg text-white">{currentUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">نوع حساب</label>
                    <p className="text-lg text-white">{currentUser.role === "admin" ? "مدیر سیستم" : "کاربر عادی"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">تاریخ عضویت</label>
                    <p className="text-lg text-white">{new Date(currentUser.createdAt).toLocaleDateString("fa-IR")}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Likes Tab */}
            {activeTab === "likes" && (
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">لیست علاقه‌مندی‌ها</h3>
                {userWishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-lg text-slate-400">هنوز محصولی را لایک نکرده‌اید</p>
                    <Link href="/">
                      <Button className="mt-4">مشاهده محصولات</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userWishlist.map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-4 p-4 bg-slate-800/50 border border-white/10 rounded-xl"
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-700">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
                          <p className="text-xs text-slate-400 mt-1">{product.category}</p>
                          <p className="text-sm font-bold text-violet-400 mt-1">
                            {formatPrice(product.price)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="flex-1 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs rounded-lg transition-colors"
                            >
                              افزودن به سبد
                            </button>
                            <button
                              onClick={() => currentUser && removeFromWishlist(currentUser.id, product.id)}
                              className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">تاریخچه سفارشات</h3>
                {userOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-lg text-slate-400">هنوز سفارشی ندارید</p>
                    <Link href="/">
                      <Button className="mt-4">شروع خرید</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 bg-slate-800/50 border border-white/10 rounded-xl"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm font-mono text-slate-400">{order.id}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(order.createdAt).toLocaleDateString("fa-IR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="space-y-2 mb-4">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white truncate">{item.product.name}</p>
                                <p className="text-xs text-slate-400">{item.quantity} × {formatPrice(item.product.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                          <span className="text-sm text-slate-400">مجموع</span>
                          <span className="text-lg font-bold text-violet-400">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">تنظیمات</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-white/10 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-white">اعلان‌های ایمیلی</p>
                      <p className="text-xs text-slate-400 mt-1">دریافت ایمیل درباره سفارشات جدید</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-white/10 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-white">پیامک اطلاع‌رسانی</p>
                      <p className="text-xs text-slate-400 mt-1">دریافت پیامک درباره وضعیت سفارش</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
