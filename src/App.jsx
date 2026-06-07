import { useState } from "react";
import Landing from "./Landing";
import Explorer from "./components/Explorer";
import Chat from "./components/Chat";
import "./App.css";

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="9" fill="#c47a2a"/>
      <path d="M10 26 L18 10 L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 21 L23 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="18" cy="10" r="2" fill="white"/>
      <path d="M14 26 Q18 23 22 26" stroke="#f0ddb0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState("landing");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (page === "landing") {
    return <Landing onEnter={(tab) => setPage(tab)} />;
  }

  return (
    <div className="app">
      <aside className={"sidebar" + (mobileNavOpen ? " sidebar-open" : "")}>
        <div className="sidebar-logo">
          <Logo />
          <div className="logo-text-wrap">
            <span className="logo-name">TransferAI</span>
            <span className="logo-tag">Beta</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">Tools</div>
          <div className={"nav-item" + (page === "explorer" ? " active" : "")} onClick={() => { setPage("explorer"); setMobileNavOpen(false); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Agreement Explorer
          </div>
          <div className={"nav-item" + (page === "chat" ? " active" : "")} onClick={() => { setPage("chat"); setMobileNavOpen(false); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            AI Counselor
          </div>
          <div className="nav-section">More</div>
          <a className="nav-item" href="https://assist.org" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            ASSIST.org
          </a>
          <div className="nav-item" onClick={() => { setPage("landing"); setMobileNavOpen(false); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Home
          </div>
        </nav>
        <div className="sidebar-footer">
          Data from <a href="https://assist.org" target="_blank" rel="noreferrer">ASSIST.org</a><br/>
          Official CA articulation database
        </div>
      </aside>

      {mobileNavOpen && <div className="mobile-overlay" onClick={() => setMobileNavOpen(false)} />}

      <div className="main-content">
        <div className="mobile-topbar">
          <button className="mobile-menu-btn" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Logo />
            <span className="logo-name" style={{fontSize:15}}>TransferAI</span>
          </div>
          <div style={{width:36}} />
        </div>
        {page === "explorer" ? <Explorer /> : <Chat />}
      </div>
    </div>
  );
}
