"use client";

import { studentDashboardData, mentorProfile } from "@/lib/mock-data";
import { ArrowRight, MessageSquare, Play, Download, Search, SearchCode, Target, Users, Video, BookOpen, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function StudentDashboard() {
  const { greeting, subtitle, goal, today, progress, nextMilestone, continueLearning, streak, recentActivity, resources } = studentDashboardData;

  // Donut chart logic for overall progress (simplified to simple CSS circular progress for now, using SVG)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (goal.progress / 100) * circumference;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      
      {/* Left Column (Main Content) */}
      <div className="flex-1 space-y-6 lg:max-w-[65%]">
        
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-[#1e293b] p-6 md:p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-90 z-0" />
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{greeting}</h1>
              <p className="text-slate-300">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your Goal */}
          <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-white">Your Goal</h2>
              <Link href="/student/study-plan" className="text-sm text-slate-400 hover:text-white">
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r={radius} className="stroke-[#1e293b]" strokeWidth="8" fill="none" />
                  <circle 
                    cx="40" cy="40" r={radius} 
                    className="stroke-brand-primary" 
                    strokeWidth="8" fill="none" strokeLinecap="round"
                    style={{ strokeDasharray: circumference, strokeDashoffset }}
                  />
                </svg>
                <div className="absolute text-xl font-bold text-white">{goal.progress}%</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white mb-1">{goal.title}</div>
                <div className="text-sm text-slate-400">On Track</div>
              </div>
            </div>
          </div>

          {/* Today */}
          <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Today</h2>
              <Link href="/student/calendar" className="text-sm text-brand-light hover:text-on-dark-accent">
                View Calendar &rarr;
              </Link>
            </div>
            <div className="bg-[#0a0e1a] rounded-lg p-3 border border-[#1e293b]">
              <div className="text-xs text-brand-accent font-medium mb-1">{today.time} • {today.type}</div>
              <div className="text-white font-medium mb-1">{today.title}</div>
              <div className="text-sm text-slate-400 mb-3">with {today.mentor}</div>
              <button className="w-full py-2 bg-cardrand-primary hover:bg-cardrand-light text-white rounded-lg text-sm font-medium transition-colors">
                Join Room
              </button>
            </div>
          </div>
        </div>

        {/* Your Progress */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Your Progress</h2>
          <div className="space-y-4">
            {progress.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{p.subject}</span>
                  <span className="text-slate-400">{p.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
                  <div className="h-full bg-cardrand-primary rounded-full" style={{ width: `${p.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Milestone */}
        <div className="bg-[#141b2d] rounded-xl border border-borderorderrand-accent/30 p-5 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-cardrand-accent/10 rounded-lg text-brand-accent">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Next Milestone</h3>
              <p className="text-sm text-slate-400">{nextMilestone}</p>
            </div>
          </div>
          <button className="shrink-0 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium border border-[#1e293b] transition-colors ml-4">
            Continue &rarr;
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Find a Mentor", icon: Users },
            { label: "Join a Room", icon: Video },
            { label: "Browse Resources", icon: BookOpen },
            { label: "Ask a Doubt", icon: HelpCircle },
          ].map((action, i) => (
            <button key={i} className="flex flex-col items-center justify-center p-4 bg-[#141b2d] border border-[#1e293b] rounded-xl hover:border-borderordermerald-500/50 transition-colors gap-2 group">
              <action.icon className="w-6 h-6 text-slate-400 group-hover:text-brand-light" />
              <span className="text-xs text-center text-slate-300 group-hover:text-white font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Continue Learning */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {continueLearning.map((item, i) => (
              <div key={i} className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{item.tag}</span>
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full",
                    item.type === "Live Room" ? "bg-red-500/10 text-red-500" : "bg-cardlue-500/10 text-blue-500"
                  )}>{item.type}</span>
                </div>
                <h3 className="text-white font-medium mb-1 truncate">{item.title}</h3>
                <div className="text-xs text-slate-400 mb-4">{item.time} • {item.students} students</div>
                <div className="mt-auto pt-2 border-t border-[#1e293b]">
                  <button className="w-full flex items-center justify-center gap-2 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    {item.type === "Live Room" ? "Join" : "Watch"} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column */}
      <div className="w-full lg:w-[35%] space-y-6">
        
        {/* Your Mentor */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Your Mentor</h2>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-800 border-borderorder border-borderorderrand-accent flex items-center justify-center text-2xl mb-3 text-white overflow-hidden">
              {/* Fallback avatar */}
              AM
            </div>
            <div className="flex items-center gap-1 mb-1">
              <h3 className="text-white font-bold text-lg">{mentorProfile.name}</h3>
              <div className="w-4 h-4 bg-cardlue-500 rounded-full flex items-center justify-center text-[10px] text-white">✓</div>
            </div>
            <p className="text-sm text-brand-accent mb-1">{mentorProfile.title}</p>
            <p className="text-xs text-slate-400 mb-4">⭐ {mentorProfile.rating} ({mentorProfile.students})</p>
            
            <div className="flex w-full gap-2">
              <button className="flex-1 py-2 bg-cardrand-primary hover:bg-cardrand-light text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> Message
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-[#0a0e1a] border border-[#1e293b] hover:bg-slate-800 rounded-lg text-green-500 transition-colors">
                <MessageSquare className="w-4 h-4" /> {/* Fake WhatsApp icon */}
              </button>
            </div>
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-orange-500">🔥</span> Study Streak
            </h2>
            <span className="text-sm font-medium text-slate-300">7 Days</span>
          </div>
          <p className="text-sm text-slate-400 mb-4">Keep going!</p>
          <div className="flex justify-between">
            {streak.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs",
                  s.completed ? "bg-cardrand-primary text-white" : "bg-[#1e293b] text-slate-500"
                )}>
                  {s.completed ? "✓" : ""}
                </div>
                <span className="text-xs text-slate-500">{s.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-200">{activity.title}</div>
                  <div className="text-xs text-slate-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Resources */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Resources</h2>
          <div className="space-y-3">
            {resources.map((res, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded-lg border border-[#1e293b]">
                <div className="flex items-center gap-3">
                  {res.type === 'pdf' ? (
                    <BookOpen className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Play className="w-4 h-4 text-blue-400" />
                  )}
                  <div>
                    <div className="text-sm text-slate-200">{res.title}</div>
                    <div className="text-xs text-slate-500">{res.size}</div>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Need Help? */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Need Help?</h2>
          <p className="text-sm text-slate-400 mb-4">Chat with your mentor or our support team.</p>
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium border border-[#1e293b] transition-colors">
            Get Support &rarr;
          </button>
        </div>

        <div className="text-center italic text-sm text-slate-500 mt-4">
          "{mentorProfile.quote}"
        </div>

      </div>
    </div>
  );
}
