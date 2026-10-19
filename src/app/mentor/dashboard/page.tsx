"use client";

import { useState } from "react";
import {
  Users,
  Video,
  IndianRupee,
  FileText,
  User,
  CheckCircle,
  Plus,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn, formatCurrency } from "@/lib/utils";
import { mentorStats as demoStats, growthChartData, recentActivityMentor as demoActivity } from "@/lib/mock-data";
import { useAuth, MentorSessionItem } from "@/lib/auth-context";
import Link from "next/link";

export default function MentorDashboard() {
  const [chartTab, setChartTab] = useState("1Y");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState("GATE CS 2027 · DSA & Graph Traversal");
  const [newSessionTime, setNewSessionTime] = useState("Today · 7:00 PM – 8:00 PM");
  const [newSessionType, setNewSessionType] = useState("Group Class");
  const [toast, setToast] = useState("");

  const { user, addMentorSession } = useAuth();

  const isNewMentor = !user?.isDemo;
  const displayName = user?.name || "Dr. Arjun Mehta";
  const college = user?.college || "IIT Delhi";
  const rank = user?.rank || "AIR 214";

  const totalStudents = isNewMentor
    ? user?.mentorStats?.totalStudents ?? 0
    : demoStats.totalStudents.value;

  const activeRooms = isNewMentor
    ? user?.mentorStats?.activeRooms ?? 0
    : demoStats.activeRooms.value;

  const monthlyEarnings = isNewMentor
    ? user?.mentorStats?.monthlyEarnings ?? 0
    : demoStats.monthlyEarnings.value;

  const sessions = isNewMentor
    ? user?.mentorSessions || []
    : [
        {
          id: "1",
          title: "GATE EE 2027 – Power Systems",
          time: "10:00 AM - 11:00 AM",
          type: "Group Class",
          isLive: true,
        },
        {
          id: "2",
          title: "1:1 Session – Prince",
          time: "04:00 PM - 05:00 PM",
          type: "1:1 Session",
          isLive: false,
        },
      ];

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: MentorSessionItem = {
      id: `session-${Date.now()}`,
      title: newSessionTitle,
      time: newSessionTime,
      type: newSessionType,
      isLive: true,
    };
    addMentorSession(newSession);
    setShowCreateModal(false);
    setToast("🎉 Live room created and published to students!");
    setTimeout(() => setToast(""), 3500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent border border-brand-accent/30">
              Mentor Studio
            </span>
            {isNewMentor && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Fresh Workspace · {college} ({rank})
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5">
            Good Morning, {displayName} 👋
          </h1>
          <p className="text-slate-400 text-sm">
            {isNewMentor
              ? "Welcome to Seniorly! Set up your availability, pricing, and live room topics for aspirants."
              : "Here's what's happening with your mentorship today."}
          </p>
        </div>

        {isNewMentor && (
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="shrink-0 px-4 py-2.5 bg-brand-accent hover:bg-amber-400 text-black rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Live Room</span>
          </button>
        )}
      </div>

      {/* Motivational quote */}
      <div className="italic text-slate-400 border-l-2 border-brand-accent pl-4 py-1 text-sm">
        "A great mentor doesn't just teach, they build confidence."
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Students */}
        <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-md bg-brand-primary/10 text-brand-light border border-brand-primary/20">
              {isNewMentor ? "Ready for Bookings" : `↑ ${demoStats.totalStudents.trend}%`}
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mb-1">Total Students</p>
          <p className="text-3xl font-bold text-white">{totalStudents}</p>
        </div>

        {/* Active Rooms */}
        <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-light">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-md bg-brand-primary/10 text-brand-light border border-brand-primary/20">
              {isNewMentor ? "Studio Ready" : `↑ ${demoStats.activeRooms.trend}%`}
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mb-1">Active Rooms</p>
          <p className="text-3xl font-bold text-white">{activeRooms}</p>
        </div>

        {/* Monthly Earnings */}
        <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-brand-accent">
              <IndianRupee className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-md bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
              {isNewMentor ? "Payouts Active" : `↑ ${demoStats.monthlyEarnings.trend}%`}
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mb-1">Monthly Earnings</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(monthlyEarnings)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Sessions */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] overflow-hidden flex flex-col h-[400px] shadow-lg">
            <div className="p-5 border-b border-[#1e293b] flex items-center justify-between flex-shrink-0">
              <h2 className="text-base font-bold text-white">Today's Sessions</h2>
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="text-xs text-brand-accent hover:underline flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Slot</span>
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <div key={session.id} className="p-4 rounded-xl border border-[#1e293b] bg-[#0a0e1a]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[11px] font-semibold text-brand-accent bg-amber-400/10 px-2 py-0.5 rounded">
                        {session.type}
                      </span>
                      {session.isLive && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                          Live
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1">{session.title}</h3>
                    <p className="text-xs text-slate-400 mb-3">{session.time}</p>

                    {session.isLive ? (
                      <button className="w-full py-2 bg-brand-primary hover:bg-[#4338CA] text-white rounded-lg text-xs font-semibold transition-colors">
                        Enter Live Studio
                      </button>
                    ) : (
                      <button className="w-full py-2 border border-[#1e293b] hover:bg-[#1e293b] text-white rounded-lg text-xs font-medium transition-colors">
                        View Details
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <Calendar className="w-8 h-8 text-slate-500 mb-2" />
                  <p className="text-xs font-bold text-slate-300 mb-1">
                    No sessions scheduled today
                  </p>
                  <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                    Create a group class or open 1:1 availability slots for students.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-accent/20 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent hover:text-black transition-all text-xs font-semibold"
                  >
                    + Create First Session
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Chart & Growth */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 h-[400px] flex flex-col shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-white">Your Growth & Trajectory</h2>
                <p className="text-xs text-slate-400">
                  {isNewMentor ? "Setup roadmap & early milestone tracker" : "Monthly student sessions & bookings"}
                </p>
              </div>
              <div className="flex bg-[#0a0e1a] rounded-xl p-1 border border-[#1e293b]">
                {["1Y", "3M", "M"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setChartTab(tab)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-lg transition-colors font-medium",
                      chartTab === tab
                        ? "bg-[#141b2d] text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {isNewMentor ? (
              <div className="flex-1 flex flex-col justify-center bg-[#0a0e1a]/60 rounded-xl p-6 border border-[#1e293b]">
                <div className="flex items-center gap-2 mb-3 text-brand-accent font-semibold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Mentor Onboarding Checklist (2 of 3 Completed)</span>
                </div>

                <div className="space-y-3 text-xs mb-5">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Alma Mater ({college}) & Rank verified and published</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Hourly session rate set to {user?.hourlyRate || "₹999 / session"}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    </div>
                    <span>Conduct your first student live session to unlock growth analytics</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/mentor/profile"
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold border border-[#1e293b] transition-colors"
                  >
                    Review Public Profile →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Host a Class Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#141b2d", borderColor: "#1e293b", color: "#fff", borderRadius: "12px" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Area type="monotone" dataKey="students" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorStudents)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 shadow-lg">
        <h2 className="text-base font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-5">
          {isNewMentor ? (
            <>
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">
                    Mentor Account Verified & Published
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your profile is live in Seniorly's Verified Mentor Directory.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Just now</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-brand-accent shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">
                    Credentials Linked: {college} ({rank})
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Students targeting competitive exams can now find you in searches.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Just now</p>
                </div>
              </div>
            </>
          ) : (
            demoActivity.map((activity, idx) => {
              const Icon = activity.icon === "FileText" ? FileText : activity.icon === "User" ? User : CheckCircle;
              const isLast = idx === demoActivity.length - 1;
              return (
                <div key={activity.id} className="relative flex gap-4">
                  {!isLast && (
                    <div className="absolute top-10 left-4.5 w-px h-full -ml-px bg-[#1e293b]"></div>
                  )}
                  <div className="w-9 h-9 rounded-xl bg-[#0a0e1a] border border-[#1e293b] flex items-center justify-center text-slate-400 z-10 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="pt-1">
                    <p className="text-white text-xs sm:text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2">Create a Live Session / Room</h3>
            <p className="text-xs text-slate-400 mb-6">
              Publish a live room slot for students to join or book.
            </p>

            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Session Title
                </label>
                <input
                  type="text"
                  required
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Time & Duration
                </label>
                <input
                  type="text"
                  required
                  value={newSessionTime}
                  onChange={(e) => setNewSessionTime(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Class Type
                </label>
                <div className="flex gap-2">
                  {["Group Class", "1:1 Session", "Doubt Room"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewSessionType(t)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        newSessionType === t
                          ? "bg-brand-accent text-black font-semibold border-brand-accent"
                          : "text-slate-400 border-[#1e293b] hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1e293b]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-accent hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-400/20"
                >
                  Publish Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
