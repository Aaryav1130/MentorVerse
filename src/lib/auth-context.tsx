"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "student" | "mentor";

export interface AssignedMentor {
  id: string;
  name: string;
  initials: string;
  title: string;
  rating: number;
  students: string;
  price: string;
  college?: string;
}

export interface StudentSubject {
  subject: string;
  percentage: number;
}

export interface BookedSession {
  id: string;
  title: string;
  time: string;
  mentor: string;
  type: string;
}

export interface MentorSessionItem {
  id: string;
  title: string;
  time: string;
  type: string;
  isLive?: boolean;
}

export interface MentorStats {
  totalStudents: number;
  activeRooms: number;
  monthlyEarnings: number;
}

export interface RoadmapItem {
  id: string;
  title: string;
  topics: number;
  totalTopics: number;
  tests: number;
  status: "Completed" | "In Progress" | "Not Started";
  targetDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
  avatar?: string;
  headline?: string;
  targetExam?: string;
  college?: string;
  phone?: string;
  bio?: string;
  rank?: string;
  expertise?: string[];
  hourlyRate?: string;
  isDemo?: boolean;
  assignedMentor?: AssignedMentor | null;
  goalProgress?: number;
  streakDays?: number;
  subjects?: StudentSubject[];
  studyRoadmap?: RoadmapItem[];
  sessionsBooked?: BookedSession[];
  mentorStats?: MentorStats;
  mentorSessions?: MentorSessionItem[];
}

export interface RegisteredAccount {
  user: User;
  password?: string;
}

export function getDefaultSubjectsForExam(targetExam: string = ""): StudentSubject[] {
  const lower = targetExam.toLowerCase();
  if (lower.includes("cs") || lower.includes("computer") || lower.includes("coding")) {
    return [
      { subject: "Data Structures & Algorithms", percentage: 0 },
      { subject: "Operating Systems & Databases", percentage: 0 },
      { subject: "Computer Networks", percentage: 0 },
      { subject: "Theory of Computation & Compiler", percentage: 0 },
    ];
  }
  if (lower.includes("jee")) {
    return [
      { subject: "Physics (Mechanics & Electrodynamics)", percentage: 0 },
      { subject: "Chemistry (Organic, Inorganic & Physical)", percentage: 0 },
      { subject: "Mathematics (Calculus & Algebra)", percentage: 0 },
    ];
  }
  if (lower.includes("neet")) {
    return [
      { subject: "Biology (Zoology & Botany)", percentage: 0 },
      { subject: "Chemistry", percentage: 0 },
      { subject: "Physics", percentage: 0 },
    ];
  }
  if (lower.includes("upsc")) {
    return [
      { subject: "General Studies & Indian Polity", percentage: 0 },
      { subject: "CSAT & Analytical Reasoning", percentage: 0 },
      { subject: "Current Affairs & Essay Writing", percentage: 0 },
    ];
  }
  if (lower.includes("cat")) {
    return [
      { subject: "Quantitative Aptitude (QA)", percentage: 0 },
      { subject: "Data Interpretation & Logical Reasoning (DILR)", percentage: 0 },
      { subject: "Verbal Ability & Reading Comprehension (VARC)", percentage: 0 },
    ];
  }
  return [
    { subject: "Network Theory", percentage: 0 },
    { subject: "Electrical Machines", percentage: 0 },
    { subject: "Power Systems", percentage: 0 },
    { subject: "Control Systems", percentage: 0 },
  ];
}

export function calculateRoadmapProgress(items: RoadmapItem[] = []): number {
  if (!items || items.length === 0) return 0;
  const total = items.reduce((acc, curr) => acc + (curr.totalTopics || 0), 0);
  if (total === 0) return 0;
  const completed = items.reduce(
    (acc, curr) => acc + Math.min(curr.topics || 0, curr.totalTopics || 0),
    0
  );
  return Math.min(100, Math.round((completed / total) * 100));
}

export function getDefaultRoadmapForExam(targetExam: string = ""): RoadmapItem[] {
  const lower = targetExam.toLowerCase();

  if (lower.includes("cat") || lower.includes("mba")) {
    return [
      {
        id: "cat-1",
        title: "Quantitative Aptitude (Arithmetic, Algebra & Geometry)",
        topics: 0,
        totalTopics: 14,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "cat-2",
        title: "Data Interpretation & Logical Reasoning (DILR Caselets)",
        topics: 0,
        totalTopics: 12,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "cat-3",
        title: "Verbal Ability & Reading Comprehension (VARC)",
        topics: 0,
        totalTopics: 12,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "cat-4",
        title: "Full-Length Mocks & Sectional Time Management",
        topics: 0,
        totalTopics: 10,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "cat-5",
        title: "B-School Interview Prep (WAT-PI & SOP Writing)",
        topics: 0,
        totalTopics: 6,
        tests: 0,
        status: "Not Started",
      },
    ];
  }

  if (lower.includes("neet")) {
    return [
      {
        id: "neet-1",
        title: "Zoology (Human Physiology & Genetics)",
        topics: 0,
        totalTopics: 16,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "neet-2",
        title: "Botany (Plant Physiology & Ecology)",
        topics: 0,
        totalTopics: 14,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "neet-3",
        title: "Chemistry (Organic Mechanisms & Inorganic NCERT)",
        topics: 0,
        totalTopics: 15,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "neet-4",
        title: "Physics (Mechanics, Optics & Electrodynamics)",
        topics: 0,
        totalTopics: 16,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "neet-5",
        title: "Full Syllabus NEET Mocks & Error Log Review",
        topics: 0,
        totalTopics: 10,
        tests: 0,
        status: "Not Started",
      },
    ];
  }

  if (lower.includes("jee")) {
    return [
      {
        id: "jee-1",
        title: "Mathematics (Calculus, Vectors & Coordinate Geometry)",
        topics: 0,
        totalTopics: 15,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "jee-2",
        title: "Physics (Mechanics, Electrodynamics & Modern Physics)",
        topics: 0,
        totalTopics: 16,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "jee-3",
        title: "Chemistry (Physical, Organic & Inorganic)",
        topics: 0,
        totalTopics: 15,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "jee-4",
        title: "Advanced PYQs & Multi-Concept Problems",
        topics: 0,
        totalTopics: 10,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "jee-5",
        title: "Full CBT Mock Test Series & Rank Booster",
        topics: 0,
        totalTopics: 8,
        tests: 0,
        status: "Not Started",
      },
    ];
  }

  if (lower.includes("upsc")) {
    return [
      {
        id: "upsc-1",
        title: "General Studies 1 (History, Geography & Society)",
        topics: 0,
        totalTopics: 15,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "upsc-2",
        title: "General Studies 2 (Polity, Governance & IR)",
        topics: 0,
        totalTopics: 14,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "upsc-3",
        title: "General Studies 3 (Economy, Environment & Tech)",
        topics: 0,
        totalTopics: 14,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "upsc-4",
        title: "General Studies 4 (Ethics, Integrity & Case Studies)",
        topics: 0,
        totalTopics: 10,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "upsc-5",
        title: "CSAT & Mains Answer Writing Practice",
        topics: 0,
        totalTopics: 8,
        tests: 0,
        status: "Not Started",
      },
    ];
  }

  if (lower.includes("cs") || lower.includes("computer") || lower.includes("coding")) {
    return [
      {
        id: "gatecs-1",
        title: "Data Structures & Algorithms",
        topics: 0,
        totalTopics: 14,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "gatecs-2",
        title: "Operating Systems & System Concurrency",
        topics: 0,
        totalTopics: 12,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "gatecs-3",
        title: "Database Management Systems (DBMS) & SQL",
        topics: 0,
        totalTopics: 10,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "gatecs-4",
        title: "Computer Networks & Protocols",
        topics: 0,
        totalTopics: 10,
        tests: 0,
        status: "Not Started",
      },
      {
        id: "gatecs-5",
        title: "Theory of Computation & Compiler Design",
        topics: 0,
        totalTopics: 10,
        tests: 0,
        status: "Not Started",
      },
    ];
  }

  // Default GATE EE
  return [
    {
      id: "gateee-1",
      title: "Circuit Analysis & Network Theory",
      topics: 0,
      totalTopics: 12,
      tests: 0,
      status: "Not Started",
    },
    {
      id: "gateee-2",
      title: "Signals & Systems",
      topics: 0,
      totalTopics: 12,
      tests: 0,
      status: "Not Started",
    },
    {
      id: "gateee-3",
      title: "Electrical Machines",
      topics: 0,
      totalTopics: 10,
      tests: 0,
      status: "Not Started",
    },
    {
      id: "gateee-4",
      title: "Power Systems Protection & Stability",
      topics: 0,
      totalTopics: 14,
      tests: 0,
      status: "Not Started",
    },
    {
      id: "gateee-5",
      title: "Control Systems",
      topics: 0,
      totalTopics: 11,
      tests: 0,
      status: "Not Started",
    },
  ];
}

export const DEMO_MENTOR: User = {
  id: "mentor-1",
  name: "Dr. Arjun Mehta",
  email: "arjun.mehta@seniorly.com",
  role: "mentor",
  initials: "AM",
  headline: "GATE EE Expert | IIT Delhi",
  college: "IIT Delhi",
  rank: "AIR 214 · GATE EE",
  expertise: ["Power Systems", "Network Theory", "Control Systems", "Electrical Machines"],
  hourlyRate: "₹999 / session",
  isDemo: true,
  mentorStats: {
    totalStudents: 24,
    activeRooms: 6,
    monthlyEarnings: 124800,
  },
  mentorSessions: [
    {
      id: "1",
      title: "GATE EE 2027 – Power Systems",
      time: "10:00 AM - 11:00 AM",
      type: "Group Class",
      isLive: true,
    },
    {
      id: "2",
      title: "1:1 Session – Prince",
      time: "04:00 PM - 05:00 PM",
      type: "1:1 Session",
      isLive: false,
    },
  ],
};

export const DEMO_STUDENT: User = {
  id: "student-1",
  name: "Prince",
  email: "prince@seniorly.com",
  role: "student",
  initials: "P",
  headline: "Aspirant · GATE EE 2027",
  targetExam: "GATE EE 2027",
  isDemo: true,
  goalProgress: 68,
  streakDays: 7,
  assignedMentor: {
    id: "m1",
    name: "Dr. Arjun Mehta",
    initials: "AM",
    title: "GATE EE Expert | 5+ Years Experience",
    rating: 4.9,
    students: "1.2k+",
    price: "₹299",
    college: "IIT Delhi",
  },
  subjects: [
    { subject: "Network Theory", percentage: 92 },
    { subject: "Machines", percentage: 76 },
    { subject: "Power Systems", percentage: 61 },
    { subject: "Control Systems", percentage: 43 },
  ],
  studyRoadmap: [
    {
      id: "demo-1",
      title: "Network Theory",
      topics: 12,
      totalTopics: 12,
      tests: 2,
      status: "Completed",
    },
    {
      id: "demo-2",
      title: "Signals & Systems",
      topics: 8,
      totalTopics: 12,
      tests: 1,
      status: "In Progress",
    },
    {
      id: "demo-3",
      title: "Electrical Machines",
      topics: 0,
      totalTopics: 10,
      tests: 0,
      status: "Not Started",
    },
    {
      id: "demo-4",
      title: "Power Systems",
      topics: 0,
      totalTopics: 14,
      tests: 0,
      status: "Not Started",
    },
    {
      id: "demo-5",
      title: "Control Systems",
      topics: 0,
      totalTopics: 11,
      tests: 0,
      status: "Not Started",
    },
  ],
  sessionsBooked: [
    {
      id: "s1",
      title: "Power Systems",
      time: "6:00 PM",
      mentor: "Dr. Arjun Mehta",
      type: "Live Room",
    },
  ],
};

const SEED_ACCOUNTS: RegisteredAccount[] = [
  {
    user: DEMO_MENTOR,
    password: "password123",
  },
  {
    user: DEMO_STUDENT,
    password: "password123",
  },
];

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<User>;
  loginAsDemo: (role: UserRole) => User;
  register: (userData: {
    name: string;
    email: string;
    role: UserRole;
    password?: string;
    targetExam?: string;
    college?: string;
    rank?: string;
    expertise?: string | string[];
    hourlyRate?: string;
  }) => Promise<User>;
  logout: () => void;
  switchRole: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  assignMentor: (mentor: AssignedMentor) => void;
  removeMentor: () => void;
  bookSession: (session: BookedSession) => void;
  updateSubjectProgress: (subjectName: string, deltaOrValue: number) => void;
  addMentorSession: (session: MentorSessionItem) => void;
  addRoadmapItem: (item: Omit<RoadmapItem, "id">) => void;
  updateRoadmapItem: (id: string, updates: Partial<RoadmapItem>) => void;
  deleteRoadmapItem: (id: string) => void;
  setRoadmap: (items: RoadmapItem[]) => void;
  resetRoadmapToExamDefault: (exam?: string) => void;
  updateGoalTitle: (title: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "seniorly_auth_user";
const USERS_DB_KEY = "seniorly_registered_users";

function getStoredRegisteredAccounts(): RegisteredAccount[] {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(SEED_ACCOUNTS));
  } catch {
    // ignore
  }
  return SEED_ACCOUNTS;
}

function saveRegisteredAccounts(accounts: RegisteredAccount[]) {
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser: User) => {
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      document.cookie = `seniorly_role=${newUser.role}; path=/; max-age=604800; SameSite=Lax`;
    } catch {
      // ignore
    }
  };

  const clearUserSession = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = "seniorly_role=; path=/; max-age=0";
    } catch {
      // ignore
    }
  };

  const login = async (email: string, password?: string): Promise<User> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 350));

    const normalizedEmail = email.trim().toLowerCase();
    const accounts = getStoredRegisteredAccounts();

    const match = accounts.find((acc) => {
      const accEmail = acc.user.email.toLowerCase();
      if (accEmail === normalizedEmail) return true;

      if (
        (normalizedEmail === "mentor@seniorly.com" || normalizedEmail === "mentor@gmail.com") &&
        acc.user.role === "mentor"
      ) {
        return true;
      }
      if (
        (normalizedEmail === "student@seniorly.com" || normalizedEmail === "student@gmail.com") &&
        acc.user.id === "student-1"
      ) {
        return true;
      }
      return false;
    });

    if (!match) {
      setIsLoading(false);
      throw new Error(
        "NO_ACCOUNT_FOUND: No registered account found with this email. Please register first to choose your role (Student or Mentor)."
      );
    }

    if (match.password && password) {
      if (match.password !== password) {
        setIsLoading(false);
        throw new Error(
          "INVALID_PASSWORD: Incorrect password. Please check your password and try again."
        );
      }
    }

    saveUserSession(match.user);
    setIsLoading(false);
    return match.user;
  };

  const loginAsDemo = (role: UserRole): User => {
    const targetUser = role === "mentor" ? { ...DEMO_MENTOR } : { ...DEMO_STUDENT };
    saveUserSession(targetUser);
    return targetUser;
  };

  const register = async (data: {
    name: string;
    email: string;
    role: UserRole;
    password?: string;
    targetExam?: string;
    college?: string;
    rank?: string;
    expertise?: string | string[];
    hourlyRate?: string;
  }): Promise<User> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedEmail = data.email.trim().toLowerCase();
    const accounts = getStoredRegisteredAccounts();

    const initials = data.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

    const targetExam = data.targetExam || "Target Exam";
    const subjects = data.role === "student" ? getDefaultSubjectsForExam(targetExam) : undefined;
    const studyRoadmap = data.role === "student" ? getDefaultRoadmapForExam(targetExam) : undefined;

    let expertiseList: string[] | undefined;
    if (data.role === "mentor") {
      if (Array.isArray(data.expertise)) {
        expertiseList = data.expertise;
      } else if (typeof data.expertise === "string" && data.expertise.trim()) {
        expertiseList = data.expertise.split(",").map((s) => s.trim());
      } else {
        expertiseList = ["Power Systems", "Coding & DSA", "Concept Clarity"];
      }
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      initials,
      headline:
        data.role === "mentor"
          ? `${data.college || "Senior"} Mentor · ${data.rank || "AIR Ranker"}`
          : `Aspirant · ${targetExam}`,
      targetExam,
      college: data.college,
      rank: data.rank,
      expertise: expertiseList,
      hourlyRate: data.hourlyRate || "₹999 / session",
      isDemo: false,
      assignedMentor: null,
      goalProgress: 0,
      streakDays: 1,
      subjects,
      studyRoadmap,
      sessionsBooked: [],
      mentorStats:
        data.role === "mentor"
          ? { totalStudents: 0, activeRooms: 0, monthlyEarnings: 0 }
          : undefined,
      mentorSessions: [],
    };

    const existingIndex = accounts.findIndex(
      (acc) => acc.user.email.toLowerCase() === normalizedEmail
    );

    const updatedAccount: RegisteredAccount = {
      user: newUser,
      password: data.password || "password123",
    };

    if (existingIndex >= 0) {
      accounts[existingIndex] = updatedAccount;
    } else {
      accounts.push(updatedAccount);
    }

    saveRegisteredAccounts(accounts);
    saveUserSession(newUser);
    setIsLoading(false);
    return newUser;
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated: User = { ...user, ...updates };

    const accounts = getStoredRegisteredAccounts();
    const idx = accounts.findIndex(
      (a) => a.user.email.toLowerCase() === user.email.toLowerCase()
    );
    if (idx >= 0) {
      accounts[idx].user = updated;
      saveRegisteredAccounts(accounts);
    }

    saveUserSession(updated);
  };

  const assignMentor = (mentor: AssignedMentor) => {
    if (!user) return;
    const updated: User = {
      ...user,
      assignedMentor: mentor,
    };
    updateUserProfile(updated);
  };

  const removeMentor = () => {
    if (!user) return;
    const updated: User = {
      ...user,
      assignedMentor: null,
    };
    updateUserProfile(updated);
  };

  const bookSession = (session: BookedSession) => {
    if (!user) return;
    const currentSessions = user.sessionsBooked || [];
    const updated: User = {
      ...user,
      sessionsBooked: [session, ...currentSessions],
    };
    updateUserProfile(updated);
  };

  const addMentorSession = (session: MentorSessionItem) => {
    if (!user) return;
    const current = user.mentorSessions || [];
    const updated: User = {
      ...user,
      mentorSessions: [session, ...current],
      mentorStats: {
        totalStudents: user.mentorStats?.totalStudents || 0,
        activeRooms: (user.mentorStats?.activeRooms || 0) + 1,
        monthlyEarnings: user.mentorStats?.monthlyEarnings || 0,
      },
    };
    updateUserProfile(updated);
  };

  const updateSubjectProgress = (subjectName: string, deltaOrValue: number) => {
    if (!user || !user.subjects) return;
    const updatedSubjects = user.subjects.map((s) => {
      if (s.subject === subjectName) {
        const newPct = Math.min(100, Math.max(0, deltaOrValue));
        return { ...s, percentage: newPct };
      }
      return s;
    });

    const avg = Math.round(
      updatedSubjects.reduce((acc, curr) => acc + curr.percentage, 0) / (updatedSubjects.length || 1)
    );

    const updated: User = {
      ...user,
      subjects: updatedSubjects,
      goalProgress: avg,
    };
    updateUserProfile(updated);
  };

  const updateRoadmapItem = (id: string, updates: Partial<RoadmapItem>) => {
    if (!user) return;
    const currentRoadmap = user.studyRoadmap || getDefaultRoadmapForExam(user.targetExam);
    const updatedRoadmap = currentRoadmap.map((item) => {
      if (item.id === id) {
        const merged: RoadmapItem = { ...item, ...updates };
        if (merged.totalTopics > 0 && merged.topics >= merged.totalTopics) {
          merged.status = "Completed";
        } else if (merged.topics > 0 && merged.status === "Not Started") {
          merged.status = "In Progress";
        }
        return merged;
      }
      return item;
    });

    const newProgress = calculateRoadmapProgress(updatedRoadmap);
    const updated: User = {
      ...user,
      studyRoadmap: updatedRoadmap,
      goalProgress: newProgress,
    };
    updateUserProfile(updated);
  };

  const addRoadmapItem = (itemData: Omit<RoadmapItem, "id">) => {
    if (!user) return;
    const currentRoadmap = user.studyRoadmap || getDefaultRoadmapForExam(user.targetExam);
    const newItem: RoadmapItem = {
      id: `milestone-${Date.now()}`,
      ...itemData,
    };
    const updatedRoadmap = [...currentRoadmap, newItem];
    const newProgress = calculateRoadmapProgress(updatedRoadmap);
    const updated: User = {
      ...user,
      studyRoadmap: updatedRoadmap,
      goalProgress: newProgress,
    };
    updateUserProfile(updated);
  };

  const deleteRoadmapItem = (id: string) => {
    if (!user) return;
    const currentRoadmap = user.studyRoadmap || getDefaultRoadmapForExam(user.targetExam);
    const updatedRoadmap = currentRoadmap.filter((item) => item.id !== id);
    const newProgress = calculateRoadmapProgress(updatedRoadmap);
    const updated: User = {
      ...user,
      studyRoadmap: updatedRoadmap,
      goalProgress: newProgress,
    };
    updateUserProfile(updated);
  };

  const setRoadmap = (items: RoadmapItem[]) => {
    if (!user) return;
    const newProgress = calculateRoadmapProgress(items);
    const updated: User = {
      ...user,
      studyRoadmap: items,
      goalProgress: newProgress,
    };
    updateUserProfile(updated);
  };

  const resetRoadmapToExamDefault = (examName?: string) => {
    if (!user) return;
    const target = examName || user.targetExam || "CAT";
    const defaultItems = getDefaultRoadmapForExam(target);
    const newProgress = calculateRoadmapProgress(defaultItems);
    const updated: User = {
      ...user,
      targetExam: target,
      headline: `Aspirant · ${target}`,
      studyRoadmap: defaultItems,
      goalProgress: newProgress,
    };
    updateUserProfile(updated);
  };

  const updateGoalTitle = (title: string) => {
    if (!user) return;
    const updated: User = {
      ...user,
      targetExam: title,
      headline: `Aspirant · ${title}`,
    };
    updateUserProfile(updated);
  };

  const logout = () => {
    clearUserSession();
    router.push("/login");
  };

  const switchRole = () => {
    if (!user) return;
    const newRole: UserRole = user.role === "mentor" ? "student" : "mentor";
    const switchedUser: User =
      newRole === "mentor"
        ? { ...DEMO_MENTOR }
        : { ...DEMO_STUDENT };

    saveUserSession(switchedUser);
    if (newRole === "mentor") {
      router.push("/mentor/dashboard");
    } else {
      router.push("/student/dashboard");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoading,
        login,
        loginAsDemo,
        register,
        logout,
        switchRole,
        updateUserProfile,
        assignMentor,
        removeMentor,
        bookSession,
        updateSubjectProgress,
        addMentorSession,
        addRoadmapItem,
        updateRoadmapItem,
        deleteRoadmapItem,
        setRoadmap,
        resetRoadmapToExamDefault,
        updateGoalTitle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
