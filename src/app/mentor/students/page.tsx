"use client";

import Link from "next/link";
import { Search, Plus, ChevronDown } from "lucide-react";
import { students, studentStatsForMentor } from "@/lib/mock-data";

export default function StudentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Students</h1>
          <p className="text-slate-400">Manage your students and track their progress.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-4">
        {[
          { label: "Total", value: studentStatsForMentor.total, color: "text-white" },
          { label: "Active", value: studentStatsForMentor.active, color: "text-emerald-500" },
          { label: "On Hold", value: studentStatsForMentor.onHold, color: "text-amber-500" },
          { label: "Completed", value: studentStatsForMentor.completed, color: "text-blue-500" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#141b2d] border border-[#1e293b] rounded-lg px-4 py-2 flex items-center gap-2">
            <span className="text-sm text-slate-400">{stat.label}:</span>
            <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by name, exam..." 
            className="w-full bg-[#141b2d] border border-[#1e293b] rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141b2d] border border-[#1e293b] rounded-lg text-white hover:bg-[#1e293b] transition-colors">
          <span>All Students</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Student List */}
      <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1e293b] text-sm text-slate-400">
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Overall Progress</th>
                <th className="px-6 py-4 font-medium">Test Scores</th>
                <th className="px-6 py-4 font-medium">Last Active</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-[#0a0e1a]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${student.color} flex items-center justify-center text-white font-semibold text-sm`}>
                        {student.initials}
                      </div>
                      <div>
                        <Link href={`/mentor/students/${student.id}`} className="font-medium text-white hover:text-amber-400 transition-colors">
                          {student.name}
                        </Link>
                        <div className="mt-1">
                          <span className="text-[10px] font-medium text-slate-300 bg-[#1e293b] px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {student.exam}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full max-w-[120px] h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${student.overallProgress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{student.overallProgress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full max-w-[120px] h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${student.scoreProgress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{student.scoreProgress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-1.5 border border-[#1e293b] rounded-lg text-white hover:bg-[#1e293b] text-sm font-medium transition-colors">
                      View Room
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
