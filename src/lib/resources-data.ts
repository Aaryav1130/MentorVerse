export interface StudyResourceItem {
  id: string;
  title: string;
  category: "Notes" | "PYQs" | "Formula Sheets" | "Video Lectures" | "Practice Tests";
  exam: "CAT" | "GATE" | "JEE" | "NEET" | "UPSC" | "All";
  subject: string;
  size: string;
  pagesOrDuration: string;
  downloads: string;
  rating: number;
  description: string;
  topperTips?: string;
  contentPreview?: string[];
  fileUrl?: string;
}

export const ALL_STUDY_RESOURCES: StudyResourceItem[] = [
  // ---------------- CAT (MBA) RESOURCES ----------------
  {
    id: "cat-res-1",
    title: "CAT Quant Formula Handbook & Arithmetic Shortcuts",
    category: "Formula Sheets",
    exam: "CAT",
    subject: "Quantitative Aptitude (QA)",
    size: "PDF · 12.4 MB",
    pagesOrDuration: "48 Pages",
    downloads: "5.8k",
    rating: 4.9,
    description: "Complete arithmetic, algebra, geometry & numbers formulas compiled by 99.9%ilers from IIM Ahmedabad & Bangalore.",
    topperTips: "Sneha Roy's Tip: Review pages 12-24 on TSD (Time Speed Distance) and Mixtures weekly to cut solving time under 90 seconds.",
    contentPreview: [
      "Arithmetic Progression: S_n = n/2 [2a + (n-1)d]",
      "Alligation Formula: (Cheaper Qty) / (Dearer Qty) = (d - m) / (m - c)",
      "Time Speed Distance: Relative speed in opposite direction = S1 + S2; same direction = |S1 - S2|",
      "Geometry: Incenter r = Area / semi-perimeter (A/s); Circumradius R = abc / 4A",
      "Remainders: Fermat's Little Theorem a^(p-1) ≡ 1 (mod p) where p is prime and gcd(a, p) = 1"
    ],
  },
  {
    id: "cat-res-2",
    title: "DILR Master Vault: Top 50 High-Frequency Caselets (2018–2024)",
    category: "Notes",
    exam: "CAT",
    subject: "Data Interpretation & Logical Reasoning (DILR)",
    size: "PDF · 21.8 MB",
    pagesOrDuration: "76 Pages",
    downloads: "6.4k",
    rating: 4.9,
    description: "Matrix arrangements, tournament logic, truth-teller liars, and distribution sets with step-by-step table reduction methods.",
    topperTips: "Spend the first 5 minutes skimming all 4 sets. Pick the 2 most structured tabular sets and target 100% accuracy.",
    contentPreview: [
      "Framework 1: Grid Elimination Method for Multi-Variable Matching",
      "Framework 2: Tournament Knockout & Round-Robin Points Table Equations",
      "Framework 3: Venn Diagrams with Maxima / Minima Constraints (3 & 4 sets)",
      "Framework 4: Network Flow & Scheduling with Bottleneck Identification"
    ],
  },
  {
    id: "cat-res-3",
    title: "VARC 99.9%ile RC Elimination & Tone Mastery Guide",
    category: "Notes",
    exam: "CAT",
    subject: "Verbal Ability & Reading Comprehension (VARC)",
    size: "PDF · 8.6 MB",
    pagesOrDuration: "36 Pages",
    downloads: "7.1k",
    rating: 5.0,
    description: "Framework for eliminating tricky close options in inference, central idea, and author-attitude reading comprehension questions.",
    topperTips: "Sneha Roy's Strategy: Look out for extreme qualifiers ('always', 'never', 'only'). The correct option in CAT RC is often nuanced and qualified.",
    contentPreview: [
      "Rule of Scope: Eliminate options that introduce outside concepts not implied in the text.",
      "Tone Identification: Distinguish between 'Critical', 'Derisive', 'Objective', and 'Laudatory'.",
      "Para-Jumbles: Identify Mandatory Pairs (Noun-Pronoun, Cause-Effect, Chronology) before looking at option choices.",
      "Odd Sentence Out: Identify the core theme sentence first, the outlier usually shifts the level of generality."
    ],
  },
  {
    id: "cat-res-4",
    title: "CAT Actual Slot-Wise Solved Papers (2020–2024 with Percentile Predictor)",
    category: "PYQs",
    exam: "CAT",
    subject: "Full Syllabus (QA, DILR, VARC)",
    size: "PDF · 34.2 MB",
    pagesOrDuration: "140 Pages",
    downloads: "9.2k",
    rating: 5.0,
    description: "Every slot official CAT question paper with detailed step-by-step answer keys and score-versus-percentile analysis.",
    topperTips: "Solve these in actual 2-hour timed CBT conditions to master sectional pacing and fatigue management.",
    contentPreview: [
      "CAT 2024 Slot 1, 2, 3 Complete Solutions with Shortcut Methods",
      "CAT 2023 Slot 1, 2, 3 Solutions with Sectional Difficulty Breakdown",
      "Score vs Percentile Benchmarks: 75 Marks ≃ 99.0%ile, 90 Marks ≃ 99.7%ile",
    ],
  },
  {
    id: "cat-res-5",
    title: "CAT Sectional Speed Booster & Negative Marking Controller",
    category: "Practice Tests",
    exam: "CAT",
    subject: "Exam Strategy",
    size: "PDF · 5.5 MB",
    pagesOrDuration: "28 Pages",
    downloads: "4.3k",
    rating: 4.8,
    description: "How to avoid negative marking trap questions, pacing charts for 40-minute sections, and strike rate calculators.",
    topperTips: "In CAT, an attempt of 12 questions in QA with 90% accuracy yields higher percentile than 18 attempts with 60% accuracy.",
    contentPreview: [
      "Round 1: 0-15 mins: Attack straightforward questions in your strongest topics.",
      "Round 2: 15-35 mins: Solve moderate questions with clear mathematical models.",
      "Round 3: 35-40 mins: Re-check answers, do not make wild guesses in MCQs."
    ],
  },
  {
    id: "cat-res-6",
    title: "IIM Ahmedabad & Bangalore WAT-PI Topic Compendium & SOP Writing",
    category: "Notes",
    exam: "CAT",
    subject: "Interview Prep",
    size: "PDF · 15.0 MB",
    pagesOrDuration: "62 Pages",
    downloads: "3.7k",
    rating: 4.9,
    description: "Top 75 current affairs and abstract topics for Written Ability Tests (WAT), standard interview questions, and winning SOP templates.",
    topperTips: "Structure all WAT essays using PESTEL (Political, Economic, Social, Tech, Environmental, Legal) frameworks.",
    contentPreview: [
      "AI & Job Automation: Economic impacts, workforce reskilling, and policy implications.",
      "India's Manufacturing vs Services growth trajectory (PLI schemes & semiconductors).",
      "Sample Answer: 'Why MBA after Engineering / Commerce?' with structured STAR method."
    ],
  },

  // ---------------- GATE EE & CS RESOURCES ----------------
  {
    id: "gate-res-1",
    title: "GATE EE Network Theory & Circuit Analysis Short Notes",
    category: "Formula Sheets",
    exam: "GATE",
    subject: "Network Theory",
    size: "PDF · 8.4 MB",
    pagesOrDuration: "35 Pages",
    downloads: "7.8k",
    rating: 4.9,
    description: "Thevenin, Norton, Superposition, Transient DC/AC response and Two-Port network parameter matrix conversions by AIR 1.",
    topperTips: "Dr. Arjun Mehta's Tip: Master Laplace transform domain equivalents for circuit transients to bypass differential equations.",
    contentPreview: [
      "Maximum Power Transfer: Z_L = Z_th* (complex conjugate for AC circuits)",
      "Transient Time Constant: RL circuit τ = L / R_th; RC circuit τ = R_th × C",
      "Two-Port Conversions: Z = [z11 z12; z21 z22], Y = Z^-1, h-parameters for transistor circuits",
      "Resonance: Series ω_0 = 1/√(LC), Quality factor Q = (1/R) √(L/C); Parallel Q = R √(C/L)"
    ],
  },
  {
    id: "gate-res-2",
    title: "Electrical Machines Speed-Torque & Transformer Formula Sheet",
    category: "Formula Sheets",
    exam: "GATE",
    subject: "Electrical Machines",
    size: "PDF · 11.2 MB",
    pagesOrDuration: "42 Pages",
    downloads: "6.9k",
    rating: 4.9,
    description: "DC Machines, Induction Motors, Synchronous Alternators, and Transformer Equivalent Circuits with phasor diagrams.",
    topperTips: "Focus heavily on torque equations and voltage regulation phasor diagrams—guaranteed 8-10 marks in GATE EE.",
    contentPreview: [
      "Transformer Voltage Regulation: VR = (I2 R_eq2 cosφ ± I2 X_eq2 sinφ) / V2_nl",
      "Induction Motor Torque: T ∝ s E2^2 R2 / (R2^2 + (s X2)^2); Maximum torque is independent of R2",
      "Synchronous Motor V-Curves & Inverted V-Curves under varying field excitation",
    ],
  },
  {
    id: "gate-res-3",
    title: "GATE EE Previous 15 Years Topic-wise Solved Question Bank",
    category: "PYQs",
    exam: "GATE",
    subject: "Full Syllabus",
    size: "PDF · 38.0 MB",
    pagesOrDuration: "185 Pages",
    downloads: "11.2k",
    rating: 5.0,
    description: "Topic-wise sorted GATE questions with detailed calculations and alternative shortcut methods.",
    topperTips: "Solve every PYQ question twice: once with timer, once with error log documentation.",
    contentPreview: [
      "Power Systems: Fault Analysis, Symmetrical Components, Load Flow & Economic Dispatch",
      "Control Systems: Nyquist Plot stability criterion, Routh-Hurwitz, Lead-Lag Compensators",
      "Power Electronics: Buck-Boost Converters, Inverter PWM harmonics and THD calculations"
    ],
  },

  // ---------------- JEE ADVANCED / MAINS ----------------
  {
    id: "jee-res-1",
    title: "JEE Advanced Physics Mechanics & Electrodynamics Master Formulas",
    category: "Formula Sheets",
    exam: "JEE",
    subject: "Physics",
    size: "PDF · 14.8 MB",
    pagesOrDuration: "54 Pages",
    downloads: "8.1k",
    rating: 4.9,
    description: "Rotational dynamics, variable mass systems, Gauss law, Ampere circuital law, and electromagnetic induction topper summaries.",
    topperTips: "IIT Bombay AIR 214 Tip: Draw Free Body Diagrams (FBD) and pseudo force diagrams carefully before writing equations.",
    contentPreview: [
      "Moment of Inertia: Parallel axis theorem I = I_cm + Md^2; Perpendicular axis I_z = I_x + I_y",
      "Pure Rolling on Incline: a = g sinθ / (1 + I_cm / mR^2)",
      "Faraday's Law & Motional EMF: e = ∫ (v × B) · dl",
      "LC Oscillations: q(t) = q_0 cos(ωt), ω = 1/√(LC)"
    ],
  },
  {
    id: "jee-res-2",
    title: "Organic Chemistry Reaction Mechanisms & Name Reactions Map",
    category: "Notes",
    exam: "JEE",
    subject: "Chemistry",
    size: "PDF · 18.2 MB",
    pagesOrDuration: "60 Pages",
    downloads: "9.5k",
    rating: 5.0,
    description: "SN1/SN2, E1/E2 stereochemistry, Aldol, Cannizzaro, Grignard reagents, and aromatic electrophilic substitutions.",
    topperTips: "Memorize reagent action tables rather than individual reactions—saves 70% revision time.",
    contentPreview: [
      "Carbocation Rearrangements: Hydride shift, Methyl shift, Ring expansion (4→5, 5→6 membered rings)",
      "Nucleophilic Addition: Order of reactivity of Carbonyls: Formaldehyde > Aldehyde > Ketone",
      "Aromatic Directing Groups: -OH, -NH2 (Strong o,p-directing); -NO2, -COOH, -CHO (m-directing)"
    ],
  },

  // ---------------- NEET UG ----------------
  {
    id: "neet-res-1",
    title: "NEET Biology NCERT Line-by-Line High-Yield Diagrams & Flowcharts",
    category: "Notes",
    exam: "NEET",
    subject: "Biology",
    size: "PDF · 24.5 MB",
    pagesOrDuration: "82 Pages",
    downloads: "14.2k",
    rating: 5.0,
    description: "Human physiology, plant physiology, genetics & ecology diagrams extracted directly from NCERT with topper callouts.",
    topperTips: "AIIMS Topper: Read every single figure caption and scientist introduction in NCERT Biology. 340+ in Bio is guaranteed.",
    contentPreview: [
      "Genetics: Dihybrid cross ratio 9:3:3:1, Incomplete dominance 1:2:1, Pedigree analysis rules",
      "Human Physiology: Cardiac cycle timings (0.8s), ECG waves (P, QRS, T wave clinical significance)",
      "Ecology: Gause's Competitive Exclusion Principle, 10% Energy Transfer Law by Lindeman"
    ],
  },
  {
    id: "neet-res-2",
    title: "NEET Physics Direct Formula-Based Problem Bank (Last 12 Years)",
    category: "Practice Tests",
    exam: "NEET",
    subject: "Physics",
    size: "PDF · 16.0 MB",
    pagesOrDuration: "50 Pages",
    downloads: "10.8k",
    rating: 4.9,
    description: "300 most repeated numerical patterns in NEET Physics across Optics, Modern Physics, Mechanics and Thermodynamics.",
    topperTips: "Modern Physics alone contributes 12-16 marks in NEET with 100% predictable formulas. Never skip.",
    contentPreview: [
      "Photoelectric Effect: hν = Φ + KE_max, Stopping potential eV_s = KE_max",
      "Bohr Model: Radius r_n = 0.529 n^2 / Z Å; Energy E_n = -13.6 Z^2 / n^2 eV",
      "Wave Optics: Fringe width β = λ D / d; Angular fringe width θ = λ / d"
    ],
  },
];

export function getResourcesForExam(exam: string = ""): StudyResourceItem[] {
  const lower = exam.toLowerCase();
  if (lower.includes("cat") || lower.includes("mba")) {
    return ALL_STUDY_RESOURCES.filter((r) => r.exam === "CAT");
  }
  if (lower.includes("gate")) {
    return ALL_STUDY_RESOURCES.filter((r) => r.exam === "GATE");
  }
  if (lower.includes("jee")) {
    return ALL_STUDY_RESOURCES.filter((r) => r.exam === "JEE");
  }
  if (lower.includes("neet")) {
    return ALL_STUDY_RESOURCES.filter((r) => r.exam === "NEET");
  }
  // Default fallback: return CAT resources if student is CAT, or match by keyword
  return ALL_STUDY_RESOURCES;
}
