"use client";

import { ChevronDown, IndianRupee, TrendingUp, CheckCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { earningsData, earningsChartData, recentTransactions } from "@/lib/mock-data";

export default function EarningsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Earnings</h1>
          <p className="text-slate-400">Track your income and financial growth.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#141b2d] border border-[#1e293b] rounded-lg text-white hover:bg-[#1e293b] transition-colors">
          <span>This Month</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6 relative overflow-hidden group">
          <p className="text-slate-400 text-sm mb-2">Total Earnings</p>
          <div className="flex items-end gap-3 mb-4">
            <h2 className="text-3xl font-bold text-white">{formatCurrency(earningsData.totalEarnings.value)}</h2>
            <span className="text-brand-primary text-sm font-medium mb-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {earningsData.totalEarnings.trend}%
            </span>
          </div>
          <a href="#" className="text-blue-500 text-sm hover:underline">View Details</a>
          <IndianRupee className="absolute -bottom-4 -right-4 w-24 h-24 text-[#1e293b] opacity-50 group-hover:scale-110 transition-transform" />
        </div>

        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
          <p className="text-slate-400 text-sm mb-2">Completed Sessions</p>
          <div className="flex items-end gap-3 mb-4">
            <h2 className="text-3xl font-bold text-white">{earningsData.completedSessions.value}</h2>
            <span className="text-brand-primary text-sm font-medium mb-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {earningsData.completedSessions.trend}%
            </span>
          </div>
          <a href="#" className="text-blue-500 text-sm hover:underline">View Details</a>
        </div>

        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6 border-borderorderrand-accent/30 bg-gradient-to-br from-[#141b2d] to-amber-500/5">
          <p className="text-brand-accent/80 text-sm mb-2">Pending Payout</p>
          <div className="flex items-end gap-3 mb-4">
            <h2 className="text-3xl font-bold text-white">{formatCurrency(earningsData.pendingPayout.value)}</h2>
          </div>
          <button className="text-brand-accent text-sm hover:underline font-medium">Request Payout</button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">Earnings Overview</h2>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earningsChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#141b2d', borderColor: '#1e293b', color: '#fff', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => [formatCurrency(Number(value)), "Earnings"]}
              />
              <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-borderorder border-[#1e293b] text-sm text-slate-400">
                <th className="pb-4 font-medium">Transaction ID</th>
                <th className="pb-4 font-medium">Description</th>
                <th className="pb-4 font-medium">Amount</th>
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="text-sm">
                  <td className="py-4 text-slate-400 font-mono">{txn.id}</td>
                  <td className="py-4 text-white font-medium">{txn.description}</td>
                  <td className="py-4 text-white font-semibold">{formatCurrency(txn.amount)}</td>
                  <td className="py-4 text-slate-400">{txn.date}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-cardrand-primary/10 text-brand-primary border border-borderordermerald-500/20">
                      <CheckCircle className="w-3 h-3" />
                      {txn.status}
                    </span>
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
