"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { ADMIN_EMAIL } from "@/lib/data";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const isAdmin =
    isAuthenticated &&
    currentUser?.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-3">Authentication Required</h1>
          <p className="text-slate-400 mb-6">
            You need to be logged in to access this page.
          </p>
          <Link href="/login">
            <Button size="lg">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-3">Access Denied</h1>
          <p className="text-slate-400 mb-6">
            This dashboard is restricted to administrators only.
          </p>
          <Link href="/">
            <Button size="lg" variant="outline">
              Go to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
