"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bell,
  CheckCheck,
  MessageSquare,
  Video,
  Calendar,
  Sparkles,
  Flame,
  Check,
  ArrowRight,
  X,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AppNotification,
  NotificationType,
  getInitialStudentNotifications,
  getInitialMentorNotifications,
} from "@/lib/notifications";
import { useAuth } from "@/lib/auth-context";

interface NotificationBellProps {
  role: "student" | "mentor";
}

export default function NotificationBell({ role }: NotificationBellProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "mentors" | "rooms" | "tests" | "updates">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const storageKey = `seniorly_notifications_${role}_${user?.id || "guest"}`;

  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Initialize notifications based on logged in user and assigned mentor
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setNotifications(JSON.parse(stored));
        return;
      }
    } catch {
      // ignore
    }

    // Generate fresh personalized notifications
    if (role === "student") {
      const mentorName = user?.assignedMentor?.name || "Aaran Singh";
      const mentorInitials = user?.assignedMentor?.initials || "AS";
      const targetExam = user?.targetExam || "GATE CS 2027";
      const initial = getInitialStudentNotifications(
        user?.name || "Aaryav",
        mentorName,
        mentorInitials,
        targetExam
      );
      setNotifications(initial);
      try {
        localStorage.setItem(storageKey, JSON.stringify(initial));
      } catch {
        // ignore
      }
    } else {
      const initial = getInitialMentorNotifications(user?.name || "Dr. Arjun Mehta");
      setNotifications(initial);
      try {
        localStorage.setItem(storageKey, JSON.stringify(initial));
      } catch {
        // ignore
      }
    }
  }, [role, user?.id, user?.assignedMentor?.name, user?.targetExam, storageKey]);

  const saveNotifications = (updated: AppNotification[]) => {
    setNotifications(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  const dismissNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notifications.filter((n) => n.id !== id);
    saveNotifications(updated);
  };

  // Filter logic
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "mentors") return n.type === "mentor_message";
    if (activeTab === "rooms") return n.type === "live_room";
    if (activeTab === "tests") return n.type === "test_date" || n.type === "streak_alert";
    if (activeTab === "updates") return n.type === "app_update" || n.type === "payout_update";
    return true;
  });

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "mentor_message":
        return <MessageSquare className="w-4 h-4 text-brand-light" />;
      case "live_room":
        return <Video className="w-4 h-4 text-red-400" />;
      case "test_date":
        return <Calendar className="w-4 h-4 text-amber-400" />;
      case "streak_alert":
        return <Flame className="w-4 h-4 text-orange-400" />;
      case "payout_update":
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case "app_update":
      default:
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-[#141b2d] focus:outline-none"
        title="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#141b2d] border border-[#1e293b] shadow-2xl py-3 z-50 text-sm overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-4 py-2 border-b border-[#1e293b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-light border border-brand-primary/30">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs text-brand-light hover:text-white flex items-center gap-1 font-medium transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-[#1e293b] overflow-x-auto hide-scrollbar text-xs">
              {[
                { id: "all", label: "All" },
                { id: "mentors", label: "Mentors" },
                { id: "rooms", label: "Live Rooms" },
                { id: "tests", label: "Tests & Goals" },
                { id: "updates", label: "Updates" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors",
                    activeTab === tab.id
                      ? "bg-brand-primary text-white"
                      : "text-slate-400 hover:text-white hover:bg-[#0a0e1a]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notifications Feed */}
            <div className="overflow-y-auto divide-y divide-[#1e293b]/60 flex-1 max-h-[380px]">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={cn(
                      "p-3.5 hover:bg-[#1a233b]/60 transition-colors cursor-pointer relative flex gap-3 items-start",
                      !notif.read ? "bg-brand-primary/5" : ""
                    )}
                  >
                    {/* Icon container */}
                    <div className="w-8 h-8 rounded-xl bg-[#0a0e1a] border border-[#1e293b] flex items-center justify-center shrink-0 mt-0.5">
                      {getIconForType(notif.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4
                          className={cn(
                            "text-xs sm:text-sm font-semibold truncate",
                            !notif.read ? "text-white" : "text-slate-300"
                          )}
                        >
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                        {notif.message}
                      </p>

                      {/* Action Pill / Link */}
                      <div className="flex items-center justify-between mt-1">
                        <Link
                          href={notif.actionUrl}
                          onClick={() => {
                            markAsRead(notif.id);
                            setIsOpen(false);
                          }}
                          className="text-[11px] font-semibold text-brand-light hover:underline inline-flex items-center gap-1"
                        >
                          <span>{notif.actionLabel || "View Details"}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>

                        <button
                          type="button"
                          onClick={(e) => dismissNotification(notif.id, e)}
                          title="Dismiss"
                          className="text-slate-500 hover:text-slate-300 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Unread indicator dot */}
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-light shrink-0 mt-1.5" />
                    )}
                  </div>
                ))
              ) : (
                <div className="py-12 px-4 text-center">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                  <p className="text-xs text-slate-300 font-semibold mb-1">
                    You're all caught up!
                  </p>
                  <p className="text-[11px] text-slate-500">
                    No notifications in this category.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[#1e293b] bg-[#0f1419]/50 text-center">
              <span className="text-[11px] text-slate-500">
                Seniorly Real-time Alerts & Messages
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
