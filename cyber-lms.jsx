import { useState, useEffect, useRef } from "react";

const THEME = {
  font: "'DM Mono', 'Courier New', monospace",
  sansFont: "'DM Sans', system-ui, sans-serif",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0a0b;
  --bg2: #111113;
  --bg3: #18181b;
  --bg4: #1e1e22;
  --border: rgba(255,255,255,0.07);
  --border2: rgba(255,255,255,0.12);
  --text: #f0ede8;
  --text2: #9896a0;
  --text3: #5e5c66;
  --accent: #c8f55a;
  --accent2: rgba(200,245,90,0.12);
  --accent3: rgba(200,245,90,0.06);
  --danger: #ff5a5a;
  --info: #5a9fff;
  --warn: #f5c55a;
  --r: 8px;
  --r2: 12px;
  --r3: 16px;
  --sans: 'DM Sans', system-ui, sans-serif;
  --mono: 'DM Mono', 'Courier New', monospace;
}

body { background: var(--bg); color: var(--text); font-family: var(--sans); font-size: 14px; line-height: 1.6; overflow: hidden; }

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

.app { display: flex; height: 100vh; overflow: hidden; }

/* SIDEBAR */
.sidebar {
  width: 220px;
  min-width: 220px;
  background: var(--bg2);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease, min-width 0.25s ease;
  overflow: hidden;
  z-index: 10;
}
.sidebar.collapsed { width: 56px; min-width: 56px; }

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 16px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  white-space: nowrap;
}
.logo-mark {
  width: 28px; height: 28px;
  background: var(--accent);
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 500;
  color: #0a0a0b;
  letter-spacing: -0.5px;
}
.logo-text { font-family: var(--mono); font-size: 13px; font-weight: 400; color: var(--text); letter-spacing: 0.5px; }

.sidebar-nav { flex: 1; padding: 8px; overflow-y: auto; overflow-x: hidden; }
.nav-section-label {
  font-size: 10px;
  font-weight: 500;
  color: var(--text3);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 12px 8px 6px;
  white-space: nowrap;
  overflow: hidden;
}
.sidebar.collapsed .nav-section-label { opacity: 0; height: 0; padding: 0; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--r);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  font-size: 13.5px;
  color: var(--text2);
  font-family: var(--sans);
  position: relative;
}
.nav-item:hover { background: var(--bg3); color: var(--text); }
.nav-item.active { background: var(--accent3); color: var(--accent); }
.nav-item.active .nav-icon { color: var(--accent); }
.nav-icon { width: 16px; height: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 14px; }
.nav-label { font-size: 13.5px; }
.nav-badge {
  margin-left: auto;
  background: var(--accent);
  color: #0a0a0b;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 20px;
  flex-shrink: 0;
}
.sidebar.collapsed .nav-label,
.sidebar.collapsed .nav-badge { display: none; }

.sidebar-bottom {
  padding: 8px;
  border-top: 1px solid var(--border);
}
.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--r);
  cursor: pointer;
  transition: background 0.15s;
  overflow: hidden;
  white-space: nowrap;
}
.user-card:hover { background: var(--bg3); }
.avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--bg4), var(--border2));
  border: 1px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
  flex-shrink: 0;
  font-family: var(--mono);
}
.user-info { flex: 1; min-width: 0; }
.user-name { font-size: 12.5px; font-weight: 500; color: var(--text); }
.user-role { font-size: 11px; color: var(--text3); }
.sidebar.collapsed .user-info { display: none; }

/* MAIN */
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: var(--bg); }

/* HEADER */
.header {
  height: 52px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  background: var(--bg);
  flex-shrink: 0;
  z-index: 5;
}
.collapse-btn {
  width: 28px; height: 28px;
  border: none;
  background: transparent;
  color: var(--text3);
  cursor: pointer;
  border-radius: var(--r);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}
.collapse-btn:hover { background: var(--bg3); color: var(--text); }

.breadcrumbs { display: flex; align-items: center; gap: 6px; flex: 1; font-size: 12.5px; color: var(--text3); font-family: var(--mono); }
.breadcrumb-sep { color: var(--text3); font-size: 10px; }
.breadcrumb-active { color: var(--text2); }

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 0 12px;
  height: 32px;
  width: 220px;
  transition: border-color 0.15s, width 0.2s;
}
.search-bar:focus-within { border-color: var(--border2); width: 260px; }
.search-input {
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 12.5px;
  width: 100%;
  font-family: var(--mono);
}
.search-input::placeholder { color: var(--text3); }

.header-actions { display: flex; align-items: center; gap: 4px; }
.icon-btn {
  width: 32px; height: 32px;
  border: none;
  background: transparent;
  color: var(--text3);
  cursor: pointer;
  border-radius: var(--r);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  transition: background 0.15s, color 0.15s;
  position: relative;
}
.icon-btn:hover { background: var(--bg3); color: var(--text); }
.notif-dot {
  position: absolute;
  top: 6px; right: 6px;
  width: 6px; height: 6px;
  background: var(--accent);
  border-radius: 50%;
  border: 1.5px solid var(--bg);
}
.header-avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--bg4);
  border: 1px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
  cursor: pointer;
  font-family: var(--mono);
}

/* CONTENT */
.content { flex: 1; overflow-y: auto; padding: 28px; }
.page { animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

/* TYPOGRAPHY */
.page-title { font-size: 20px; font-weight: 600; color: var(--text); margin-bottom: 4px; font-family: var(--sans); }
.page-sub { font-size: 13px; color: var(--text3); margin-bottom: 24px; font-family: var(--mono); }

/* CARDS */
.card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 16px 20px;
  transition: border-color 0.15s;
}
.card:hover { border-color: var(--border2); }
.card-title { font-size: 12px; color: var(--text3); font-weight: 400; margin-bottom: 6px; font-family: var(--mono); letter-spacing: 0.5px; text-transform: uppercase; }
.card-value { font-size: 26px; font-weight: 600; color: var(--text); font-family: var(--mono); }
.card-sub { font-size: 12px; color: var(--text3); margin-top: 4px; }

/* GRID UTILS */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }

/* SECTION HEADER */
.section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.section-title { font-size: 13px; font-weight: 600; color: var(--text2); letter-spacing: 0.5px; font-family: var(--mono); text-transform: uppercase; }
.section-action { font-size: 12px; color: var(--text3); cursor: pointer; font-family: var(--mono); transition: color 0.15s; }
.section-action:hover { color: var(--accent); }

/* PROGRESS BAR */
.progress-track { height: 3px; background: var(--bg4); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.3s; }
.progress-fill.dim { background: var(--text3); }

/* TAGS / BADGES */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 20px;
  font-family: var(--mono);
}
.tag-green { background: rgba(100,210,120,0.1); color: #64d278; }
.tag-red { background: rgba(255,90,90,0.1); color: var(--danger); }
.tag-yellow { background: rgba(245,197,90,0.1); color: var(--warn); }
.tag-gray { background: var(--bg4); color: var(--text3); }
.tag-blue { background: rgba(90,159,255,0.1); color: var(--info); }
.tag-accent { background: var(--accent2); color: var(--accent); }

/* BUTTON */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: var(--r);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  font-family: var(--sans);
  white-space: nowrap;
}
.btn-primary { background: var(--accent); color: #0a0a0b; }
.btn-primary:hover { background: #d4f870; }
.btn-secondary { background: var(--bg4); color: var(--text2); border: 1px solid var(--border); }
.btn-secondary:hover { border-color: var(--border2); color: var(--text); background: var(--bg3); }
.btn-ghost { background: transparent; color: var(--text3); }
.btn-ghost:hover { color: var(--text); background: var(--bg3); }
.btn-sm { padding: 5px 10px; font-size: 12px; }
.btn-danger { background: rgba(255,90,90,0.1); color: var(--danger); border: 1px solid rgba(255,90,90,0.2); }
.btn-danger:hover { background: rgba(255,90,90,0.18); }

/* RESUME CARD */
.resume-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  margin-bottom: 24px;
}
.resume-card:hover { border-color: var(--accent); background: rgba(200,245,90,0.03); }
.resume-icon {
  width: 48px; height: 48px;
  background: var(--accent2);
  border-radius: var(--r2);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.resume-meta { flex: 1; }
.resume-label { font-size: 11px; color: var(--text3); font-family: var(--mono); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
.resume-title { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
.resume-lesson { font-size: 12.5px; color: var(--text3); font-family: var(--mono); }
.resume-actions { display: flex; gap: 8px; align-items: center; }

/* COURSE CARD */
.course-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.15s;
}
.course-card:hover { border-color: var(--border2); transform: translateY(-1px); }
.course-icon { font-size: 24px; margin-bottom: 10px; }
.course-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; line-height: 1.4; }
.course-desc { font-size: 12px; color: var(--text3); margin-bottom: 12px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.course-footer { display: flex; align-items: center; justify-content: space-between; }
.course-prog-label { font-size: 11px; color: var(--text3); font-family: var(--mono); }

/* HEATMAP */
.heatmap { display: flex; gap: 3px; }
.heatmap-col { display: flex; flex-direction: column; gap: 3px; }
.heatmap-cell {
  width: 12px; height: 12px;
  border-radius: 2px;
  background: var(--bg4);
}
.heatmap-cell.l1 { background: rgba(200,245,90,0.2); }
.heatmap-cell.l2 { background: rgba(200,245,90,0.45); }
.heatmap-cell.l3 { background: rgba(200,245,90,0.7); }
.heatmap-cell.l4 { background: var(--accent); }

/* LAB CARD */
.lab-card {
  background: var(--bg2);
  border: 1px solid rgba(255,90,90,0.25);
  border-radius: var(--r2);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.lab-pulse {
  width: 8px; height: 8px;
  background: var(--danger);
  border-radius: 50%;
  animation: pulse 1.5s infinite;
  flex-shrink: 0;
}
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,90,90,0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(255,90,90,0); }
}

/* CHAT */
.chat-layout { display: flex; height: 100%; gap: 0; }
.chat-list { width: 260px; min-width: 260px; border-right: 1px solid var(--border); overflow-y: auto; }
.chat-item { padding: 12px 16px; cursor: pointer; border-bottom: 1px solid var(--border); transition: background 0.15s; }
.chat-item:hover, .chat-item.active { background: var(--bg3); }
.chat-name { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
.chat-preview { font-size: 12px; color: var(--text3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.chat-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.chat-header { padding: 14px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.msg { display: flex; gap: 10px; }
.msg.mine { flex-direction: row-reverse; }
.msg-av { width: 28px; height: 28px; border-radius: 50%; background: var(--bg4); display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; font-family: var(--mono); color: var(--text2); }
.msg-bubble { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 8px 12px; max-width: 65%; font-size: 13px; line-height: 1.5; }
.msg.mine .msg-bubble { background: var(--accent2); border-color: rgba(200,245,90,0.2); color: var(--accent); }
.msg-code { background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; font-family: var(--mono); font-size: 12px; color: var(--accent); margin-top: 6px; overflow-x: auto; }
.msg-time { font-size: 11px; color: var(--text3); margin-top: 4px; font-family: var(--mono); }
.chat-input-area { padding: 12px 16px; border-top: 1px solid var(--border); display: flex; gap: 10px; }
.chat-input {
  flex: 1;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 8px 12px;
  color: var(--text);
  font-size: 13px;
  outline: none;
  font-family: var(--sans);
  transition: border-color 0.15s;
}
.chat-input:focus { border-color: var(--border2); }

/* WORKSPACE */
.workspace {
  position: fixed;
  inset: 0;
  background: var(--bg);
  z-index: 100;
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.2s;
}
.ws-bar {
  height: 48px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  flex-shrink: 0;
}
.ws-progress-wrap { flex: 1; display: flex; align-items: center; gap: 10px; }
.ws-prog-label { font-size: 11px; font-family: var(--mono); color: var(--text3); }
.ws-body { flex: 1; display: flex; overflow: hidden; }
.ws-content { flex: 1; padding: 24px; overflow-y: auto; }
.ws-panel { width: 340px; border-left: 1px solid var(--border); padding: 20px; overflow-y: auto; background: var(--bg2); }
.ws-lesson-title { font-size: 18px; font-weight: 600; margin-bottom: 6px; }
.ws-lesson-meta { font-size: 12px; color: var(--text3); font-family: var(--mono); margin-bottom: 20px; }
.ws-video { background: var(--bg3); border: 1px solid var(--border); border-radius: var(--r2); aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; font-size: 40px; cursor: pointer; transition: border-color 0.15s; margin-bottom: 20px; }
.ws-video:hover { border-color: var(--border2); }
.ws-text { font-size: 14px; line-height: 1.8; color: var(--text2); }
.ws-text p { margin-bottom: 12px; }
.ws-text code { font-family: var(--mono); font-size: 12.5px; background: var(--bg4); padding: 1px 6px; border-radius: 4px; color: var(--accent); }
.ws-actions { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-top: 1px solid var(--border); flex-shrink: 0; }
.ws-panel-title { font-size: 12px; font-family: var(--mono); color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
.lab-step { display: flex; gap: 10px; margin-bottom: 14px; }
.lab-step-num { width: 22px; height: 22px; background: var(--bg4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-family: var(--mono); color: var(--text3); flex-shrink: 0; }
.lab-step-num.done { background: var(--accent2); color: var(--accent); }
.lab-step-text { font-size: 13px; color: var(--text2); line-height: 1.5; }
.ai-fab {
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 40px; height: 40px;
  background: var(--bg3);
  border: 1px solid var(--border2);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.15s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}
.ai-fab:hover { border-color: var(--accent); transform: scale(1.1); }

/* EXPLORE */
.filter-row { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.filter-btn {
  padding: 5px 12px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 12px;
  color: var(--text3);
  cursor: pointer;
  transition: all 0.15s;
  font-family: var(--mono);
}
.filter-btn:hover, .filter-btn.active { border-color: var(--accent); color: var(--accent); background: var(--accent3); }

/* STATS ROW */
.stat-row { display: flex; gap: 12px; margin-bottom: 24px; }
.stat-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 10px 16px;
  flex: 1;
}
.stat-icon { font-size: 18px; }
.stat-info {}
.stat-val { font-size: 20px; font-weight: 600; font-family: var(--mono); color: var(--text); }
.stat-label { font-size: 11px; color: var(--text3); font-family: var(--mono); }

/* TIMELINE */
.timeline { position: relative; padding-left: 20px; }
.timeline::before { content: ''; position: absolute; left: 6px; top: 0; bottom: 0; width: 1px; background: var(--border); }
.tl-item { position: relative; margin-bottom: 14px; }
.tl-dot { position: absolute; left: -17px; top: 4px; width: 7px; height: 7px; background: var(--bg4); border: 1px solid var(--border2); border-radius: 50%; }
.tl-dot.done { background: var(--accent); border-color: var(--accent); }
.tl-content { font-size: 13px; color: var(--text2); }
.tl-time { font-size: 11px; color: var(--text3); font-family: var(--mono); margin-top: 2px; }

/* CERTIFICATES */
.cert-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: border-color 0.15s;
}
.cert-card:hover { border-color: var(--border2); }
.cert-badge {
  width: 48px; height: 48px;
  background: rgba(245,197,90,0.1);
  border: 1px solid rgba(245,197,90,0.2);
  border-radius: var(--r);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.cert-info { flex: 1; }
.cert-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
.cert-course { font-size: 12px; color: var(--text3); font-family: var(--mono); }
.cert-actions { display: flex; gap: 8px; }

/* EXAM CARD */
.exam-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r2);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  transition: border-color 0.15s;
}
.exam-card.unlocked { border-color: rgba(200,245,90,0.2); }
.exam-icon {
  width: 40px; height: 40px;
  background: var(--bg4);
  border-radius: var(--r);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.exam-info { flex: 1; }
.exam-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.exam-meta { font-size: 12px; color: var(--text3); font-family: var(--mono); }

/* EMPTY STATE */
.empty { text-align: center; padding: 60px 20px; }
.empty-icon { font-size: 36px; margin-bottom: 12px; }
.empty-title { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
.empty-text { font-size: 13px; color: var(--text3); margin-bottom: 20px; line-height: 1.6; }

/* INPUT */
.search-full {
  width: 100%;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 9px 14px;
  color: var(--text);
  font-size: 13px;
  outline: none;
  font-family: var(--mono);
  margin-bottom: 16px;
  transition: border-color 0.15s;
}
.search-full:focus { border-color: var(--border2); }

/* HORIZONTAL SCROLL */
.hscroll { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 8px; }
.hscroll::-webkit-scrollbar { height: 3px; }
.hscroll-card { flex-shrink: 0; width: 220px; }

/* SKELETON */
.skel {
  background: linear-gradient(90deg, var(--bg3) 25%, var(--bg4) 50%, var(--bg3) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
`;

// ICONS
const Icon = ({ name, size = 14 }) => {
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
    search: "⊙",
    collapse: "◁",
    expand: "▷",
    play: "▶",
    check: "✓",
    lock: "⊘",
    download: "↓",
    share: "↗",
    lab: "⬟",
    back: "←",
    ai: "✦",
    menu: "≡",
  };
  return <span style={{ fontSize: size, fontFamily: "monospace", lineHeight: 1 }}>{icons[name] || "·"}</span>;
};

// DATA
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "explore", label: "Explore", icon: "explore" },
  { id: "courses", label: "Courses", icon: "courses" },
  { id: "learning", label: "My Learning", icon: "learning" },
  { id: "chat", label: "Group Chats", icon: "chat", badge: 3 },
  { id: "certs", label: "Certificates", icon: "certs" },
  { id: "exams", label: "Final Exams", icon: "exams" },
];

const COURSES = [
  { id: 1, title: "Web Application Pentesting", desc: "Master OWASP Top 10 vulnerabilities, SQL injection, XSS, CSRF, and modern exploitation techniques.", tags: ["Offensive", "Web"], diff: "Intermediate", progress: 68, icon: "🕸", lastLesson: "Module 4 — SSRF Attacks", hours: "12h" },
  { id: 2, title: "Network Security Fundamentals", desc: "TCP/IP deep dive, packet analysis with Wireshark, firewall configuration, IDS/IPS setup.", tags: ["Defense", "Network"], diff: "Beginner", progress: 42, icon: "🔗", lastLesson: "Module 3 — Wireshark Basics", hours: "8h" },
  { id: 3, title: "Malware Analysis & Reverse Engineering", desc: "Static and dynamic analysis, disassembly with Ghidra, behavioral analysis in sandboxes.", tags: ["Analysis", "RE"], diff: "Advanced", progress: 20, icon: "🔬", lastLesson: "Module 2 — Static Analysis", hours: "18h" },
  { id: 4, title: "Cloud Security on AWS", desc: "IAM misconfigurations, S3 bucket security, Lambda function exploitation, CloudTrail monitoring.", tags: ["Cloud", "AWS"], diff: "Intermediate", progress: 0, icon: "☁", lastLesson: null, hours: "10h" },
  { id: 5, title: "Cryptography Essentials", desc: "Symmetric and asymmetric encryption, hash functions, PKI, TLS/SSL internals and attacks.", tags: ["Crypto"], diff: "Beginner", progress: 0, icon: "🔐", lastLesson: null, hours: "6h" },
  { id: 6, title: "Linux Privilege Escalation", desc: "SUID binaries, sudo misconfigs, cron jobs, kernel exploits, container escapes.", tags: ["Offensive", "Linux"], diff: "Advanced", progress: 0, icon: "🐧", lastLesson: null, hours: "14h" },
];

const CHATS = [
  { id: 1, name: "Web Pentesting — Cohort 12", preview: "Has anyone tried the SSRF lab yet?", unread: 2 },
  { id: 2, name: "CTF Team — Red Wolves", preview: "Flag captured on challenge #4", unread: 1 },
  { id: 3, name: "Network Security Study", preview: "Check this Wireshark capture...", unread: 0 },
];

const MESSAGES = [
  { id: 1, user: "AK", text: "Has anyone tried the SSRF lab yet? I'm stuck on step 3.", time: "14:22", mine: false },
  { id: 2, user: "SR", text: "Yeah, the trick is to use the internal metadata endpoint. Try:", time: "14:24", mine: false, code: "curl http://169.254.169.254/latest/meta-data/" },
  { id: 3, user: "ME", text: "Oh that's clever, using AWS metadata service! Let me try that.", time: "14:26", mine: true },
  { id: 4, user: "AK", text: "Also @everyone — lab session Friday 8PM UTC. Don't miss it!", time: "14:30", mine: false },
];

function genHeatmap() {
  const levels = [0, 0, 0, 1, 1, 2, 2, 3, 4];
  const weeks = 18;
  return Array.from({ length: weeks }, () =>
    Array.from({ length: 7 }, () => levels[Math.floor(Math.random() * levels.length)])
  );
}
const HEATMAP = genHeatmap();

// PAGES
function Dashboard({ onNavigate, onStartWorkspace }) {
  const enrolled = COURSES.filter(c => c.progress > 0);
  return (
    <div className="page">
      <div style={{ marginBottom: 28 }}>
        <div className="page-title">Good evening, Alex.</div>
        <div className="page-sub">// 3-day streak · keep it up</div>
      </div>

      {/* Stats */}
      <div className="stat-row">
        {[
          { icon: "🔥", val: "3", label: "day streak" },
          { icon: "⏱", val: "47h", label: "hours learned" },
          { icon: "📦", val: "3", label: "active courses" },
        ].map((s, i) => (
          <div className="stat-pill" key={i}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-info">
              <div className="stat-val">{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Resume */}
      <div className="resume-card" onClick={onStartWorkspace}>
        <div className="resume-icon">🕸</div>
        <div className="resume-meta">
          <div className="resume-label">Resume learning</div>
          <div className="resume-title">Web Application Pentesting</div>
          <div className="resume-lesson">Module 4 — SSRF Attacks · 68% complete</div>
        </div>
        <div className="resume-actions">
          <div className="progress-track" style={{ width: 80 }}>
            <div className="progress-fill" style={{ width: "68%" }} />
          </div>
          <button className="btn btn-primary btn-sm">Resume ▶</button>
        </div>
      </div>

      {/* Lab alert */}
      <div className="lab-card" style={{ marginBottom: 24 }}>
        <div className="lab-pulse" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>Active Lab: SSRF Exploitation</div>
          <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>38 min remaining</div>
        </div>
        <button className="btn btn-danger btn-sm">Join Lab</button>
      </div>

      {/* Continue Learning */}
      <div style={{ marginBottom: 28 }}>
        <div className="section-header">
          <div className="section-title">Continue Learning</div>
          <div className="section-action" onClick={() => onNavigate("courses")}>View all →</div>
        </div>
        <div className="hscroll">
          {enrolled.map(c => (
            <div className="course-card hscroll-card" key={c.id} onClick={onStartWorkspace}>
              <div className="course-icon">{c.icon}</div>
              <div className="course-title">{c.title}</div>
              <div className="course-desc">{c.lastLesson}</div>
              <div className="progress-track" style={{ marginBottom: 8 }}>
                <div className="progress-fill" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="course-footer">
                <span className="course-prog-label">{c.progress}%</span>
                <button className="btn btn-ghost btn-sm">Resume →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div style={{ marginBottom: 24 }}>
        <div className="section-header">
          <div className="section-title">Activity — Past 18 weeks</div>
        </div>
        <div className="card" style={{ overflowX: "auto" }}>
          <div className="heatmap">
            {HEATMAP.map((week, wi) => (
              <div className="heatmap-col" key={wi}>
                {week.map((lvl, di) => (
                  <div
                    key={di}
                    className={`heatmap-cell${lvl > 0 ? ` l${lvl}` : ""}`}
                    title={`${lvl} sessions`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>Less</span>
            {[0,1,2,3,4].map(l => <div key={l} className={`heatmap-cell${l > 0 ? ` l${l}` : ""}`} />)}
            <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>More</span>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Upcoming</div>
          {[
            { label: "CTF Challenge #7", due: "Tomorrow", tag: "tag-yellow" },
            { label: "Module 5 Quiz", due: "Fri", tag: "tag-blue" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontSize: 13, color: "var(--text2)" }}>{t.label}</span>
              <span className={`tag ${t.tag}`}>{t.due}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Featured Challenge</div>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🏆</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Hack The Box — Bank</div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12 }}>Intermediate machine · Est. 90 min</div>
          <button className="btn btn-secondary btn-sm">Start Challenge →</button>
        </div>
      </div>
    </div>
  );
}

function Explore({ onNavigate }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filters = ["All", "Beginner", "Intermediate", "Advanced"];
  const filtered = COURSES.filter(c => {
    const matchDiff = filter === "All" || c.diff === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchDiff && matchSearch;
  });
  return (
    <div className="page">
      <div className="page-title">Explore</div>
      <div className="page-sub">// discover your next skill</div>
      <input className="search-full" placeholder="⊙  Search courses, topics, skills..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="filter-row">
        {filters.map(f => (
          <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
        {["Web", "Network", "Cloud", "Malware"].map(t => (
          <button key={t} className="filter-btn">{t}</button>
        ))}
      </div>
      <div className="grid-3">
        {filtered.map(c => (
          <div className="course-card" key={c.id}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="course-icon" style={{ marginBottom: 0 }}>{c.icon}</div>
              <span className={`tag ${c.diff === "Beginner" ? "tag-green" : c.diff === "Intermediate" ? "tag-yellow" : "tag-red"}`}>{c.diff}</span>
            </div>
            <div className="course-title">{c.title}</div>
            <div className="course-desc">{c.desc}</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
              {c.tags.map(t => <span key={t} className="tag tag-gray">{t}</span>)}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>{c.hours}</span>
              {c.progress > 0
                ? <button className="btn btn-ghost btn-sm">Enrolled ✓</button>
                : <button className="btn btn-primary btn-sm">Enroll →</button>
              }
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <div className="section-header">
          <div className="section-title">Recommended for you</div>
        </div>
        <div className="card">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ fontSize: 32 }}>🐧</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Linux Privilege Escalation</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>Based on your progress in Web Pentesting — expand into post-exploitation techniques</div>
            </div>
            <button className="btn btn-primary btn-sm">Enroll →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Courses({ onStartWorkspace }) {
  const enrolled = COURSES.filter(c => c.progress > 0);
  return (
    <div className="page">
      <div className="page-title">Courses</div>
      <div className="page-sub">// {enrolled.length} enrolled</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {enrolled.map(c => (
          <div className="card" key={c.id} style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }} onClick={onStartWorkspace}>
            <div style={{ fontSize: 26, width: 44, height: 44, background: "var(--bg4)", borderRadius: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)", marginBottom: 8 }}>{c.lastLesson}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="progress-track" style={{ flex: 1 }}>
                  <div className="progress-fill" style={{ width: `${c.progress}%` }} />
                </div>
                <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)", flexShrink: 0 }}>{c.progress}%</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexDirection: "column", alignItems: "flex-end" }}>
              <span className={`tag ${c.diff === "Beginner" ? "tag-green" : c.diff === "Intermediate" ? "tag-yellow" : "tag-red"}`}>{c.diff}</span>
              <button className="btn btn-secondary btn-sm">Resume →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyLearning() {
  const [tab, setTab] = useState("progress");
  const enrolled = COURSES.filter(c => c.progress > 0);
  return (
    <div className="page">
      <div className="page-title">My Learning</div>
      <div className="page-sub">// your progress at a glance</div>
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: "Day Streak", val: "3", icon: "🔥" },
          { label: "Hours Learned", val: "47", icon: "⏱" },
          { label: "Completed", val: "2", icon: "✅" },
          { label: "Achievements", val: "8", icon: "🏅" },
        ].map((s, i) => (
          <div className="card" key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div className="card-value">{s.val}</div>
            <div className="card-title" style={{ marginTop: 4, marginBottom: 0 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "var(--bg3)", padding: 4, borderRadius: "var(--r)", width: "fit-content" }}>
        {[{ id: "progress", label: "In Progress" }, { id: "completed", label: "Completed" }].map(t => (
          <button
            key={t.id}
            className="btn btn-sm"
            style={{ background: tab === t.id ? "var(--bg4)" : "transparent", border: "none", color: tab === t.id ? "var(--text)" : "var(--text3)" }}
            onClick={() => setTab(t.id)}
          >{t.label}</button>
        ))}
      </div>
      {tab === "progress" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {enrolled.map(c => (
            <div className="card" key={c.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
              <span style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--text3)" }}>{c.progress}%</span>
              <button className="btn btn-primary btn-sm">Continue →</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <div className="empty-icon">🎓</div>
          <div className="empty-title">No completed courses yet</div>
          <div className="empty-text">Keep going — you're making great progress!</div>
        </div>
      )}
      <div className="section-header">
        <div className="section-title">Learning Timeline</div>
      </div>
      <div className="timeline">
        {[
          { label: "Completed: Module 3 — Wireshark Basics", time: "Today, 10:41", done: true },
          { label: "Started lab: SSRF Exploitation Lab", time: "Today, 09:18", done: true },
          { label: "Completed: Module 3 — SQL Injection (Blind)", time: "Yesterday, 21:05", done: true },
          { label: "Enrolled: Malware Analysis & Reverse Engineering", time: "Mon, 14:30", done: false },
          { label: "Completed: Module 2 — XSS Fundamentals", time: "Mon, 12:00", done: true },
        ].map((e, i) => (
          <div className="tl-item" key={i}>
            <div className={`tl-dot ${e.done ? "done" : ""}`} />
            <div className="tl-content">{e.label}</div>
            <div className="tl-time">{e.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupChat() {
  const [activeChat, setActiveChat] = useState(1);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const chat = CHATS.find(c => c.id === activeChat);
  const sendMsg = () => {
    if (!msg.trim()) return;
    setMessages(m => [...m, { id: Date.now(), user: "ME", text: msg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), mine: true }]);
    setMsg("");
  };
  return (
    <div className="page" style={{ height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
      <div className="page-title" style={{ marginBottom: 4 }}>Group Chats</div>
      <div className="page-sub">// collaborate with your cohort</div>
      <div style={{ flex: 1, display: "flex", border: "1px solid var(--border)", borderRadius: "var(--r2)", overflow: "hidden", background: "var(--bg2)" }}>
        <div className="chat-list">
          {CHATS.map(c => (
            <div key={c.id} className={`chat-item ${activeChat === c.id ? "active" : ""}`} onClick={() => setActiveChat(c.id)}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                <div className="chat-name">{c.name}</div>
                {c.unread > 0 && <span className="nav-badge">{c.unread}</span>}
              </div>
              <div className="chat-preview">{c.preview}</div>
            </div>
          ))}
        </div>
        <div className="chat-area">
          <div className="chat-header">
            <div style={{ width: 32, height: 32, background: "var(--bg4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>💬</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{chat?.name}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>24 members · 3 online</div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map(m => (
              <div key={m.id} className={`msg ${m.mine ? "mine" : ""}`}>
                {!m.mine && <div className="msg-av">{m.user}</div>}
                <div>
                  <div className="msg-bubble">
                    {m.text}
                    {m.code && <div className="msg-code">{m.code}</div>}
                  </div>
                  <div className="msg-time" style={{ textAlign: m.mine ? "right" : "left" }}>{m.time}</div>
                </div>
                {m.mine && <div className="msg-av">ME</div>}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              className="chat-input"
              placeholder="Message the group... (use @mention)"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMsg()}
            />
            <button className="btn btn-primary btn-sm" onClick={sendMsg}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Certificates() {
  const certs = [
    { title: "Web Application Security Fundamentals", course: "Web Application Pentesting — Level 1", date: "March 2024" },
    { title: "Network Defense Practitioner", course: "Network Security Fundamentals", date: "Jan 2024" },
  ];
  return (
    <div className="page">
      <div className="page-title">Certificates</div>
      <div className="page-sub">// your earned credentials</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {certs.map((c, i) => (
          <div className="cert-card" key={i}>
            <div className="cert-badge">🏆</div>
            <div className="cert-info">
              <div className="cert-title">{c.title}</div>
              <div className="cert-course">{c.course} · {c.date}</div>
            </div>
            <div className="cert-actions">
              <button className="btn btn-secondary btn-sm">↓ Download</button>
              <button className="btn btn-ghost btn-sm">↗ Share</button>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 24 }}>🔒</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>Web Pentesting — Advanced Certificate</div>
            <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>Complete the course to unlock this certificate</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="progress-track" style={{ width: 60 }}>
              <div className="progress-fill dim" style={{ width: "68%" }} />
            </div>
            <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>68%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalExams() {
  const exams = [
    { title: "Web Application Security — Final Assessment", status: "unlocked", duration: "90 min", attempts: 2 },
    { title: "Network Security Fundamentals — Final Exam", status: "locked", duration: "60 min", attempts: 0 },
    { title: "Malware Analysis — Comprehensive Test", status: "locked", duration: "120 min", attempts: 0 },
  ];
  return (
    <div className="page">
      <div className="page-title">Final Exams</div>
      <div className="page-sub">// complete courses to unlock exams</div>
      {exams.map((e, i) => (
        <div className={`exam-card ${e.status}`} key={i}>
          <div className="exam-icon" style={{ background: e.status === "unlocked" ? "var(--accent2)" : "var(--bg4)" }}>
            {e.status === "unlocked" ? "📝" : "🔒"}
          </div>
          <div className="exam-info">
            <div className="exam-title">{e.title}</div>
            <div className="exam-meta">{e.duration} · {e.attempts > 0 ? `${e.attempts} attempts used` : "No attempts yet"}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className={`tag ${e.status === "unlocked" ? "tag-accent" : "tag-gray"}`}>{e.status}</span>
            {e.status === "unlocked"
              ? <button className="btn btn-primary btn-sm">Start Exam →</button>
              : <button className="btn btn-secondary btn-sm" disabled style={{ opacity: 0.5 }}>Locked</button>
            }
          </div>
        </div>
      ))}
      <div className="card" style={{ marginTop: 8, borderStyle: "dashed" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 20 }}>💡</div>
          <div style={{ fontSize: 13, color: "var(--text3)" }}>Complete all modules and pass the module quizzes to unlock the final exam for each course.</div>
        </div>
      </div>
    </div>
  );
}

function Workspace({ onClose }) {
  const [labActive, setLabActive] = useState(false);
  const [stepsDone, setStepsDone] = useState([true, true, false, false, false]);
  const steps = [
    "Set up Burp Suite proxy and intercept requests",
    "Identify the vulnerable parameter in the request",
    "Craft a payload targeting the internal metadata server",
    "Retrieve the AWS instance credentials",
    "Document findings and write your report",
  ];
  return (
    <div className="workspace">
      <div className="ws-bar">
        <button className="btn btn-ghost btn-sm" onClick={onClose}>← Back</button>
        <div style={{ width: 1, height: 20, background: "var(--border)" }} />
        <div style={{ fontSize: 13, fontWeight: 600 }}>Web Application Pentesting</div>
        <span className="tag tag-gray">Module 4</span>
        <div className="ws-progress-wrap">
          <div className="progress-track" style={{ flex: 1 }}>
            <div className="progress-fill" style={{ width: "68%" }} />
          </div>
          <span className="ws-prog-label">68%</span>
        </div>
        <button className="btn btn-secondary btn-sm">Focus Mode</button>
      </div>

      <div className="ws-body">
        <div className="ws-content">
          <div className="ws-lesson-title">SSRF Attacks — Server-Side Request Forgery</div>
          <div className="ws-lesson-meta">Lesson 4.3 · 18 min · Video + Lab</div>

          <div className="ws-video">
            ▶
          </div>

          <div className="ws-text">
            <p>Server-Side Request Forgery (SSRF) is a vulnerability that allows an attacker to induce the server-side application to make HTTP requests to an arbitrary domain of the attacker's choosing.</p>
            <p>In a typical SSRF attack, the attacker can cause the server to make a connection to <code>internal-only</code> services within the organization's infrastructure. In cloud environments, SSRF can be used to reach the <code>metadata service</code> at <code>169.254.169.254</code>.</p>
            <p>The impact can be critical — attackers have used SSRF to steal <code>AWS IAM credentials</code>, access internal databases, perform port scanning of the internal network, and in some cases achieve Remote Code Execution.</p>
          </div>
        </div>

        <div className="ws-panel">
          <div className="ws-panel-title">Lab — SSRF Exploitation</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              {labActive
                ? <><div className="lab-pulse" /><span style={{ fontSize: 13, color: "var(--danger)" }}>Lab Running · 38m left</span></>
                : <span style={{ fontSize: 13, color: "var(--text3)", fontFamily: "var(--mono)" }}>Lab not started</span>
              }
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className={`btn btn-sm ${labActive ? "btn-danger" : "btn-primary"}`} onClick={() => setLabActive(l => !l)}>
                {labActive ? "Pause Lab" : "Start Lab →"}
              </button>
              {labActive && <button className="btn btn-secondary btn-sm">Open Terminal</button>}
            </div>
          </div>

          <div style={{ height: 1, background: "var(--border)", marginBottom: 14 }} />
          <div className="ws-panel-title">Instructions</div>

          <div>
            {steps.map((s, i) => (
              <div
                className="lab-step"
                key={i}
                onClick={() => setStepsDone(d => d.map((v, j) => j === i ? !v : v))}
                style={{ cursor: "pointer" }}
              >
                <div className={`lab-step-num ${stepsDone[i] ? "done" : ""}`}>{stepsDone[i] ? "✓" : i + 1}</div>
                <div className="lab-step-text" style={{ color: stepsDone[i] ? "var(--text3)" : "var(--text2)", textDecoration: stepsDone[i] ? "line-through" : "none" }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ws-actions">
        <button className="btn btn-ghost btn-sm">← Previous</button>
        <button className="btn btn-primary">Mark Complete ✓</button>
        <button className="btn btn-secondary">Next Lesson →</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--mono)" }}>4 / 12 lessons</div>
      </div>

      <div className="ai-fab" title="AI Assistant">✦</div>
    </div>
  );
}

// MAIN APP
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [workspace, setWorkspace] = useState(false);

  const breadcrumbs = {
    dashboard: ["Dashboard"],
    explore: ["Explore"],
    courses: ["Courses"],
    learning: ["My Learning"],
    chat: ["Group Chats"],
    certs: ["Certificates"],
    exams: ["Final Exams"],
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard onNavigate={setPage} onStartWorkspace={() => setWorkspace(true)} />;
      case "explore": return <Explore onNavigate={setPage} />;
      case "courses": return <Courses onStartWorkspace={() => setWorkspace(true)} />;
      case "learning": return <MyLearning />;
      case "chat": return <GroupChat />;
      case "certs": return <Certificates />;
      case "exams": return <FinalExams />;
      default: return null;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* SIDEBAR */}
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <div className="sidebar-logo">
            <div className="logo-mark">cx</div>
            {!collapsed && <div className="logo-text">ZecurX Learn</div>}
          </div>
          <div className="sidebar-nav">
            {!collapsed && <div className="nav-section-label">Navigation</div>}
            {NAV_ITEMS.map(item => (
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
            <div className="nav-item" style={{ color: "var(--text3)" }} title={collapsed ? "Logout" : undefined}>
              <div className="nav-icon"><Icon name="logout" /></div>
              <span className="nav-label">Logout</span>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          {/* HEADER */}
          <div className="header">
            <button className="collapse-btn" onClick={() => setCollapsed(c => !c)}>
              {collapsed ? "▷" : "◁"}
            </button>
            <div className="breadcrumbs">
              <span>ZecurX Learn</span>
              {(breadcrumbs[page] || []).map((b, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="breadcrumb-sep">›</span>
                  <span className="breadcrumb-active">{b}</span>
                </span>
              ))}
            </div>
            <div className="search-bar">
              <span style={{ color: "var(--text3)", fontSize: 13 }}>⊙</span>
              <input className="search-input" placeholder="Search or command..." />
              <span style={{ color: "var(--text3)", fontSize: 11, fontFamily: "var(--mono)", flexShrink: 0 }}>⌘K</span>
            </div>
            <div className="header-actions">
              <button className="icon-btn">
                <Icon name="bell" size={15} />
                <div className="notif-dot" />
              </button>
              <div className="header-avatar">AK</div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="content">
            {renderPage()}
          </div>
        </div>
      </div>

      {/* WORKSPACE OVERLAY */}
      {workspace && <Workspace onClose={() => setWorkspace(false)} />}
    </>
  );
}
