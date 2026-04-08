export default function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <div className="section-header">
      <div className="section-title">{title}</div>
      {actionLabel ? (
        <div className="section-action" onClick={onAction}>
          {actionLabel}
        </div>
      ) : null}
    </div>
  );
}
