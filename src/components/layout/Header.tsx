"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  Store,
  Menu,
  X,
  Sparkles,
  Heart,
  Package,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isAuthenticated, logout } = useAuthStore();
  const { getTotalItems, openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle hydration: only render dynamic content after client-side mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalItems = getTotalItems();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "فروشگاه" },
    { href: "/cart", label: "سبد خرید" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
             KAZSHOP
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            {currentUser?.role === "admin" && (
              <Link
                href="/dashboard"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                  pathname.startsWith("/dashboard")
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                داشبورد
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="باز کردن سبد خرید"
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                  {totalItems > 9 ? "۹+" : totalItems}
                </span>
              )}
            </button>

            {/* User Menu with Dropdown */}
            {mounted && isAuthenticated && currentUser ? (
              <div className="hidden md:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  {currentUser.avatar ? (
                    <Image
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm text-slate-300 font-medium">
                    {currentUser.name.split(" ")[0]}
                  </span>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-slate-400 transition-transform duration-200",
                    userMenuOpen && "rotate-180"
                  )} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-slate-800 border border-white/10 rounded-xl shadow-xl shadow-black/20 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                      {currentUser.avatar ? (
                        <Image
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-white">{currentUser.name}</p>
                        <p className="text-xs text-slate-400">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                      >
                        <User className="w-4 h-4" />
                        پروفایل کاربری
                      </Link>
                      <Link
                        href="/profile?tab=likes"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="flex-1">لیست علاقه‌مندی‌ها</span>
                        {wishlistItems.length > 0 && (
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                            {wishlistItems.length}
                          </span>
                        )}
                      </Link>
                      <Link
                        href="/profile?tab=orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                      >
                        <Package className="w-4 h-4" />
                        تاریخچه سفارشات
                      </Link>
                    </div>
                    <div className="py-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        خروج از حساب
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  ورود
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-500/25"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Store className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            {currentUser?.role === "admin" && (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname.startsWith("/dashboard")
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                داشبورد
              </Link>
            )}
            {mounted && isAuthenticated && currentUser && (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname.startsWith("/profile")
                      ? "bg-violet-500/20 text-violet-400"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <User className="w-4 h-4" />
                  پروفایل
                </Link>
                <Link
                  href="/profile?tab=likes"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Heart className="w-4 h-4" />
                  <span className="flex-1">علاقه‌مندی‌ها</span>
                  {wishlistItems.length > 0 && (
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </>
            )}
            <div className="pt-2 border-t border-white/10">
              {isAuthenticated && currentUser ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-4 py-3">
                    {currentUser.avatar ? (
                      <Image
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">{currentUser.name}</p>
                      <p className="text-xs text-slate-400">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    خروج
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    ورود
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all duration-200"
                  >
                    ثبت‌نام
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
