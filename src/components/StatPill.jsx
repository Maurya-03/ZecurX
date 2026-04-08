export default function StatPill({ icon, value, label }) {
  return (
    <div className="stat-pill">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <div className="stat-val">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}
