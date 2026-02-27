"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  X,
  Save,
  Star,
} from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { categories } from "@/lib/data";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Product } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  category: "الکترونیک",
  image: "",
  images: "",
  stock: "",
  rating: "4.5",
  reviewCount: "0",
  tags: "",
};

type FormData = typeof emptyForm;

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      originalPrice: String(product.originalPrice || ""),
      category: product.category,
      image: product.image,
      images: product.images?.join("\n") || "",
      stock: String(product.stock),
      rating: String(product.rating),
      reviewCount: String(product.reviewCount),
      tags: product.tags.join(", "),
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const productData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      category: form.category,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      images: form.images ? form.images.split("\n").map((url) => url.trim()).filter(Boolean) : undefined,
      stock: parseInt(form.stock),
      rating: parseFloat(form.rating),
      reviewCount: parseInt(form.reviewCount),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">محصولات</h1>
          <p className="text-slate-400 mt-1">
            مدیریت کاتالوگ محصولات ({products.length} محصول)
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4" />
          افزودن محصول
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجوی محصولات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  محصول
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  دسته‌بندی
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  قیمت
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  موجودی
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  امتیاز
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  تاریخ افزودن
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-white/5 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{product.name}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[200px]">
                          {product.description.slice(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="info">{product.category}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {formatPrice(product.price)}
                      </p>
                      {product.originalPrice && (
                        <p className="text-xs text-slate-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        product.stock === 0
                          ? "text-red-400"
                          : product.stock <= 10
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm text-white">{product.rating}</span>
                      <span className="text-xs text-slate-500">({product.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">
                      {formatDate(product.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 rounded-lg text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 transition-all duration-200"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Package className="w-10 h-10 text-slate-600" />
              <p className="text-slate-400">محصولی یافت نشد</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="نام محصول"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="هدفون بی‌سیم پریمیوم"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-300 block mb-1.5">
                    توضیحات
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="توضیحات محصول..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  />
                </div>
                <Input
                  label="قیمت ($)"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="99.99"
                />
                <Input
                  label="قیمت اصلی ($)"
                  type="number"
                  value={form.originalPrice}
                  onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                  placeholder="149.99 (اختیاری)"
                />
                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-1.5">
                    دسته‌بندی
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    {categories.filter((c) => c !== "همه").map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-800">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="موجودی"
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="100"
                />
                <Input
                  label="امتیاز (۰-۵)"
                  type="number"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  placeholder="4.5"
                  min="0"
                  max="5"
                  step="0.1"
                />
                <Input
                  label="تعداد نظرات"
                  type="number"
                  value={form.reviewCount}
                  onChange={(e) => setForm({ ...form, reviewCount: e.target.value })}
                  placeholder="0"
                />
                <div className="sm:col-span-2">
                  <Input
                    label="آدرس تصویر"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    تصاویر اضافی (یک آدرس در هر خط)
                  </label>
                  <textarea
                    value={form.images}
                    onChange={(e) => setForm({ ...form, images: e.target.value })}
                    placeholder="https://example.com/image1.jpg
https://example.com/image2.jpg"
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 h-24 resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Input
                    label="برچسب‌ها (با کاما جدا کنید)"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="بی‌سیم، پریمیوم، حذف نویز"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSave}
                  disabled={!form.name || !form.price || !form.stock}
                  className="flex-1"
                >
                  <Save className="w-4 h-4" />
                  {editingProduct ? "ذخیره تغییرات" : "افزودن محصول"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowModal(false)}
                  className="flex-1"
                >
                  انصراف
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">حذف محصول؟</h3>
            <p className="text-slate-400 text-sm mb-6">
              این عمل قابل بازگشت نیست. محصول به طور دائمی حذف می‌شود.
            </p>
            <div className="flex gap-3">
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1"
              >
                حذف
              </Button>
              <Button
                variant="ghost"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1"
              >
                انصراف
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
