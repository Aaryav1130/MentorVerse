"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { LogIn, ArrowRight, Sparkles, GraduationCap, Briefcase } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const user = await login(email, password);
      if (user.role === "mentor") {
        router.push("/mentor/dashboard");
      } else {
        router.push("/student/dashboard");
      }
    } catch {
      setError("Unable to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // Default Google quick login routes based on entered email or defaults to student
      const user = await login(email || "student@gmail.com");
      if (user.role === "mentor") {
        router.push("/mentor/dashboard");
      } else {
        router.push("/student/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: "student" | "mentor") => {
    loginAsDemo(role);
    if (role === "mentor") {
      router.push("/mentor/dashboard");
    } else {
      router.push("/student/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-120px] left-[-120px] w-96 h-96 rounded-full bg-brand-primary/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 rounded-full bg-brand-accent/10 blur-[130px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between mb-4">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/brand/seniorly-logo-on-dark.svg"
            alt="Seniorly Logo"
            className="h-8 w-auto transition-transform group-hover:scale-105"
          />
        </Link>
        <Link
          href="/register"
          className="text-xs sm:text-sm text-brand-light hover:text-white font-medium underline underline-offset-4 transition-colors"
        >
          Create account
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Sign in to Seniorly to access your sessions, mentors, and roadmaps.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          {/* Google 1-Tap Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors shadow-sm mb-5 text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-[#1e293b] w-full" />
            <span className="bg-[#141b2d] px-3 text-xs text-slate-500 uppercase tracking-wider">
              Or sign in with email
            </span>
            <div className="border-t border-[#1e293b] w-full" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary text-sm transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset instructions sent to your email.");
                  }}
                  className="text-xs text-brand-light hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold bg-brand-primary hover:bg-[#4338CA] text-white transition-all shadow-lg shadow-brand-primary/25 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Switcher Card */}
          <div className="mt-6 pt-5 border-t border-[#1e293b]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>Instant Demo Logins (Test Each UI):</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("mentor")}
                className="p-2.5 rounded-xl bg-[#0a0e1a] border border-[#1e293b] hover:border-brand-accent/50 hover:bg-[#101626] transition-all text-left group"
              >
                <div className="flex items-center gap-1.5 text-brand-accent text-xs font-semibold mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Mentor UI</span>
                </div>
                <div className="text-[11px] text-white font-medium group-hover:text-brand-accent transition-colors truncate">
                  Dr. Arjun Mehta
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  IIT Delhi · GATE Expert
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("student")}
                className="p-2.5 rounded-xl bg-[#0a0e1a] border border-[#1e293b] hover:border-brand-primary/50 hover:bg-[#101626] transition-all text-left group"
              >
                <div className="flex items-center gap-1.5 text-brand-light text-xs font-semibold mb-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student UI</span>
                </div>
                <div className="text-[11px] text-white font-medium group-hover:text-brand-light transition-colors truncate">
                  Prince
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  Target: GATE EE 2027
                </div>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 mt-6 pt-4 border-t border-[#1e293b]">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="text-brand-light hover:text-white font-semibold inline-flex items-center gap-1 ml-1"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="max-w-md mx-auto w-full text-center text-xs text-slate-500 mt-4">
        Seniorly · Connect with seniors who cracked it.
      </div>
    </div>
  );
}
