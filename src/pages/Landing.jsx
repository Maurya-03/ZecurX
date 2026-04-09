import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

function NavItem({ id, label, active, onClick, hasDropdown = false }) {
  return (
    <button className={`landing-nav-link ${active ? "active" : ""}`} onClick={() => onClick(id)}>
      <span>{label}</span>
      {hasDropdown ? <span className="landing-nav-caret">▾</span> : null}
    </button>
  );
}

function FeatureList({ items }) {
  return (
    <div className="landing-feature-list">
      {items.map((item) => (
        <div className="landing-feature-item" key={item}>
          <span className="feature-icon" aria-hidden="true">◻</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function LearningHeroSvg() {
  return (
    <svg
      className="hero-svg"
      viewBox="0 0 640 520"
      role="img"
      aria-label="Learning platform dashboard illustration"
    >
      <defs>
        <pattern id="gridPattern" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeOpacity="0.12" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="640" height="520" fill="url(#gridPattern)" />

      <rect x="90" y="78" width="460" height="344" rx="18" fill="none" stroke="currentColor" strokeOpacity="0.42" />
      <rect x="116" y="110" width="180" height="16" rx="8" fill="currentColor" fillOpacity="0.22" />
      <rect x="116" y="140" width="320" height="10" rx="5" fill="currentColor" fillOpacity="0.14" />

      <rect x="116" y="182" width="192" height="92" rx="12" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <polyline points="136,248 172,210 206,224 242,194 286,218" fill="none" stroke="currentColor" strokeWidth="3" />

      <rect x="324" y="182" width="200" height="26" rx="8" fill="currentColor" fillOpacity="0.18" />
      <rect x="324" y="220" width="160" height="10" rx="5" fill="currentColor" fillOpacity="0.14" />
      <rect x="324" y="242" width="180" height="10" rx="5" fill="currentColor" fillOpacity="0.14" />
      <rect x="324" y="264" width="136" height="10" rx="5" fill="currentColor" fillOpacity="0.14" />

      <rect x="116" y="302" width="408" height="86" rx="12" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <circle cx="148" cy="344" r="14" fill="currentColor" fillOpacity="0.2" />
      <rect x="176" y="330" width="160" height="10" rx="5" fill="currentColor" fillOpacity="0.14" />
      <rect x="176" y="350" width="122" height="10" rx="5" fill="currentColor" fillOpacity="0.14" />
      <rect x="428" y="330" width="72" height="30" rx="8" fill="none" stroke="currentColor" strokeOpacity="0.38" />

      <g className="svg-node svg-node-a">
        <circle cx="74" cy="128" r="10" fill="currentColor" fillOpacity="0.22" />
        <line x1="84" y1="128" x2="114" y2="128" stroke="currentColor" strokeOpacity="0.45" />
      </g>
      <g className="svg-node svg-node-b">
        <circle cx="568" cy="328" r="10" fill="currentColor" fillOpacity="0.22" />
        <line x1="558" y1="328" x2="526" y2="328" stroke="currentColor" strokeOpacity="0.45" />
      </g>
      <g className="svg-node svg-node-c">
        <circle cx="290" cy="454" r="10" fill="currentColor" fillOpacity="0.22" />
        <line x1="290" y1="444" x2="290" y2="408" stroke="currentColor" strokeOpacity="0.45" />
      </g>
    </svg>
  );
}

export default function Landing({ onGetStarted, theme, onToggleTheme }) {
  const [activeLink, setActiveLink] = useState("courses");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const popularCourses = [
    {
      title: "Web Application Pentesting",
      description: "Learn practical OWASP testing with guided attack simulations.",
    },
    {
      title: "Cloud Security Fundamentals",
      description: "Secure cloud environments with role-based, lab-first modules.",
    },
    {
      title: "Threat Detection with SIEM",
      description: "Build alerting and triage workflows from real incident patterns.",
    },
  ];

  function scrollToSection(id) {
    const section = document.getElementById(`section-${id}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveLink(id);
    setMenuOpen(false);
    setOpenDropdown(null);
  }

  function toggleDropdown(id) {
    setOpenDropdown((current) => (current === id ? null : id));
    setActiveLink(id);
  }

  function scrollToCourses() {
    const section = document.getElementById("popular-courses");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="landing-page">
      <header className="landing-navbar-wrap">
        <nav className="landing-navbar container-xl" aria-label="Primary">
          <div className="landing-brand">
            <span className="logo-mark">cx</span>
            <span className="landing-brand-text">ZecurX Learn</span>
          </div>

          <button className="landing-mobile-trigger" onClick={() => setMenuOpen((value) => !value)}>
            Menu
          </button>

          <div className={`landing-nav-center ${menuOpen ? "open" : ""}`}>
            <div className="landing-nav-dropdown-wrap">
              <NavItem
                id="courses"
                label="Courses"
                active={activeLink === "courses"}
                hasDropdown
                onClick={toggleDropdown}
              />
              {openDropdown === "courses" ? (
                <div className="landing-dropdown" role="menu">
                  <button onClick={() => scrollToSection("courses")}>Offensive Security</button>
                  <button onClick={() => scrollToSection("courses")}>Defensive Security</button>
                  <button onClick={() => scrollToSection("courses")}>Cloud Security</button>
                </div>
              ) : null}
            </div>

            <NavItem
              id="instructors"
              label="Instructors"
              active={activeLink === "instructors"}
              onClick={scrollToSection}
            />
            <NavItem
              id="certifications"
              label="Certifications"
              active={activeLink === "certifications"}
              onClick={scrollToSection}
            />

            <div className="landing-nav-dropdown-wrap">
              <NavItem
                id="company"
                label="Company"
                active={activeLink === "company"}
                hasDropdown
                onClick={toggleDropdown}
              />
              {openDropdown === "company" ? (
                <div className="landing-dropdown" role="menu">
                  <button onClick={() => scrollToSection("company-about")}>About</button>
                  <button onClick={() => scrollToSection("company-careers")}>Careers</button>
                  <button onClick={() => scrollToSection("company-contact")}>Contact</button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="landing-nav-right">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button className="btn btn-ghost">Search</button>
            <button className="btn btn-secondary" onClick={onGetStarted}>
              Login
            </button>
          </div>
        </nav>
      </header>

      <main className="container-xl landing-main">
        <section className="landing-hero-grid">
          <div className="hero-content-col">
            <p className="hero-breadcrumb">LMS &gt; Academy</p>
            <h1 className="hero-headline">Build Career-Ready Cybersecurity Skills Through Guided Learning Paths</h1>
            <p className="hero-description">
              Learn by doing with structured courses, lab-driven modules, and certification tracks
              designed to move learners from fundamentals to advanced practice.
            </p>

            <div className="hero-action-group">
              <button className="btn btn-primary" onClick={onGetStarted}>Student Login</button>
              <button className="btn btn-secondary" onClick={scrollToCourses}>Browse Courses</button>
            </div>

            <FeatureList
              items={[
                "Industry Certified",
                "Hands-on Labs",
                "Real-world Scenarios",
              ]}
            />

            <div className="quick-start-card">
              <div className="quick-start-title">Start Learning in 3 Steps</div>
              <ol className="quick-start-list">
                <li>Choose course</li>
                <li>Start lab</li>
                <li>Get certified</li>
              </ol>
            </div>
          </div>

          <div className="hero-visual-col">
            <div className="visual-shell">
              <div className="visual-main">
                <LearningHeroSvg />
              </div>
              <div className="floating-card floating-progress">
                <div>Course Progress</div>
                <strong>40% Completed</strong>
              </div>
              <div className="floating-card floating-lab">
                <div>Lab Status</div>
                <strong>12 Labs Completed</strong>
              </div>
              <div className="floating-card floating-badge">
                <div>Achievement</div>
                <strong>Security Analyst I</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="course-preview-section" id="popular-courses">
          <div className="section-header">
            <h2 className="section-title">Popular Courses</h2>
          </div>
          <div className="course-preview-grid">
            {popularCourses.map((course) => (
              <article className="course-preview-card" key={course.title}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button className="btn btn-secondary btn-sm" onClick={onGetStarted}>View</button>
              </article>
            ))}
          </div>
        </section>

        <section className="nav-intro-section" id="section-courses">
          <div className="section-header">
            <h2 className="section-title">Courses</h2>
          </div>
          <div className="content-watermark" aria-label="Courses content coming soon">
            CONTENT TO BE ADDED
          </div>
        </section>

        <section className="nav-intro-section" id="section-instructors">
          <div className="section-header">
            <h2 className="section-title">Instructors</h2>
          </div>
          <div className="content-watermark" aria-label="Instructors content coming soon">
            CONTENT TO BE ADDED
          </div>
        </section>

        <section className="nav-intro-section" id="section-certifications">
          <div className="section-header">
            <h2 className="section-title">Certifications</h2>
          </div>
          <div className="content-watermark" aria-label="Certifications content coming soon">
            CONTENT TO BE ADDED
          </div>
        </section>

        <footer className="org-footer" id="section-company" aria-labelledby="org-footer-title">
          <div className="section-header">
            <h2 className="section-title" id="org-footer-title">Company</h2>
          </div>
          <div className="org-footer-grid">
            <section className="org-footer-column">
              <h3>Main Links</h3>
              <ul>
                <li><a href="#section-company-about">About</a></li>
                <li><a href="#section-company-careers">Careers</a></li>
                <li><a href="#section-company-contact">Contact</a></li>
                <li><a href="#section-courses">Courses</a></li>
              </ul>
            </section>

            <section className="org-footer-column" id="section-company-about">
              <h3>About</h3>
              <ul>
                <li><a href="#">Mission</a></li>
                <li><a href="#">Training Philosophy</a></li>
                <li><a href="#">Security Standards</a></li>
                <li><a href="#">Partners</a></li>
              </ul>
            </section>

            <section className="org-footer-column" id="section-company-careers">
              <h3>Careers</h3>
              <ul>
                <li><a href="#">Open Roles</a></li>
                <li><a href="#">Internships</a></li>
                <li><a href="#">Culture</a></li>
                <li><a href="#">Benefits</a></li>
              </ul>
            </section>

            <section className="org-footer-column" id="section-company-contact">
              <h3>Contact</h3>
              <ul>
                <li><a href="mailto:contact@zecurx.com">contact@zecurx.com</a></li>
                <li><a href="tel:+15550101234">+1 (555) 010-1234</a></li>
                <li>Mon-Fri, 9:00 AM - 6:00 PM</li>
                <li>120 Security Ave, Suite 400</li>
              </ul>
            </section>
          </div>
        </footer>
      </main>
    </div>
  );
}
