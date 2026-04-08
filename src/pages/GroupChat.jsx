import { useState } from "react";
import { CHATS, MESSAGES } from "../data/mockData";

export default function GroupChat() {
  const [activeChat, setActiveChat] = useState(1);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const chat = CHATS.find((item) => item.id === activeChat);

  function sendMsg() {
    if (!msg.trim()) return;
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        user: "ME",
        text: msg,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mine: true,
      },
    ]);
    setMsg("");
  }

  return (
    <div className="page" style={{ height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
      <div className="page-title" style={{ marginBottom: 4 }}>Group Chats</div>
      <div className="page-sub">// collaborate with your cohort</div>
      <div style={{ flex: 1, display: "flex", border: "1px solid var(--border)", borderRadius: "var(--r2)", overflow: "hidden", background: "var(--bg2)" }}>
        <div className="chat-list">
          {CHATS.map((item) => (
            <div key={item.id} className={`chat-item ${activeChat === item.id ? "active" : ""}`} onClick={() => setActiveChat(item.id)}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                <div className="chat-name">{item.name}</div>
                {item.unread > 0 && <span className="nav-badge">{item.unread}</span>}
              </div>
              <div className="chat-preview">{item.preview}</div>
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
            {messages.map((item) => (
              <div key={item.id} className={`msg ${item.mine ? "mine" : ""}`}>
                {!item.mine && <div className="msg-av">{item.user}</div>}
                <div>
                  <div className="msg-bubble">
                    {item.text}
                    {item.code && <div className="msg-code">{item.code}</div>}
                  </div>
                  <div className="msg-time" style={{ textAlign: item.mine ? "right" : "left" }}>{item.time}</div>
                </div>
                {item.mine && <div className="msg-av">ME</div>}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              className="chat-input"
              placeholder="Message the group... (use @mention)"
              value={msg}
              onChange={(event) => setMsg(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && sendMsg()}
            />
            <button className="btn btn-primary btn-sm" onClick={sendMsg}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
