"use client";

import { getMentorById } from "@/lib/mock-data";
import {
  ArrowLeft,
  CheckCircle2,
  Star,
  Clock,
  Users,
  BookOpen,
  MessageSquare,
  Check,
  Calendar,
  Award,
  GraduationCap,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const TABS = ["About", "Experience", "Reviews"];

export default function MentorProfilePage() {
  const params = useParams();
  const mentorId =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : "m1";

  const mentor = getMentorById(mentorId);
  const [activeTab, setActiveTab] = useState("About");
  const [toast, setToast] = useState("");
  const { user, assignMentor, bookSession } = useAuth();
  const router = useRouter();

  const isAssigned =
    user?.assignedMentor?.id === mentor.id ||
    user?.assignedMentor?.name === mentor.name;

  const mentorAbout =
    mentor.bio || (mentor as any).about || "Verified Senior Mentor on Seniorly.";

  const handleBookSession = () => {
    assignMentor({
      id: mentor.id,
      name: mentor.name,
      initials: mentor.initials,
      title: mentor.title,
      rating: mentor.rating,
      students: mentor.students,
      price: mentor.price,
      college: mentor.college,
    });

    bookSession({
      id: `session-${Date.now()}`,
      title: `${mentor.name} · 1:1 Strategy & Doubt Session`,
      time: "Tomorrow · 6:00 PM",
      mentor: mentor.name,
      type: "1:1 Session",
    });

    setToast(`🎉 Session booked with ${mentor.name}! Added to your dashboard.`);
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
            <Link href="/mentors" className="text-sm font-medium text-white font-semibold">
              Mentors
            </Link>
            <Link
              href={user?.role === "student" ? "/student/dashboard" : "/login"}
              className="text-sm font-medium text-slate-400 hover:text-white"
            >
              For Students
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-400 hover:text-white">
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

          <div
            className={cn(
              "w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-[#0a0e1a] flex items-center justify-center text-4xl font-bold text-white shrink-0 relative z-10 shadow-xl",
              mentor.color || "bg-indigo-600"
            )}
          >
            {mentor.initials}
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-[#141b2d] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex-1 relative z-10 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 flex items-center gap-2">
                  {mentor.name}
                </h1>
                <p className="text-sm sm:text-base text-brand-light font-medium mb-3">
                  {mentor.title}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm mb-4">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Star className="w-4 h-4 fill-amber-400 text-brand-accent" />
                    <span className="font-bold text-white">{mentor.rating}</span>
                    <span className="text-slate-500">
                      ({mentor.students})
                    </span>
                  </div>
                  <div className="w-1 h-1 bg-slate-600 rounded-full hidden sm:block"></div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-4 h-4 text-slate-500" />
                    {mentor.experience}
                  </div>
                  <div className="w-1 h-1 bg-slate-600 rounded-full hidden sm:block"></div>
                  <div className="text-slate-400 flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-slate-500" />
                    {mentor.college}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {mentor.tags.map((tag) => (
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
                    {mentor.price}
                  </div>
                  <div className="text-xs text-slate-500">per 45-min 1:1 session</div>
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

        {/* Tab 1: About */}
        {activeTab === "About" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-lg font-bold text-white mb-3">About Me</h2>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {mentorAbout}
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">Subjects & Focus Areas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mentor.subjects.map((subject, idx) => (
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

            <div className="space-y-4">
              <div className="bg-[#141b2d] p-5 rounded-2xl border border-[#1e293b]">
                <h3 className="text-sm font-bold text-white mb-3">Availability</h3>
                <p className="text-xs text-slate-400 mb-2">{mentor.availability}</p>
                <p className="text-[11px] text-emerald-400 font-medium">● Slots open this week</p>
              </div>

              <div className="bg-[#141b2d] p-5 rounded-2xl border border-[#1e293b]">
                <h3 className="text-sm font-bold text-white mb-3">Mentor Quote</h3>
                <blockquote className="text-xs italic text-slate-300 border-l-2 border-brand-accent pl-3">
                  &quot;{mentor.quote}&quot;
                </blockquote>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Experience */}
        {activeTab === "Experience" && (
          <div className="space-y-6">
            <div className="bg-[#141b2d] p-6 rounded-2xl border border-[#1e293b]">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-accent" />
                Proven Track Record
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {mentor.experience} of competitive exam coaching and 1:1 mentorship. Successfully guided over {mentor.students} through personalized study roadmaps, topic diagnostics, and mock test analysis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1e293b]">
                <div>
                  <p className="text-xs text-slate-400">Alma Mater</p>
                  <p className="text-sm font-semibold text-white">{mentor.college}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Rank / Score</p>
                  <p className="text-sm font-semibold text-brand-accent">{mentor.title.split("·")[0]}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Total Students Guided</p>
                  <p className="text-sm font-semibold text-emerald-400">{mentor.students}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#141b2d] p-6 rounded-2xl border border-[#1e293b]">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-light" />
                Mentorship Methodology
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent font-bold">1.</span>
                  <span>Diagnostic review of your current preparation level and score pain-points.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent font-bold">2.</span>
                  <span>Custom weekly topic checklist with high-weightage topics prioritized.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent font-bold">3.</span>
                  <span>Test-taking strategy, question selection discipline, and speed optimization.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === "Reviews" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-[#141b2d] rounded-2xl border border-[#1e293b] mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-white">{mentor.rating}</div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">
                    Based on {mentor.reviews || 120} verified student reviews
                  </p>
                </div>
              </div>
            </div>

            {[
              {
                student: "Aaryav C.",
                exam: mentor.tags[0] || "Exam",
                comment: `Incredible session! The breakdown of complex concepts and realistic mock strategy gave me complete clarity.`,
                time: "2 days ago",
              },
              {
                student: "Ritika M.",
                exam: mentor.tags[0] || "Exam",
                comment: `Best mentor I've interacted with. Clear, structured, and no fluff. Identified my weak areas in 20 minutes.`,
                time: "1 week ago",
              },
              {
                student: "Kunal S.",
                exam: mentor.tags[1] || mentor.tags[0] || "Exam",
                comment: `The shortcuts and time management tips during the live room boosted my mock scores instantly.`,
                time: "2 weeks ago",
              },
            ].map((rev, i) => (
              <div
                key={i}
                className="bg-[#141b2d] p-5 rounded-2xl border border-[#1e293b] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                      {rev.student[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{rev.student}</p>
                      <p className="text-[10px] text-slate-400">{rev.exam} Aspirant</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  &quot;{rev.comment}&quot;
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
