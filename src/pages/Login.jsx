import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function Login({ onBack, onLogin, theme, onToggleTheme }) {
  const [email, setEmail] = useState("alex@zecurxlearn.local");
  const [password, setPassword] = useState("secure123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const cleanedEmail = email.trim().toLowerCase();
    if (!cleanedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    const success = await onLogin({ email: cleanedEmail, password });
    setLoading(false);

    if (!success) {
      setError("Invalid credentials. Use alex@zecurxlearn.local / secure123");
    }
  }

  return (
    <div className="auth-shell login-shell">
      <div className="login-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            Back
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        <div className="login-head">
          <div className="landing-brand">
            <span className="logo-mark">cx</span>
            <span className="landing-brand-text">ZecurX Learn</span>
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue your learning path.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="login-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />

          <label className="login-label" htmlFor="password">Password</label>
          <input
            id="password"
            className="login-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />

          {error ? <div className="login-error">{error}</div> : null}

          <button className="btn btn-primary login-submit" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="login-help">
          Demo credentials: alex@zecurxlearn.local / secure123
        </p>
      </div>
    </div>
  );
}
