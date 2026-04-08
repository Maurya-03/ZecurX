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
          <p className="nav-intro-copy">Role-based learning paths that combine theory and practical labs.</p>
          <div className="nav-intro-grid">
            <article className="nav-intro-card">
              <h3>Specialized Tracks</h3>
              <p>Follow offensive, defensive, and cloud-focused curricula.</p>
              <ul>
                <li>Beginner to advanced progression</li>
                <li>Practical lab checkpoints</li>
                <li>Guided module assessments</li>
              </ul>
            </article>
            <article className="nav-intro-card">
              <h3>Applied Practice</h3>
              <p>Bridge concepts with scenario-driven exercises and capture-the-flag style tasks.</p>
              <ul>
                <li>Hands-on environments</li>
                <li>Real attack/defense patterns</li>
                <li>Portfolio-ready outcomes</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="nav-intro-section" id="section-instructors">
          <div className="section-header">
            <h2 className="section-title">Instructors</h2>
          </div>
          <p className="nav-intro-copy">Learn from practitioners with incident response and red/blue team experience.</p>
          <div className="nav-intro-grid">
            <article className="nav-intro-card">
              <h3>Mentor-Led Learning</h3>
              <p>Get support from experts who have solved production-grade security incidents.</p>
              <ul>
                <li>Office hours and Q&A sessions</li>
                <li>Recorded attack walkthroughs</li>
                <li>Cohort feedback loops</li>
              </ul>
            </article>
            <article className="nav-intro-card">
              <h3>Career Guidance</h3>
              <p>Understand role expectations and practical skills needed for modern security teams.</p>
              <ul>
                <li>Role-mapped skill suggestions</li>
                <li>Structured learning milestones</li>
                <li>Practical interview prep context</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="nav-intro-section" id="section-certifications">
          <div className="section-header">
            <h2 className="section-title">Certifications</h2>
          </div>
          <p className="nav-intro-copy">Earn verifiable credentials that map to real security roles and outcomes.</p>
          <div className="nav-intro-grid">
            <article className="nav-intro-card">
              <h3>Certification Advantages</h3>
              <p>Showcase validated skill depth with practical evidence beyond course completion.</p>
              <ul>
                <li>Career-ready proof of skills</li>
                <li>Portfolio-ready capstone reports</li>
                <li>Shareable digital badges</li>
              </ul>
            </article>
            <article className="nav-intro-card">
              <h3>Outcome Visibility</h3>
              <p>Track progress from study to exam readiness with transparent milestone indicators.</p>
              <ul>
                <li>Clear exam preparation roadmap</li>
                <li>Lab completion evidence</li>
                <li>Credential history timeline</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="nav-intro-section" id="section-company">
          <div className="section-header">
            <h2 className="section-title">Company</h2>
          </div>
          <p className="nav-intro-copy">Trusted by teams to onboard and upskill security talent at scale.</p>
          <div className="nav-intro-grid">
            <article className="nav-intro-card">
              <h3>Company Overview</h3>
              <p>Explore who we are, how we hire, and how to connect with our team.</p>
              <ul>
                <li>About: mission and training philosophy</li>
                <li>Careers: join our team and build with us</li>
                <li>Contact: speak with support and partnerships</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="nav-intro-section" id="section-company-about">
          <div className="section-header">
            <h2 className="section-title">About</h2>
          </div>
          <p className="nav-intro-copy">We build practical security education that mirrors real operational environments.</p>
          <div className="nav-intro-grid">
            <article className="nav-intro-card">
              <h3>What We Focus On</h3>
              <p>Our platform is designed around applied outcomes, not just content completion.</p>
              <ul>
                <li>Hands-on-first learning design</li>
                <li>Role-aligned progression paths</li>
                <li>Continuous curriculum updates</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="nav-intro-section" id="section-company-careers">
          <div className="section-header">
            <h2 className="section-title">Careers</h2>
          </div>
          <p className="nav-intro-copy">Join a team shaping the next generation of cybersecurity professionals.</p>
          <div className="nav-intro-grid">
            <article className="nav-intro-card">
              <h3>Work With Us</h3>
              <p>We hire across engineering, instruction, and learner success roles.</p>
              <ul>
                <li>Remote and hybrid opportunities</li>
                <li>Security-focused product challenges</li>
                <li>Strong growth and mentorship culture</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="nav-intro-section" id="section-company-contact">
          <div className="section-header">
            <h2 className="section-title">Contact</h2>
          </div>
          <p className="nav-intro-copy">Talk to us about training programs, support, or partnership opportunities.</p>
          <div className="nav-intro-grid">
            <article className="nav-intro-card">
              <h3>Get In Touch</h3>
              <p>Our team can help you choose the right path for individuals and organizations.</p>
              <ul>
                <li>Learning and onboarding support</li>
                <li>Enterprise and team plans</li>
                <li>Partnership and integration requests</li>
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
