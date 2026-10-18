export type NotificationType =
  | "mentor_message"
  | "live_room"
  | "test_date"
  | "app_update"
  | "streak_alert"
  | "payout_update";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  actionUrl: string;
  actionLabel?: string;
  sender?: {
    name: string;
    initials: string;
    role: string;
  };
}

export function getInitialStudentNotifications(
  userName: string = "Student",
  mentorName: string = "Aaran Singh",
  mentorInitials: string = "AS",
  targetExam: string = "GATE CS 2027"
): AppNotification[] {
  const firstName = userName.split(" ")[0] || "there";

  return [
    {
      id: "notif-1",
      title: `Message from ${mentorName}`,
      message: `Hey ${firstName}, I've reviewed your ${targetExam} schedule! Start with core Data Structures & Algorithms and solve the 5-year PYQ set. Ping me if you hit any doubt.`,
      type: "mentor_message",
      timestamp: "10m ago",
      read: false,
      actionUrl: "/student/sessions",
      actionLabel: "Reply to Mentor",
      sender: {
        name: mentorName,
        initials: mentorInitials,
        role: "Senior Mentor",
      },
    },
    {
      id: "notif-2",
      title: "Live Room Starting at 7:00 PM",
      message: `${mentorName} is conducting a Live Problem Solving Room: 'Mastering Trees & Graph Traversals for ${targetExam}'.`,
      type: "live_room",
      timestamp: "45m ago",
      read: false,
      actionUrl: "/student/rooms",
      actionLabel: "Join Live Room",
    },
    {
      id: "notif-3",
      title: `${targetExam} National Mock Test 1`,
      message: `Registrations are live for All-India Full Length Mock Test 1. Test window opens this Saturday at 10:00 AM.`,
      type: "test_date",
      timestamp: "2h ago",
      read: false,
      actionUrl: "/student/study-plan",
      actionLabel: "View Test Schedule",
    },
    {
      id: "notif-4",
      title: "New Platform Feature: AI Support Active",
      message: "Seniorly is now upgraded with AI support! Get instant step-by-step doubt explanations and syllabus tracking 24/7.",
      type: "app_update",
      timestamp: "1d ago",
      read: true,
      actionUrl: "/student/sessions",
      actionLabel: "Try AI Doubts",
    },
    {
      id: "notif-5",
      title: "🔥 Study Streak Initialized!",
      message: "You started your Day 1 study streak on Seniorly. Complete at least one milestone tomorrow to keep your streak burning!",
      type: "streak_alert",
      timestamp: "1d ago",
      read: true,
      actionUrl: "/student/dashboard",
      actionLabel: "View Streak",
    },
  ];
}

export function getInitialMentorNotifications(
  mentorName: string = "Dr. Arjun Mehta"
): AppNotification[] {
  return [
    {
      id: "mnotif-1",
      title: "New 1:1 Session Booked",
      message: "Aaryav Chaudhary has booked a 45-minute 1:1 Mentorship Session for tomorrow at 6:00 PM.",
      type: "live_room",
      timestamp: "15m ago",
      read: false,
      actionUrl: "/mentor/sessions",
      actionLabel: "View Booking",
    },
    {
      id: "mnotif-2",
      title: "Student Doubt Submitted",
      message: "Prince has submitted a doubt in Network Theory: 'How to calculate Thevenin equivalent impedance across inductive networks?'.",
      type: "mentor_message",
      timestamp: "1h ago",
      read: false,
      actionUrl: "/mentor/messages",
      actionLabel: "Open Doubt",
    },
    {
      id: "mnotif-3",
      title: "Payout Completed: ₹1,24,800",
      message: "Your monthly earnings payout has been successfully credited to your registered bank account.",
      type: "payout_update",
      timestamp: "1d ago",
      read: true,
      actionUrl: "/mentor/earnings",
      actionLabel: "View Statement",
    },
    {
      id: "mnotif-4",
      title: "Seniorly 2.0 Mentor Studio Released",
      message: "Now with live canvas tools, code editor sync, and AI lesson notes for all group rooms.",
      type: "app_update",
      timestamp: "2d ago",
      read: true,
      actionUrl: "/mentor/dashboard",
      actionLabel: "Explore Features",
    },
  ];
}
