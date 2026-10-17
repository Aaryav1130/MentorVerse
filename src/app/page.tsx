import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <div className="sl-root">
        <Navbar />
        <Hero />
      </div>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-8 py-16 border-t border-[#1e293b]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/mentor/dashboard"
            className="group p-8 rounded-2xl bg-card border border-border hover:border-brand-accent/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4">
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-accent transition-colors">
              Mentor Dashboard
            </h3>
            <p className="text-slate-400 text-sm">
              Manage your students, sessions, earnings and more.
            </p>
          </Link>
          <Link
            href="/student/dashboard"
            className="group p-8 rounded-2xl bg-card border border-border hover:border-brand-primary/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-light transition-colors">
              Student Dashboard
            </h3>
            <p className="text-slate-400 text-sm">
              Track your progress, join rooms, and achieve your goals.
            </p>
          </Link>
          <Link
            href="/mentors"
            className="group p-8 rounded-2xl bg-card border border-border hover:border-brand-light/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-light/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-on-dark-accent transition-colors">
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
