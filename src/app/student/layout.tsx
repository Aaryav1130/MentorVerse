"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Bell,
  Calendar,
  Home,
  MessageSquare,
  Search,
  Settings,
  Target,
  Users,
  Video,
  BookOpen,
  HelpCircle,
  Menu
} from "lucide-react";
import { useState } from "react";

const SIDEBAR_NAV = [
  { name: "Home", href: "/student/dashboard", icon: Home },
  { name: "My Goals", href: "/student/study-plan", icon: Target },
  { name: "Mentors", href: "/mentors", icon: Users },
  { name: "Rooms", href: "/student/rooms", icon: Video },
  { name: "Progress", href: "/student/progress", icon: Target },
  { name: "Resources", href: "/student/resources", icon: BookOpen },
  { name: "Doubts", href: "/student/sessions", icon: HelpCircle },
  { name: "Calendar", href: "/student/calendar", icon: Calendar },
  { name: "Settings", href: "/student/settings", icon: Settings },
];

const TOP_NAV = [
  { name: "Home", href: "/student/dashboard" },
  { name: "Mentors", href: "/mentors" },
  { name: "Rooms", href: "/student/rooms" },
  { name: "Progress", href: "/student/progress" },
  { name: "Resources", href: "/student/resources" },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-400 font-sans flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0e1a]/80 backdrop-blur border-borderorder border-[#1e293b]">
        <div className="flex h-16 items-center px-4 md:px-6">
          <button 
            className="mr-4 md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link href="/" className="flex items-center mr-6 group">
            <img src="/brand/seniorly-logo-on-dark.svg" alt="Seniorly Logo" className="h-8 w-auto hidden sm:block transition-transform group-hover:scale-105" />
            <img src="/brand/seniorly-icon.svg" alt="Seniorly Icon" className="h-8 w-auto sm:hidden transition-transform group-hover:scale-105" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {TOP_NAV.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-white relative",
                    isActive ? "text-white" : "text-slate-400"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-brand-light rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="search"
                placeholder="Search..."
                className="h-9 w-[200px] lg:w-[300px] rounded-lg bg-[#141b2d] pl-9 pr-4 text-sm outline-none border border-[#1e293b] focus:border-borderordermerald-500/50 text-white placeholder:text-slate-500"
              />
            </div>
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cardrand-primary text-[10px] font-bold text-white">
                3
              </span>
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 font-medium text-white hover:bg-cardrand-primary transition-colors">
              P
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 md:w-[200px] bg-[#0f1419] border-r border-[#1e293b] pt-16 transition-transform duration-300 md:translate-x-0 md:static",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col gap-2 p-4">
            {SIDEBAR_NAV.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#141b2d] text-brand-light"
                      : "text-slate-400 hover:text-white hover:bg-[#141b2d]/50"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-brand-light" : "text-slate-400")} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-cardlack/50 z-30 md:hidden" 
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
