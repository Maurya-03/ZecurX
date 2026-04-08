import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";

export default function Header({ page, collapsed, setCollapsed, theme, onToggleTheme }) {
  const breadcrumbs = {
    dashboard: ["Dashboard"],
    explore: ["Explore"],
    courses: ["Courses"],
    learning: ["My Learning"],
    chat: ["Group Chats"],
    certs: ["Certificates"],
    exams: ["Final Exams"],
  };

  return (
    <div className="header">
      <button className="collapse-btn" onClick={() => setCollapsed((c) => !c)}>
        {collapsed ? "▷" : "◁"}
      </button>
      <div className="breadcrumbs">
        <span>ZecurX Learn</span>
        {(breadcrumbs[page] || []).map((crumb, index) => (
          <span key={index} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-active">{crumb}</span>
          </span>
        ))}
      </div>
      <div className="search-bar">
        <span style={{ color: "var(--text3)", fontSize: 13 }}>⊙</span>
        <input className="search-input" placeholder="Search or command..." />
        <span style={{ color: "var(--text3)", fontSize: 11, fontFamily: "var(--mono)", flexShrink: 0 }}>⌘K</span>
      </div>
      <div className="header-actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button className="icon-btn">
          <Icon name="bell" size={15} />
          <div className="notif-dot" />
        </button>
        <div className="header-avatar">AK</div>
      </div>
    </div>
  );
}
