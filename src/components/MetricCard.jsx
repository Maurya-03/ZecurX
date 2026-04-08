export default function MetricCard({ icon, value, label }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
      <div className="card-value">{value}</div>
      <div className="card-title" style={{ marginTop: 4, marginBottom: 0 }}>
        {label}
      </div>
    </div>
  );
}
