export default function Icon({ name, size = 14 }) {
  const icons = {
    dashboard: "⬡",
    explore: "◈",
    courses: "◫",
    learning: "◷",
    chat: "◻",
    certs: "◆",
    exams: "◉",
    logout: "→",
    bell: "◎",
  };

  return (
    <span style={{ fontSize: size, fontFamily: "monospace", lineHeight: 1 }}>
      {icons[name] || "·"}
    </span>
  );
}
