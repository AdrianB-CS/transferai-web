import "./App.css";

export default function Landing({ onEnter }) {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill="#c47a2a"/>
              <path d="M10 26 L18 10 L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 21 L23 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="18" cy="10" r="2" fill="white"/>
              <path d="M14 26 Q18 23 22 26" stroke="#f0ddb0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="landing-logo-name">TransferAI</span>
          </div>
          <div className="landing-nav-links">
            <a href="https://assist.org" target="_blank" rel="noreferrer">ASSIST.org</a>
            <button className="btn btn-primary" onClick={() => onEnter("explorer")}>Get Started</button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">Free · Built for CC Students</div>
          <h1 className="hero-title">
            Transfer smarter.<br/>
            <span className="hero-accent">No more confusion.</span>
          </h1>
          <p className="hero-sub">
            TransferAI helps California community college students navigate the transfer process — browse official ASSIST.org articulation agreements and get AI-powered guidance, all in one place.
          </p>
          <div className="hero-btns">
            <button className="hero-btn-primary" onClick={() => onEnter("explorer")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Agreement Explorer
            </button>
            <button className="hero-btn-secondary" onClick={() => onEnter("chat")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              AI Counselor
            </button>
          </div>
          <p className="hero-note">Data from ASSIST.org · Official CA articulation database</p>
        </div>
      </section>

      <section className="features">
        <div className="features-inner">
          <div className="feature-card">
            <div className="feature-icon feature-icon-amber">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <h3>Agreement Explorer</h3>
            <p>Browse official course-by-course articulation agreements between any California CC and UC/CSU campus. See exactly which courses transfer.</p>
            <button className="feature-btn" onClick={() => onEnter("explorer")}>Open Explorer →</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h3>AI Counselor</h3>
            <p>Ask anything in plain English. "What classes do I need for CS at UC Berkeley from De Anza?" Get clear, helpful answers instantly.</p>
            <button className="feature-btn" onClick={() => onEnter("chat")}>Ask a Question →</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3>Always Up to Date</h3>
            <p>Powered by the official ASSIST.org API. Agreements reflect the latest 2025–2026 academic year data directly from California's articulation system.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="how-inner">
          <h2>How it works</h2>
          <p className="how-sub">Three steps to transfer clarity</p>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div>
                <h4>Pick your schools</h4>
                <p>Select your community college and your target UC or CSU campus.</p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-num">2</div>
              <div>
                <h4>Browse agreements</h4>
                <p>See all major agreements and exactly which courses articulate.</p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-num">3</div>
              <div>
                <h4>Ask questions</h4>
                <p>Use AI Counselor to get personalized guidance on your transfer plan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <h2>Ready to plan your transfer?</h2>
          <p>Join thousands of CC students navigating the transfer process with confidence.</p>
          <div className="hero-btns">
            <button className="hero-btn-primary" onClick={() => onEnter("explorer")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Agreement Explorer
            </button>
            <button className="hero-btn-secondary" onClick={() => onEnter("chat")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              AI Counselor
            </button>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-logo">
            <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill="#c47a2a"/>
              <path d="M10 26 L18 10 L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 21 L23 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="18" cy="10" r="2" fill="white"/>
            </svg>
            <span className="landing-logo-name" style={{ fontSize: 14 }}>TransferAI</span>
          </div>
          <p>Data from <a href="https://assist.org" target="_blank" rel="noreferrer">ASSIST.org</a> · Official CA articulation database · Free for all CC students</p>
        </div>
      </footer>
    </div>
  );
}
