import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are Alex, a warm and knowledgeable AI transfer counselor specializing in California community college to UC/CSU transfer planning. You help students navigate articulation agreements, course requirements, and transfer pathways using data from ASSIST.org.

You answer questions like:
- What classes do I need at [CC] to transfer to [UC] for [major]?
- Does [CC course] articulate to [UC course]?
- What should I prioritize this semester?
- Explain IGETC, TAG, and other transfer programs
- Help me understand my articulation agreement

Be warm, encouraging, and specific. When you don't know exact current articulation data, remind students to verify on ASSIST.org. Always note you're an AI and they should confirm with their counselor for official guidance. Use clear formatting with bullet points for lists. Many CC students are first-generation — be supportive and accessible.`;

const SUGGESTED = [
  "What classes do I need for CS at UC Berkeley from De Anza?",
  "Explain how IGETC works and when to use it",
  "What is TAG and which UCs offer it?",
  "How do I plan my courses to transfer in 2 years?",
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("transferai_key") || process.env.REACT_APP_ANTHROPIC_KEY || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function saveKey() {
    if (keyDraft.trim()) {
      setApiKey(keyDraft.trim());
      localStorage.setItem("transferai_key", keyDraft.trim());
      setShowKeyInput(false);
      setKeyDraft("");
    }
  }

  async function sendMessage(text) {
    const content = text || input.trim();
    if (!content || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: newMessages,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `Error ${res.status}`);
      }
      const data = await res.json();
      const reply = data.content?.map((b) => b.text || "").join("") || "";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: `Something went wrong: ${e.message}`, isError: true }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <>
      <div className="topbar">
        <div>
          <div className="page-title">AI Counselor</div>
          <div className="page-sub">Ask Alex anything about California transfer planning</div>
        </div>
        <div className="topbar-actions">
          {messages.length > 0 && (
            <button className="btn" onClick={() => setMessages([])}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
              Clear
            </button>
          )}
          <button className="btn" onClick={() => setShowKeyInput(!showKeyInput)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            {apiKey ? "API Key ✓" : "Add API Key"}
          </button>
        </div>
      </div>

      <div className="chat-wrap">
        <div className="chat-messages">
          {showKeyInput && (
            <div className="key-input-row">
              <div className="field" style={{ flex: 1 }}>
                <label>Anthropic API Key</label>
                <input
                  type="password"
                  placeholder="sk-ant-..."
                  value={keyDraft}
                  onChange={(e) => setKeyDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveKey()}
                  autoFocus
                />
              </div>
              <button className="btn btn-primary" onClick={saveKey}>Save</button>
            </div>
          )}

          {!apiKey && (
            <div className="warn-box">
              Add your Anthropic API key above to start chatting. Get one free at{" "}
              <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a>.
            </div>
          )}

          {messages.length === 0 && (
            <div style={{ maxWidth: 520 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="msg-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>Alex, your transfer counselor</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>Powered by AI · Verify with ASSIST.org</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 16, lineHeight: 1.6 }}>
                Hi! I can help you plan your transfer from any California community college to a UC or CSU. Ask me about articulation agreements, IGETC, TAG, or how to plan your courses.
              </p>
              <div className="chat-suggested">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    className="suggested-btn"
                    onClick={() => sendMessage(s)}
                    disabled={!apiKey}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role === "user" ? "msg-user" : "msg-assistant"}`}>
              {msg.role === "assistant" && (
                <div className="msg-avatar">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
              )}
              <div className={`msg-bubble ${msg.isError ? "msg-error" : ""}`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg msg-assistant">
              <div className="msg-avatar">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div className="msg-bubble" style={{ display: "flex", gap: 5, alignItems: "center", padding: "12px 16px" }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text3)", display: "inline-block", animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-wrap">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={apiKey ? "Ask about transfer requirements, course equivalencies, IGETC..." : "Add your API key to start chatting"}
            disabled={!apiKey || loading}
            rows={1}
          />
          <button
            className="btn btn-primary"
            onClick={() => sendMessage()}
            disabled={!input.trim() || !apiKey || loading}
          >
            {loading ? <span className="spinner" style={{ width: 14, height: 14 }} /> : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            )}
          </button>
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:0.35} 40%{transform:translateY(-5px);opacity:1} }`}</style>
    </>
  );
}
