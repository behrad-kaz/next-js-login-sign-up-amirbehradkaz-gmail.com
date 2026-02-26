import type { Product, User } from "@/types";

export const ADMIN_EMAIL = "amirbehradkaz@gmail.com";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    stock: 45,
    rating: 4.8,
    reviewCount: 234,
    tags: ["wireless", "noise-cancelling", "premium"],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    description:
      "Elegant timepiece crafted from genuine Italian leather. Water-resistant up to 50m with sapphire crystal glass.",
    price: 189.99,
    originalPrice: 249.99,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    stock: 28,
    rating: 4.6,
    reviewCount: 156,
    tags: ["leather", "minimalist", "luxury"],
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "3",
    name: "Smart Fitness Tracker",
    description:
      "Track your health metrics with precision. Heart rate monitoring, sleep tracking, GPS, and 7-day battery life.",
    price: 149.99,
    originalPrice: 199.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    stock: 67,
    rating: 4.5,
    reviewCount: 389,
    tags: ["fitness", "health", "smart"],
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    id: "4",
    name: "Artisan Coffee Maker",
    description:
      "Brew barista-quality coffee at home. Programmable settings, built-in grinder, and thermal carafe included.",
    price: 249.99,
    originalPrice: 329.99,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
    stock: 19,
    rating: 4.7,
    reviewCount: 178,
    tags: ["coffee", "kitchen", "premium"],
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "5",
    name: "Ultralight Running Shoes",
    description:
      "Engineered for performance. Carbon fiber plate, responsive foam, and breathable mesh upper for maximum speed.",
    price: 179.99,
    originalPrice: 229.99,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    stock: 52,
    rating: 4.9,
    reviewCount: 512,
    tags: ["running", "performance", "lightweight"],
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description:
      "360° surround sound in a compact design. IPX7 waterproof, 24-hour playtime, and built-in microphone.",
    price: 89.99,
    originalPrice: 119.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    stock: 83,
    rating: 4.4,
    reviewCount: 267,
    tags: ["bluetooth", "portable", "waterproof"],
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "7",
    name: "Organic Skincare Set",
    description:
      "Complete skincare routine with 100% organic ingredients. Cleanser, toner, serum, and moisturizer included.",
    price: 129.99,
    originalPrice: 169.99,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80",
    stock: 34,
    rating: 4.6,
    reviewCount: 198,
    tags: ["organic", "skincare", "natural"],
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "8",
    name: "Ergonomic Office Chair",
    description:
      "Designed for all-day comfort. Lumbar support, adjustable armrests, breathable mesh back, and 5-year warranty.",
    price: 449.99,
    originalPrice: 599.99,
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80",
    stock: 12,
    rating: 4.8,
    reviewCount: 143,
    tags: ["ergonomic", "office", "comfort"],
    createdAt: "2024-03-05T10:00:00Z",
  },
];

export const mockUsers: User[] = [
  {
    id: "admin-1",
    name: "Amirbehrad Kaz",
    email: "amirbehradkaz@gmail.com",
    password: "admin123",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amirbehrad",
  },
  {
    id: "user-1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "user123",
    role: "user",
    createdAt: "2024-01-10T00:00:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: "user-2",
    name: "Michael Chen",
    email: "michael@example.com",
    password: "user123",
    role: "user",
    createdAt: "2024-01-15T00:00:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
  {
    id: "user-3",
    name: "Emma Wilson",
    email: "emma@example.com",
    password: "user123",
    role: "user",
    createdAt: "2024-02-01T00:00:00Z",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  },
];

export const categories = [
  "All",
  "Electronics",
  "Accessories",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Furniture",
];
