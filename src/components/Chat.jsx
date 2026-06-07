import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are an AI transfer counselor specializing in California community college to UC/CSU transfer planning. You help students understand articulation agreements, course requirements, and transfer pathways using data from ASSIST.org.

You can answer questions like:
- What classes do I need to take at [CC] to transfer to [UC] for [major]?
- Does [CC course] articulate to [UC course]?
- What should I prioritize this semester for transfer?
- Explain IGETC, TAG, and other transfer programs
- Help me understand my articulation agreement

Be conversational, encouraging, and specific. When you don't know exact current articulation data, remind students to verify on ASSIST.org since agreements update yearly. Always emphasize that you're an AI assistant and they should confirm with their counselor for official guidance.

Keep responses concise but helpful. Use bullet points for lists of requirements. Be warm and supportive — many CC students are first-generation and navigating this alone.`;

const SUGGESTED = [
  "What classes do I need for CS at UC Berkeley from De Anza?",
  "Explain how IGETC works and when I should use it",
  "What is TAG and which UCs offer it?",
  "How do I plan my courses for transfer in 2 years?",
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("transferai_key") || process.env.REACT_APP_ANTHROPIC_KEY || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function saveKey(k) {
    setApiKey(k);
    localStorage.setItem("transferai_key", k);
    setShowKeyInput(false);
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
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: newMessages,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const reply = data.content?.map((b) => b.text || "").join("") || "";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...newMessages, {
        role: "assistant",
        content: `⚠️ ${e.message}. Please check your API key in settings.`,
        isError: true,
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="section-title">AI Counselor</h1>
          <p className="section-sub">Ask anything about California transfer planning, articulation, and course requirements.</p>
        </div>
        <button className="btn btn-ghost" onClick={() => setShowKeyInput(!showKeyInput)} style={{ fontSize: 13, gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          API Key
        </button>
      </div>

      {showKeyInput && (
        <div className="card" style={{ marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div className="field" style={{ flex: 1 }}>
            <label>Anthropic API Key</label>
            <input
              type="password"
              placeholder="sk-ant-..."
              defaultValue={apiKey}
              onBlur={(e) => saveKey(e.target.value)}
              autoFocus
            />
          </div>
          <button className="btn btn-primary" onClick={() => setShowKeyInput(false)}>Save</button>
        </div>
      )}

      {!apiKey && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#92400e", marginBottom: 20 }}>
          <strong>API key required</strong> — Add your Anthropic API key above to enable AI chat. Get one free at{" "}
          <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: "#92400e" }}>console.anthropic.com</a>.
        </div>
      )}

      <div className="card" style={{ padding: 0, marginBottom: 16 }}>
        <div style={{ minHeight: 420, maxHeight: 520, overflowY: "auto", padding: "20px" }}>
          {messages.length === 0 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <p style={{ fontSize: 14, color: "var(--text2)" }}>Ask me anything about transfer planning</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    disabled={!apiKey}
                    style={{
                      textAlign: "left", padding: "10px 14px", background: "var(--surface2)",
                      border: "1px solid var(--border)", borderRadius: 8, cursor: apiKey ? "pointer" : "not-allowed",
                      fontSize: 13, color: "var(--text2)", fontFamily: "var(--font)",
                      transition: "background 0.12s", lineHeight: 1.4, opacity: apiKey ? 1 : 0.5,
                    }}
                    onMouseEnter={(e) => { if (apiKey) e.currentTarget.style.background = "var(--border)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface2)"; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: 20, display: "flex", gap: 12, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              {msg.role === "assistant" && (
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
              )}
              <div style={{
                maxWidth: "72%",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                background: msg.role === "user" ? "var(--accent)" : "var(--surface2)",
                color: msg.role === "user" ? "white" : "var(--text)",
                fontSize: 14,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div style={{ display: "flex", gap: 5, padding: "12px 16px", background: "var(--surface2)", borderRadius: "12px 12px 12px 4px" }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text3)", animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ borderTop: "1px solid var(--border)", padding: 16, display: "flex", gap: 10 }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={apiKey ? "Ask about transfer requirements, course equivalencies..." : "Add your API key above to start chatting"}
            disabled={!apiKey || loading}
            rows={1}
            style={{
              flex: 1, fontFamily: "var(--font)", fontSize: 14, padding: "9px 14px",
              border: "1px solid var(--border2)", borderRadius: 8, outline: "none",
              resize: "none", lineHeight: 1.5, color: "var(--text)",
              background: "var(--surface)",
            }}
          />
          <button
            className="btn btn-primary"
            onClick={() => sendMessage()}
            disabled={!input.trim() || !apiKey || loading}
            style={{ alignSelf: "flex-end", padding: "9px 16px" }}
          >
            {loading ? <span className="spinner" style={{ width: 16, height: 16 }} /> : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            )}
          </button>
        </div>
      </div>

      {messages.length > 0 && (
        <button className="btn btn-ghost" onClick={() => setMessages([])} style={{ fontSize: 13 }}>
          Clear conversation
        </button>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
