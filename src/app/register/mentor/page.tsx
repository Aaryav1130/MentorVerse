"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, Briefcase, Award, Sparkles } from "lucide-react";

export default function MentorRegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("IIT Delhi");
  const [rank, setRank] = useState("AIR 214 · GATE EE");
  const [expertise, setExpertise] = useState("Power Systems & Network Theory");
  const [rate, setRate] = useState("₹999 / session");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await register({
        name,
        email,
        role: "mentor",
        password,
        college,
      });
      router.push("/mentor/dashboard");
    } catch {
      setError("Failed to create mentor account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await register({
        name: name || "Dr. Arjun Mehta",
        email: email || "mentor@seniorly.com",
        role: "mentor",
        college,
      });
      router.push("/mentor/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 rounded-full bg-brand-accent/15 blur-[130px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between mb-6">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to roles</span>
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/brand/seniorly-logo-on-dark.svg"
            alt="Seniorly Logo"
            className="h-7 w-auto"
          />
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="max-w-xl mx-auto w-full my-auto">
        <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          {/* Card Header */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#1e293b]">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-brand-accent">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                Mentor Registration
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Apply as a Senior Mentor
              </h1>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Social Logins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors shadow-sm text-xs sm:text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0077B5] text-white font-medium hover:bg-[#006097] transition-colors shadow-sm text-xs sm:text-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>Verify with LinkedIn</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-[#1e293b] w-full" />
            <span className="bg-[#141b2d] px-3 text-xs text-slate-500 uppercase tracking-wider">
              Or apply with credentials
            </span>
            <div className="border-t border-[#1e293b] w-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Arjun Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="arjun@iitdelhi.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent text-sm transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  College / Alma Mater
                </label>
                <input
                  type="text"
                  placeholder="e.g. IIT Delhi, AIIMS"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Exam Cleared & Rank
                </label>
                <input
                  type="text"
                  placeholder="e.g. AIR 214 JEE Adv"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent text-sm transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Subjects / Expertise
                </label>
                <input
                  type="text"
                  placeholder="e.g. Power Systems, Physics"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Target Hourly Fee
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹999 / session"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent text-sm transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 px-4 rounded-xl font-semibold bg-brand-accent hover:bg-amber-400 text-black transition-all shadow-lg shadow-amber-400/20 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Award className="w-4 h-4 text-black" />
                  <span>Submit & Launch Mentor Dashboard</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-5">
            Already a registered mentor?{" "}
            <Link href="/login" className="text-brand-accent font-medium hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full text-center text-xs text-slate-500 mt-6">
        Verified IIT/NIT/AIIMS Senior Community · Seniorly Inc.
      </div>
    </div>
  );
}
