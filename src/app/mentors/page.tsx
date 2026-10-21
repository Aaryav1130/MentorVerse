"use client";

import { publicMentors } from "@/lib/mock-data";
import {
  Search,
  Star,
  Filter,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  X,
  Sparkles,
  BookOpen,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, Suspense } from "react";
import { useAuth } from "@/lib/auth-context";

const PRIMARY_FILTERS = [
  "All",
  "CAT",
  "GATE",
  "JEE",
  "NEET",
  "UPSC",
  "Coding",
  "Career",
];

const MORE_CATEGORIES = [
  { id: "ESE", label: "ESE (Engineering Services)", badge: "Technical" },
  { id: "Academics", label: "College Academics & CGPA", badge: "Semester" },
  { id: "MBA GD-PI", label: "MBA GD-PI & B-School WAT", badge: "IIM / XLRI" },
  { id: "Study Abroad", label: "Study Abroad (GRE, GMAT)", badge: "Global" },
  { id: "Data Science", label: "Data Science & AI", badge: "Tech" },
];

function MentorsListingContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [toast, setToast] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, assignMentor } = useAuth();
  const router = useRouter();

  // Read initial query parameter (?exam=CAT or ?filter=GATE or ?q=...)
  useEffect(() => {
    const rawExam = searchParams.get("exam") || searchParams.get("filter") || "";
    const rawQ = searchParams.get("q") || "";

    if (rawQ) {
      setSearchQuery(rawQ);
    }

    if (rawExam) {
      const lower = rawExam.toLowerCase();
      if (lower.includes("cat") || lower.includes("mba")) {
        setActiveFilter("CAT");
      } else if (lower.includes("neet")) {
        setActiveFilter("NEET");
      } else if (lower.includes("upsc") || lower.includes("ias")) {
        setActiveFilter("UPSC");
      } else if (lower.includes("jee")) {
        setActiveFilter("JEE");
      } else if (lower.includes("ese")) {
        setActiveFilter("ESE");
      } else if (lower.includes("gate")) {
        setActiveFilter("GATE");
      } else if (lower.includes("coding") || lower.includes("cs")) {
        setActiveFilter("Coding");
      } else if (lower.includes("career")) {
        setActiveFilter("Career");
      } else {
        setActiveFilter(rawExam);
      }
    }
  }, [searchParams]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    if (isMoreOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMoreOpen]);

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

  const isMoreActive = MORE_CATEGORIES.some((c) => c.id === activeFilter);

  const filteredMentors = publicMentors.filter((m) => {
    let matchesFilter = false;
    if (activeFilter === "All") {
      matchesFilter = true;
    } else if (activeFilter === "CAT") {
      matchesFilter =
        m.tags.includes("CAT") ||
        m.tags.includes("MBA") ||
        m.tags.includes("IIM A") ||
        m.tags.includes("IIM B") ||
        m.title.includes("CAT");
    } else if (activeFilter === "GATE") {
      matchesFilter =
        m.tags.includes("GATE") ||
        m.tags.includes("GATE EE") ||
        m.tags.includes("GATE CS");
    } else if (activeFilter === "JEE") {
      matchesFilter =
        m.tags.includes("JEE") ||
        m.tags.includes("JEE Advanced") ||
        m.title.includes("JEE");
    } else if (activeFilter === "NEET") {
      matchesFilter =
        m.tags.includes("NEET") ||
        m.title.includes("NEET") ||
        m.college.includes("AIIMS");
    } else if (activeFilter === "UPSC") {
      matchesFilter =
        m.tags.includes("UPSC") ||
        m.title.includes("UPSC") ||
        m.tags.includes("IAS") ||
        m.tags.includes("IFS");
    } else if (activeFilter === "Coding") {
      matchesFilter =
        m.tags.includes("Coding") ||
        m.tags.includes("GATE CS") ||
        m.tags.includes("DSA") ||
        m.tags.includes("Python");
    } else if (activeFilter === "Career") {
      matchesFilter =
        m.tags.includes("Career") ||
        m.tags.includes("Placement") ||
        m.tags.includes("Resume");
    } else if (activeFilter === "ESE") {
      matchesFilter = m.tags.includes("ESE") || m.title.includes("ESE");
    } else if (activeFilter === "Academics") {
      matchesFilter =
        m.tags.includes("Academics") ||
        m.tags.includes("GATE EE") ||
        m.tags.includes("Power Systems");
    } else if (activeFilter === "MBA GD-PI") {
      matchesFilter =
        m.tags.includes("MBA") ||
        m.tags.includes("CAT") ||
        m.subjects.some((s) => s.includes("WAT-PI"));
    } else if (activeFilter === "Study Abroad") {
      matchesFilter =
        m.tags.includes("MBA") ||
        m.tags.includes("GRE") ||
        m.college.includes("BITS");
    } else if (activeFilter === "Data Science") {
      matchesFilter = m.tags.includes("Coding") || m.tags.includes("DSA");
    } else {
      const lower = activeFilter.toLowerCase();
      matchesFilter =
        m.tags.some((t) => t.toLowerCase().includes(lower)) ||
        m.title.toLowerCase().includes(lower) ||
        m.college.toLowerCase().includes(lower);
    }

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.title.toLowerCase().includes(q) ||
      m.college.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q)) ||
      m.subjects.some((s) => s.toLowerCase().includes(q));

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
            <Link href="/mentors" className="text-sm font-medium text-white font-semibold">
              Mentors
            </Link>
            <Link
              href={user?.role === "student" ? "/student/dashboard" : "/login"}
              className="text-sm font-medium text-slate-400 hover:text-white"
            >
              For Students
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-400 hover:text-white">
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
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-light text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Verified AIR Rankers & College Seniors</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Learn From Those Who Cracked It
          </h1>
          <p className="text-base md:text-lg text-slate-400">
            Book 1:1 mentorship sessions with verified toppers from IITs, IIMs, and AIIMS tailored to your exam.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search mentors, exam (e.g. CAT, GATE, NEET, UPSC), or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-10 bg-[#141b2d] border border-[#1e293b] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary text-sm shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Pills with Interactive More Dropdown */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {PRIMARY_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setIsMoreOpen(false);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shadow-sm",
                    isActive
                      ? "bg-brand-accent text-black font-semibold shadow-amber-400/20"
                      : "bg-[#141b2d] text-slate-300 border border-[#1e293b] hover:border-slate-500 hover:text-white"
                  )}
                >
                  {filter}
                </button>
              );
            })}

            {/* Interactive More+ Popover Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen((prev) => !prev)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm",
                  isMoreActive
                    ? "bg-brand-accent text-black font-semibold shadow-amber-400/20"
                    : "bg-[#141b2d] text-slate-300 border border-[#1e293b] hover:border-slate-500 hover:text-white"
                )}
              >
                <span>{isMoreActive ? `More: ${activeFilter}` : "More +"}</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    isMoreOpen ? "rotate-180" : ""
                  )}
                />
              </button>

              {/* Popover Dropdown */}
              {isMoreOpen && (
                <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 w-72 bg-[#141b2d] border border-[#1e293b] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-[#1e293b] mb-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Specialized Streams & Streams
                    </p>
                  </div>
                  <div className="space-y-1">
                    {MORE_CATEGORIES.map((cat) => {
                      const isCatActive = activeFilter === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setActiveFilter(cat.id);
                            setIsMoreOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors",
                            isCatActive
                              ? "bg-brand-primary text-white font-semibold"
                              : "text-slate-300 hover:bg-[#0a0e1a] hover:text-white"
                          )}
                        >
                          <span className="truncate">{cat.label}</span>
                          <span
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0",
                              isCatActive
                                ? "bg-white/20 text-white"
                                : "bg-[#0a0e1a] text-slate-400 border border-[#1e293b]"
                            )}
                          >
                            {cat.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Current Active Filter Indicator */}
        <div className="flex items-center justify-between max-w-5xl mx-auto mb-6 px-1">
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="text-white font-semibold">{filteredMentors.length}</span>{" "}
            {filteredMentors.length === 1 ? "mentor" : "mentors"}
            {activeFilter !== "All" && (
              <>
                {" "}
                for <span className="text-brand-accent font-semibold">{activeFilter}</span>
              </>
            )}
            {searchQuery && (
              <>
                {" "}
                matching &quot;<span className="text-white">{searchQuery}</span>&quot;
              </>
            )}
          </p>

          {(activeFilter !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
              className="text-xs text-brand-light hover:underline font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Mentor Cards Grid */}
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {filteredMentors.map((mentor) => {
              const isCurrentlyAssigned = user?.assignedMentor?.id === mentor.id;

              return (
                <div
                  key={mentor.id}
                  className={cn(
                    "bg-[#141b2d] border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 transition-all shadow-lg hover:shadow-brand-primary/5",
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
                      <div>
                        <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                        <p className="text-xs text-slate-400">{mentor.college}</p>
                      </div>
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
                          className="text-xs font-medium text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-[#1e293b] hover:border-slate-600 transition-colors"
                        >
                          View Details
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
        ) : (
          <div className="text-center py-16 bg-[#141b2d] rounded-2xl border border-[#1e293b] max-w-3xl mx-auto px-6">
            <GraduationCap className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">
              No mentors found for &quot;{activeFilter}&quot;
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
              We couldn&apos;t find mentors matching your current filter. Try browsing other exam categories or clear search.
            </p>
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-sm font-semibold transition-colors shadow-md"
            >
              Browse All Mentors
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function MentorsListingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center text-slate-400 text-sm">
          Loading mentors directory...
        </div>
      }
    >
      <MentorsListingContent />
    </Suspense>
  );
}
