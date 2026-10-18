"use client";

import { mentorProfile } from "@/lib/mock-data";
import { ArrowLeft, CheckCircle2, Star, Clock, Users, BookOpen, MessageSquare, Check, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const TABS = ["About", "Experience", "Reviews"];

export default function MentorProfilePage() {
  const [activeTab, setActiveTab] = useState("About");
  const [toast, setToast] = useState("");
  const { user, assignMentor, bookSession } = useAuth();
  const router = useRouter();

  const isAssigned = user?.assignedMentor?.name === mentorProfile.name;

  const handleBookSession = () => {
    assignMentor({
      id: "m1",
      name: mentorProfile.name,
      initials: mentorProfile.initials,
      title: mentorProfile.title,
      rating: mentorProfile.rating,
      students: mentorProfile.students,
      price: mentorProfile.price,
      college: mentorProfile.college,
    });

    bookSession({
      id: `session-${Date.now()}`,
      title: `${mentorProfile.name} · 1:1 Strategy & Doubt Session`,
      time: "Tomorrow · 6:00 PM",
      mentor: mentorProfile.name,
      type: "1:1 Session",
    });

    setToast(`🎉 Session booked with ${mentorProfile.name}! Added to your dashboard.`);
    setTimeout(() => {
      setToast("");
      router.push("/student/dashboard");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] font-sans pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0e1a]/80 backdrop-blur border-b border-[#1e293b]">
        <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto justify-between">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <img
              src="/brand/seniorly-logo-on-dark.svg"
              alt="Seniorly Logo"
              className="h-8 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white">
              Home
            </Link>
            <Link href="/mentors" className="text-sm font-medium text-white">
              Mentors
            </Link>
            <Link
              href={user?.role === "student" ? "/student/dashboard" : "/login"}
              className="text-sm font-medium text-slate-400 hover:text-white"
            >
              For Students
            </Link>
            <Link href="#" className="text-sm font-medium text-slate-400 hover:text-white">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href={user?.role === "student" ? "/student/dashboard" : "/login"}
              className="px-4 py-2 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors"
            >
              {user ? "Dashboard" : "Log In"}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/mentors"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Mentors
        </Link>

        {/* Profile Header */}
        <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-20 -mt-20 z-0" />

          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-slate-800 border-4 border-[#0a0e1a] flex items-center justify-center text-4xl font-bold text-white shrink-0 relative z-10 shadow-xl">
            {mentorProfile.initials}
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-[#141b2d] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex-1 relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 flex items-center gap-2">
                  {mentorProfile.name}
                </h1>
                <p className="text-sm sm:text-base text-brand-light font-medium mb-3">
                  {mentorProfile.title}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm mb-4">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Star className="w-4 h-4 fill-amber-400 text-brand-accent" />
                    <span className="font-bold text-white">{mentorProfile.rating}</span>
                    <span className="text-slate-500">
                      ({mentorProfile.students} students)
                    </span>
                  </div>
                  <div className="w-1 h-1 bg-slate-600 rounded-full hidden sm:block"></div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-4 h-4 text-slate-500" />
                    {mentorProfile.experience}
                  </div>
                  <div className="w-1 h-1 bg-slate-600 rounded-full hidden sm:block"></div>
                  <div className="text-slate-400">
                    {mentorProfile.college}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {mentorProfile.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0 bg-[#0a0e1a] p-5 rounded-2xl border border-[#1e293b] text-center">
                <div className="mb-1">
                  <div className="text-2xl font-bold text-white">
                    {mentorProfile.price}
                  </div>
                  <div className="text-xs text-slate-500">per 45-min session</div>
                </div>

                <button
                  type="button"
                  onClick={handleBookSession}
                  className="w-full px-6 py-3 bg-brand-accent hover:bg-amber-400 text-black rounded-xl font-bold text-sm transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isAssigned ? "Book Next Session" : "Choose as My Mentor"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex border-b border-[#1e293b] mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-3.5 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab
                  ? "border-brand-primary text-brand-light font-semibold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-lg font-bold text-white mb-3">About Me</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {mentorProfile.about}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">Subjects & Focus Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mentorProfile.subjects.map((subject, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-slate-300 bg-[#141b2d] p-3 rounded-xl border border-[#1e293b]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-light shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{subject}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Quick Stats Column */}
          <div className="space-y-4">
            <div className="bg-[#141b2d] p-5 rounded-2xl border border-[#1e293b]">
              <h3 className="text-sm font-bold text-white mb-3">Availability</h3>
              <p className="text-xs text-slate-400 mb-2">{mentorProfile.availability}</p>
              <p className="text-[11px] text-emerald-400 font-medium">● 3 slots open today</p>
            </div>

            <div className="bg-[#141b2d] p-5 rounded-2xl border border-[#1e293b]">
              <h3 className="text-sm font-bold text-white mb-3">Mentor Advice</h3>
              <blockquote className="text-xs italic text-slate-300 border-l-2 border-brand-accent pl-3">
                "{mentorProfile.quote}"
              </blockquote>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
