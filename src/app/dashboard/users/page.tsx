"use client";

import { useState } from "react";
import {
  Search,
  Trash2,
  Users,
  Shield,
  ShieldCheck,
  Mail,
  Calendar,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { formatDate } from "@/lib/utils";
import { ADMIN_EMAIL } from "@/lib/data";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function UsersPage() {
  const { users, deleteUser, updateUser, currentUser } = useAuthStore();
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleDelete = (id: string) => {
    deleteUser(id);
    setDeleteConfirm(null);
  };

  const toggleRole = (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    updateUser(id, { role: newRole as "admin" | "user" });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Users</h1>
          <p className="text-slate-400 mt-1">
            Manage your user accounts ({users.length} total)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
            {(["all", "admin", "user"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setRoleFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                  roleFilter === filter
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((user) => {
          const isCurrentUser = user.id === currentUser?.id;
          const isProtectedAdmin =
            user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

          return (
            <div
              key={user.id}
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                isCurrentUser
                  ? "bg-violet-500/5 border-violet-500/30"
                  : "bg-slate-900/50 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      {isCurrentUser && (
                        <span className="text-xs text-violet-400">(You)</span>
                      )}
                    </div>
                    <Badge
                      variant={user.role === "admin" ? "info" : "default"}
                      className="mt-0.5"
                    >
                      {user.role === "admin" ? (
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          User
                        </span>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {!isProtectedAdmin && !isCurrentUser && (
                  <button
                    onClick={() => toggleRole(user.id, user.role)}
                    className="flex-1 py-2 rounded-xl text-xs font-medium bg-white/5 text-slate-300 hover:bg-violet-500/10 hover:text-violet-400 transition-all duration-200 border border-white/10"
                  >
                    Make {user.role === "admin" ? "User" : "Admin"}
                  </button>
                )}
                {!isProtectedAdmin && !isCurrentUser && (
                  <button
                    onClick={() => setDeleteConfirm(user.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 border border-white/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                {(isProtectedAdmin || isCurrentUser) && (
                  <div className="flex-1 py-2 rounded-xl text-xs font-medium text-center text-slate-500 bg-white/5 border border-white/10">
                    Protected Account
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Users className="w-10 h-10 text-slate-600" />
          <p className="text-slate-400">No users found</p>
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
            <h3 className="text-xl font-bold text-white mb-2">Delete User?</h3>
            <p className="text-slate-400 text-sm mb-6">
              This action cannot be undone. The user account will be permanently removed.
            </p>
            <div className="flex gap-3">
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                variant="ghost"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
