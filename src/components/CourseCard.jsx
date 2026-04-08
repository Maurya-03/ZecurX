function getDifficultyClass(diff) {
  if (diff === "Beginner") return "tag-green";
  if (diff === "Intermediate") return "tag-yellow";
  return "tag-red";
}

export default function CourseCard({
  course,
  variant = "grid",
  onClick,
  onAction,
  actionLabel,
}) {
  const isEnrolled = course.progress > 0;

  function handleActionClick(event) {
    event.stopPropagation();
    if (onAction) {
      onAction(event);
    }
  }

  if (variant === "compact") {
    return (
      <div className="course-card hscroll-card" onClick={onClick}>
        <div className="course-icon">{course.icon}</div>
        <div className="course-title">{course.title}</div>
        <div className="course-desc">{course.lastLesson}</div>
        <div className="progress-track" style={{ marginBottom: 8 }}>
          <div className="progress-fill" style={{ width: `${course.progress}%` }} />
        </div>
        <div className="course-footer">
          <span className="course-prog-label">{course.progress}%</span>
          <button className="btn btn-ghost btn-sm" onClick={handleActionClick}>
            {actionLabel || "Resume →"}
          </button>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="card" style={{ display: "flex", alignItems: "center", gap: 16, cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
        <div style={{ fontSize: 26, width: 44, height: 44, background: "var(--bg4)", borderRadius: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {course.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{course.title}</div>
          <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)", marginBottom: 8 }}>{course.lastLesson}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="progress-track" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ width: `${course.progress}%` }} />
            </div>
            <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)", flexShrink: 0 }}>{course.progress}%</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexDirection: "column", alignItems: "flex-end" }}>
          <span className={`tag ${getDifficultyClass(course.diff)}`}>{course.diff}</span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={(event) => {
              event.stopPropagation();
              if (onAction) {
                onAction(event);
              } else if (onClick) {
                onClick(event);
              }
            }}
          >
            {actionLabel || "Resume →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-card" onClick={onClick}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div className="course-icon" style={{ marginBottom: 0 }}>{course.icon}</div>
        <span className={`tag ${getDifficultyClass(course.diff)}`}>{course.diff}</span>
      </div>
      <div className="course-title">{course.title}</div>
      <div className="course-desc">{course.desc}</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
        {course.tags.map((tag) => (
          <span key={tag} className="tag tag-gray">{tag}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>{course.hours}</span>
        {isEnrolled ? (
          <button className="btn btn-ghost btn-sm" onClick={handleActionClick}>
            {actionLabel || "Enrolled ✓"}
          </button>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={handleActionClick}>
            {actionLabel || "Enroll →"}
          </button>
        )}
      </div>
    </div>
  );
}
