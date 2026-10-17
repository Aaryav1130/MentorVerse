import Link from "next/link";
import "./hero.css";

export default function Navbar() {
  return (
    <nav className="sl-nav">
      <div className="sl-wrap">
        <Link className="sl-logo" href="/">
          <svg width="34" height="34" viewBox="0 0 80 80">
            <rect width="80" height="80" rx="20" fill="#4F46E5" />
            <rect x="16" y="48" width="14" height="16" rx="3" fill="#fff" />
            <rect x="33" y="38" width="14" height="26" rx="3" fill="#fff" />
            <rect x="50" y="28" width="14" height="36" rx="3" fill="#fff" />
            <circle cx="57" cy="17" r="6" fill="#FBBF24" />
          </svg>
          <div>Senior<span>ly</span></div>
        </Link>
        <div className="sl-links">
          <Link className="sl-active" href="/">Home</Link>
          <Link href="/mentors">Mentors</Link>
          <Link href="/student/dashboard">For Students</Link>
          <Link href="#">About</Link>
        </div>
        <div className="sl-navr">
          <Link className="sl-btn" href="/login">Log in</Link>
          <Link className="sl-btn sl-p" href="/register">Get started</Link>
        </div>
      </div>
    </nav>
  );
}
