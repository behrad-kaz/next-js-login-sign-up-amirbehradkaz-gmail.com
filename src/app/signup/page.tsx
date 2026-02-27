"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User, Sparkles, ArrowLeft, Check } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const passwordRequirements = [
  { label: "حداقل ۶ کاراکتر", test: (p: string) => p.length >= 6 },
  { label: "شامل حرف", test: (p: string) => /[a-zA-Z]/.test(p) },
  { label: "شامل عدد", test: (p: string) => /\d/.test(p) },
];

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("رمزهای عبور مطابقت ندارند");
      return;
    }
    if (form.password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const result = signup(form.name, form.email, form.password);
    setLoading(false);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "ثبت‌نام ناموفق بود");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 mb-4">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white">ایجاد حساب</h1>
            <p className="text-slate-400 text-sm mt-1">امروز به لوکس‌شاپ بپیوندید</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="نام کامل"
              type="text"
              placeholder="علی محمدی"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              icon={<User className="w-4 h-4" />}
              required
              autoComplete="name"
            />

            <Input
              label="آدرس ایمیل"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              icon={<Mail className="w-4 h-4" />}
              required
              autoComplete="email"
            />

            <Input
              label="رمز عبور"
              type={showPassword ? "text" : "password"}
              placeholder="یک رمز عبور قوی بسازید"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              icon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
              autoComplete="new-password"
            />

            {/* Password requirements */}
            {form.password && (
              <div className="space-y-1.5 p-3 rounded-xl bg-white/5">
                {passwordRequirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        req.test(form.password)
                          ? "bg-emerald-500"
                          : "bg-white/10"
                      }`}
                    >
                      {req.test(form.password) && (
                        <Check className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                    <span
                      className={`text-xs transition-colors duration-200 ${
                        req.test(form.password) ? "text-emerald-400" : "text-slate-500"
                      }`}
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Input
              label="تکرار رمز عبور"
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور را تکرار کنید"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              icon={<Lock className="w-4 h-4" />}
              error={
                form.confirm && form.password !== form.confirm
                  ? "رمزهای عبور مطابقت ندارند"
                  : undefined
              }
              required
              autoComplete="new-password"
            />

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
            >
              ایجاد حساب
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            قبلاً حساب دارید؟{" "}
            <Link
              href="/login"
              className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
            >
              وارد شوید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
