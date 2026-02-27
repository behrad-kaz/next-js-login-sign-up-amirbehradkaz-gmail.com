"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  Zap,
  Shield,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { categories } from "@/lib/data";
import ProductCard from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

const PRODUCTS_PER_PAGE = 12;

const sortOptions = [
  { value: "featured", label: "پیشنهادی" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "rating", label: "بهترین امتیاز" },
  { value: "newest", label: "جدیدترین" },
];

const features = [
  { icon: Truck, title: "ارسال رایگان", desc: "برای خریدهای بالای ۵۰ دلار" },
  { icon: Shield, title: "پرداخت امن", desc: "۱۰۰٪ محافظت‌شده" },
  { icon: Zap, title: "تحویل سریع", desc: "۲ تا ۳ روز کاری" },
  { icon: TrendingUp, title: "بهترین قیمت", desc: "تضمین تطابق قیمت" },
];

export default function HomePage() {
  const { products, fetchProducts, isLoading } = useProductStore();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (selectedCategory !== "همه") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return result;
  }, [products, search, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950/30 to-slate-900 py-20 px-4">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
             فروشگاه 
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mr-4">
              KAZ STORE 
            </span>

          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            مجموعه‌ای منتخب از بهترین محصولات کیفیت و سبک در هر کالایی که ارائه
            می‌دهیم.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
              <input
                type="text"
                placeholder="جستجوی محصولات، دسته‌بندی‌ها، برندها..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pr-12 pl-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters & Sort */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0",
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Results */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              <span className="text-white font-semibold">
                {filteredProducts.length}
              </span>{" "}
              محصول یافت شد
              {totalPages > 1 && (
                <span className="mr-2 text-slate-500">
                  · صفحه {currentPage} از {totalPages}
                </span>
              )}
            </p>
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-slate-800"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center">
              <Search className="w-10 h-10 text-slate-600" />
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-slate-300">
                محصولی یافت نشد
              </p>
              <p className="text-slate-500 mt-1">
                جستجو یا فیلترها را تغییر دهید
              </p>
            </div>
            <button
              onClick={() => {
                handleSearchChange("");
                handleCategoryChange("همه");
              }}
              className="px-6 py-2.5 rounded-xl bg-violet-500/20 text-violet-400 text-sm font-medium hover:bg-violet-500/30 transition-all duration-200"
            >
              پاک کردن فیلترها
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPage === 1
                      ? "bg-white/5 text-slate-600 cursor-not-allowed"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10",
                  )}
                >
                  <ChevronRight className="w-4 h-4" />
                  قبلی
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, idx) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 text-slate-500 text-sm"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page as number)}
                        className={cn(
                          "w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200",
                          currentPage === page
                            ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10",
                        )}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    currentPage === totalPages
                      ? "bg-white/5 text-slate-600 cursor-not-allowed"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10",
                  )}
                >
                  بعدی
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Pagination Info */}
            {totalPages > 1 && (
              <p className="text-center text-sm text-slate-500 mt-4">
                نمایش {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
                {Math.min(
                  currentPage * PRODUCTS_PER_PAGE,
                  filteredProducts.length,
                )}{" "}
                از {filteredProducts.length} محصول
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
