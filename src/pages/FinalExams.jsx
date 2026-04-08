export default function FinalExams() {
  const exams = [
    { title: "Web Application Security - Final Assessment", status: "unlocked", duration: "90 min", attempts: 2 },
    { title: "Network Security Fundamentals - Final Exam", status: "locked", duration: "60 min", attempts: 0 },
    { title: "Malware Analysis - Comprehensive Test", status: "locked", duration: "120 min", attempts: 0 },
  ];

  return (
    <div className="page">
      <div className="page-title">Final Exams</div>
      <div className="page-sub">// complete courses to unlock exams</div>
      {exams.map((exam) => (
        <div className={`exam-card ${exam.status}`} key={exam.title}>
          <div className="exam-icon" style={{ background: exam.status === "unlocked" ? "var(--accent2)" : "var(--bg4)" }}>
            {exam.status === "unlocked" ? "📝" : "🔒"}
          </div>
          <div className="exam-info">
            <div className="exam-title">{exam.title}</div>
            <div className="exam-meta">{exam.duration} · {exam.attempts > 0 ? `${exam.attempts} attempts used` : "No attempts yet"}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className={`tag ${exam.status === "unlocked" ? "tag-accent" : "tag-gray"}`}>{exam.status}</span>
            {exam.status === "unlocked" ? (
              <button className="btn btn-primary btn-sm">Start Exam →</button>
            ) : (
              <button className="btn btn-secondary btn-sm" disabled style={{ opacity: 0.5 }}>Locked</button>
            )}
          </div>
        </div>
      ))}
      <div className="card" style={{ marginTop: 8, borderStyle: "dashed" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 20 }}>💡</div>
          <div style={{ fontSize: 13, color: "var(--text3)" }}>Complete all modules and pass the module quizzes to unlock the final exam for each course.</div>
        </div>
      </div>
    </div>
  );
}
