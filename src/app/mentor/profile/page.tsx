"use client";

import { BadgeCheck, Star, Clock, Bell, IndianRupee, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { mentorProfile as demoProfile } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const isNewMentor = !user?.isDemo;
  const displayName = user?.name || demoProfile.name;
  const initials = user?.initials || demoProfile.initials;
  const college = user?.college || demoProfile.college;
  const rank = user?.rank || "AIR 214 · GATE EE";
  const headline = user?.headline || `${college} Senior Mentor · ${rank}`;
  const expertise = user?.expertise || demoProfile.expertise;
  const hourlyRate = user?.hourlyRate || "₹999 / session";
  const bio =
    user?.bio ||
    (isNewMentor
      ? `Senior mentor from ${college}. Cleared ${rank}. Passionate about sharing structured strategy, doubt resolution, and concept clarity with juniors.`
      : demoProfile.bio);

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Profile & Studio</h1>
          <p className="text-sm text-slate-400">Manage your credentials, expertise tags, and pricing.</p>
        </div>
        <Link
          href="/mentor/settings"
          className="px-4 py-2 bg-brand-primary hover:bg-[#4338CA] text-white font-semibold text-xs rounded-xl transition-colors"
        >
          Edit Profile & Rates
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-start shadow-xl">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-amber-500 text-black flex-shrink-0 flex items-center justify-center font-bold text-3xl sm:text-4xl shadow-xl border-4 border-[#0a0e1a]">
          {initials}
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {displayName}
                <BadgeCheck className="w-6 h-6 text-blue-400" />
              </h2>
              <p className="text-brand-accent font-medium text-sm mt-0.5">{headline}</p>
              <div className="flex items-center gap-3 mt-2 text-xs sm:text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-brand-accent fill-amber-500" />
                  {isNewMentor ? "5.0 (Fresh Profile)" : `${demoProfile.rating} (${demoProfile.reviews} reviews)`}
                </span>
                <span>•</span>
                <span>{college}</span>
                <span>•</span>
                <span>{rank}</span>
              </div>
            </div>
            <Link
              href="/mentor/settings"
              className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors"
            >
              Edit Profile
            </Link>
          </div>

          <div className="pt-4 border-t border-[#1e293b]">
            <h3 className="text-white font-medium text-sm mb-1.5">About Me</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {bio}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Expertise Section */}
          <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 shadow-lg">
            <h3 className="text-base font-bold text-white mb-4">Core Expertise & Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-[#0a0e1a] border border-[#1e293b] rounded-full text-xs text-slate-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Session Settings */}
          <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 space-y-5 shadow-lg">
            <h3 className="text-base font-bold text-white mb-2">Session Settings & Rates</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-white font-medium text-xs sm:text-sm">Availability Window</p>
                    <p className="text-xs text-slate-400 mt-0.5">Mon – Sat, 10:00 AM – 8:00 PM</p>
                  </div>
                </div>
                <Link href="/mentor/settings" className="text-brand-light text-xs hover:underline">
                  Edit
                </Link>
              </div>

              <div className="w-full h-px bg-[#1e293b]" />

              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <IndianRupee className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-white font-medium text-xs sm:text-sm">1:1 Session Pricing</p>
                    <p className="text-xs text-slate-400 mt-0.5">{hourlyRate}</p>
                  </div>
                </div>
                <Link href="/mentor/settings" className="text-brand-light text-xs hover:underline">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Support */}
        <div className="space-y-8">
          <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] overflow-hidden shadow-lg">
            <div className="p-6 border-b border-[#1e293b]">
              <h3 className="text-base font-bold text-white">Quick Settings</h3>
            </div>
            <div className="divide-y divide-[#1e293b]">
              <Link
                href="/mentor/settings"
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#101626] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="text-xs sm:text-sm text-slate-300">Notification & Alert Preferences</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              <Link
                href="/mentor/earnings"
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#101626] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <IndianRupee className="w-5 h-5 text-slate-400" />
                  <span className="text-xs sm:text-sm text-slate-300">Bank Account & Payout Setup</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              <div className="w-full p-4 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-slate-400" />
                  <span className="text-xs sm:text-sm text-slate-300">College Credential Verification</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 shadow-lg">
            <button
              type="button"
              onClick={logout}
              className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-xs sm:text-sm rounded-xl border border-red-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Mentor Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
