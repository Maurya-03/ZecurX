import Icon from "./Icon";
import { NAV_ITEMS } from "../data/mockData";

export default function Sidebar({ page, setPage, collapsed, onLogout = () => {} }) {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-logo">
        <div className="logo-mark">cx</div>
        {!collapsed && <div className="logo-text">ZecurX Learn</div>}
      </div>
      <div className="sidebar-nav">
        {!collapsed && <div className="nav-section-label">Navigation</div>}
        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${page === item.id ? "active" : ""}`}
            onClick={() => setPage(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <div className="nav-icon"><Icon name={item.icon} /></div>
            <span className="nav-label">{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}
      </div>
      <div className="sidebar-bottom">
        <div className="user-card">
          <div className="avatar">AK</div>
          {!collapsed && (
            <div className="user-info">
              <div className="user-name">Alex Kim</div>
              <div className="user-role">Pro · Level 12</div>
            </div>
          )}
        </div>
          <div
            className="nav-item"
            style={{ color: "var(--text3)" }}
            title={collapsed ? "Logout" : undefined}
            onClick={onLogout}
          >
          <div className="nav-icon"><Icon name="logout" /></div>
          <span className="nav-label">Logout</span>
        </div>
      </div>
    </div>
  );
}
