"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlaneTakeoff, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Hit Django backend /auth/register/
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // On success, we can redirect straight to login, or auto-login and push to setup-profile
      router.push("/login?registered=true");
    } catch (err: any) {
      let msg = "Registration failed.";
      if (err?.username) msg = `Username: ${err.username[0]}`;
      else if (err?.email) msg = `Email: ${err.email[0]}`;
      else if (err?.password) msg = `Password: ${err.password[0]}`;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden py-24">
      {/* Background Orbs */}
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-pink-600/10 blur-[120px] rounded-full point-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="p-3 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <PlaneTakeoff className="text-white w-8 h-8" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Join TripSync</h1>
          <p className="text-slate-400 text-sm text-center">Create an account to start planning trips safely and easily.</p>
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
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-600"
              placeholder="Unique handle"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-600"
              placeholder="you@domain.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center justify-center gap-2 transition-all mt-6 shadow-[0_4px_14px_0_rgba(168,85,247,0.39)] disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-8">
          Already have an account? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
