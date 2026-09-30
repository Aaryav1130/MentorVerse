"use client";

import { Plus, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { calendarSessions } from "@/lib/mock-data";

export default function SessionsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sessions</h1>
          <p className="text-slate-400">Join live classes, conduct 1:1 sessions and manage your calendar.</p>
        </div>
        <button className="flex items-center gap-2 bg-cardrand-primary hover:bg-cardrand-light text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Create Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Calendar Widget Column */}
        <div className="lg:col-span-1">
          <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">May 2025</h2>
              <div className="flex gap-2">
                <button className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#1e293b]"><ChevronLeft className="w-5 h-5"/></button>
                <button className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#1e293b]"><ChevronRight className="w-5 h-5"/></button>
              </div>
            </div>
            
            {/* Week row */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <div key={day} className="text-xs font-medium text-slate-500 py-1">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {[12, 13, 14, 15, 16, 17, 18].map(date => (
                <div 
                  key={date} 
                  className={`py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                    date === 13 ? 'bg-cardlue-500 text-white' : 'text-slate-300 hover:bg-[#1e293b]'
                  }`}
                >
                  {date}
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-[#1e293b]">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                <CalendarIcon className="w-4 h-4" />
                <span>Selected: <strong>Tuesday, 13 May</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white">Schedule for Today</h2>
          
          <div className="space-y-4">
            {calendarSessions.map(session => (
              <div key={session.id} className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:border-slate-700 transition-colors">
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    {session.isLive && (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        Live Now
                      </span>
                    )}
                    <span className="text-xs font-medium text-brand-accent bg-cardrand-accent/10 px-2.5 py-1 rounded-md">
                      {session.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white">{session.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {session.students} {session.students === 1 ? 'Student' : 'Students'}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {session.isLive || session.type === "Group Doubt" ? (
                    <button className="w-full md:w-auto px-6 py-2.5 bg-cardrand-primary hover:bg-cardrand-light text-white font-medium rounded-lg transition-colors">
                      Join Room
                    </button>
                  ) : (
                    <button className="w-full md:w-auto px-6 py-2.5 border border-[#1e293b] hover:bg-[#1e293b] text-white font-medium rounded-lg transition-colors">
                      View Details
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
