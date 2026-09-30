"use client";

import { mentorCategories } from "@/lib/mock-data";
import { ArrowRight, Briefcase, Code, Cpu, GraduationCap, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  Target: Target,
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  Code: Code,
  Cpu: Cpu,
  Sparkles: Sparkles
};

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] font-sans">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0e1a]/80 backdrop-blur border-borderorder border-[#1e293b]">
        <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cardrand-accent font-bold text-black">
              M
            </div>
            <span className="font-bold text-white hidden sm:inline-block">
              MentorVerse
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white hover:text-slate-200">Login</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm font-medium border border-slate-700 mb-6">
            <span className="text-brand-accent">◆</span> Choose Your Path
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Find the Mentor That Fits Your Goals</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Whether you are preparing for a competitive exam, mastering a new tech stack, or seeking career guidance, we have the right expert for you.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mentorCategories.map((category) => {
            const Icon = ICONS[category.icon] || Target;
            
            return (
              <Link 
                key={category.id} 
                href={`/mentors?category=${category.title.toLowerCase()}`}
                className="bg-[#141b2d] border border-[#1e293b] rounded-xl p-6 group hover:border-borderorderrand-accent/30 hover:bg-[#141b2d]/80 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-cardrand-accent/10 transition-colors">
                  <Icon className="w-6 h-6 text-slate-300 group-hover:text-brand-accent transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">{category.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">{category.description}</p>
                
                <div className="mt-auto flex items-center text-sm font-medium text-brand-light opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  Explore Mentors <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quiz CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-[#141b2d] border border-[#1e293b] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cardrand-accent/5 rounded-full blur-3xl -mr-20 -mt-20 z-0" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Not sure where to start?</h2>
            <p className="text-slate-400 mb-8">Take a short quiz to get personalized mentor recommendations based on your unique profile and goals.</p>
            <button className="px-8 py-3 bg-cardrand-accent hover:bg-amber-600 text-black rounded-lg font-bold transition-colors">
              Take the Quiz &rarr;
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
