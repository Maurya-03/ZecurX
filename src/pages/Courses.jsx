import { COURSES } from "../data/mockData";
import CourseCard from "../components/CourseCard";

export default function Courses({ onStartWorkspace }) {
  const enrolled = COURSES.filter((course) => course.progress > 0);

  return (
    <div className="page">
      <div className="page-title">Courses</div>
      <div className="page-sub">// {enrolled.length} enrolled</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {enrolled.map((course) => (
          <CourseCard key={course.id} course={course} variant="list" onClick={onStartWorkspace} onAction={onStartWorkspace} />
        ))}
      </div>
    </div>
  );
}
