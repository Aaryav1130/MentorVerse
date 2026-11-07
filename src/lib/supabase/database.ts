import { supabase } from "./client";
import { RoadmapItem, BookedSession } from "../auth-context";

export interface DbProfile {
  id: string;
  email: string;
  full_name: string;
  role: "student" | "mentor";
  avatar_url?: string | null;
  phone?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DbStudent {
  user_id: string;
  target_exam: string;
  current_streak: number;
  assigned_mentor_id?: string | null;
  preferences?: Record<string, unknown>;
}

export interface DbMentor {
  user_id: string;
  headline: string;
  college: string;
  rank_air: string;
  hourly_rate_inr: number;
  is_verified: boolean;
  rating: number;
  total_reviews: number;
  total_students: number;
  bio?: string | null;
  expertise_tags: string[];
}

export interface DbRoadmapItem {
  id?: string;
  student_id: string;
  title: string;
  order_index: number;
  topics_completed: number;
  total_topics: number;
  tests_completed: number;
  status: "Not Started" | "In Progress" | "Completed";
  target_date?: string | null;
}

// ---------------- ROADMAP SYNC ----------------
export async function fetchStudentRoadmapFromDb(studentId: string): Promise<RoadmapItem[] | null> {
  try {
    const { data, error } = await supabase
      .from("study_roadmap")
      .select("*")
      .eq("student_id", studentId)
      .order("order_index", { ascending: true });

    if (error) {
      console.warn("Error fetching roadmap from Supabase:", error.message);
      return null;
    }

    if (!data || data.length === 0) return null;

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      topics: item.topics_completed || 0,
      totalTopics: item.total_topics || 10,
      tests: item.tests_completed || 0,
      status: item.status || "Not Started",
      targetDate: item.target_date || undefined,
    }));
  } catch (err) {
    console.warn("Exception fetching roadmap from Supabase:", err);
    return null;
  }
}

export async function syncRoadmapToDb(studentId: string, items: RoadmapItem[]) {
  try {
    // Only sync if studentId is a valid UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(studentId);
    if (!isUuid) return;

    // Ensure student record exists in students table
    const { data: stExists } = await supabase
      .from("students")
      .select("user_id")
      .eq("user_id", studentId)
      .maybeSingle();

    if (!stExists) {
      await supabase.from("students").insert({ user_id: studentId }).select();
    }

    // Delete existing items for student and replace with updated batch
    await supabase.from("study_roadmap").delete().eq("student_id", studentId);

    const rows = items.map((item, index) => ({
      student_id: studentId,
      title: item.title,
      order_index: index,
      topics_completed: item.topics || 0,
      total_topics: item.totalTopics || 10,
      tests_completed: item.tests || 0,
      status: item.status,
      target_date: item.targetDate || null,
    }));

    const { error } = await supabase.from("study_roadmap").insert(rows);
    if (error) {
      console.warn("Error saving roadmap to Supabase:", error.message);
    }
  } catch (err) {
    console.warn("Exception saving roadmap to Supabase:", err);
  }
}

// ---------------- STUDENT PROFILE & EXAM SYNC ----------------
export async function updateStudentExamInDb(studentId: string, targetExam: string) {
  try {
    const { error } = await supabase
      .from("students")
      .update({ target_exam: targetExam })
      .eq("user_id", studentId);

    if (error) {
      console.warn("Error updating student exam in Supabase:", error.message);
    }
  } catch (err) {
    console.warn("Exception updating student exam in Supabase:", err);
  }
}

export async function updateStudentStreakInDb(studentId: string, streak: number) {
  try {
    const { error } = await supabase
      .from("students")
      .update({ current_streak: streak })
      .eq("user_id", studentId);

    if (error) {
      console.warn("Error updating streak in Supabase:", error.message);
    }
  } catch (err) {
    console.warn("Exception updating streak in Supabase:", err);
  }
}

// ---------------- SESSIONS & BOOKINGS ----------------
export async function createBookingInDb(booking: {
  studentId: string;
  mentorId: string;
  sessionTitle: string;
  sessionType?: string;
  scheduledAt: string;
  durationMinutes?: number;
  meetingUrl?: string;
}) {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(booking.studentId);
    if (!isUuid) return null;

    const { data, error } = await supabase.from("bookings").insert({
      student_id: booking.studentId,
      mentor_id: booking.mentorId,
      session_title: booking.sessionTitle,
      session_type: booking.sessionType || "1:1 Session",
      scheduled_at: booking.scheduledAt,
      duration_minutes: booking.durationMinutes || 60,
      meeting_url: booking.meetingUrl || null,
      status: "confirmed",
    }).select().single();

    if (error) {
      console.warn("Error creating booking in Supabase:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn("Exception creating booking in Supabase:", err);
    return null;
  }
}

// ---------------- DOUBTS & Q&A ----------------
export async function createDoubtInDb(doubt: {
  studentId: string;
  mentorId?: string | null;
  subject: string;
  question: string;
  answer?: string;
}) {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(doubt.studentId);
    if (!isUuid) return null;

    const { data, error } = await supabase.from("doubts").insert({
      student_id: doubt.studentId,
      mentor_id: doubt.mentorId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(doubt.mentorId) ? doubt.mentorId : null,
      subject: doubt.subject,
      question: doubt.question,
      answer: doubt.answer || null,
      status: doubt.answer ? "answered" : "open",
    }).select().single();

    if (error) {
      console.warn("Error creating doubt in Supabase:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn("Exception creating doubt in Supabase:", err);
    return null;
  }
}

export async function fetchStudentDoubtsFromDb(studentId: string) {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(studentId);
    if (!isUuid) return null;

    const { data, error } = await supabase
      .from("doubts")
      .select("*")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Error fetching doubts from Supabase:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn("Exception fetching doubts from Supabase:", err);
    return null;
  }
}
