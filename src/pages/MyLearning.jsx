import { useState } from "react";
import { COURSES } from "../data/mockData";
import MetricCard from "../components/MetricCard";
import SectionHeader from "../components/SectionHeader";

export default function MyLearning() {
  const [tab, setTab] = useState("progress");
  const enrolled = COURSES.filter((course) => course.progress > 0);

  return (
    <div className="page">
      <div className="page-title">My Learning</div>
      <div className="page-sub">// your progress at a glance</div>
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: "Day Streak", val: "3", icon: "🔥" },
          { label: "Hours Learned", val: "47", icon: "⏱" },
          { label: "Completed", val: "2", icon: "✅" },
          { label: "Achievements", val: "8", icon: "🏅" },
        ].map((stat) => (
          <MetricCard key={stat.label} icon={stat.icon} value={stat.val} label={stat.label} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "var(--bg3)", padding: 4, borderRadius: "var(--r)", width: "fit-content" }}>
        {[{ id: "progress", label: "In Progress" }, { id: "completed", label: "Completed" }].map((item) => (
          <button
            key={item.id}
            className="btn btn-sm"
            style={{ background: tab === item.id ? "var(--bg4)" : "transparent", border: "none", color: tab === item.id ? "var(--text)" : "var(--text3)" }}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === "progress" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {enrolled.map((course) => (
            <div className="card" key={course.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 22 }}>{course.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{course.title}</div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
              <span style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--text3)" }}>{course.progress}%</span>
              <button className="btn btn-primary btn-sm">Continue →</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <div className="empty-icon">🎓</div>
          <div className="empty-title">No completed courses yet</div>
          <div className="empty-text">Keep going - you're making great progress!</div>
        </div>
      )}
      <SectionHeader title="Learning Timeline" />
      <div className="timeline">
        {[
          { label: "Completed: Module 3 - Wireshark Basics", time: "Today, 10:41", done: true },
          { label: "Started lab: SSRF Exploitation Lab", time: "Today, 09:18", done: true },
          { label: "Completed: Module 3 - SQL Injection (Blind)", time: "Yesterday, 21:05", done: true },
          { label: "Enrolled: Malware Analysis & Reverse Engineering", time: "Mon, 14:30", done: false },
          { label: "Completed: Module 2 - XSS Fundamentals", time: "Mon, 12:00", done: true },
        ].map((event) => (
          <div className="tl-item" key={event.label}>
            <div className={`tl-dot ${event.done ? "done" : ""}`} />
            <div className="tl-content">{event.label}</div>
            <div className="tl-time">{event.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
