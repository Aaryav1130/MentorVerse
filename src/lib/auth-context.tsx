"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "student" | "mentor";

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
}

export const DEMO_MENTOR: User = {
  id: "mentor-1",
  name: "Dr. Arjun Mehta",
  email: "arjun.mehta@seniorly.com",
  role: "mentor",
  initials: "AM",
  headline: "GATE EE Expert | IIT Delhi",
  college: "IIT Delhi",
};

export const DEMO_STUDENT: User = {
  id: "student-1",
  name: "Prince",
  email: "prince@seniorly.com",
  role: "student",
  initials: "P",
  headline: "Aspirant · GATE EE 2027",
  targetExam: "GATE EE 2027",
};

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
  }) => Promise<User>;
  logout: () => void;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "seniorly_auth_user";

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
      // Set simple cookie for middleware / server compatibility
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

  const login = async (email: string): Promise<User> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400)); // smooth realistic feel

    // Smart role detection:
    // If email contains "mentor", "dr", or matches demo mentor -> login as mentor
    // Otherwise default to student or saved preference
    const isMentor =
      email.toLowerCase().includes("mentor") ||
      email.toLowerCase().includes("arjun") ||
      email.toLowerCase() === DEMO_MENTOR.email.toLowerCase();

    const loggedUser: User = isMentor
      ? { ...DEMO_MENTOR, email }
      : {
          ...DEMO_STUDENT,
          email,
          name: email.split("@")[0].replace(/[._]/g, " ") || "Student",
          initials: (email[0] || "S").toUpperCase(),
        };

    saveUserSession(loggedUser);
    setIsLoading(false);
    return loggedUser;
  };

  const loginAsDemo = (role: UserRole): User => {
    const targetUser = role === "mentor" ? DEMO_MENTOR : DEMO_STUDENT;
    saveUserSession(targetUser);
    return targetUser;
  };

  const register = async (data: {
    name: string;
    email: string;
    role: UserRole;
    targetExam?: string;
    college?: string;
  }): Promise<User> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const initials = data.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      initials,
      headline:
        data.role === "mentor"
          ? `${data.college || "Senior"} Mentor`
          : `Aspirant · ${data.targetExam || "Targeting Top College"}`,
      targetExam: data.targetExam,
      college: data.college,
    };

    saveUserSession(newUser);
    setIsLoading(false);
    return newUser;
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
