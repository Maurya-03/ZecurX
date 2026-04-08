export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "explore", label: "Explore", icon: "explore" },
  { id: "courses", label: "Courses", icon: "courses" },
  { id: "learning", label: "My Learning", icon: "learning" },
  { id: "chat", label: "Group Chats", icon: "chat", badge: 3 },
  { id: "certs", label: "Certificates", icon: "certs" },
  { id: "exams", label: "Final Exams", icon: "exams" },
];

export const COURSES = [
  { id: 1, title: "Web Application Pentesting", desc: "Master OWASP Top 10 vulnerabilities, SQL injection, XSS, CSRF, and modern exploitation techniques.", tags: ["Offensive", "Web"], diff: "Intermediate", progress: 68, icon: "🕸", lastLesson: "Module 4 - SSRF Attacks", hours: "12h" },
  { id: 2, title: "Network Security Fundamentals", desc: "TCP/IP deep dive, packet analysis with Wireshark, firewall configuration, IDS/IPS setup.", tags: ["Defense", "Network"], diff: "Beginner", progress: 42, icon: "🔗", lastLesson: "Module 3 - Wireshark Basics", hours: "8h" },
  { id: 3, title: "Malware Analysis & Reverse Engineering", desc: "Static and dynamic analysis, disassembly with Ghidra, behavioral analysis in sandboxes.", tags: ["Analysis", "RE"], diff: "Advanced", progress: 20, icon: "🔬", lastLesson: "Module 2 - Static Analysis", hours: "18h" },
  { id: 4, title: "Cloud Security on AWS", desc: "IAM misconfigurations, S3 bucket security, Lambda function exploitation, CloudTrail monitoring.", tags: ["Cloud", "AWS"], diff: "Intermediate", progress: 0, icon: "☁", lastLesson: null, hours: "10h" },
  { id: 5, title: "Cryptography Essentials", desc: "Symmetric and asymmetric encryption, hash functions, PKI, TLS/SSL internals and attacks.", tags: ["Crypto"], diff: "Beginner", progress: 0, icon: "🔐", lastLesson: null, hours: "6h" },
  { id: 6, title: "Linux Privilege Escalation", desc: "SUID binaries, sudo misconfigs, cron jobs, kernel exploits, container escapes.", tags: ["Offensive", "Linux"], diff: "Advanced", progress: 0, icon: "🐧", lastLesson: null, hours: "14h" },
];

export const CHATS = [
  { id: 1, name: "Web Pentesting - Cohort 12", preview: "Has anyone tried the SSRF lab yet?", unread: 2 },
  { id: 2, name: "CTF Team - Red Wolves", preview: "Flag captured on challenge #4", unread: 1 },
  { id: 3, name: "Network Security Study", preview: "Check this Wireshark capture...", unread: 0 },
];

export const MESSAGES = [
  { id: 1, user: "AK", text: "Has anyone tried the SSRF lab yet? I'm stuck on step 3.", time: "14:22", mine: false },
  { id: 2, user: "SR", text: "Yeah, the trick is to use the internal metadata endpoint. Try:", time: "14:24", mine: false, code: "curl http://169.254.169.254/latest/meta-data/" },
  { id: 3, user: "ME", text: "Oh that's clever, using AWS metadata service! Let me try that.", time: "14:26", mine: true },
  { id: 4, user: "AK", text: "Also @everyone - lab session Friday 8PM UTC. Don't miss it!", time: "14:30", mine: false },
];

function generateHeatmap() {
  const levels = [0, 0, 0, 1, 1, 2, 2, 3, 4];
  const weeks = 18;
  return Array.from({ length: weeks }, () =>
    Array.from({ length: 7 }, () => levels[Math.floor(Math.random() * levels.length)])
  );
}

export const HEATMAP = generateHeatmap();
