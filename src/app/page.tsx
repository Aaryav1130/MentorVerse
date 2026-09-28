import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[#1e293b]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center font-bold text-black text-sm">
            M
          </div>
          <span className="text-xl font-bold">MentorVerse</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/" className="text-white font-medium">Home</Link>
          <Link href="/mentors" className="text-slate-400 hover:text-white transition-colors">Mentors</Link>
          <Link href="/student/dashboard" className="text-slate-400 hover:text-white transition-colors">For Students</Link>
          <Link href="#" className="text-slate-400 hover:text-white transition-colors">About</Link>
          <Link
            href="/mentor/dashboard"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 py-24 relative">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your Goals.{" "}
              <br />
              The Right Mentor.{" "}
              <br />
              A{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Brighter Future.
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              Connect with expert mentors, get personalized guidance, and track
              your progress — all in one place.
            </p>

            {/* Search Bar */}
            <div className="flex items-center bg-[#141b2d] border border-[#1e293b] rounded-full px-6 py-4 mb-8 max-w-xl">
              <svg
                className="w-5 h-5 text-slate-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="What do you want to learn or achieve?"
                className="bg-transparent text-white placeholder-slate-500 outline-none flex-1"
              />
              <button className="ml-4 w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-3 mb-12">
              {["GATE / ESE", "Academics", "Career & Placement"].map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 rounded-full border border-[#1e293b] text-sm text-slate-300 hover:border-amber-500/50 hover:text-amber-400 cursor-pointer transition-all"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">
                Trusted by 50,000+ students
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-[#0a0e1a] flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-400">★</span>
                <span className="text-sm font-medium">4.8/5</span>
              </div>
            </div>
          </div>

          {/* Right Side Quote */}
          <div className="absolute right-8 bottom-12 text-right hidden lg:block">
            <p className="text-2xl italic text-slate-500 font-light">
              Better Guidance.
              <br />
              <span className="text-amber-400/70">Bigger Dreams.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-8 py-16 border-t border-[#1e293b]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/mentor/dashboard"
            className="group p-8 rounded-2xl bg-[#141b2d] border border-[#1e293b] hover:border-amber-500/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">
              Mentor Dashboard
            </h3>
            <p className="text-slate-400 text-sm">
              Manage your students, sessions, earnings and more.
            </p>
          </Link>
          <Link
            href="/student/dashboard"
            className="group p-8 rounded-2xl bg-[#141b2d] border border-[#1e293b] hover:border-emerald-500/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
              Student Dashboard
            </h3>
            <p className="text-slate-400 text-sm">
              Track your progress, join rooms, and achieve your goals.
            </p>
          </Link>
          <Link
            href="/mentors"
            className="group p-8 rounded-2xl bg-[#141b2d] border border-[#1e293b] hover:border-blue-500/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
              Find a Mentor
            </h3>
            <p className="text-slate-400 text-sm">
              Browse verified mentors and book your first session.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
