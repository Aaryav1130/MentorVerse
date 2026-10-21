"use client";

import { useAuth, RoadmapItem, getDefaultRoadmapForExam, calculateRoadmapProgress } from "@/lib/auth-context";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Pencil,
  Trash2,
  X,
  Target,
  Sparkles,
  BookOpen,
  RotateCcw,
  Award,
  Check,
  ChevronDown
} from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export default function StudyPlanPage() {
  const {
    user,
    updateRoadmapItem,
    addRoadmapItem,
    deleteRoadmapItem,
    resetRoadmapToExamDefault,
    updateGoalTitle
  } = useAuth();

  const targetExam = user?.targetExam || "CAT 2027";

  // Use student's saved roadmap or fallback to dynamic exam default
  const roadmap: RoadmapItem[] = useMemo(() => {
    if (user?.studyRoadmap && user.studyRoadmap.length > 0) {
      return user.studyRoadmap;
    }
    return getDefaultRoadmapForExam(targetExam);
  }, [user?.studyRoadmap, targetExam]);

  // Dynamically calculate progress based on student's actual topics
  const progress = useMemo(() => {
    return calculateRoadmapProgress(roadmap);
  }, [roadmap]);

  // Filter state
  const [activeFilter, setActiveFilter] = useState<"All" | "In Progress" | "Completed" | "Not Started">("All");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditGoalModalOpen, setIsEditGoalModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<RoadmapItem | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  // Goal Title edit state
  const [newGoalTitle, setNewGoalTitle] = useState(targetExam);

  // New Milestone form state
  const [newTitle, setNewTitle] = useState("");
  const [newTotalTopics, setNewTotalTopics] = useState("10");
  const [newTopics, setNewTopics] = useState("0");
  const [newTests, setNewTests] = useState("0");
  const [newStatus, setNewStatus] = useState<"Not Started" | "In Progress" | "Completed">("Not Started");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Quick increments
  const handleIncrementTopic = (item: RoadmapItem) => {
    const nextTopics = Math.min(item.totalTopics, item.topics + 1);
    const nextStatus = nextTopics >= item.totalTopics ? "Completed" : "In Progress";
    updateRoadmapItem(item.id, {
      topics: nextTopics,
      status: nextStatus,
    });
    showToast(`+1 Topic logged for "${item.title}"`);
  };

  const handleIncrementTest = (item: RoadmapItem) => {
    updateRoadmapItem(item.id, {
      tests: item.tests + 1,
    });
    showToast(`+1 Test recorded for "${item.title}"`);
  };

  const handleToggleStatus = (item: RoadmapItem) => {
    let nextStatus: "Not Started" | "In Progress" | "Completed" = "In Progress";
    let nextTopics = item.topics;

    if (item.status === "Not Started") {
      nextStatus = "In Progress";
      nextTopics = Math.max(1, item.topics);
    } else if (item.status === "In Progress") {
      nextStatus = "Completed";
      nextTopics = item.totalTopics;
    } else {
      nextStatus = "Not Started";
      nextTopics = 0;
    }

    updateRoadmapItem(item.id, {
      status: nextStatus,
      topics: nextTopics,
    });
    showToast(`Updated status to ${nextStatus}`);
  };

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const tot = parseInt(newTotalTopics) || 10;
    const comp = Math.min(tot, parseInt(newTopics) || 0);
    const tsts = parseInt(newTests) || 0;

    addRoadmapItem({
      title: newTitle.trim(),
      totalTopics: tot,
      topics: comp,
      tests: tsts,
      status: comp >= tot && tot > 0 ? "Completed" : comp > 0 ? "In Progress" : newStatus,
    });

    setNewTitle("");
    setNewTotalTopics("10");
    setNewTopics("0");
    setNewTests("0");
    setNewStatus("Not Started");
    setIsAddModalOpen(false);
    showToast("🎉 New goal milestone added!");
  };

  const handleSaveMilestoneEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone) return;

    const tot = editingMilestone.totalTopics || 1;
    const comp = Math.min(tot, editingMilestone.topics);

    updateRoadmapItem(editingMilestone.id, {
      title: editingMilestone.title.trim(),
      totalTopics: tot,
      topics: comp,
      tests: editingMilestone.tests,
      status: comp >= tot ? "Completed" : comp > 0 ? "In Progress" : editingMilestone.status,
    });

    setEditingMilestone(null);
    showToast("Milestone updated successfully!");
  };

  const handleSaveGoalTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    updateGoalTitle(newGoalTitle.trim());
    setIsEditGoalModalOpen(false);
    showToast(`Goal updated to "${newGoalTitle.trim()}"`);
  };

  const handleResetToExam = (exam: string) => {
    resetRoadmapToExamDefault(exam);
    setNewGoalTitle(exam);
    showToast(`Loaded standard syllabus roadmap for ${exam}!`);
  };

  // Filtered roadmap items
  const filteredRoadmap = useMemo(() => {
    if (activeFilter === "All") return roadmap;
    return roadmap.filter((item) => item.status === activeFilter);
  }, [roadmap, activeFilter]);

  // Aggregate stats
  const totalTopicsCount = roadmap.reduce((acc, c) => acc + (c.totalTopics || 0), 0);
  const completedTopicsCount = roadmap.reduce((acc, c) => acc + Math.min(c.topics || 0, c.totalTopics || 0), 0);
  const totalTestsCount = roadmap.reduce((acc, c) => acc + (c.tests || 0), 0);
  const completedMilestonesCount = roadmap.filter((c) => c.status === "Completed").length;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto font-sans pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-light text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5 text-brand-accent" />
            <span>Personalized Goal Roadmap</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Your Study Plan &amp; Goals
          </h1>
          <p className="text-sm text-slate-400">
            Create, track, and master milestones tailored for your preparation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-brand-primary/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Milestone</span>
          </button>
        </div>
      </div>

      {/* Goal Progress Banner */}
      <div className="bg-[#141b2d] rounded-2xl border border-[#1e293b] p-6 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-light shrink-0">
              <Award className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {targetExam}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setNewGoalTitle(targetExam);
                    setIsEditGoalModalOpen(true);
                  }}
                  title="Rename Goal / Target Exam"
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-400">
                {progress === 0
                  ? "Fresh study plan ready. Log topics or complete tests to track progress."
                  : `${completedTopicsCount} of ${totalTopicsCount} topics mastered`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:text-right">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {progress}%
              </div>
              <div className="text-[11px] font-medium text-brand-light">
                {progress >= 100 ? "Goal Completed 🎉" : "Overall Completion"}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-3 bg-[#0a0e1a] rounded-full overflow-hidden border border-[#1e293b] mb-5">
          <div
            className="h-full bg-gradient-to-r from-brand-primary via-indigo-500 to-brand-accent rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mini Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1e293b]">
          <div className="bg-[#0a0e1a] p-3 rounded-xl border border-[#1e293b]">
            <p className="text-[11px] text-slate-400">Total Milestones</p>
            <p className="text-base font-bold text-white">{roadmap.length}</p>
          </div>
          <div className="bg-[#0a0e1a] p-3 rounded-xl border border-[#1e293b]">
            <p className="text-[11px] text-slate-400">Completed Modules</p>
            <p className="text-base font-bold text-emerald-400">{completedMilestonesCount}</p>
          </div>
          <div className="bg-[#0a0e1a] p-3 rounded-xl border border-[#1e293b]">
            <p className="text-[11px] text-slate-400">Topics Mastered</p>
            <p className="text-base font-bold text-brand-light">
              {completedTopicsCount} / {totalTopicsCount}
            </p>
          </div>
          <div className="bg-[#0a0e1a] p-3 rounded-xl border border-[#1e293b]">
            <p className="text-[11px] text-slate-400">Tests Practiced</p>
            <p className="text-base font-bold text-amber-400">{totalTestsCount}</p>
          </div>
        </div>
      </div>

      {/* Filter and Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(["All", "In Progress", "Completed", "Not Started"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors",
                activeFilter === filter
                  ? "bg-brand-accent text-black shadow-md shadow-amber-400/20"
                  : "bg-[#141b2d] text-slate-400 border border-[#1e293b] hover:text-white"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Load Preset Syllabus Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden md:inline">Load Syllabus:</span>
          <div className="flex flex-wrap gap-1.5">
            {["CAT", "GATE CS", "JEE", "NEET", "UPSC"].map((exam) => (
              <button
                key={exam}
                type="button"
                onClick={() => handleResetToExam(exam)}
                className="px-2.5 py-1 rounded-lg bg-[#141b2d] border border-[#1e293b] hover:border-slate-500 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
                title={`Reset roadmap to standard ${exam} syllabus`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      {filteredRoadmap.length > 0 ? (
        <div className="space-y-4 relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-[#1e293b] z-0 hidden md:block" />

          {filteredRoadmap.map((item, index) => {
            const isCompleted = item.status === "Completed";
            const isInProgress = item.status === "In Progress";
            const itemPct = item.totalTopics > 0 ? Math.round((item.topics / item.totalTopics) * 100) : 0;

            return (
              <div key={item.id} className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Step Indicator */}
                <div className="hidden md:flex flex-col items-center mt-3">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-base border-2 shadow-lg transition-all",
                      isCompleted
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : isInProgress
                        ? "bg-brand-primary/20 border-brand-primary text-brand-light"
                        : "bg-[#141b2d] border-[#1e293b] text-slate-500"
                    )}
                  >
                    {isCompleted ? <Check className="w-6 h-6 stroke-[3]" /> : index + 1}
                  </div>
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "flex-1 rounded-2xl border p-5 transition-all shadow-md",
                    isCompleted
                      ? "bg-[#141b2d] border-emerald-500/30"
                      : isInProgress
                      ? "bg-[#141b2d] border-brand-primary/50 ring-1 ring-brand-primary/20"
                      : "bg-[#141b2d] border-[#1e293b] hover:border-slate-700"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="md:hidden text-xs font-bold text-slate-500">#{index + 1}</span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Interactive Status Badge Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item)}
                        title="Click to cycle status: Not Started -> In Progress -> Completed"
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer",
                          isCompleted
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                            : isInProgress
                            ? "bg-brand-primary/20 text-brand-light border border-brand-primary/30 hover:bg-brand-primary/30"
                            : "bg-[#0a0e1a] text-slate-400 border border-[#1e293b] hover:border-slate-500"
                        )}
                      >
                        {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isInProgress && <Clock className="w-3.5 h-3.5" />}
                        {!isCompleted && !isInProgress && <Circle className="w-3.5 h-3.5" />}
                        <span>{item.status}</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => setEditingMilestone(item)}
                        title="Edit milestone"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0a0e1a] transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete milestone "${item.title}"?`)) {
                            deleteRoadmapItem(item.id);
                            showToast("Milestone removed");
                          }
                        }}
                        title="Delete milestone"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-[#0a0e1a] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Topic Progress Bar inside item */}
                  <div className="w-full h-1.5 bg-[#0a0e1a] rounded-full overflow-hidden border border-[#1e293b]/50 mb-4">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isCompleted ? "bg-emerald-400" : "bg-brand-light"
                      )}
                      style={{ width: `${itemPct}%` }}
                    />
                  </div>

                  {/* Topics and Tests Counters with Increment Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#0a0e1a] rounded-xl p-3 border border-[#1e293b] flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400">Topics Mastered</div>
                        <div className="text-sm font-bold text-white">
                          {item.topics} <span className="text-slate-500 font-normal">/ {item.totalTopics}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleIncrementTopic(item)}
                        disabled={item.topics >= item.totalTopics}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1",
                          item.topics >= item.totalTopics
                            ? "bg-white/5 text-slate-500 cursor-not-allowed"
                            : "bg-brand-primary/20 hover:bg-brand-primary text-brand-light hover:text-white border border-brand-primary/30"
                        )}
                      >
                        <Plus className="w-3 h-3" />
                        <span>Topic</span>
                      </button>
                    </div>

                    <div className="bg-[#0a0e1a] rounded-xl p-3 border border-[#1e293b] flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400">Mock Tests Taken</div>
                        <div className="text-sm font-bold text-white">{item.tests} tests</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleIncrementTest(item)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Test</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#141b2d] rounded-2xl border border-[#1e293b] px-6">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">
            No milestones found for &quot;{activeFilter}&quot;
          </h3>
          <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
            You don&apos;t have any goals matching this filter. Add your first milestone or reset to the standard syllabus.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors"
            >
              + Add Custom Milestone
            </button>
            <button
              type="button"
              onClick={() => handleResetToExam(targetExam)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs sm:text-sm font-medium border border-[#1e293b] transition-colors"
            >
              Restore {targetExam} Roadmap
            </button>
          </div>
        </div>
      )}

      {/* Motivational Footer */}
      <div className="mt-12 text-center bg-[#141b2d] rounded-2xl border border-[#1e293b] p-8 shadow-lg">
        <Sparkles className="w-6 h-6 text-brand-accent mx-auto mb-2" />
        <p className="text-base sm:text-lg text-slate-200 italic mb-3 font-serif">
          &quot;Consistency beats intensity. One focused hour every day clears any competitive exam.&quot;
        </p>
        <p className="text-xs text-slate-400 mb-6">
          Track topic by topic, review test analytics, and reach out to your mentor when stuck.
        </p>
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-2.5 bg-brand-primary hover:bg-[#4338CA] text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-brand-primary/20"
        >
          + Add Next Milestone &rarr;
        </button>
      </div>

      {/* MODAL 1: Add Milestone */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Add Goal Milestone</h3>
            <p className="text-xs text-slate-400 mb-4">
              Add a new subject, topic module, or mock series to your roadmap.
            </p>

            <form onSubmit={handleCreateMilestone} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Milestone / Subject Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Interpretation Caselets, Mechanics & Waves"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Total Topics
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newTotalTopics}
                    onChange={(e) => setNewTotalTopics(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Completed Topics
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={newTotalTopics}
                    value={newTopics}
                    onChange={(e) => setNewTopics(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tests Taken
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={newTests}
                    onChange={(e) => setNewTests(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary hover:bg-[#4338CA] text-white text-xs font-semibold transition-colors shadow-md"
                >
                  Create Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Milestone */}
      {editingMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setEditingMilestone(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Edit Milestone</h3>
            <p className="text-xs text-slate-400 mb-4">
              Update topics count, tests, or rename this module.
            </p>

            <form onSubmit={handleSaveMilestoneEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editingMilestone.title}
                  onChange={(e) =>
                    setEditingMilestone({ ...editingMilestone, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Total Topics
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingMilestone.totalTopics}
                    onChange={(e) =>
                      setEditingMilestone({
                        ...editingMilestone,
                        totalTopics: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Completed Topics
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={editingMilestone.totalTopics}
                    value={editingMilestone.topics}
                    onChange={(e) =>
                      setEditingMilestone({
                        ...editingMilestone,
                        topics: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tests Taken
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingMilestone.tests}
                    onChange={(e) =>
                      setEditingMilestone({
                        ...editingMilestone,
                        tests: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={editingMilestone.status}
                    onChange={(e) =>
                      setEditingMilestone({
                        ...editingMilestone,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMilestone(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary hover:bg-[#4338CA] text-white text-xs font-semibold transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Edit Goal Name */}
      {isEditGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#141b2d] border border-[#1e293b] rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsEditGoalModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Update Target Goal</h3>
            <p className="text-xs text-slate-400 mb-4">
              Rename your goal target (e.g. CAT 2027, GATE CS 2027, Target 99.8%ile).
            </p>

            <form onSubmit={handleSaveGoalTitle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Goal Title / Exam
                </label>
                <input
                  type="text"
                  required
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-sm text-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary hover:bg-[#4338CA] text-white text-xs font-semibold transition-colors shadow-md"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
