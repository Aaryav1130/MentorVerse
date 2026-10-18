"use client";

import { publicMentors } from "@/lib/mock-data";
import { Search, Star, Filter, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const FILTERS = ["All", "GATE", "ESE", "Academics", "Career", "Coding", "More+"];

export default function MentorsListingPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState("");
  const { user, assignMentor } = useAuth();
  const router = useRouter();

  const handleSelectMentor = (mentor: typeof publicMentors[0]) => {
    assignMentor({
      id: mentor.id,
      name: mentor.name,
      initials: mentor.initials,
      title: mentor.title,
      rating: mentor.rating,
      students: mentor.students,
      price: mentor.price,
    });
    setToast(`🎉 ${mentor.name} is now chosen as your mentor!`);
    setTimeout(() => {
      setToast("");
      if (user?.role === "student") {
        router.push("/student/dashboard");
      }
    }, 1800);
  };

  const filteredMentors = publicMentors.filter((m) => {
    const matchesFilter =
      activeFilter === "All" ||
      m.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())) ||
      m.title.toLowerCase().includes(activeFilter.toLowerCase());

    const matchesSearch =
      !searchQuery.trim() ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0e1a] font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0e1a]/80 backdrop-blur border-b border-[#1e293b]">
        <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto justify-between">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <img
              src="/brand/seniorly-logo-on-dark.svg"
              alt="Seniorly Logo"
              className="h-8 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white">
              Home
            </Link>
            <Link href="/mentors" className="text-sm font-medium text-white">
              Mentors
            </Link>
            <Link
              href={user?.role === "student" ? "/student/dashboard" : "/login"}
              className="text-sm font-medium text-slate-400 hover:text-white"
            >
              For Students
            </Link>
            <Link href="#" className="text-sm font-medium text-slate-400 hover:text-white">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href={user.role === "mentor" ? "/mentor/dashboard" : "/student/dashboard"}
                className="px-4 py-2 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-white hover:text-slate-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Learn From The Best Minds
          </h1>
          <p className="text-base md:text-lg text-slate-400">
            Explore verified rank holders from IITs & AIIMS, read reviews, and choose the senior who cracked your exam.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search mentors, subjects, or exams (e.g. GATE CS, DSA, Power Systems)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-[#141b2d] border border-[#1e293b] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary text-sm"
            />
            <button className="absolute right-3 top-3 text-slate-400 hover:text-white">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scrollbar pb-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors",
                  activeFilter === filter
                    ? "bg-brand-accent text-black font-semibold"
                    : "bg-[#141b2d] text-slate-300 border border-[#1e293b] hover:border-slate-500"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredMentors.map((mentor) => {
            const isCurrentlyAssigned = user?.assignedMentor?.id === mentor.id;

            return (
              <div
                key={mentor.id}
                className={cn(
                  "bg-[#141b2d] border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 transition-all shadow-lg",
                  isCurrentlyAssigned
                    ? "border-brand-accent ring-1 ring-brand-accent/50"
                    : "border-[#1e293b] hover:border-slate-600"
                )}
              >
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2 shadow-md",
                      mentor.color
                    )}
                  >
                    {mentor.initials}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-brand-accent">
                    <Star className="w-4 h-4 fill-amber-400 text-brand-accent" />{" "}
                    {mentor.rating}
                  </div>
                  <div className="text-xs text-slate-500">({mentor.students})</div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                    {isCurrentlyAssigned && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/30">
                        Active Mentor
                      </span>
                    )}
                  </div>
                  <p className="text-brand-light font-medium text-xs sm:text-sm mb-3">
                    {mentor.title}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mentor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1e293b] gap-2">
                    <div className="font-bold text-white text-sm">
                      {mentor.price}{" "}
                      <span className="text-xs text-slate-400 font-normal">
                        / session
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/mentors/${mentor.id}`}
                        className="text-xs font-medium text-slate-400 hover:text-white"
                      >
                        Profile
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleSelectMentor(mentor)}
                        disabled={isCurrentlyAssigned}
                        className={cn(
                          "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1",
                          isCurrentlyAssigned
                            ? "bg-brand-accent/20 text-brand-accent cursor-default"
                            : "bg-brand-primary hover:bg-[#4338CA] text-white shadow-brand-primary/20"
                        )}
                      >
                        {isCurrentlyAssigned ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Your Mentor</span>
                          </>
                        ) : (
                          <>
                            <span>Choose Mentor</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
