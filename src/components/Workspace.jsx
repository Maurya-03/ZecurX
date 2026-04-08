import { useState } from "react";

export default function Workspace({ onClose }) {
  const [labActive, setLabActive] = useState(false);
  const [stepsDone, setStepsDone] = useState([true, true, false, false, false]);

  const steps = [
    "Set up Burp Suite proxy and intercept requests",
    "Identify the vulnerable parameter in the request",
    "Craft a payload targeting the internal metadata server",
    "Retrieve the AWS instance credentials",
    "Document findings and write your report",
  ];

  return (
    <div className="workspace">
      <div className="ws-bar">
        <button className="btn btn-ghost btn-sm" onClick={onClose}>← Back</button>
        <div style={{ width: 1, height: 20, background: "var(--border)" }} />
        <div style={{ fontSize: 13, fontWeight: 600 }}>Web Application Pentesting</div>
        <span className="tag tag-gray">Module 4</span>
        <div className="ws-progress-wrap">
          <div className="progress-track" style={{ flex: 1 }}>
            <div className="progress-fill" style={{ width: "68%" }} />
          </div>
          <span className="ws-prog-label">68%</span>
        </div>
        <button className="btn btn-secondary btn-sm">Focus Mode</button>
      </div>

      <div className="ws-body">
        <div className="ws-content">
          <div className="ws-lesson-title">SSRF Attacks - Server-Side Request Forgery</div>
          <div className="ws-lesson-meta">Lesson 4.3 · 18 min · Video + Lab</div>

          <div className="ws-video">▶</div>

          <div className="ws-text">
            <p>Server-Side Request Forgery (SSRF) is a vulnerability that allows an attacker to induce the server-side application to make HTTP requests to an arbitrary domain of the attacker's choosing.</p>
            <p>In a typical SSRF attack, the attacker can cause the server to make a connection to <code>internal-only</code> services within the organization's infrastructure. In cloud environments, SSRF can be used to reach the <code>metadata service</code> at <code>169.254.169.254</code>.</p>
            <p>The impact can be critical - attackers have used SSRF to steal <code>AWS IAM credentials</code>, access internal databases, perform port scanning of the internal network, and in some cases achieve Remote Code Execution.</p>
          </div>
        </div>

        <div className="ws-panel">
          <div className="ws-panel-title">Lab - SSRF Exploitation</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              {labActive ? (
                <>
                  <div className="lab-pulse" />
                  <span style={{ fontSize: 13, color: "var(--danger)" }}>Lab Running · 38m left</span>
                </>
              ) : (
                <span style={{ fontSize: 13, color: "var(--text3)", fontFamily: "var(--mono)" }}>Lab not started</span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className={`btn btn-sm ${labActive ? "btn-danger" : "btn-primary"}`} onClick={() => setLabActive((value) => !value)}>
                {labActive ? "Pause Lab" : "Start Lab →"}
              </button>
              {labActive && <button className="btn btn-secondary btn-sm">Open Terminal</button>}
            </div>
          </div>

          <div style={{ height: 1, background: "var(--border)", marginBottom: 14 }} />
          <div className="ws-panel-title">Instructions</div>

          <div>
            {steps.map((step, index) => (
              <div
                className="lab-step"
                key={step}
                onClick={() => setStepsDone((values) => values.map((value, current) => (current === index ? !value : value)))}
                style={{ cursor: "pointer" }}
              >
                <div className={`lab-step-num ${stepsDone[index] ? "done" : ""}`}>{stepsDone[index] ? "✓" : index + 1}</div>
                <div className="lab-step-text" style={{ color: stepsDone[index] ? "var(--text3)" : "var(--text2)", textDecoration: stepsDone[index] ? "line-through" : "none" }}>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ws-actions">
        <button className="btn btn-ghost btn-sm">← Previous</button>
        <button className="btn btn-primary">Mark Complete ✓</button>
        <button className="btn btn-secondary">Next Lesson →</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>4 / 12 lessons</div>
      </div>

      <div className="ai-fab" title="AI Assistant">✦</div>
    </div>
  );
}
