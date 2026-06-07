import { useState } from "react";
import Explorer from "./components/Explorer";
import Chat from "./components/Chat";
import "./App.css";

function Logo() {
  return (
    <svg className="logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="9" fill="#c47a2a"/>
      <path d="M10 26 L18 10 L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 21 L23 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="18" cy="10" r="2" fill="white"/>
      <path d="M14 26 Q18 23 22 26" stroke="#f0ddb0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export default function App() {
  const [tab, setTab] = useState("explorer");

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Logo />
          <div className="logo-text-wrap">
            <span className="logo-name">TransferAI</span>
            <span className="logo-tag">Beta</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">Tools</div>
          <div
            className={`nav-item ${tab === "explorer" ? "active" : ""}`}
            onClick={() => setTab("explorer")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Agreement Explorer
          </div>
          <div
            className={`nav-item ${tab === "chat" ? "active" : ""}`}
            onClick={() => setTab("chat")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            AI Counselor
          </div>

          <div className="nav-section">Resources</div>
          <a className="nav-item" href="https://assist.org" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            ASSIST.org
          </a>
          <a className="nav-item" href="https://admission.universityofcalifornia.edu/admission-requirements/transfer-requirements/" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            UC Transfer Info
          </a>
        </nav>

        <div className="sidebar-footer">
          Data from <a href="https://assist.org" target="_blank" rel="noreferrer">ASSIST.org</a><br/>
          Official CA articulation database
        </div>
      </aside>

      <div className="main-content">
        {tab === "explorer" ? <Explorer /> : <Chat />}
      </div>
    </div>
  );
}
