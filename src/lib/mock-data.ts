// ============================================
// MentorVerse — Comprehensive Mock Data
// ============================================

// ---- MENTOR PROFILE (used by mentor layout, dashboard, student dashboard) ----
export const mentorProfile = {
  name: "Dr. Arjun Mehta",
  initials: "AM",
  title: "GATE EE Expert | 5+ Years Experience",
  experience: "5+ Years Experience",
  rating: 4.9,
  reviews: 342,
  students: "1.2k+",
  totalStudents: 1200,
  college: "IIT Delhi",
  isVerified: true,
  bio: "I am an Electrical Engineering graduate from IIT Delhi with 5+ years of teaching experience. I specialize in GATE EE, Power Systems, Control Systems and Electrical Machines. My goal is to help you not just crack the exam, but build a strong foundation for your future.",
  expertise: [
    "Power Systems",
    "Network Theory",
    "GATE EE",
    "Control Systems",
    "Electrical Machines",
  ],
  tags: ["GATE", "Power Systems", "Electrical Machines", "Network Theory"],
  subjects: [
    "Circuit Analysis & Network Theory",
    "Power Systems",
    "Electrical Machines",
    "Control Systems",
    "GATE PYQs & Strategy",
  ],
  about:
    "I am an Electrical Engineering graduate from IIT Delhi with 5+ years of teaching experience. I specialize in GATE EE, Power Systems, Control Systems and Electrical Machines. My goal is to help you not just crack the exam, but build a strong foundation for your future.",
  price: "₹299",
  availability: "Mon – Sat, 10:00 AM – 8:00 PM",
  pricing: {
    oneOnOne: 2999,
    group: 1499,
  },
  quote: "Discipline today, freedom tomorrow.",
};

// ---- MENTOR DASHBOARD STATS ----
export const mentorStats = {
  totalStudents: { value: 24, trend: 12, up: true },
  activeRooms: { value: 6, trend: 2, up: true },
  monthlyEarnings: { value: 124800, trend: 16, up: true },
};

// ---- TODAY'S SESSIONS (Mentor Dashboard) ----
export const todaysSessions = [
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
];

// ---- RECENT ACTIVITY (Mentor Dashboard) ----
export const recentActivityMentor = [
  {
    id: "1",
    title: "Prince submitted Power System assignment",
    time: "2 hours ago",
    icon: "FileText",
  },
  {
    id: "2",
    title: "New doubt from Neha Sharma",
    time: "3 hours ago",
    icon: "User",
  },
  {
    id: "3",
    title: "Session completed with Rohit Verma",
    time: "5 hours ago",
    icon: "CheckCircle",
  },
];

// ---- GROWTH CHART DATA (Mentor Dashboard) ----
export const growthChartData = [
  { name: "Jan", students: 8 },
  { name: "Feb", students: 10 },
  { name: "Mar", students: 12 },
  { name: "Apr", students: 15 },
  { name: "May", students: 18 },
  { name: "Jun", students: 20 },
  { name: "Jul", students: 22 },
  { name: "Aug", students: 24 },
];

// ---- STUDENTS LIST (Mentor Students Page) ----
export const studentStatsForMentor = {
  total: 24,
  active: 18,
  onHold: 4,
  completed: 2,
};

export const students = [
  {
    id: "1",
    name: "Prince",
    initials: "PR",
    exam: "GATE EE 2027",
    overallProgress: 68,
    scoreProgress: 68,
    lastActive: "2 hours ago",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Neha Sharma",
    initials: "NS",
    exam: "GATE EE 2027",
    overallProgress: 54,
    scoreProgress: 54,
    lastActive: "5 hours ago",
    color: "bg-emerald-500",
  },
  {
    id: "3",
    name: "Rohit Verma",
    initials: "RV",
    exam: "GATE EE 2027",
    overallProgress: 42,
    scoreProgress: 42,
    lastActive: "1 day ago",
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "Karan Patel",
    initials: "KP",
    exam: "GATE EE 2027",
    overallProgress: 76,
    scoreProgress: 76,
    lastActive: "2 days ago",
    color: "bg-amber-500",
  },
  {
    id: "5",
    name: "Simran Kaur",
    initials: "SK",
    exam: "GATE EE 2027",
    overallProgress: 38,
    scoreProgress: 38,
    lastActive: "3 days ago",
    color: "bg-rose-500",
  },
];

// ---- PRINCE STUDENT DETAIL (Mentor > Students > [id]) ----
export const princeDetails = {
  name: "Prince",
  initials: "PR",
  exam: "GATE EE 2027",
  tags: ["Focused", "Regular", "Hardworking"],
  overallProgress: { completed: 48, total: 70, percentage: 68 },
  subjectProgress: [
    { name: "Network Theory", percentage: 92, color: "bg-emerald-500" },
    { name: "Power Systems", percentage: 61, color: "bg-blue-500" },
    { name: "Machines", percentage: 76, color: "bg-amber-500" },
    { name: "Control Systems", percentage: 43, color: "bg-red-500" },
  ],
  nextTarget: { title: "Complete Fault Analysis", count: 3, due: "2 days" },
  recentActivity: [
    { id: "1", title: "Completed: Network Theorems", time: "2 hours ago" },
    {
      id: "2",
      title: "Score: 85% in Weekly Test",
      time: "1 day ago",
    },
    {
      id: "3",
      title: "Doubt solved: Fault Analysis",
      time: "2 days ago",
    },
  ],
};

// ---- CALENDAR SESSIONS (Mentor Sessions Page) ----
export const calendarSessions = [
  {
    id: "1",
    title: "GATE EE 2027 – Power System Protection",
    time: "10:00 AM – 11:00 AM",
    students: 12,
    type: "Group Class",
    isLive: true,
  },
  {
    id: "2",
    title: "1:1 Session – Prince",
    time: "04:00 PM – 05:00 PM",
    students: 1,
    type: "1:1 Session",
    isLive: false,
  },
  {
    id: "3",
    title: "Group Doubt Solving",
    time: "07:00 PM – 08:00 PM",
    students: 8,
    type: "Group Doubt",
    isLive: false,
  },
];

// ---- EARNINGS DATA (Mentor Earnings Page) ----
export const earningsData = {
  totalEarnings: { value: 124800, trend: 18, up: true },
  completedSessions: { value: 42, trend: 12, up: true },
  pendingPayout: { value: 8500 },
};

export const earningsChartData = [
  { date: "1 May", amount: 8000 },
  { date: "5 May", amount: 15000 },
  { date: "8 May", amount: 12000 },
  { date: "10 May", amount: 22000 },
  { date: "13 May", amount: 18000 },
  { date: "15 May", amount: 28000 },
  { date: "18 May", amount: 25000 },
  { date: "20 May", amount: 35000 },
  { date: "22 May", amount: 32000 },
  { date: "25 May", amount: 42000 },
  { date: "28 May", amount: 38000 },
  { date: "31 May", amount: 45000 },
];

export const recentTransactions = [
  {
    id: "t1",
    description: "Session with Prince",
    amount: 2999,
    date: "May 12, 2025",
    status: "Completed",
  },
  {
    id: "t2",
    description: "Session with Neha Sharma",
    amount: 1999,
    date: "May 11, 2025",
    status: "Completed",
  },
  {
    id: "t3",
    description: "Group Room – GATE 2027",
    amount: 4999,
    date: "May 10, 2025",
    status: "Completed",
  },
];

// ============================================
// STUDENT DASHBOARD DATA
// ============================================

export const studentDashboardData = {
  greeting: "Good Morning, Prince 👋",
  subtitle: "Small steps every day lead to big results.",
  goal: {
    title: "GATE EE 2027",
    progress: 68,
  },
  today: {
    time: "6:00 PM",
    type: "Live Room",
    title: "Power Systems",
    mentor: "Dr. Arjun Mehta",
  },
  progress: [
    { subject: "Network Theory", percentage: 92 },
    { subject: "Machines", percentage: 76 },
    { subject: "Power Systems", percentage: 61 },
    { subject: "Control Systems", percentage: 43 },
  ],
  nextMilestone:
    "Complete Fault Analysis — This will help you move to the next level in Power Systems",
  continueLearning: [
    {
      title: "Power Systems",
      type: "Live Room",
      time: "6:00 PM",
      students: 24,
      tag: "GATE EE 2027",
    },
    {
      title: "Network Theory",
      type: "Recorded",
      time: "2h 15m",
      students: 0,
      tag: "GATE EE 2027",
    },
    {
      title: "Control Systems",
      type: "Live Room",
      time: "8:00 PM",
      students: 18,
      tag: "GATE EE 2027",
    },
  ],
  streak: [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: true },
    { day: "T", completed: true },
    { day: "F", completed: true },
    { day: "S", completed: true },
    { day: "S", completed: false },
  ],
  recentActivity: [
    {
      title: "You completed 'Network Theory - Quiz 2'",
      time: "2 hours ago",
    },
    {
      title: "New resource added in Power Systems",
      time: "5 hours ago",
    },
    {
      title: "Dr. Arjun replied to your doubt",
      time: "Yesterday",
    },
  ],
  resources: [
    { title: "GATE 2026 PYQs", type: "pdf", size: "PDF · 12 MB" },
    { title: "Power Systems Notes", type: "pdf", size: "PDF · 8 MB" },
    {
      title: "Network Theory Videos",
      type: "video",
      size: "YouTube · 2h 30m",
    },
  ],
};

// ============================================
// STUDY PLAN DATA
// ============================================

export const studyPlanData = {
  goal: "GATE 2026",
  progress: 42,
  roadmap: [
    {
      title: "Network Theory",
      topics: 12,
      totalTopics: 12,
      tests: 2,
      status: "Completed",
    },
    {
      title: "Signals & Systems",
      topics: 8,
      totalTopics: 12,
      tests: 1,
      status: "In Progress",
    },
    {
      title: "Electrical Machines",
      topics: 0,
      totalTopics: 10,
      tests: 0,
      status: "Not Started",
    },
    {
      title: "Power Systems",
      topics: 0,
      totalTopics: 14,
      tests: 0,
      status: "Not Started",
    },
    {
      title: "Control Systems",
      topics: 0,
      totalTopics: 11,
      tests: 0,
      status: "Not Started",
    },
    {
      title: "Power Electronics",
      topics: 0,
      totalTopics: 8,
      tests: 0,
      status: "Not Started",
    },
  ],
};

// ============================================
// STUDENT SESSIONS & DOUBTS
// ============================================

export const studentSessions = [
  {
    id: "ss1",
    title: "GATE EE – Power Systems",
    mentor: "Dr. Arjun Mehta",
    time: "Today · 6:00 PM – 7:00 PM",
    tag: "GATE EE 2027",
  },
];

export const studentDoubts = [
  {
    id: "d1",
    question:
      "Why is the value of surge impedance important in transmission lines?",
    status: "Answered",
    time: "2 hours ago",
  },
  {
    id: "d2",
    question:
      "How to approach questions in GATE Power Systems section?",
    status: "Answered",
    time: "5 hours ago",
  },
  {
    id: "d3",
    question: "Difference between synchronous and induction motor?",
    status: "Answered",
    time: "1 day ago",
  },
];

// ============================================
// PUBLIC MENTOR LISTING
// ============================================

export const publicMentors = [
  {
    id: "m1",
    name: "Dr. Arjun Mehta",
    initials: "AM",
    color: "bg-amber-600",
    title: "GATE EE Expert",
    students: "1.2k+ students",
    rating: 4.9,
    price: "₹299",
    tags: ["GATE", "Power Systems", "Electrical Machines"],
  },
  {
    id: "m2",
    name: "Prof. Neha Sharma",
    initials: "NS",
    color: "bg-rose-600",
    title: "Physics & Mathematics",
    students: "980+ students",
    rating: 4.8,
    price: "₹249",
    tags: ["JEE", "B.Sc.", "Concept Clarity"],
  },
  {
    id: "m3",
    name: "Rohit Verma",
    initials: "RV",
    color: "bg-blue-600",
    title: "Career & Placement",
    students: "700+ students",
    rating: 4.8,
    price: "₹349",
    tags: ["Resume", "Interview", "Skill Building"],
  },
  {
    id: "m4",
    name: "Aaran Singh",
    initials: "AS",
    color: "bg-emerald-600",
    title: "Coding & DSA",
    students: "1.5k+ students",
    rating: 4.9,
    price: "₹299",
    tags: ["Python", "DSA", "Web Development"],
  },
];

// ============================================
// MENTOR CATEGORIES (Discover Page)
// ============================================

export const mentorCategories = [
  {
    id: "cat1",
    icon: "Target",
    title: "GATE / ESE",
    description: "Expert guidance for competitive exams",
  },
  {
    id: "cat2",
    icon: "GraduationCap",
    title: "Academics",
    description: "Score better with subject experts",
  },
  {
    id: "cat3",
    icon: "Briefcase",
    title: "Career & Placement",
    description: "Build your career with industry mentors",
  },
  {
    id: "cat4",
    icon: "Code",
    title: "Coding & Development",
    description: "Learn, build, grow",
  },
  {
    id: "cat5",
    icon: "Cpu",
    title: "Robotics & Embedded",
    description: "Turn ideas into projects",
  },
  {
    id: "cat6",
    icon: "Sparkles",
    title: "Personal Growth",
    description: "Productivity, confidence & life skills",
  },
];
