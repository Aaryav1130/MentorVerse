"use client";

import { useState, useEffect } from "react";
import { useAuth, getDefaultSubjectsForExam, DEMO_STUDENT } from "@/lib/auth-context";
import {
  User,
  Target,
  Bell,
  Save,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Compass,
  Briefcase
} from "lucide-react";
import Link from "next/link";

const EXAMS = [
  "GATE CS",
  "GATE EE",
  "JEE Advanced",
  "JEE Mains",
  "NEET UG",
  "UPSC CSE",
  "CAT",
];

export default function StudentSettingsPage() {
  const { user, updateUserProfile, assignMentor, removeMentor } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [college, setCollege] = useState(user?.college || "");
  const [bio, setBio] = useState(
    user?.bio || "Hardworking aspirant aiming for a top rank."
  );
  const [targetExam, setTargetExam] = useState(
    user?.targetExam?.split(" ")[0] || "GATE CS"
  );
  const [targetYear, setTargetYear] = useState(
    user?.targetExam?.split(" ")[1] || "2027"
  );
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.phone) setPhone(user.phone);
      if (user.college) setCollege(user.college);
      if (user.bio) setBio(user.bio);
      if (user.targetExam) {
        const parts = user.targetExam.split(" ");
        setTargetYear(parts[parts.length - 1] || "2027");
        setTargetExam(parts.slice(0, -1).join(" ") || parts[0] || "GATE CS");
      }
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const fullExamString = `${targetExam} ${targetYear}`;
    const initials =
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "S";

    // If exam changed and user had default subjects, update syllabus to match new exam
    const hasExamChanged = user?.targetExam !== fullExamString;
    const subjects =
      hasExamChanged && !user?.isDemo
        ? getDefaultSubjectsForExam(fullExamString)
        : user?.subjects;

    updateUserProfile({
      name,
      email,
      phone,
      college,
      bio,
      targetExam: fullExamString,
      initials,
      subjects,
    });

    setToast("Settings saved successfully!");
    setTimeout(() => setToast(""), 3500);
  };

  const handleResetToFresh = () => {
    const fullExamString = `${targetExam} ${targetYear}`;
    updateUserProfile({
      isDemo: false,
      assignedMentor: null,
      goalProgress: 0,
      streakDays: 1,
      subjects: getDefaultSubjectsForExam(fullExamString),
      sessionsBooked: [],
    });
    setToast("Reset to a completely clean, fresh environment!");
    setTimeout(() => setToast(""), 3500);
  };

  const handleLoadDemo = () => {
    updateUserProfile({
      ...DEMO_STUDENT,
    });
    setToast("Loaded pre-saved Demo Student (Prince) environment!");
    setTimeout(() => setToast(""), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-brand-primary text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Student Settings & Environment
        </h1>
        <p className="text-sm text-slate-400">
          Configure your personal details, target exam goals, and mentorship preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details Card */}
        <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1e293b]">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-light">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Profile Information</h2>
              <p className="text-xs text-slate-400">Your public and session identity</p>
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
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
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
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Phone / WhatsApp (for session reminders)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                College / University / School
              </label>
              <input
                type="text"
                placeholder="e.g. Delhi Technological University"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Aspiration / Bio
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Exam & Mentorship Goals */}
        <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1e293b]">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-brand-accent">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Target Exam & Study Syllabus</h2>
              <p className="text-xs text-slate-400">
                Determines which mentors, subjects, and study milestones appear on your dashboard
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Target Exam
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {EXAMS.map((exam) => (
                  <button
                    key={exam}
                    type="button"
                    onClick={() => setTargetExam(exam)}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                      targetExam === exam
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-[#0a0e1a] text-slate-400 border-[#1e293b] hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Target Year
              </label>
              <div className="flex gap-2">
                {["2025", "2026", "2027", "2028"].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setTargetYear(yr)}
                    className={`text-xs px-4 py-2 rounded-xl border transition-all ${
                      targetYear === yr
                        ? "bg-brand-light/20 text-brand-light border-brand-light"
                        : "bg-[#0a0e1a] text-slate-400 border-[#1e293b] hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Mentor Section */}
        <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1e293b]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Active Mentor</h2>
                <p className="text-xs text-slate-400">Your dedicated senior guide</p>
              </div>
            </div>

            <Link
              href={`/mentors?exam=${encodeURIComponent(user?.targetExam?.split(" ")[0] || "")}`}
              className="px-3.5 py-1.5 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-light hover:bg-brand-primary hover:text-white text-xs font-medium transition-colors"
            >
              Browse Mentors
            </Link>
          </div>

          {user?.assignedMentor ? (
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0a0e1a] border border-[#1e293b]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-brand-accent flex items-center justify-center text-white font-bold text-sm">
                  {user.assignedMentor.initials}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {user.assignedMentor.name}
                  </h3>
                  <p className="text-xs text-brand-accent">
                    {user.assignedMentor.title}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    ⭐ {user.assignedMentor.rating} ({user.assignedMentor.students})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeMentor}
                className="text-xs text-red-400 hover:text-red-300 hover:underline"
              >
                Remove Mentor
              </button>
            </div>
          ) : (
            <div className="text-center py-6 bg-[#0a0e1a] rounded-xl border border-dashed border-[#1e293b]">
              <p className="text-sm text-slate-300 font-medium mb-1">
                No mentor assigned yet
              </p>
              <p className="text-xs text-slate-500 mb-3">
                Choose a senior to unlock 1:1 strategy calls and roadmaps.
              </p>
              <Link
                href={`/mentors?exam=${encodeURIComponent(user?.targetExam?.split(" ")[0] || "")}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-accent hover:bg-amber-400 text-black font-semibold text-xs transition-colors shadow-sm"
              >
                <Compass className="w-4 h-4" />
                <span>Choose a Mentor Now</span>
              </Link>
            </div>
          )}
        </div>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-primary hover:bg-[#4338CA] text-white font-semibold text-sm transition-all shadow-lg shadow-brand-primary/25 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleResetToFresh}
              title="Clean all pre-loaded data"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#141b2d] border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clean / Reset to Scratch</span>
            </button>

            <button
              type="button"
              onClick={handleLoadDemo}
              title="Load pre-saved Prince profile"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#141b2d] border border-[#1e293b] text-slate-400 hover:text-white text-xs font-medium transition-colors"
            >
              <span>Load Demo (Prince)</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
