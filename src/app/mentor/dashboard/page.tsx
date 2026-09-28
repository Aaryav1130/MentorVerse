"use client";

import { useState } from "react";
import { Users, Video, DollarSign, IndianRupee, FileText, User, CheckCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn, formatCurrency } from "@/lib/utils";
import { mentorProfile, mentorStats, todaysSessions, recentActivityMentor, growthChartData } from "@/lib/mock-data";

export default function MentorDashboard() {
  const [chartTab, setChartTab] = useState("1Y");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Good Morning, {mentorProfile.name} 👋</h1>
        <p className="text-slate-400">Here's what's happening with your mentorship today.</p>
      </div>

      {/* Motivational quote */}
      <div className="italic text-slate-400 border-l-2 border-amber-500 pl-4 py-1">
        "A great mentor doesn't just teach, they build confidence."
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Students */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-md">
              ↑ {mentorStats.totalStudents.trend}%
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Total Students</p>
          <p className="text-3xl font-bold text-white">{mentorStats.totalStudents.value}</p>
        </div>

        {/* Active Rooms */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-md">
              ↑ {mentorStats.activeRooms.trend}%
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Active Rooms</p>
          <p className="text-3xl font-bold text-white">{mentorStats.activeRooms.value}</p>
        </div>

        {/* Monthly Earnings */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
              <IndianRupee className="w-6 h-6" />
            </div>
            <span className="text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-md">
              ↑ {mentorStats.monthlyEarnings.trend}%
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Monthly Earnings</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(mentorStats.monthlyEarnings.value)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Sessions & Activity */}
        <div className="lg:col-span-1 space-y-8">
          {/* Today's Sessions */}
          <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] overflow-hidden flex flex-col h-[400px]">
            <div className="p-6 border-b border-[#1e293b] flex-shrink-0">
              <h2 className="text-lg font-semibold text-white">Today's Sessions</h2>
            </div>
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {todaysSessions.map((session) => (
                <div key={session.id} className="p-4 rounded-xl border border-[#1e293b] bg-[#0a0e1a]">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
                      {session.type}
                    </span>
                    {session.isLive && (
                      <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        Live
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-white mb-1">{session.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{session.time}</p>
                  
                  {session.isLive ? (
                    <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
                      Join Room
                    </button>
                  ) : (
                    <button className="w-full py-2 border border-[#1e293b] hover:bg-[#1e293b] text-white rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chart & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Your Growth Chart */}
          <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6 h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Your Growth</h2>
              <div className="flex bg-[#0a0e1a] rounded-lg p-1 border border-[#1e293b]">
                {['1Y', '3M', 'M'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setChartTab(tab)}
                    className={cn(
                      "px-4 py-1 text-sm rounded-md transition-colors",
                      chartTab === tab ? "bg-[#141b2d] text-white" : "text-slate-400 hover:text-white"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141b2d', borderColor: '#1e293b', color: '#fff', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorStudents)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Recent Activity</h2>
        <div className="space-y-6">
          {recentActivityMentor.map((activity, idx) => {
            const Icon = activity.icon === 'FileText' ? FileText : activity.icon === 'User' ? User : CheckCircle;
            const isLast = idx === recentActivityMentor.length - 1;
            return (
              <div key={activity.id} className="relative flex gap-4">
                {!isLast && (
                  <div className="absolute top-10 left-5 w-px h-full -ml-px bg-[#1e293b]"></div>
                )}
                <div className="w-10 h-10 rounded-full bg-[#0a0e1a] border border-[#1e293b] flex items-center justify-center text-slate-400 z-10 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="pt-2">
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-sm text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
