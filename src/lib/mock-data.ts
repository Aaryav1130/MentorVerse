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
  // CAT Mentors
  {
    id: "m5",
    name: "Ishan Mukherjee",
    initials: "IM",
    color: "bg-indigo-600",
    title: "CAT 99.8%ile · IIM Ahmedabad",
    college: "IIM Ahmedabad",
    experience: "4+ Years Experience",
    students: "1.1k+ students",
    rating: 4.95,
    reviews: 280,
    price: "₹399",
    tags: ["CAT", "MBA", "Quant", "DILR", "IIM A"],
    bio: "Scored 99.84 percentile in CAT. Guided 400+ aspirants into IIM A/B/C, FMS, and XLRI. Specialized in speed math shortcuts, DILR puzzles, and mock test analysis.",
    subjects: [
      "Quantitative Aptitude (QA)",
      "DILR Caselets & Data Interpretation",
      "Speed Math & Approximation",
      "Mock Strategy & Score Booster",
      "IIM WAT-PI & SOP Mentorship"
    ],
    availability: "Mon – Sun, 6:00 PM – 10:00 PM",
    quote: "CAT is not a test of knowledge; it is a test of decision making and accuracy under pressure."
  },
  {
    id: "m6",
    name: "Sneha Roy",
    initials: "SR",
    color: "bg-violet-600",
    title: "VARC 99.7%ile · IIM Bangalore",
    college: "IIM Bangalore",
    experience: "3+ Years Experience",
    students: "850+ students",
    rating: 4.9,
    reviews: 195,
    price: "₹349",
    tags: ["CAT", "MBA", "VARC", "Reading Comprehension", "IIM B"],
    bio: "99.7 percentile in CAT VARC. Learn how to read dense passages with high comprehension, eliminate trap answer choices, and master summary/para jumbles.",
    subjects: [
      "Reading Comprehension (RC) Masterclass",
      "Critical Reasoning & Argument Analysis",
      "Para Jumbles & Odd-One-Out",
      "Profile Evaluation & B-School Selection"
    ],
    availability: "Tue – Sat, 5:00 PM – 9:00 PM",
    quote: "Eliminate the wrong options with conviction, and the right answer will stand out."
  },

  // GATE EE & ESE Mentors
  {
    id: "m1",
    name: "Dr. Arjun Mehta",
    initials: "AM",
    color: "bg-amber-600",
    title: "AIR 214 · GATE EE Expert · IIT Delhi",
    college: "IIT Delhi",
    experience: "5+ Years Experience",
    students: "1.2k+ students",
    rating: 4.9,
    reviews: 342,
    price: "₹299",
    tags: ["GATE", "GATE EE", "ESE", "Power Systems", "Electrical Machines"],
    bio: "Graduate from IIT Delhi with 5+ years of teaching experience. I specialize in GATE EE, Power Systems, Control Systems and Electrical Machines.",
    subjects: [
      "Circuit Analysis & Network Theory",
      "Power Systems Protection & Stability",
      "Electrical Machines",
      "Control Systems",
      "GATE PYQs & Strategy"
    ],
    availability: "Mon – Sat, 10:00 AM – 8:00 PM",
    quote: "Discipline today, freedom tomorrow."
  },
  {
    id: "m8",
    name: "Vikramaditya Rao",
    initials: "VR",
    color: "bg-cyan-600",
    title: "AIR 12 ESE · IIT Roorkee",
    college: "IIT Roorkee",
    experience: "4+ Years Experience",
    students: "920+ students",
    rating: 4.85,
    reviews: 210,
    price: "₹349",
    tags: ["ESE", "GATE", "Engineering Services", "Power Electronics"],
    bio: "AIR 12 in UPSC Engineering Services Examination (ESE) and AIR 84 in GATE. Complete roadmap for technical and general studies papers.",
    subjects: [
      "Engineering Services Prelims & Mains",
      "Power Electronics & Drives",
      "Analog & Digital Electronics",
      "Conventional Paper Writing Techniques"
    ],
    availability: "Mon – Fri, 6:00 PM – 10:00 PM",
    quote: "Precision in concepts beats sheer volume of study every single time."
  },

  // GATE CS & Coding Mentors
  {
    id: "m4",
    name: "Aaran Singh",
    initials: "AS",
    color: "bg-emerald-600",
    title: "AIR 76 · GATE CS · Ex-Google SWE",
    college: "IIT Roorkee, CSE",
    experience: "4+ Years Experience",
    students: "1.5k+ students",
    rating: 4.9,
    reviews: 410,
    price: "₹299",
    tags: ["GATE CS", "Coding", "DSA", "Algorithms", "Operating Systems"],
    bio: "AIR 76 in GATE CS and Senior Software Engineer. I mentor students on Algorithms, Data Structures, Operating Systems, and competitive coding.",
    subjects: [
      "Data Structures & Algorithms",
      "Operating Systems & Concurrency",
      "Database Management Systems (DBMS)",
      "Computer Networks & Protocols"
    ],
    availability: "Mon – Sat, 4:00 PM – 9:00 PM",
    quote: "Code clean, think in algorithms, and master the fundamentals."
  },
  {
    id: "m7",
    name: "Pooja Hegde",
    initials: "PH",
    color: "bg-teal-600",
    title: "AIR 34 · GATE CS · IIT Bombay",
    college: "IIT Bombay, CSE",
    experience: "3+ Years Experience",
    students: "1.3k+ students",
    rating: 4.9,
    reviews: 320,
    price: "₹349",
    tags: ["GATE CS", "GATE", "Theory of Computation", "Compiler Design"],
    bio: "M.Tech CSE from IIT Bombay. Highest marks scorer in Theory of Computation & Discrete Mathematics. Let's make formal languages intuitive.",
    subjects: [
      "Theory of Computation & Automata",
      "Compiler Design & Syntax Analysis",
      "Discrete Mathematics & Graph Theory",
      "GATE CS Last 10-Year PYQ Breakdown"
    ],
    availability: "Wed – Sun, 3:00 PM – 8:00 PM",
    quote: "When you understand why a theorem works, you never have to memorize it."
  },

  // JEE Mentors
  {
    id: "m2",
    name: "Prof. Neha Sharma",
    initials: "NS",
    color: "bg-rose-600",
    title: "AIR 412 JEE Adv · IIT Kharagpur",
    college: "IIT Kharagpur",
    experience: "6+ Years Experience",
    students: "980+ students",
    rating: 4.8,
    reviews: 260,
    price: "₹249",
    tags: ["JEE", "JEE Advanced", "JEE Mains", "Physics", "Mathematics"],
    bio: "IIT Kharagpur alumnus with 6+ years training JEE aspirants. Simplifying rotation mechanics, electrostatics, and multivariable calculus.",
    subjects: [
      "Mechanics & Rotational Dynamics",
      "Electrodynamics & Optics",
      "Calculus & Coordinate Geometry",
      "JEE Advanced Tough Problem Solving"
    ],
    availability: "Mon – Sat, 11:00 AM – 7:00 PM",
    quote: "Visualize physics before touching a formula."
  },
  {
    id: "m9",
    name: "Tanmay Bhatnagar",
    initials: "TB",
    color: "bg-orange-600",
    title: "AIR 89 JEE Advanced · IIT Delhi CSE",
    college: "IIT Delhi",
    experience: "3+ Years Experience",
    students: "1.8k+ students",
    rating: 4.95,
    reviews: 490,
    price: "₹399",
    tags: ["JEE", "JEE Advanced", "Organic Chemistry", "Calculus"],
    bio: "AIR 89 in JEE Advanced. Special focus on mastering organic mechanisms, physical chemistry equilibrium, and high-weightage math topics.",
    subjects: [
      "Organic Chemistry Reactions & Reagents",
      "Differential & Integral Calculus",
      "Advanced Mock Test Solving & Time Allocation"
    ],
    availability: "Mon – Fri, 5:00 PM – 9:00 PM",
    quote: "Consistency over 2 years beats 14-hour cramming in the last month."
  },

  // NEET UG Mentors
  {
    id: "m10",
    name: "Dr. Ananya Sen",
    initials: "AS",
    color: "bg-pink-600",
    title: "AIR 67 NEET UG · AIIMS New Delhi",
    college: "AIIMS New Delhi",
    experience: "4+ Years Experience",
    students: "2.1k+ students",
    rating: 4.95,
    reviews: 580,
    price: "₹349",
    tags: ["NEET", "Biology", "NCERT Line-by-Line", "AIIMS"],
    bio: "MBBS Student at AIIMS Delhi with 355/360 in NEET Biology. Master active recall techniques, NCERT diagram analysis, and mnemonic frameworks.",
    subjects: [
      "NCERT Line-by-Line Biology Mastery",
      "Human Physiology & Genetics",
      "Ecology, Plant Kingdom & Morphology",
      "Eliminating Negative Marks in NEET"
    ],
    availability: "Mon – Sun, 4:00 PM – 9:00 PM",
    quote: "Master NCERT like the back of your hand, and 340+ in Biology is guaranteed."
  },
  {
    id: "m11",
    name: "Dr. Kabeer Sethi",
    initials: "KS",
    color: "bg-red-600",
    title: "NEET 705/720 · Maulana Azad MAMC",
    college: "MAMC New Delhi",
    experience: "3+ Years Experience",
    students: "1.4k+ students",
    rating: 4.9,
    reviews: 310,
    price: "₹299",
    tags: ["NEET", "Chemistry", "Physics for Medical", "MAMC"],
    bio: "Score 705/720 in NEET UG. Special coaching for medical aspirants struggling with Physics numericals and Chemistry reaction charts.",
    subjects: [
      "Physics for Medical Aspirants (Simplified Formulas)",
      "Inorganic & Physical Chemistry Shortcuts",
      "OMR Speed & Error Minimization"
    ],
    availability: "Tue – Sat, 6:00 PM – 10:00 PM",
    quote: "Never skip Physics numericals; they decide your college rank."
  },

  // UPSC CSE Mentors
  {
    id: "m12",
    name: "Siddharth Jain",
    initials: "SJ",
    color: "bg-amber-700",
    title: "AIR 48 UPSC CSE · IAS Officer",
    college: "St. Stephen's / LBSNAA",
    experience: "5+ Years Experience",
    students: "3.2k+ students",
    rating: 4.98,
    reviews: 840,
    price: "₹499",
    tags: ["UPSC", "General Studies", "Polity", "Answer Writing"],
    bio: "Secured AIR 48 in UPSC Civil Services Examination. Dedicated mentor for GS Papers 1-4, Mains answer enrichment, and concise note-making.",
    subjects: [
      "Indian Polity, Governance & Constitution (GS2)",
      "Mains Answer Writing & Diagram Integration",
      "Essay Strategy & Structure",
      "Ethics, Integrity & Aptitude (GS4)"
    ],
    availability: "Sat – Sun, 10:00 AM – 6:00 PM",
    quote: "UPSC is about depth of understanding and crisp expression, not endless reading."
  },
  {
    id: "m13",
    name: "Meera Nambiar",
    initials: "MN",
    color: "bg-emerald-700",
    title: "UPSC Ranker · IFS 2023",
    college: "JNU / IFS",
    experience: "3+ Years Experience",
    students: "1.1k+ students",
    rating: 4.9,
    reviews: 290,
    price: "₹449",
    tags: ["UPSC", "CSAT", "International Relations", "Geography"],
    bio: "Cracked UPSC with high scores in CSAT and International Relations. Structured guidance on Prelims elimination techniques and syllabus consolidation.",
    subjects: [
      "CSAT Reading Comprehension & Analytical Reasoning",
      "International Relations & Current Geopolitics",
      "Physical & Human Geography (GS1)",
      "Prelims 50-Day Score Maximization"
    ],
    availability: "Fri – Sun, 2:00 PM – 8:00 PM",
    quote: "Consistency, revision, and test analysis are the three pillars of cracking civil services."
  },

  // Career & Placement Mentors
  {
    id: "m3",
    name: "Rohit Verma",
    initials: "RV",
    color: "bg-blue-600",
    title: "Staff SWE · Career & Interview Coach",
    college: "BITS Pilani",
    experience: "7+ Years Experience",
    students: "700+ students",
    rating: 4.8,
    reviews: 230,
    price: "₹349",
    tags: ["Career", "Placement", "Resume", "System Design", "Mock Interview"],
    bio: "Ex-Google, Ex-Amazon Staff Engineer. Helping college students crack top product companies, off-campus placements, and technical interviews.",
    subjects: [
      "Resume Optimization & ATS Clearance",
      "System Design & Low-Level Design (LLD)",
      "1:1 Mock Coding & Behavioral Interviews",
      "Salary Negotiation & Offer Evaluation"
    ],
    availability: "Mon – Fri, 7:00 PM – 11:00 PM",
    quote: "Treat interview prep like a marathon; technique and communication trump raw problem count."
  }
];

// Helper: Filter mentors by student's target exam or stream
export function getMentorsForExam(examString: string = ""): typeof publicMentors {
  const normalized = examString.toLowerCase().trim();
  if (!normalized) return publicMentors;

  if (normalized.includes("cat") || normalized.includes("mba")) {
    return publicMentors.filter((m) => m.tags.includes("CAT") || m.tags.includes("MBA"));
  }
  if (normalized.includes("neet")) {
    return publicMentors.filter((m) => m.tags.includes("NEET"));
  }
  if (normalized.includes("upsc")) {
    return publicMentors.filter((m) => m.tags.includes("UPSC"));
  }
  if (normalized.includes("jee")) {
    return publicMentors.filter((m) => m.tags.includes("JEE") || m.tags.includes("JEE Advanced"));
  }
  if (normalized.includes("cs") || normalized.includes("coding") || normalized.includes("computer")) {
    return publicMentors.filter((m) => m.tags.includes("GATE CS") || m.tags.includes("Coding"));
  }
  if (normalized.includes("ese")) {
    return publicMentors.filter((m) => m.tags.includes("ESE") || m.tags.includes("GATE"));
  }
  if (normalized.includes("gate")) {
    return publicMentors.filter((m) => m.tags.includes("GATE") || m.tags.includes("GATE EE") || m.tags.includes("GATE CS"));
  }

  // Fallback: match any tag or title
  const matches = publicMentors.filter((m) =>
    m.tags.some((t) => t.toLowerCase().includes(normalized)) ||
    m.title.toLowerCase().includes(normalized)
  );

  return matches.length > 0 ? matches : publicMentors;
}

// Helper: Get single mentor with all details by id
export function getMentorById(id: string) {
  return publicMentors.find((m) => m.id === id) || publicMentors[0];
}

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
