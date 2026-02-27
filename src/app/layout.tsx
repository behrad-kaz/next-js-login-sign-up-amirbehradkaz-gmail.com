import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "لوکس‌شاپ — محصولات ویژه",
  description:
    "مجموعه‌ای منتخب از بهترین محصولات. کیفیت و سبک در هر کالایی که ارائه می‌دهیم.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body
        className="antialiased bg-slate-950 text-white min-h-screen"
        style={{ fontFamily: "'Vazirmatn', sans-serif" }}
      >
        <Header />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
