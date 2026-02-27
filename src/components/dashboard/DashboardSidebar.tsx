"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "نمای کلی",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/products",
    label: "محصولات",
    icon: Package,
  },
  {
    href: "/dashboard/users",
    label: "کاربران",
    icon: Users,
  },
  {
    href: "/dashboard/analytics",
    label: "آمار و تحلیل",
    icon: BarChart3,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-900/50 border-l border-white/10 min-h-screen">
      <div className="p-6">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">پنل مدیریت</p>
            <p className="text-xs text-slate-500">لوکس‌شاپ</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            مدیریت
          </p>
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  active
                    ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/20 text-violet-400 border border-violet-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon
                  className={cn(
                    "w-4 h-4 flex-shrink-0 transition-colors",
                    active ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
                  )}
                />
                {item.label}
                {active && (
                  <ChevronLeft className="w-3 h-3 mr-auto text-violet-400" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
