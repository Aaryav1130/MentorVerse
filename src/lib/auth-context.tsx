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
