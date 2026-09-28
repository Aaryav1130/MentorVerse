"use client";

import { studentSessions, studentDoubts } from "@/lib/mock-data";
import { BookOpen, FileText, PlaySquare, HelpCircle, CheckCircle2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = ["Upcoming", "Past Sessions", "Doubts", "Resources"];

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Sessions & Doubts</h1>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar border-b border-[#1e293b] mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              activeTab === tab
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Upcoming Sessions</h2>
          </div>

          <div className="space-y-4">
            {studentSessions.map((session) => (
              <div key={session.id} className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-block px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-slate-800 text-slate-300 uppercase mb-2">
                    {session.tag}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{session.title}</h3>
                  <p className="text-sm text-slate-400 mb-1">with {session.mentor}</p>
                  <p className="text-sm font-medium text-amber-400">{session.time}</p>
                </div>
                <button className="w-full md:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors">
                  Join Meeting
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-12 mb-4">
            <h2 className="text-xl font-bold text-white">Recent Doubts</h2>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Ask a Doubt &rarr;</button>
          </div>

          <div className="space-y-4">
            {studentDoubts.map((doubt) => (
              <div key={doubt.id} className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">{doubt.question}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-500">{doubt.time}</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> {doubt.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
            <h2 className="text-lg font-bold text-white mb-4">Study Resources</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Notes", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "PYQs", icon: BookOpen, color: "text-amber-400", bg: "bg-amber-500/10" },
                { label: "Video Lectures", icon: PlaySquare, color: "text-rose-400", bg: "bg-rose-500/10" },
                { label: "Practice Tests", icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              ].map((res, i) => (
                <button key={i} className="flex flex-col items-center justify-center p-4 bg-[#0a0e1a] border border-[#1e293b] rounded-xl hover:border-slate-600 transition-colors gap-3">
                  <div className={cn("p-3 rounded-full", res.bg)}>
                    <res.icon className={cn("w-6 h-6", res.color)} />
                  </div>
                  <span className="text-xs text-slate-300 font-medium text-center">{res.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 rounded-xl border border-emerald-500/20 p-6 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-white font-bold mb-2">Need quick help?</h3>
            <p className="text-sm text-slate-400 mb-4">Connect with an available mentor for an instant 15-min doubt session.</p>
            <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
              Find Mentor Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
