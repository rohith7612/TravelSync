"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlaneTakeoff, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Hit the Django backend /auth/token/ endpoint
      const response = await loginUser(formData);

      // In a real app we'd decode the JWT here to get the user object.
      // For now we'll stub it, the /auth/profile/ endpoint should be called afterwards
      const stubUser = {
        id: 1,
        username: formData.username,
        email: "user@example.com"
      };

      setAuth(stubUser, response);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.detail || "Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full point-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full point-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="p-3 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <PlaneTakeoff className="text-white w-8 h-8" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-sm text-center">Log in to sync up with your travel groups and split expenses.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              placeholder="e.g. alex_travels"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot password?</a>
            </div>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 transition-all mt-6 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-8">
          Don't have an account? <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
