"use client";

import { useAuth } from "@/lib/auth-context";
import { publicMentors } from "@/lib/mock-data";
import {
  ArrowRight,
  MessageSquare,
  Target,
  Users,
  Video,
  BookOpen,
  HelpCircle,
  Sparkles,
  Plus,
  CheckCircle2,
  Calendar,
  Compass
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function StudentDashboard() {
  const { user, assignMentor, updateSubjectProgress } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");

  const firstName = user?.name ? user.name.split(" ")[0] : "Student";
  const targetExam = user?.targetExam || "GATE CS 2027";
  const goalProgress = user?.goalProgress ?? 0;
  const isNewStudent = !user?.isDemo && !user?.assignedMentor;

  // Donut chart logic for overall progress
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (goalProgress / 100) * circumference;

  // Quick mentor assign from dashboard
  const handleSelectMentor = (mentor: typeof publicMentors[0]) => {
    assignMentor({
      id: mentor.id,
      name: mentor.name,
      initials: mentor.initials,
      title: mentor.title,
      rating: mentor.rating,
      students: mentor.students,
      price: mentor.price,
    });
    setSuccessMessage(`🎉 ${mentor.name} is now your active mentor!`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleIncrementProgress = (subjectName: string, current: number) => {
    updateSubjectProgress(subjectName, current + 15);
  };

  // Subjects fallback
  const subjects = user?.subjects || [
    { subject: "Data Structures & Algorithms", percentage: 0 },
    { subject: "Operating Systems & Databases", percentage: 0 },
    { subject: "Computer Networks", percentage: 0 },
    { subject: "Theory of Computation & Compiler", percentage: 0 },
  ];

  const sessions = user?.sessionsBooked || [];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Left Column (Main Content) */}
      <div className="flex-1 space-y-6 lg:max-w-[65%]">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#141b2d] to-slate-900 border border-[#1e293b] p-6 md:p-8 shadow-xl">
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-primary/20 text-brand-light border border-brand-primary/30">
                  {targetExam}
                </span>
                {isNewStudent && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Fresh Workspace
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Good Morning, {firstName} 👋
              </h1>
              <p className="text-slate-300 text-sm md:text-base">
                {isNewStudent
                  ? "Welcome to Seniorly! Let's build your mentorship plan and crack your exam."
                  : "Small steps every day lead to big results."}
              </p>
            </div>

            {isNewStudent && (
              <Link
                href="/mentors"
                className="shrink-0 px-4 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-brand-primary/20 flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Mentors</span>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your Goal */}
          <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-white">Your Goal</h2>
              <Link
                href="/student/settings"
                className="text-xs text-brand-light hover:underline flex items-center gap-1"
              >
                Edit Goal <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    className="stroke-[#1e293b]"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    className="stroke-brand-primary transition-all duration-700"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    style={{ strokeDasharray: circumference, strokeDashoffset }}
                  />
                </svg>
                <div className="absolute text-xl font-bold text-white">
                  {goalProgress}%
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white mb-1">
                  {targetExam}
                </div>
                <div className="text-xs text-slate-400">
                  {goalProgress > 0 ? "In Progress · On Track" : "Getting Started · Fresh Workspace"}
                </div>
                <div className="mt-2 text-[11px] text-brand-light font-medium">
                  {goalProgress === 0
                    ? "Click '+' on subjects below to track progress"
                    : `${goalProgress}% syllabus covered`}
                </div>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 flex flex-col justify-between shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Today's Schedule</h2>
              <Link
                href="/student/sessions"
                className="text-xs text-brand-light hover:text-white flex items-center gap-1"
              >
                All Sessions <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {sessions.length > 0 ? (
              <div className="bg-[#0a0e1a] rounded-xl p-3.5 border border-[#1e293b]">
                <div className="text-xs text-brand-accent font-semibold mb-1">
                  {sessions[0].time} • {sessions[0].type}
                </div>
                <div className="text-white font-medium mb-1 truncate">
                  {sessions[0].title}
                </div>
                <div className="text-xs text-slate-400 mb-3">
                  with {sessions[0].mentor}
                </div>
                <button className="w-full py-2 bg-brand-primary hover:bg-[#4338CA] text-white rounded-lg text-xs font-semibold transition-colors">
                  Join Room Now
                </button>
              </div>
            ) : (
              <div className="bg-[#0a0e1a] rounded-xl p-4 border border-[#1e293b] text-center my-auto">
                <Calendar className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-300 font-medium mb-1">
                  No sessions scheduled for today
                </p>
                <p className="text-[11px] text-slate-500 mb-3">
                  Book a 1:1 call with a senior or join a live room.
                </p>
                <Link
                  href="/mentors"
                  className="inline-block px-3 py-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-light hover:bg-brand-primary hover:text-white transition-all text-xs font-medium"
                >
                  Book 1:1 Session
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Your Progress */}
        <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Your Progress</h2>
              <p className="text-xs text-slate-400">
                Core subjects for {targetExam}
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Overall: {goalProgress}%
            </span>
          </div>

          <div className="space-y-4">
            {subjects.map((p, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-center text-xs sm:text-sm mb-1.5">
                  <span className="text-slate-300 font-medium">
                    {p.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold">{p.percentage}%</span>
                    <button
                      type="button"
                      title="Add 15% progress"
                      onClick={() => handleIncrementProgress(p.subject, p.percentage)}
                      className="w-5 h-5 rounded flex items-center justify-center bg-[#0a0e1a] border border-[#1e293b] text-slate-400 hover:text-brand-light hover:border-brand-light/50 transition-colors text-xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-[#0a0e1a] rounded-full overflow-hidden border border-[#1e293b]/50">
                  <div
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-light rounded-full transition-all duration-500"
                    style={{ width: `${p.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Milestone */}
        <div className="bg-[#141b2d] rounded-2xl border border-brand-accent/20 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-amber-400/10 rounded-xl text-brand-accent shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Next Milestone</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {user?.assignedMentor
                  ? `Upcoming milestone with ${user.assignedMentor.name}: Complete Topic Diagnostic & Strategy Call.`
                  : `Step 1: Choose a verified Senior Mentor for ${targetExam} and book your first call.`}
              </p>
            </div>
          </div>
          <Link
            href={user?.assignedMentor ? "/student/study-plan" : "/mentors"}
            className="shrink-0 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs sm:text-sm font-medium border border-[#1e293b] transition-colors"
          >
            {user?.assignedMentor ? "View Roadmap →" : "Choose Mentor →"}
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Find a Mentor", icon: Users, href: "/mentors" },
            { label: "Study Plan", icon: Target, href: "/student/study-plan" },
            { label: "Doubts & Q&A", icon: HelpCircle, href: "/student/sessions" },
            { label: "Preferences", icon: BookOpen, href: "/student/settings" },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="flex flex-col items-center justify-center p-4 bg-[#141b2d] border border-[#1e293b] rounded-2xl hover:border-brand-primary/50 transition-all gap-2 group shadow-sm hover:shadow-brand-primary/10"
            >
              <action.icon className="w-6 h-6 text-slate-400 group-hover:text-brand-light transition-colors" />
              <span className="text-xs text-center text-slate-300 group-hover:text-white font-medium">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-[35%] space-y-6">
        {/* Your Mentor Card */}
        <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Your Mentor</h2>
            {user?.assignedMentor && (
              <Link
                href="/mentors"
                className="text-xs text-slate-400 hover:text-white underline underline-offset-2"
              >
                Change
              </Link>
            )}
          </div>

          {user?.assignedMentor ? (
            /* Active Mentor View */
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-brand-accent flex items-center justify-center text-2xl mb-3 text-white font-bold shadow-lg">
                {user.assignedMentor.initials}
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="text-white font-bold text-lg">
                  {user.assignedMentor.name}
                </h3>
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white">
                  ✓
                </span>
              </div>
              <p className="text-xs text-brand-accent mb-1 font-medium">
                {user.assignedMentor.title}
              </p>
              <p className="text-xs text-slate-400 mb-4">
                ⭐ {user.assignedMentor.rating} ({user.assignedMentor.students})
              </p>

              <div className="flex w-full gap-2">
                <Link
                  href="/student/sessions"
                  className="flex-1 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" /> Message Mentor
                </Link>
              </div>
            </div>
          ) : (
            /* Fresh Student: No Mentor Assigned Yet (Custom Environment) */
            <div className="flex flex-col items-center text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-light mb-3">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                No Mentor Assigned Yet
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Connect with verified seniors from IITs, NITs, and AIIMS who cracked{" "}
                <span className="text-brand-light font-medium">{targetExam}</span>.
              </p>

              <Link
                href="/mentors"
                className="w-full py-2.5 bg-brand-accent hover:bg-amber-400 text-black font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20 mb-4 flex items-center justify-center gap-1.5"
              >
                <span>Browse All Mentors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Recommended Mentors Quick Pick */}
              <div className="w-full text-left pt-3 border-t border-[#1e293b]">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  Recommended for You:
                </p>
                <div className="space-y-2">
                  {publicMentors.slice(0, 2).map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a0e1a] border border-[#1e293b] hover:border-slate-600 transition-all text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0",
                            m.color
                          )}
                        >
                          {m.initials}
                        </div>
                        <div className="truncate">
                          <p className="font-semibold text-white truncate">{m.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{m.title}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectMentor(m)}
                        className="shrink-0 px-2.5 py-1 rounded-lg bg-brand-primary/20 text-brand-light hover:bg-brand-primary hover:text-white transition-colors text-[11px] font-medium"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Study Streak */}
        <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-orange-500">🔥</span> Study Streak
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {user?.streakDays || 1} {user?.streakDays === 1 ? "Day" : "Days"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            {user?.isDemo
              ? "Keep going! Great consistency this week."
              : "Day 1 of your journey! Consistency unlocks results."}
          </p>
          <div className="flex justify-between">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
              const isChecked = user?.isDemo ? idx < 6 : idx === 0;
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      isChecked
                        ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400 shadow-sm"
                        : "bg-[#0a0e1a] border border-[#1e293b] text-slate-600"
                    )}
                  >
                    {isChecked ? "✓" : ""}
                  </div>
                  <span className="text-[10px] text-slate-400">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {isNewStudent ? (
              <>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-brand-light mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-200 font-medium">
                      Registered on Seniorly Platform
                    </p>
                    <p className="text-[10px] text-slate-500">Just now</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-200 font-medium">
                      Target exam set to {targetExam}
                    </p>
                    <p className="text-[10px] text-slate-500">Just now</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-200 font-medium">
                      Personalized syllabus loaded
                    </p>
                    <p className="text-[10px] text-slate-500">Ready to start</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-200 font-medium">
                      Completed 'Network Theory - Quiz 2'
                    </p>
                    <p className="text-[10px] text-slate-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-200 font-medium">
                      Dr. Arjun Mehta replied to your doubt
                    </p>
                    <p className="text-[10px] text-slate-500">Yesterday</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
