import { COURSES, HEATMAP } from "../data/mockData";
import CourseCard from "../components/CourseCard";
import SectionHeader from "../components/SectionHeader";
import StatPill from "../components/StatPill";

export default function Dashboard({ onNavigate, onStartWorkspace }) {
  const enrolled = COURSES.filter((course) => course.progress > 0);

  return (
    <div className="page">
      <div style={{ marginBottom: 28 }}>
        <div className="page-title">Good evening, Alex.</div>
        <div className="page-sub">// 3-day streak · keep it up</div>
      </div>

      <div className="stat-row">
        {[
          { icon: "🔥", val: "3", label: "day streak" },
          { icon: "⏱", val: "47h", label: "hours learned" },
          { icon: "📦", val: "3", label: "active courses" },
        ].map((stat) => (
          <StatPill key={stat.label} icon={stat.icon} value={stat.val} label={stat.label} />
        ))}
      </div>

      <div className="resume-card" onClick={onStartWorkspace}>
        <div className="resume-icon">🕸</div>
        <div className="resume-meta">
          <div className="resume-label">Resume learning</div>
          <div className="resume-title">Web Application Pentesting</div>
          <div className="resume-lesson">Module 4 - SSRF Attacks · 68% complete</div>
        </div>
        <div className="resume-actions">
          <div className="progress-track" style={{ width: 80 }}>
            <div className="progress-fill" style={{ width: "68%" }} />
          </div>
          <button className="btn btn-primary btn-sm">Resume ▶</button>
        </div>
      </div>

      <div className="lab-card" style={{ marginBottom: 24 }}>
        <div className="lab-pulse" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>Active Lab: SSRF Exploitation</div>
          <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>38 min remaining</div>
        </div>
        <button className="btn btn-danger btn-sm">Join Lab</button>
      </div>

      <div style={{ marginBottom: 28 }}>
        <SectionHeader title="Continue Learning" actionLabel="View all →" onAction={() => onNavigate("courses")} />
        <div className="hscroll">
          {enrolled.map((course) => (
            <CourseCard key={course.id} course={course} variant="compact" onClick={onStartWorkspace} onAction={onStartWorkspace} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div className="section-header">
          <div className="section-title">Activity - Past 18 weeks</div>
        </div>
        <div className="card" style={{ overflowX: "auto" }}>
          <div className="heatmap">
            {HEATMAP.map((week, weekIndex) => (
              <div className="heatmap-col" key={weekIndex}>
                {week.map((level, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`heatmap-cell${level > 0 ? ` l${level}` : ""}`}
                    title={`${level} sessions`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`heatmap-cell${level > 0 ? ` l${level}` : ""}`} />
            ))}
            <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>More</span>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Upcoming</div>
          {[
            { label: "CTF Challenge #7", due: "Tomorrow", tag: "tag-yellow" },
            { label: "Module 5 Quiz", due: "Fri", tag: "tag-blue" },
          ].map((task, index) => (
            <div key={task.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: index < 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontSize: 13, color: "var(--text2)" }}>{task.label}</span>
              <span className={`tag ${task.tag}`}>{task.due}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Featured Challenge</div>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🏆</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Hack The Box - Bank</div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12 }}>Intermediate machine · Est. 90 min</div>
          <button className="btn btn-secondary btn-sm">Start Challenge →</button>
        </div>
      </div>
    </div>
  );
}
