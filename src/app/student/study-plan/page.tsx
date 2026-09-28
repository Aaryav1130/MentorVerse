"use client";

import { studyPlanData } from "@/lib/mock-data";
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudyPlanPage() {
  const { goal, progress, roadmap } = studyPlanData;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Personalized Study Plan</h1>
        <p className="text-slate-400">Stay on track with your mentor's guidance and achieve your goals.</p>
      </div>

      {/* Goal Progress */}
      <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {goal} <ArrowRight className="w-5 h-5 text-slate-400" />
          </h2>
          <span className="text-emerald-400 font-bold">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-[#0a0e1a] rounded-full overflow-hidden border border-[#1e293b]">
          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Roadmap */}
      <div className="space-y-4 relative">
        {/* Connecting line */}
        <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-[#1e293b] z-0 hidden md:block" />

        {roadmap.map((item, index) => {
          const isCompleted = item.status === "Completed";
          const isInProgress = item.status === "In Progress";
          
          return (
            <div key={index} className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6">
              
              {/* Indicator */}
              <div className="hidden md:flex flex-col items-center mt-4">
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-4 border-[#0a0e1a]",
                  isCompleted ? "bg-emerald-500 text-white" : 
                  isInProgress ? "bg-blue-500 text-white" : "bg-[#1e293b] text-slate-400"
                )}>
                  {index + 1}
                </div>
              </div>

              {/* Card */}
              <div className={cn(
                "flex-1 rounded-xl border p-5 transition-colors",
                isCompleted ? "bg-[#141b2d] border-[#1e293b]" :
                isInProgress ? "bg-[#141b2d] border-blue-500/50" : "bg-[#0a0e1a] border-[#1e293b] opacity-75"
              )}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="md:hidden text-slate-500 font-normal">#{index + 1}</span>
                    {item.title}
                  </h3>
                  
                  {/* Status Badge */}
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium w-fit",
                    isCompleted ? "bg-emerald-500/10 text-emerald-400" :
                    isInProgress ? "bg-blue-500/10 text-blue-400" : "bg-slate-800 text-slate-400"
                  )}>
                    {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                    {isInProgress && <Clock className="w-3 h-3" />}
                    {!isCompleted && !isInProgress && <Circle className="w-3 h-3" />}
                    {item.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0e1a] rounded-lg p-3 border border-[#1e293b]">
                    <div className="text-xs text-slate-500 mb-1">Topics</div>
                    <div className="text-slate-200 font-medium">{item.topics} / {item.totalTopics}</div>
                  </div>
                  <div className="bg-[#0a0e1a] rounded-lg p-3 border border-[#1e293b]">
                    <div className="text-xs text-slate-500 mb-1">Tests</div>
                    <div className="text-slate-200 font-medium">{item.tests}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center bg-[#141b2d] rounded-xl border border-[#1e293b] p-8">
        <p className="text-lg text-slate-300 italic mb-6">"Progress is not about being perfect, it's about being better than yesterday."</p>
        <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors">
          Keep Going &rarr;
        </button>
      </div>

    </div>
  );
}
