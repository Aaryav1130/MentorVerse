"use client";

import { useAuth, BookedSession, StudentDoubtItem } from "@/lib/auth-context";
import { getResourcesForExam, StudyResourceItem } from "@/lib/resources-data";
import {
  BookOpen,
  FileText,
  PlaySquare,
  HelpCircle,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Video,
  Clock,
  ChevronRight,
  X,
  Plus,
  Sparkles,
  Download,
  Check,
  AlertCircle,
  ExternalLink,
  ThumbsUp,
  Search,
  Filter,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Send,
  UserCheck,
  Award
} from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TABS = ["Upcoming", "Past Sessions", "Doubts", "Resources"] as const;
type TabType = typeof TABS[number];

export default function SessionsPage() {
  const { user, addDoubt, bookSession, cancelSession } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("Upcoming");
  const [resourceFilter, setResourceFilter] = useState<string>("All");
  const [resourceSearch, setResourceSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Modals state
  const [isAskDoubtOpen, setIsAskDoubtOpen] = useState(false);
  const [isBookSessionOpen, setIsBookSessionOpen] = useState(false);
  const [activeLiveRoomSession, setActiveLiveRoomSession] = useState<BookedSession | null>(null);
  const [activeResourcePreview, setActiveResourcePreview] = useState<StudyResourceItem | null>(null);
  const [expandedDoubtId, setExpandedDoubtId] = useState<string | null>(null);

  // Form states for Ask a Doubt
  const [doubtQuestion, setDoubtQuestion] = useState("");
  const [doubtSubject, setDoubtSubject] = useState("");
  const [doubtDescription, setDoubtDescription] = useState("");
  const [doubtSubmitting, setDoubtSubmitting] = useState(false);

  // Form states for Book Session
  const [bookingTopic, setBookingTopic] = useState("1:1 Strategy & Roadmap Discussion");
  const [bookingDate, setBookingDate] = useState("Tomorrow");
  const [bookingTime, setBookingTime] = useState("6:00 PM – 7:00 PM");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  // Live Room Call states
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const targetExam = user?.targetExam || "Target Exam";
  const assignedMentor = user?.assignedMentor;
  const isDemo = !!user?.isDemo;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4500);
  };

  // Available subjects for doubts (from student's target exam or enrolled subjects)
  const availableSubjects = useMemo(() => {
    if (user?.subjects && user.subjects.length > 0) {
      return user.subjects.map((s) => s.subject);
    }
    const lower = targetExam.toLowerCase();
    if (lower.includes("cat") || lower.includes("mba")) {
      return [
        "Verbal Ability & Reading Comprehension (VARC)",
        "Data Interpretation & Logical Reasoning (DILR)",
        "Quantitative Aptitude (QA)",
        "Interview & WAT Strategy"
      ];
    }
    if (lower.includes("gate")) {
      return [
        "Circuit Analysis & Network Theory",
        "Electrical Machines",
        "Power Systems",
        "Control Systems",
        "Signals & Systems"
      ];
    }
    if (lower.includes("jee")) {
      return [
        "Mathematics (Calculus & Algebra)",
        "Physics (Mechanics & Electrodynamics)",
        "Chemistry (Organic, Inorganic & Physical)"
      ];
    }
    if (lower.includes("neet")) {
      return [
        "Biology (Zoology & Botany)",
        "Chemistry (Organic & Inorganic)",
        "Physics (Mechanics & Optics)"
      ];
    }
    return ["General Exam Strategy", "Core Concept Review", "Problem Solving"];
  }, [user?.subjects, targetExam]);

  // Set default doubt subject if not selected
  const defaultSubject = availableSubjects[0] || "General";

  // Data sources: strictly user-scoped
  const allSessions: BookedSession[] = user?.sessionsBooked || [];
  const upcomingSessions = allSessions.filter((s) => s.status !== "completed");
  const pastSessions = allSessions.filter((s) => s.status === "completed");

  const doubts: StudentDoubtItem[] = user?.doubts || [];

  // Study resources tailored to student's exam
  const examResources = useMemo(() => {
    return getResourcesForExam(targetExam);
  }, [targetExam]);

  const filteredResources = useMemo(() => {
    return examResources.filter((r) => {
      const matchCat = resourceFilter === "All" || r.category === resourceFilter;
      const matchSearch =
        !resourceSearch.trim() ||
        r.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
        r.subject.toLowerCase().includes(resourceSearch.toLowerCase()) ||
        r.description.toLowerCase().includes(resourceSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [examResources, resourceFilter, resourceSearch]);

  // Handle Ask Doubt Submit
  const handleAskDoubtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;

    setDoubtSubmitting(true);
    const chosenSubject = doubtSubject || defaultSubject;
    addDoubt({
      subject: chosenSubject,
      question: doubtQuestion.trim(),
      description: doubtDescription.trim() || undefined,
    });

    setDoubtQuestion("");
    setDoubtDescription("");
    setDoubtSubmitting(false);
    setIsAskDoubtOpen(false);
    setActiveTab("Doubts");
    showToast(
      assignedMentor
        ? `🎉 Doubt submitted to ${assignedMentor.name}! Notification dispatched.`
        : "🎉 Doubt submitted! Senior mentors will review your question."
    );
  };

  // Handle Book Session Submit
  const handleBookSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitting(true);

    const mentorName = assignedMentor?.name || "Senior Mentor";
    const newSession: BookedSession = {
      id: `booking-${Date.now()}`,
      title: `${targetExam} – ${bookingTopic}`,
      mentor: mentorName,
      time: `${bookingDate} · ${bookingTime}`,
      type: "1:1 Session",
      status: "upcoming",
      date: bookingDate,
      duration: "60 mins",
      notes: bookingNotes.trim() || "Discussing syllabus roadmap and doubt resolution.",
      meetingLink: `https://seniorly.live/room/${mentorName.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString().slice(-4)}`,
    };

    bookSession(newSession);
    setBookingSubmitting(false);
    setIsBookSessionOpen(false);
    setActiveTab("Upcoming");
    showToast(`🎉 1:1 Session scheduled with ${mentorName} for ${bookingDate} at ${bookingTime}!`);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto font-sans pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce border border-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-primary/20 text-brand-light border border-brand-primary/30">
              {targetExam}
            </span>
            {assignedMentor && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/10 text-brand-accent border border-brand-accent/20 flex items-center gap-1">
                <UserCheck className="w-3 h-3" /> Mentor: {assignedMentor.name}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Sessions & Doubts</h1>
          <p className="text-sm text-slate-400">
            {assignedMentor
              ? `Collaborate live with ${assignedMentor.name}, ask doubts, and access verified ${targetExam} resources.`
              : `Connect with toppers, resolve doubts, and master ${targetExam}.`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsAskDoubtOpen(true)}
            className="px-4 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-brand-primary/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Ask a Doubt</span>
          </button>
          <button
            type="button"
            onClick={() => setIsBookSessionOpen(true)}
            className="px-4 py-2.5 bg-brand-accent hover:bg-amber-400 text-slate-900 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-amber-400/20 flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Call</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex overflow-x-auto hide-scrollbar border-b border-[#1e293b] mb-8 gap-2">
        {TABS.map((tab) => {
          const badgeCount =
            tab === "Upcoming"
              ? upcomingSessions.length
              : tab === "Past Sessions"
              ? pastSessions.length
              : tab === "Doubts"
              ? doubts.length
              : examResources.length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all flex items-center gap-2",
                activeTab === tab
                  ? "border-brand-primary text-brand-light font-semibold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              )}
            >
              <span>{tab}</span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[11px] font-bold",
                  activeTab === tab
                    ? "bg-brand-primary/30 text-brand-light"
                    : "bg-slate-800 text-slate-400"
                )}
              >
                {badgeCount}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* TAB 1: UPCOMING SESSIONS */}
          {activeTab === "Upcoming" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Upcoming Sessions</h2>
                <span className="text-xs text-slate-400">
                  {upcomingSessions.length} {upcomingSessions.length === 1 ? "session" : "sessions"} booked
                </span>
              </div>

              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg hover:border-brand-primary/40 transition-all"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider bg-brand-primary/20 text-brand-light border border-brand-primary/30 uppercase">
                          {session.type}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-accent" /> {session.duration || "60 mins"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{session.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-300">
                        with <span className="font-semibold text-white">{session.mentor}</span>
                      </p>
                      <p className="text-sm font-semibold text-brand-accent flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {session.time}
                      </p>
                      {session.notes && (
                        <p className="text-xs text-slate-400 italic bg-[#0a0e1a] p-2.5 rounded-lg border border-[#1e293b]/60">
                          Agenda: {session.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveLiveRoomSession(session)}
                        className="px-6 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-brand-primary/25 flex items-center justify-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Meeting</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Are you sure you want to cancel this scheduled session?")) {
                            cancelSession(session.id);
                            showToast("Session cancelled successfully.");
                          }
                        }}
                        className="px-4 py-2 bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl text-xs font-medium transition-colors border border-transparent hover:border-red-500/30 text-center"
                      >
                        Cancel Call
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                /* Empty State for Upcoming Sessions */
                <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-8 text-center space-y-4 shadow-md">
                  <div className="w-14 h-14 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto text-brand-light">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div className="max-w-md mx-auto">
                    <h3 className="text-lg font-bold text-white mb-1.5">
                      No Upcoming Sessions Scheduled
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                      {assignedMentor
                        ? `You don't have any scheduled calls with ${assignedMentor.name} yet. Book a 1:1 strategy call or concept doubt session to stay on track.`
                        : `You don't have any live calls scheduled yet. Connect with a senior rank holder for ${targetExam} and build your prep plan.`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsBookSessionOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-brand-primary/25"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{assignedMentor ? `Schedule Call with ${assignedMentor.name}` : "Book 1:1 Session"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PAST SESSIONS */}
          {activeTab === "Past Sessions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Past Sessions & Archive</h2>
                <span className="text-xs text-slate-400">
                  {pastSessions.length} completed
                </span>
              </div>

              {pastSessions.length > 0 ? (
                pastSessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                          Completed
                        </span>
                        <span className="text-xs text-slate-400">{session.date || "Completed Call"}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">{session.title}</h3>
                      <p className="text-xs text-slate-400">with {session.mentor}</p>
                      {session.notes && (
                        <p className="text-xs text-slate-300 mt-2 bg-[#0a0e1a] p-2.5 rounded-lg border border-[#1e293b]">
                          {session.notes}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("Recording & transcript available in your archive.")}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <PlaySquare className="w-3.5 h-3.5 text-brand-accent" />
                      <span>Recording Notes</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-8 text-center space-y-4 shadow-md">
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                    <Video className="w-7 h-7" />
                  </div>
                  <div className="max-w-md mx-auto">
                    <h3 className="text-lg font-bold text-white mb-1.5">No Past Sessions Yet</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                      Once you finish your 1:1 calls or live rooms with your senior mentor, your call recordings, summary transcripts, and shared notes will be automatically archived here.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsBookSessionOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-brand-primary/20"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Your First Call</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DOUBTS */}
          {activeTab === "Doubts" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-white">Your Doubts & Q&A</h2>
                  <p className="text-xs text-slate-400">
                    Get answers and step-by-step problem breakdowns from verified seniors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAskDoubtOpen(true)}
                  className="px-3.5 py-2 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-brand-primary/20 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ask a Doubt</span>
                </button>
              </div>

              {doubts.length > 0 ? (
                doubts.map((doubt) => {
                  const isExpanded = expandedDoubtId === doubt.id;
                  const isAnswered = doubt.status === "Answered";

                  return (
                    <div
                      key={doubt.id}
                      className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 shadow-sm hover:border-slate-700 transition-all space-y-3"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-slate-400 mt-0.5">
                          <HelpCircle className="w-5 h-5 text-brand-light" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-brand-light border border-slate-700">
                              {doubt.subject}
                            </span>
                            <span className="text-xs text-slate-500">{doubt.time}</span>
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-bold ml-auto flex items-center gap-1",
                                isAnswered
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-amber-400/10 text-brand-accent border border-brand-accent/20"
                              )}
                            >
                              {isAnswered ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3" /> Answered
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3" /> In Review
                                </>
                              )}
                            </span>
                          </div>

                          <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                            {doubt.question}
                          </h3>

                          {doubt.description && (
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {doubt.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Mentor Answer Box (if answered) */}
                      {isAnswered && doubt.answer && (
                        <div className="pt-3 border-t border-[#1e293b]/70">
                          <button
                            type="button"
                            onClick={() => setExpandedDoubtId(isExpanded ? null : doubt.id)}
                            className="text-xs font-semibold text-brand-light hover:underline flex items-center gap-1 mb-2"
                          >
                            <span>{isExpanded ? "Hide Mentor Answer" : "View Mentor's Solution"}</span>
                            <ChevronRight
                              className={cn("w-3.5 h-3.5 transition-transform", isExpanded && "rotate-90")}
                            />
                          </button>

                          {isExpanded && (
                            <div className="bg-[#0a0e1a] rounded-xl p-4 border border-[#1e293b] space-y-2.5 animate-fadeIn">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-[10px] font-bold text-white">
                                  {doubt.mentorInitials || "SM"}
                                </div>
                                <span className="text-xs font-semibold text-white">
                                  {doubt.mentorName || "Verified Senior"}
                                </span>
                                {doubt.answeredAt && (
                                  <span className="text-[10px] text-slate-500 ml-auto">
                                    Answered {doubt.answeredAt}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                                {doubt.answer}
                              </p>
                              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1e293b]/50">
                                <span className="text-[11px] text-slate-500">Was this helpful?</span>
                                <button
                                  type="button"
                                  onClick={() => showToast("Thanks for the feedback!")}
                                  className="text-[11px] text-brand-light hover:underline flex items-center gap-1"
                                >
                                  <ThumbsUp className="w-3 h-3" /> Yes
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {!isAnswered && (
                        <div className="bg-[#0a0e1a] rounded-xl p-3 border border-[#1e293b] flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-brand-accent animate-spin" />
                            Routed to {doubt.mentorName || "Senior Toppers"} for detailed solution.
                          </span>
                          <span className="text-[11px] text-slate-500">Avg reply: &lt; 2 hrs</span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                /* Empty Doubts State */
                <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-8 text-center space-y-4 shadow-md">
                  <div className="w-14 h-14 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto text-brand-light">
                    <HelpCircle className="w-7 h-7" />
                  </div>
                  <div className="max-w-md mx-auto">
                    <h3 className="text-lg font-bold text-white mb-1.5">No Doubts Submitted Yet</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                      {assignedMentor
                        ? `Stuck on a tricky ${targetExam} problem or concept? Ask ${assignedMentor.name} and get a personal step-by-step breakdown.`
                        : `Stuck on a tricky ${targetExam} problem or formula? Submit your question to verified seniors and get clear explanations.`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsAskDoubtOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-brand-primary/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ask Your First Doubt</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RESOURCES */}
          {activeTab === "Resources" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Study Resources for {targetExam}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Handbooks, formula sheets, and solved PYQ sets curated by toppers.
                  </p>
                </div>

                {/* Resource Search */}
                <div className="relative w-full sm:w-60">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="search"
                    placeholder="Search resources..."
                    value={resourceSearch}
                    onChange={(e) => setResourceSearch(e.target.value)}
                    className="w-full h-8 bg-[#0a0e1a] rounded-lg pl-8 pr-3 text-xs text-white border border-[#1e293b] focus:border-brand-primary outline-none"
                  />
                </div>
              </div>

              {/* Resource Category Filters */}
              <div className="flex flex-wrap gap-2 pb-2">
                {["All", "Formula Sheets", "Notes", "PYQs", "Practice Tests"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setResourceFilter(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      resourceFilter === cat
                        ? "bg-brand-primary text-white font-semibold shadow-sm"
                        : "bg-[#141b2d] text-slate-400 hover:text-white border border-[#1e293b]"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Resources List */}
              <div className="space-y-3.5">
                {filteredResources.length > 0 ? (
                  filteredResources.map((res) => (
                    <div
                      key={res.id}
                      className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-5 shadow-sm hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-primary/10 text-brand-light border border-brand-primary/20">
                            {res.category}
                          </span>
                          <span className="text-xs text-slate-400 truncate">{res.subject}</span>
                          <span className="text-xs text-amber-400 ml-auto sm:ml-0 font-medium">
                            ★ {res.rating} ({res.downloads})
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white">{res.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2">{res.description}</p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                          <span>{res.size}</span>
                          <span>•</span>
                          <span>{res.pagesOrDuration}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => setActiveResourcePreview(res)}
                          className="flex-1 sm:flex-none px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-brand-light" />
                          <span>Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast(`📥 Downloading "${res.title}"...`)}
                          className="flex-1 sm:flex-none px-3.5 py-2 bg-brand-primary/20 hover:bg-brand-primary text-brand-light hover:text-white rounded-xl text-xs font-semibold transition-all border border-brand-primary/30 flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-8 text-center text-slate-400 text-sm">
                    No resources matching "{resourceSearch}" in {resourceFilter}.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          {/* Quick Study Resources Widget */}
          <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 shadow-sm">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-light" />
              <span>Study Resources</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Notes", category: "Notes", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "PYQs", category: "PYQs", icon: BookOpen, color: "text-amber-400", bg: "bg-amber-400/10" },
                { label: "Formula Sheets", category: "Formula Sheets", icon: Award, color: "text-rose-400", bg: "bg-rose-500/10" },
                { label: "Practice Tests", category: "Practice Tests", icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              ].map((res, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveTab("Resources");
                    setResourceFilter(res.category);
                  }}
                  className="flex flex-col items-center justify-center p-3.5 bg-[#0a0e1a] border border-[#1e293b] rounded-xl hover:border-slate-600 transition-all gap-2 group"
                >
                  <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", res.bg)}>
                    <res.icon className={cn("w-5 h-5", res.color)} />
                  </div>
                  <span className="text-xs text-slate-300 font-medium text-center">{res.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Assigned Mentor Card / Connect Card */}
          {assignedMentor ? (
            <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 shadow-md text-center">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-brand-accent flex items-center justify-center text-xl font-bold text-white mx-auto mb-3 shadow-md">
                {assignedMentor.initials}
              </div>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <h3 className="text-base font-bold text-white">{assignedMentor.name}</h3>
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white">✓</span>
              </div>
              <p className="text-xs text-brand-accent font-medium mb-1">
                {assignedMentor.title}
              </p>
              <p className="text-xs text-slate-400 mb-4">
                ⭐ {assignedMentor.rating} ({assignedMentor.students || "Verified"})
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsBookSessionOpen(true)}
                  className="w-full py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-brand-primary/20"
                >
                  <Calendar className="w-4 h-4" /> Schedule Call
                </button>
                <button
                  type="button"
                  onClick={() => setIsAskDoubtOpen(true)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-[#1e293b]"
                >
                  <HelpCircle className="w-4 h-4 text-brand-light" /> Ask a Doubt
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-[#141b2d] rounded-2xl border border-brand-primary/20 p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-brand-light" />
              </div>
              <h3 className="text-white font-bold mb-1.5">Need quick guidance?</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Connect with an available senior who cracked {targetExam} for an instant 1:1 strategy session.
              </p>
              <Link
                href="/mentors"
                className="inline-block w-full py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-brand-primary/20"
              >
                Find Senior Mentor
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL 1: ASK A DOUBT ================= */}
      {isAskDoubtOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-scaleUp">
            <button
              type="button"
              onClick={() => setIsAskDoubtOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1e293b]">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-light">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ask a Doubt</h3>
                <p className="text-xs text-slate-400">
                  {assignedMentor
                    ? `Routing to your senior mentor ${assignedMentor.name}`
                    : `Routing to top verified rank holders for ${targetExam}`}
                </p>
              </div>
            </div>

            <form onSubmit={handleAskDoubtSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subject / Topic Area
                </label>
                <select
                  value={doubtSubject || defaultSubject}
                  onChange={(e) => setDoubtSubject(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-brand-primary outline-none"
                >
                  {availableSubjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Doubt Question <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    targetExam.toLowerCase().includes("cat")
                      ? "e.g. How to eliminate close options in inference-based RC questions?"
                      : "e.g. How to calculate Thevenin impedance with dependent sources?"
                  }
                  value={doubtQuestion}
                  onChange={(e) => setDoubtQuestion(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-brand-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Additional Context or Current Approach (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your current approach, where you are getting stuck, or specific formula confusion..."
                  value={doubtDescription}
                  onChange={(e) => setDoubtDescription(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:border-brand-primary outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAskDoubtOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={doubtSubmitting}
                  className="px-5 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-brand-primary/25 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Doubt</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: BOOK A 1:1 SESSION ================= */}
      {isBookSessionOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-scaleUp">
            <button
              type="button"
              onClick={() => setIsBookSessionOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1e293b]">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Schedule 1:1 Session</h3>
                <p className="text-xs text-slate-400">
                  with {assignedMentor ? assignedMentor.name : "Senior Mentor"} ({targetExam})
                </p>
              </div>
            </div>

            <form onSubmit={handleBookSessionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Session Type & Topic
                </label>
                <select
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-brand-primary outline-none"
                >
                  <option value="1:1 Strategy & Roadmap Discussion">1:1 Strategy & Roadmap Discussion (45 mins)</option>
                  <option value="Concept Deep-Dive & Live Doubt Solving">Concept Deep-Dive & Live Doubt Solving (60 mins)</option>
                  <option value="Mock Test Analysis & Mistake Log Review">Mock Test Analysis & Mistake Log Review (60 mins)</option>
                  <option value="B-School / College Interview Diagnostic">B-School / College Interview Diagnostic (45 mins)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Select Day
                  </label>
                  <select
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:border-brand-primary outline-none"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Next Monday">Next Monday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:border-brand-primary outline-none"
                  >
                    <option value="11:00 AM – 12:00 PM">11:00 AM – 12:00 PM</option>
                    <option value="03:00 PM – 04:00 PM">03:00 PM – 04:00 PM</option>
                    <option value="06:00 PM – 07:00 PM">06:00 PM – 07:00 PM</option>
                    <option value="08:00 PM – 09:00 PM">08:00 PM – 09:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Agenda / Notes for Mentor (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Want to go over my VARC diagnostic scores and review RC accuracy..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-[#1e293b] rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:border-brand-primary outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookSessionOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingSubmitting}
                  className="px-5 py-2.5 bg-brand-accent hover:bg-amber-400 text-slate-900 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-amber-400/25 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: LIVE MEETING ROOM ================= */}
      {activeLiveRoomSession && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0f1419] border border-[#1e293b] rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-4 border-b border-[#1e293b] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Live Call</span>
                <span className="text-slate-400 text-xs">• {activeLiveRoomSession.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveLiveRoomSession(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video container */}
            <div className="w-full h-72 sm:h-96 bg-[#0a0e1a] rounded-2xl border border-[#1e293b] flex flex-col items-center justify-center relative overflow-hidden mb-6">
              <div className="w-24 h-24 rounded-full bg-brand-primary/20 border-2 border-brand-primary flex items-center justify-center text-3xl font-bold text-white mb-3 shadow-lg">
                {activeLiveRoomSession.mentor.split(" ").map((n) => n[0]).join("").slice(0, 2) || "M"}
              </div>
              <p className="text-base font-bold text-white">{activeLiveRoomSession.mentor}</p>
              <p className="text-xs text-brand-light">Mentor (Verified Ranker)</p>
              <span className="text-[11px] text-slate-500 mt-2">Connecting high-definition encrypted audio & video stream...</span>
            </div>

            {/* Call Controls */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsMicOn(!isMicOn)}
                className={cn(
                  "p-3 rounded-full transition-colors",
                  isMicOn ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-red-500/20 text-red-400 border border-red-500/40"
                )}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={cn(
                  "p-3 rounded-full transition-colors",
                  isVideoOn ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-red-500/20 text-red-400 border border-red-500/40"
                )}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveLiveRoomSession(null);
                  showToast("Left meeting room. Session notes saved.");
                }}
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Leave Meeting</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 4: RESOURCE PREVIEW ================= */}
      {activeResourcePreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-4 animate-scaleUp">
            <button
              type="button"
              onClick={() => setActiveResourcePreview(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-brand-primary/20 text-brand-light border border-brand-primary/30 uppercase">
                {activeResourcePreview.category}
              </span>
              <span className="text-xs text-slate-400">{activeResourcePreview.subject}</span>
            </div>

            <h3 className="text-lg font-bold text-white">{activeResourcePreview.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{activeResourcePreview.description}</p>

            {activeResourcePreview.topperTips && (
              <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-3 text-xs text-brand-accent">
                {activeResourcePreview.topperTips}
              </div>
            )}

            {activeResourcePreview.contentPreview && (
              <div className="bg-[#0a0e1a] rounded-xl p-3.5 border border-[#1e293b] space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Formula & Strategy Excerpt:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeResourcePreview.contentPreview.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand-light font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-[#1e293b]">
              <span className="text-xs text-slate-500">
                {activeResourcePreview.size} • {activeResourcePreview.pagesOrDuration}
              </span>
              <button
                type="button"
                onClick={() => {
                  showToast(`📥 Downloading "${activeResourcePreview.title}"...`);
                  setActiveResourcePreview(null);
                }}
                className="px-5 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs font-semibold transition-all shadow-md flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
