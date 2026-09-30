"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Video, 
  TrendingUp, 
  DollarSign, 
  MessageSquare, 
  User, 
  Settings, 
  Search, 
  Bell,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mentorProfile } from "@/lib/mock-data";

const navItems = [
  { title: "Dashboard", href: "/mentor/dashboard", icon: LayoutDashboard },
  { title: "Students", href: "/mentor/students", icon: Users },
  { title: "Sessions", href: "/mentor/sessions", icon: Video },
  { title: "Progress", href: "/mentor/progress", icon: TrendingUp },
  { title: "Earnings", href: "/mentor/earnings", icon: DollarSign },
  { title: "Messages", href: "/mentor/messages", icon: MessageSquare },
  { title: "Profile", href: "/mentor/profile", icon: User },
  { title: "Settings", href: "/mentor/settings", icon: Settings },
];

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-[#0a0e1a] text-slate-400 font-sans">
      {/* Left Sidebar */}
      <aside className="w-[240px] flex-shrink-0 bg-[#0f1419] border-r border-[#1e293b] flex flex-col">
        {/* Logo */}
        <div className="p-6 flex items-center">
          <img src="/brand/seniorly-logo-on-dark.svg" alt="Seniorly Logo" className="h-8 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-[#141b2d] text-brand-accent" 
                    : "text-slate-400 hover:text-white hover:bg-[#141b2d]/50"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Go Premium Banner */}
        <div className="p-4 mt-auto">
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-borderorderrand-accent/20">
            <div className="flex items-center gap-2 text-brand-accent font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Go Premium</span>
            </div>
            <p className="text-xs text-slate-400">Unlock more features</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-[72px] flex-shrink-0 bg-[#0a0e1a]/80 backdrop-blur border-borderorder border-[#1e293b] flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="w-96 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search students, sessions..." 
              className="w-full bg-[#141b2d] border border-[#1e293b] rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-borderorderrand-accent/50 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border-borderorder border-[#0a0e1a]"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-[#1e293b]">
              <div className="w-10 h-10 rounded-full bg-cardrand-accent flex items-center justify-center text-white font-bold">
                {mentorProfile.initials}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">{mentorProfile.name}</p>
                <p className="text-xs text-slate-500">Mentor</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
