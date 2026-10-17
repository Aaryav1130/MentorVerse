"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";

export default function RegisterRoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<"student" | "mentor">("student");

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[-150px] left-[-150px] w-96 h-96 rounded-full bg-[#4F46E5]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-150px] w-96 h-96 rounded-full bg-[#FBBF24]/10 blur-[120px] pointer-events-none" />

      {/* Top Header & Logo */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/brand/seniorly-logo-on-dark.svg"
            alt="Seniorly Logo"
            className="h-8 w-auto transition-transform group-hover:scale-105"
          />
        </Link>
        <div className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-brand-light hover:text-white font-medium underline underline-offset-4 transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Center Content */}
      <div className="max-w-4xl mx-auto w-full my-auto py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-light border border-brand-primary/20 mb-4">
            Step 1 of 2 · Choose Your Journey
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            How do you plan to use <span className="text-brand-light">Seniorly</span>?
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Personalize your experience. Choose your role to access the right tools, mentors, and dashboard.
          </p>
        </div>

        {/* 2 Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Student Card */}
          <div
            onClick={() => setSelectedRole("student")}
            className={`relative rounded-2xl p-6 sm:p-8 cursor-pointer transition-all border ${
              selectedRole === "student"
                ? "bg-[#141b2d] border-brand-primary shadow-[0_0_30px_-5px_rgba(79,70,229,0.35)] ring-2 ring-brand-primary/60"
                : "bg-[#101626]/70 border-[#1e293b] hover:border-slate-600 hover:bg-[#141b2d]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-light">
                <GraduationCap className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-light/10 text-brand-light border border-brand-light/20">
                Aspirant / Learner
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              I am a Student
              {selectedRole === "student" && (
                <CheckCircle2 className="w-5 h-5 text-brand-light inline" />
              )}
            </h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Crack JEE, NEET, GATE, UPSC, or CAT with direct guidance from seniors who cleared it. Book 1:1 calls, attend live rooms, and track your study roadmap.
            </p>

            <div className="space-y-2.5 pt-4 border-t border-[#1e293b]/80 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Learn from verified AIR rankers from IITs & AIIMS</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Personalized study roadmap & goal progress tracking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Live 1:1 and group doubt resolution sessions</span>
              </div>
            </div>
          </div>

          {/* Mentor Card */}
          <div
            onClick={() => setSelectedRole("mentor")}
            className={`relative rounded-2xl p-6 sm:p-8 cursor-pointer transition-all border ${
              selectedRole === "mentor"
                ? "bg-[#141b2d] border-brand-accent shadow-[0_0_30px_-5px_rgba(251,191,36,0.25)] ring-2 ring-brand-accent/60"
                : "bg-[#101626]/70 border-[#1e293b] hover:border-slate-600 hover:bg-[#141b2d]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-brand-accent">
                <Briefcase className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/10 text-brand-accent border border-amber-400/20">
                Senior / Topper
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              I am a Mentor
              {selectedRole === "mentor" && (
                <CheckCircle2 className="w-5 h-5 text-brand-accent inline" />
              )}
            </h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              You’ve cleared a top competitive exam or study at an elite institution. Guide the next batch of aspirants, host sessions, and earn flexible income.
            </p>

            <div className="space-y-2.5 pt-4 border-t border-[#1e293b]/80 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Set your own rates & available calendar slots</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Integrated live room, chat & earnings analytics</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Verified Senior badge & direct student bookings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/register/${selectedRole}`}
            className={`w-full sm:w-auto min-w-[280px] text-center px-8 py-3.5 rounded-full font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
              selectedRole === "student"
                ? "bg-brand-primary hover:bg-[#4338CA] text-white shadow-brand-primary/30"
                : "bg-brand-accent hover:bg-amber-400 text-black shadow-amber-400/20"
            }`}
          >
            <span>Continue as {selectedRole === "student" ? "Student" : "Mentor"}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500">
        By joining Seniorly, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
}
