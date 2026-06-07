import { useState } from "react";
import Explorer from "./components/Explorer";
import Chat from "./components/Chat";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("explorer");

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-mark">T</span>
            <span className="logo-text">TransferAI</span>
            <span className="logo-badge">beta</span>
          </div>
          <nav className="tabs">
            <button
              className={`tab ${tab === "explorer" ? "active" : ""}`}
              onClick={() => setTab("explorer")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Agreement Explorer
            </button>
            <button
              className={`tab ${tab === "chat" ? "active" : ""}`}
              onClick={() => setTab("chat")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              AI Counselor
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        {tab === "explorer" ? <Explorer /> : <Chat />}
      </main>

      <footer className="footer">
        <span>Data from <a href="https://assist.org" target="_blank" rel="noreferrer">ASSIST.org</a> · Official CA articulation database</span>
      </footer>
    </div>
  );
}
