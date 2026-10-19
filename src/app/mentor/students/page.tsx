"use client";

import Link from "next/link";
import { Search, Plus, ChevronDown, Users, ArrowRight } from "lucide-react";
import { students as demoStudents, studentStatsForMentor as demoStats } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export default function StudentsPage() {
  const { user } = useAuth();
  const isNewMentor = !user?.isDemo;

  const total = isNewMentor ? 0 : demoStats.total;
  const active = isNewMentor ? 0 : demoStats.active;
  const onHold = isNewMentor ? 0 : demoStats.onHold;
  const completed = isNewMentor ? 0 : demoStats.completed;

  const studentsList = isNewMentor ? [] : demoStudents;

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5">Students</h1>
          <p className="text-slate-400 text-sm">Manage your enrolled students and track their syllabus progress.</p>
        </div>
        <Link
          href="/mentor/dashboard"
          className="flex items-center gap-2 bg-brand-primary hover:bg-[#4338CA] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-brand-primary/20 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Class for Students</span>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-4">
        {[
          { label: "Total Students", value: total, color: "text-white" },
          { label: "Active", value: active, color: "text-brand-light" },
          { label: "On Hold", value: onHold, color: "text-brand-accent" },
          { label: "Completed", value: completed, color: "text-blue-400" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#141b2d] border border-[#1e293b] rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
            <span className="text-xs text-slate-400">{stat.label}:</span>
            <span className={`font-bold text-sm ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search students by name, exam..."
            className="w-full bg-[#141b2d] border border-[#1e293b] rounded-xl py-2.5 pl-10 pr-4 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-accent/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141b2d] border border-[#1e293b] rounded-xl text-white hover:bg-[#1e293b] transition-colors text-xs font-medium">
          <span>All Students</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Student List */}
      <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] overflow-hidden shadow-xl">
        {studentsList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1e293b] text-xs font-semibold text-slate-400">
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Overall Progress</th>
                  <th className="px-6 py-4">Target Exam</th>
                  <th className="px-6 py-4">Last Active</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b] text-sm">
                {studentsList.map((student) => (
                  <tr key={student.id} className="hover:bg-[#1a233b]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-xs sm:text-sm">{student.name}</p>
                          <p className="text-[11px] text-slate-400">{student.exam}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 max-w-[140px]">
                        <div className="flex-1 h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-primary rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-300">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-300">{student.exam}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{student.lastActive}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/mentor/students/${student.id}`}
                        className="text-xs font-semibold text-brand-light hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Room</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-light mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">No Students Enrolled Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
              Once aspirants select you as their mentor or book 1:1 sessions, their profile, subject roadmaps, and doubt queries will appear here.
            </p>
            <Link
              href="/mentor/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-amber-400 text-black font-bold text-xs transition-all shadow-md shadow-amber-400/20"
            >
              <span>Go to Mentor Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
