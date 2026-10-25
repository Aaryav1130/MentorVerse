import Link from "next/link";
import "./footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="sf-root">
      <section className="sf-cta">
        <div className="sf-wrap">
          <h2>Ready to learn from someone who&apos;s already cleared it?</h2>
          <p>
            Book your first session with a verified senior, or share your own journey and mentor the next batch.
          </p>
          <div className="sf-ctabtns">
            <Link className="sf-btn sf-p" href="/mentors">
              Find a mentor
            </Link>
            <Link className="sf-btn" href="#">
              Become a mentor
            </Link>
          </div>
        </div>
      </section>

      <footer className="sf-footer">
        <div className="sf-wrap">
          <div className="sf-grid">
            <div className="sf-brand">
              <Link className="sf-logo" href="/">
                <svg width="34" height="34" viewBox="0 0 80 80">
                  <rect width="80" height="80" rx="20" fill="#4F46E5" />
                  <rect x="16" y="48" width="14" height="16" rx="3" fill="#fff" />
                  <rect x="33" y="38" width="14" height="26" rx="3" fill="#fff" />
                  <rect x="50" y="28" width="14" height="36" rx="3" fill="#fff" />
                  <circle cx="57" cy="17" r="6" fill="#FBBF24" />
                </svg>
                <div>Senior<span>ly</span></div>
              </Link>
              <p>
                Seniorly connects aspirants with seniors who have already cleared JEE, NEET, UPSC, GATE and CAT. Book live 1:1 or small group sessions with verified rank holders from IITs, NITs, AIIMS and other top institutes, and get a clear plan for your own preparation.
              </p>
              <p>
                Mentors get their own dashboard to manage students, sessions, availability and earnings, all from a single platform.
              </p>
              <div className="sf-social">
                <Link href="#">Instagram</Link>
                <Link href="#">YouTube</Link>
                <Link href="#">LinkedIn</Link>
                <Link href="#">X</Link>
              </div>
            </div>

            <div className="sf-col">
              <h4 className="sf-h">For Students</h4>
              <ul className="sf-links">
                <li>
                  <Link href="/mentors">Find a Mentor</Link>
                </li>
                <li>
                  <Link href="/student/dashboard">Student Dashboard</Link>
                </li>
                <li>
                  <Link href="#">1:1 Sessions</Link>
                </li>
                <li>
                  <Link href="#">
                    Group Sessions <span className="sf-new">NEW</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">How It Works</Link>
                </li>
              </ul>
              <h4 className="sf-h sf-gap">Exams</h4>
              <ul className="sf-links">
                <li>
                  <Link href="#">JEE</Link>
                </li>
                <li>
                  <Link href="#">NEET</Link>
                </li>
                <li>
                  <Link href="#">UPSC</Link>
                </li>
                <li>
                  <Link href="#">GATE</Link>
                </li>
                <li>
                  <Link href="#">CAT</Link>
                </li>
              </ul>
            </div>

            <div className="sf-col">
              <h4 className="sf-h">For Mentors</h4>
              <ul className="sf-links">
                <li>
                  <Link href="#">Become a Mentor</Link>
                </li>
                <li>
                  <Link href="/mentor/dashboard">Mentor Dashboard</Link>
                </li>
                <li>
                  <Link href="#">Mentor Guidelines</Link>
                </li>
                <li>
                  <Link href="#">Earnings &amp; Payouts</Link>
                </li>
                <li>
                  <Link href="#">Verification Process</Link>
                </li>
              </ul>
              <h4 className="sf-h sf-gap">Resources</h4>
              <ul className="sf-links">
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Topper Stories</Link>
                </li>
                <li>
                  <Link href="#">Study Strategies</Link>
                </li>
              </ul>
            </div>

            <div className="sf-col">
              <h4 className="sf-h">Company</h4>
              <ul className="sf-links">
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
                <li>
                  <Link href="#">Contact Us</Link>
                </li>
                <li>
                  <Link href="#">Terms of Use</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Refund Policy</Link>
                </li>
                <li>
                  <Link href="#">Grievance Redressal</Link>
                </li>
              </ul>
              <h4 className="sf-h sf-gap">Help &amp; Support</h4>
              <ul className="sf-links">
                <li>
                  <Link href="#">Support</Link>
                </li>
                <li>
                  <Link href="#">FAQs</Link>
                </li>
                <li>
                  <Link href="#">Safety &amp; Trust</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="sf-bottom">
            <span>© {currentYear} Seniorly. All rights reserved.</span>
            <span>Learn from those who&apos;ve cleared it. Made with ❤️ in India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
