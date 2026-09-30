"use client";

import { mentorProfile } from "@/lib/mock-data";
import { ArrowLeft, CheckCircle2, Star, Clock, Users, BookOpen, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = ["About", "Experience", "Reviews"];

export default function MentorProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("About");
  
  return (
    <div className="min-h-screen bg-[#0a0e1a] font-sans pb-20">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0e1a]/80 backdrop-blur border-border border-[#1e293b]">
        <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cardrand-accent font-bold text-black">
              M
            </div>
            <span className="font-bold text-white hidden sm:inline-block">
              MentorVerse
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white">Home</Link>
            <Link href="/mentors" className="text-sm font-medium text-white">Mentors</Link>
            <Link href="/for-students" className="text-sm font-medium text-slate-400 hover:text-white">For Students</Link>
            <Link href="/about" className="text-sm font-medium text-slate-400 hover:text-white">About</Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white hover:text-slate-200">Login</Link>
            <button className="px-4 py-2 bg-cardrand-primary hover:bg-cardrand-light text-white rounded-lg text-sm font-medium transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        <Link href="/mentors" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Mentors
        </Link>

        {/* Profile Header */}
        <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
          {/* Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cardrand-primary/5 rounded-full blur-3xl -mr-20 -mt-20 z-0" />
          
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-800 border-4 border-[#0a0e1a] flex items-center justify-center text-5xl font-bold text-white shrink-0 relative z-10 shadow-xl">
            {/* Fallback initials */}
            AM
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-cardlue-500 rounded-full border-border border-[#141b2d] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex-1 relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                  {mentorProfile.name}
                </h1>
                <p className="text-lg text-brand-light font-medium mb-4">{mentorProfile.title}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Star className="w-4 h-4 fill-amber-400 text-brand-accent" /> 
                    <span className="font-bold text-white">{mentorProfile.rating}</span> 
                    <span className="text-slate-500">({mentorProfile.students} students)</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-600 rounded-full hidden sm:block"></div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-4 h-4 text-slate-500" /> {mentorProfile.experience}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mentorProfile.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0 bg-[#0a0e1a] p-4 rounded-xl border border-[#1e293b]">
                <div className="text-center mb-1">
                  <div className="text-2xl font-bold text-white">{mentorProfile.price}</div>
                  <div className="text-xs text-slate-500">per 45-min session</div>
                </div>
                <button className="w-full px-8 py-3 bg-cardrand-primary hover:bg-cardrand-light text-white rounded-lg font-bold transition-colors shadow-lg shadow-brand-primary/20">
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex border-border border-[#1e293b] mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-4 text-sm font-medium border-border-2 transition-colors",
                activeTab === tab
                  ? "border-bordermerald-500 text-brand-light"
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
              <h2 className="text-xl font-bold text-white mb-4">About Me</h2>
              <p className="text-slate-300 leading-relaxed">
                {mentorProfile.about}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Subjects I Teach</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mentorProfile.subjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300 bg-[#141b2d] p-3 rounded-lg border border-[#1e293b]">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-sm">{subject}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-4">
            <div className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-5">
              <h3 className="font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"><Clock className="w-4 h-4 text-slate-400" /></div>
                  <div>
                    <div className="font-medium text-white">{mentorProfile.experience}</div>
                    <div className="text-xs text-slate-500">Mentoring</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"><Users className="w-4 h-4 text-slate-400" /></div>
                  <div>
                    <div className="font-medium text-white">{mentorProfile.students}</div>
                    <div className="text-xs text-slate-500">Students Taught</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"><Star className="w-4 h-4 text-slate-400" /></div>
                  <div>
                    <div className="font-medium text-white">{mentorProfile.rating} Average Rating</div>
                    <div className="text-xs text-slate-500">From 450+ reviews</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-5 text-center">
              <MessageSquare className="w-8 h-8 text-brand-accent mx-auto mb-3 opacity-50" />
              <p className="italic text-slate-300 text-sm">"{mentorProfile.quote}"</p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
