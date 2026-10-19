"use client";

import { useState, useEffect } from "react";
import { useAuth, DEMO_MENTOR } from "@/lib/auth-context";
import {
  User,
  Briefcase,
  IndianRupee,
  Clock,
  Save,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  BookOpen
} from "lucide-react";

export default function MentorSettingsPage() {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [college, setCollege] = useState(user?.college || "IIT Delhi");
  const [rank, setRank] = useState(user?.rank || "AIR 214");
  const [hourlyRate, setHourlyRate] = useState(user?.hourlyRate || "₹999 / session");
  const [expertiseInput, setExpertiseInput] = useState(
    user?.expertise?.join(", ") || "Power Systems, Network Theory, Coding & DSA"
  );
  const [bio, setBio] = useState(
    user?.bio ||
      `Senior mentor from ${user?.college || "IIT"}. Passionate about helping aspirants build clear concepts, solve PYQs, and crack competitive exams.`
  );
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.college) setCollege(user.college);
      if (user.rank) setRank(user.rank);
      if (user.hourlyRate) setHourlyRate(user.hourlyRate);
      if (user.expertise) setExpertiseInput(user.expertise.join(", "));
      if (user.bio) setBio(user.bio);
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const initials =
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "M";

    const parsedExpertise = expertiseInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    updateUserProfile({
      name,
      email,
      college,
      rank,
      hourlyRate,
      expertise: parsedExpertise,
      bio,
      initials,
      headline: `${college} Senior Mentor · ${rank}`,
    });

    setToast("Mentor settings saved successfully!");
    setTimeout(() => setToast(""), 3500);
  };

  const handleResetToFresh = () => {
    updateUserProfile({
      isDemo: false,
      mentorStats: { totalStudents: 0, activeRooms: 0, monthlyEarnings: 0 },
      mentorSessions: [],
    });
    setToast("Reset to a completely clean, fresh mentor workspace!");
    setTimeout(() => setToast(""), 3500);
  };

  const handleLoadDemo = () => {
    updateUserProfile({
      ...DEMO_MENTOR,
    });
    setToast("Loaded pre-saved Demo Mentor (Dr. Arjun Mehta) profile!");
    setTimeout(() => setToast(""), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-brand-accent text-black px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Mentor Studio Settings
        </h1>
        <p className="text-sm text-slate-400">
          Configure your public mentor profile, credential verifications, and session pricing.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Details Card */}
        <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1e293b]">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-brand-accent">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Mentor Identity</h2>
              <p className="text-xs text-slate-400">Your verified name, college, and rank</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                College / Institution / Alma Mater
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Exam Cleared & Rank
              </label>
              <input
                type="text"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                About Me / Bio
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Subjects Card */}
        <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1e293b]">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-light">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Pricing & Subject Expertise</h2>
              <p className="text-xs text-slate-400">Set what you teach and your hourly session rates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Session Rate (Hourly)
              </label>
              <input
                type="text"
                placeholder="e.g. ₹999 / session"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Subjects Taught (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Coding & DSA, Operating Systems, Math"
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-accent hover:bg-amber-400 text-black font-bold text-sm transition-all shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Mentor Settings</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleResetToFresh}
              title="Clean all pre-loaded demo stats"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#141b2d] border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clean / Reset to Scratch</span>
            </button>

            <button
              type="button"
              onClick={handleLoadDemo}
              title="Load pre-saved Dr. Arjun Mehta profile"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#141b2d] border border-[#1e293b] text-slate-400 hover:text-white text-xs font-medium transition-colors"
            >
              <span>Load Demo (Dr. Arjun Mehta)</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
