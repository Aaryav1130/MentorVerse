"use client";

import Link from "next/link";
import { ChevronRight, MoreHorizontal, FileText, CheckCircle, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { princeDetails } from "@/lib/mock-data";

export default function StudentDetailsPage({ params }: { params: { id: string } }) {
  const tabs = ["Overview", "Roadmap", "Tests", "Assignments", "Notes", "Doubts"];
  const activeTab = "Overview";

  // SVG dimensions for donut chart
  const size = 180;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (princeDetails.overallProgress.percentage / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Link href="/mentor/students" className="hover:text-white transition-colors">Students</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{princeDetails.name}</span>
      </div>

      {/* Header Profile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {princeDetails.initials}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              {princeDetails.name}
              <span className="text-xs font-medium text-slate-300 bg-[#1e293b] px-2.5 py-1 rounded-full uppercase tracking-wider">
                {princeDetails.exam}
              </span>
            </h1>
            <div className="flex gap-2 mt-2">
              {princeDetails.tags.map((tag) => (
                <span key={tag} className="text-xs text-slate-400 bg-[#141b2d] border border-[#1e293b] px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <button className="px-4 py-2 bg-[#141b2d] border border-[#1e293b] rounded-lg text-white hover:bg-[#1e293b] transition-colors flex items-center gap-2">
          <span>Actions</span>
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1e293b] overflow-x-auto">
        <div className="flex gap-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={cn(
                "pb-4 font-medium text-sm transition-colors relative",
                activeTab === tab ? "text-amber-400" : "text-slate-400 hover:text-white"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Progress */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall Progress Donut */}
            <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold text-white mb-6 self-start">Overall Progress</h3>
              
              <div className="relative flex items-center justify-center">
                <svg width={size} height={size} className="transform -rotate-90">
                  {/* Background Circle */}
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#1e293b"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#3b82f6"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">{princeDetails.overallProgress.percentage}%</span>
                </div>
              </div>
              <p className="text-slate-400 mt-6 font-medium">
                Completed {princeDetails.overallProgress.completed} / {princeDetails.overallProgress.total} topics
              </p>
            </div>

            {/* Subject-wise Progress */}
            <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Subject Progress</h3>
              <div className="space-y-6">
                {princeDetails.subjectProgress.map((sub, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-medium">{sub.name}</span>
                      <span className="text-slate-400">{sub.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#0a0e1a] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${sub.color}`} 
                        style={{ width: `${sub.percentage}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Target Card */}
          <div className="bg-gradient-to-r from-[#141b2d] to-[#1e293b] rounded-xl border border-[#1e293b] p-6">
            <h3 className="text-amber-400 font-semibold mb-2">Next Target</h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-white">{princeDetails.nextTarget.title}</p>
                <p className="text-slate-400 mt-1">
                  {princeDetails.nextTarget.count} topics • Due in {princeDetails.nextTarget.due}
                </p>
              </div>
              <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap">
                View Roadmap
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {princeDetails.recentActivity.map((activity, idx) => {
              const isLast = idx === princeDetails.recentActivity.length - 1;
              return (
                <div key={activity.id} className="relative flex gap-4">
                  {!isLast && (
                    <div className="absolute top-10 left-5 w-px h-full -ml-px bg-[#1e293b]"></div>
                  )}
                  <div className="w-10 h-10 rounded-full bg-[#0a0e1a] border border-[#1e293b] flex items-center justify-center text-slate-400 z-10 shrink-0">
                    {idx === 0 ? <Video className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="pt-2">
                    <p className="text-white font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-6 py-2 border border-[#1e293b] rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] transition-colors text-sm font-medium">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
