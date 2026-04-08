import { useState } from "react";
import { COURSES } from "../data/mockData";
import CourseCard from "../components/CourseCard";
import SectionHeader from "../components/SectionHeader";

export default function Explore() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filters = ["All", "Beginner", "Intermediate", "Advanced"];

  const filtered = COURSES.filter((course) => {
    const matchDiff = filter === "All" || course.diff === filter;
    const query = search.toLowerCase();
    const matchSearch =
      course.title.toLowerCase().includes(query) ||
      course.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchDiff && matchSearch;
  });

  return (
    <div className="page">
      <div className="page-title">Explore</div>
      <div className="page-sub">// discover your next skill</div>
      <input className="search-full" placeholder="⊙  Search courses, topics, skills..." value={search} onChange={(event) => setSearch(event.target.value)} />
      <div className="filter-row">
        {filters.map((value) => (
          <button key={value} className={`filter-btn ${filter === value ? "active" : ""}`} onClick={() => setFilter(value)}>{value}</button>
        ))}
        {["Web", "Network", "Cloud", "Malware"].map((tag) => (
          <button key={tag} className="filter-btn">{tag}</button>
        ))}
      </div>
      <div className="grid-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} variant="grid" />
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader title="Recommended for you" />
        <div className="card">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ fontSize: 32 }}>🐧</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Linux Privilege Escalation</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>Based on your progress in Web Pentesting - expand into post-exploitation techniques</div>
            </div>
            <button className="btn btn-primary btn-sm">Enroll →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
