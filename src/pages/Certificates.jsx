export default function Certificates() {
  const certs = [
    { title: "Web Application Security Fundamentals", course: "Web Application Pentesting - Level 1", date: "March 2024" },
    { title: "Network Defense Practitioner", course: "Network Security Fundamentals", date: "Jan 2024" },
  ];

  return (
    <div className="page">
      <div className="page-title">Certificates</div>
      <div className="page-sub">// your earned credentials</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {certs.map((cert) => (
          <div className="cert-card" key={cert.title}>
            <div className="cert-badge">🏆</div>
            <div className="cert-info">
              <div className="cert-title">{cert.title}</div>
              <div className="cert-course">{cert.course} · {cert.date}</div>
            </div>
            <div className="cert-actions">
              <button className="btn btn-secondary btn-sm">↓ Download</button>
              <button className="btn btn-ghost btn-sm">↗ Share</button>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 24 }}>🔒</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>Web Pentesting - Advanced Certificate</div>
            <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>Complete the course to unlock this certificate</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="progress-track" style={{ width: 60 }}>
              <div className="progress-fill dim" style={{ width: "68%" }} />
            </div>
            <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>68%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
