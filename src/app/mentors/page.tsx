"use client";

import { publicMentors } from "@/lib/mock-data";
import { Search, Star, Filter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FILTERS = ["All", "GATE", "ESE", "Academics", "Career", "Coding", "More+"];

export default function MentorsListingPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#0a0e1a] font-sans">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0e1a]/80 backdrop-blur border-b border-[#1e293b]">
        <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-bold text-black">
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
            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Learn From The Best Minds</h1>
          <p className="text-lg text-slate-400">Explore verified mentors, read reviews, and choose the one who understands your goals.</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search mentors, subjects, or expertise..."
              className="w-full h-12 pl-12 pr-4 bg-[#141b2d] border border-[#1e293b] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <button className="absolute right-2 top-2 p-2 text-slate-400 hover:text-white">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scrollbar pb-2">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeFilter === filter
                    ? "bg-amber-500 text-black"
                    : "bg-[#141b2d] text-slate-300 border border-[#1e293b] hover:border-slate-500"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {publicMentors.map((mentor) => (
            <div key={mentor.id} className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-6 flex flex-col sm:flex-row gap-6 hover:border-emerald-500/30 transition-colors">
              <div className="flex flex-col items-center shrink-0">
                <div className={cn("w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2", mentor.color)}>
                  {mentor.initials}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {mentor.rating}
                </div>
                <div className="text-xs text-slate-500">({mentor.students})</div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                </div>
                <p className="text-emerald-400 font-medium text-sm mb-3">{mentor.title}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1e293b]">
                  <div className="font-bold text-white">{mentor.price} <span className="text-xs text-slate-400 font-normal">/ session</span></div>
                  <Link href={`/mentors/${mentor.id}`} className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                    View Profile &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
