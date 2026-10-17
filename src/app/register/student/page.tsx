"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, GraduationCap, Sparkles, Check } from "lucide-react";

const EXAMS = [
  "JEE Advanced",
  "JEE Mains",
  "NEET UG",
  "GATE EE",
  "GATE CS",
  "UPSC CSE",
  "CAT",
  "Academics / College",
];

export default function StudentRegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetExam, setTargetExam] = useState("GATE EE");
  const [targetYear, setTargetYear] = useState("2027");
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
        role: "student",
        password,
        targetExam: `${targetExam} ${targetYear}`,
      });
      router.push("/student/dashboard");
    } catch {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await register({
        name: name || "Student Aspirant",
        email: email || "student@gmail.com",
        role: "student",
        targetExam: `${targetExam} ${targetYear}`,
      });
      router.push("/student/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-brand-primary/20 blur-[130px] pointer-events-none" />

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
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-light">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-light">
                Student Registration
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Start Learning from Toppers
              </h1>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Google 1-Tap Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
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

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-[#1e293b] w-full" />
            <span className="bg-[#141b2d] px-3 text-xs text-slate-500 uppercase tracking-wider">
              Or sign up with email
            </span>
            <div className="border-t border-[#1e293b] w-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Prince Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary text-sm transition-colors"
              />
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
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary text-sm transition-colors"
              />
            </div>

            {/* Target Exam Selection */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-300 mb-2">
                What exam are you targeting?
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {EXAMS.map((exam) => (
                  <button
                    key={exam}
                    type="button"
                    onClick={() => setTargetExam(exam)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                      targetExam === exam
                        ? "bg-brand-primary text-white border-brand-primary"
                        : "bg-[#0a0e1a] text-slate-400 border-[#1e293b] hover:border-slate-600"
                    }`}
                  >
                    {targetExam === exam && <Check className="w-3 h-3 text-white" />}
                    <span>{exam}</span>
                  </button>
                ))}
              </div>

              {/* Target Year */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">Target Year:</span>
                {["2025", "2026", "2027"].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setTargetYear(yr)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                      targetYear === yr
                        ? "bg-brand-light/20 text-brand-light border-brand-light"
                        : "text-slate-400 border-[#1e293b] hover:text-white"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 px-4 rounded-xl font-semibold bg-brand-primary hover:bg-[#4338CA] text-white transition-all shadow-lg shadow-brand-primary/25 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Create Account & Go to Student Dashboard</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-light font-medium hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full text-center text-xs text-slate-500 mt-6">
        Protected with 256-bit SSL encryption · Seniorly Inc.
      </div>
    </div>
  );
}
