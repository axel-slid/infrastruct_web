const { useState: useStateS, useEffect: useEffectS } = React;

// --- Stats section ---
function StatsSection() {
  return (
    <section className="stats">
      <div className="container" style={{ padding: 0, maxWidth: "100%" }}>
        <div className="stats-grid">
          <div className="stats-intro">
            <p>Experts estimate <em style={{ color: "var(--accent-ink)" }}>60–70%</em> of activities in knowledge work are automatable with today's AI.</p>
            <cite>McKinsey Global Institute, 2024</cite>
          </div>
          <div className="stat">
            <div className="stat-num">12<span className="unit">hrs</span></div>
            <div className="stat-label">average reclaimed per employee, per week, after a 14-day audit</div>
          </div>
          <div className="stat">
            <div className="stat-num">3.4<span className="unit">x</span></div>
            <div className="stat-label">ROI on a single quarter of agent-assisted workflow rollout</div>
          </div>
          <div className="stat">
            <div className="stat-num">90<span className="unit">%</span></div>
            <div className="stat-label">of automations Infrastruct proposes are accepted by managers on review</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- How it works ---
function HowCard({ step, title, body, visual }) {
  return (
    <div className="how-card">
      <div>
        <div className="how-step"><span className="how-step-num">{step}</span>Phase {step}</div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className="how-visual">{visual}</div>
    </div>
  );
}

function HowVisual1() {
  return (
    <div style={{ padding: 16, height: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
      {["09:14 · Gmail", "10:02 · Figma", "11:38 · Sheets", "14:21 · Slack"].map((t, i) => (
        <div key={i} style={{
          padding: "6px 10px",
          background: "var(--bg-elev)",
          border: "1px solid var(--line)",
          borderRadius: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--ink-2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span>{t}</span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
        </div>
      ))}
    </div>
  );
}
function HowVisual2() {
  return (
    <div style={{ padding: 16, height: "100%", display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
      {[{ l: "Repetitive tasks", v: 78 }, { l: "Approval-heavy", v: 54 }, { l: "Data-routing", v: 91 }].map((b, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", marginBottom: 4 }}>
            <span>{b.l}</span><span>{b.v}%</span>
          </div>
          <div style={{ height: 4, background: "var(--line)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${b.v}%`, height: "100%", background: "var(--accent)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
function HowVisual3() {
  return (
    <div style={{ padding: 16, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <div style={{ padding: "8px 12px", background: "var(--pastel-peach)", borderRadius: 10, fontSize: 11, fontWeight: 500 }}>Inbox</div>
      <div style={{ color: "var(--ink-3)" }}>→</div>
      <div style={{ padding: "8px 12px", background: "var(--ink)", color: "var(--bg)", borderRadius: 10, fontSize: 11, fontWeight: 500 }}>Agent</div>
      <div style={{ color: "var(--ink-3)" }}>→</div>
      <div style={{ padding: "8px 12px", background: "var(--pastel-mint)", borderRadius: 10, fontSize: 11, fontWeight: 500 }}>Done</div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-eyebrow">The method</div>
        <h2 className="section-title">Watch, measure, <em>automate.</em></h2>
        <p className="section-lead">Infrastruct runs as a lightweight agent across your team's stack. It observes the work that's actually happening, not what's in the org chart, and turns that into a concrete roadmap for AI rollout.</p>

        <div className="how-grid">
          <HowCard step="1" title="Silent shadow" body="An observer agent sits alongside each employee across Gmail, Slack, Sheets, Notion, Linear, and your CRM, logging patterns, not content." visual={<HowVisual1 />} />
          <HowCard step="2" title="Pattern ledger" body="Every repeated action gets a confidence score, an hour estimate, and a shortlist of AI techniques that could replace or assist it." visual={<HowVisual2 />} />
          <HowCard step="3" title="Delivered blueprint" body="After 14 days, each employee and their manager receives a tailored report with ranked automations and agent prototypes ready to deploy." visual={<HowVisual3 />} />
        </div>
      </div>
    </section>
  );
}

// --- Ticker ---
function Ticker() {
  const items = [
    { role: "Ops Lead", save: "6.2h / wk", task: "Weekly KPI roll-up auto-generated from Sheets + Salesforce" },
    { role: "Support", save: "11h / wk", task: "Tier-1 ticket drafts via internal knowledge base" },
    { role: "Design", save: "4.5h / wk", task: "Figma → Drive asset export pipeline" },
    { role: "Finance", save: "8.1h / wk", task: "Invoice reconciliation + categorization" },
    { role: "PM", save: "5.3h / wk", task: "Status digest from Linear + Slack threads" },
    { role: "Sales", save: "7.4h / wk", task: "Meeting notes → Salesforce field updates" },
    { role: "Legal", save: "3.8h / wk", task: "Contract clause extraction + redlines" },
    { role: "HR", save: "4.9h / wk", task: "Candidate scorecard synthesis" },
    { role: "Eng", save: "6.7h / wk", task: "PR description drafts from commit history" },
  ];
  const doubled = [...items, ...items];

  return (
    <section className="section" style={{ padding: 0 }}>
      <div className="container">
        <div style={{ marginBottom: 32 }}>
          <div className="section-eyebrow">Live across customer deployments</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>Automations shipping this week.</h2>
        </div>
      </div>
      <div className="ticker-wrap">
        <div className="ticker-track">
          {doubled.map((it, i) => (
            <div key={i} className="ticker-item">
              <span className="tick-role">{it.role}</span>
              <span className="tick-sep" />
              <span>{it.task}</span>
              <span className="tick-save">−{it.save}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Privacy ---
function Privacy() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-eyebrow">Built for trust</div>
        <h2 className="section-title">Oversight that <em>works for</em> your people.</h2>
        <p className="section-lead">Infrastruct is an audit tool, not a surveillance tool. We observe workflows, the shape of the work, not its content, and every employee gets the same report their manager does. The goal isn't to watch people, it's to give people back their time.</p>

        <div className="privacy">
          <div className="priv-card lean">
            <div className="priv-tag">Oversight</div>
            <h3>Leadership sees where time goes.</h3>
            <p>Managers get a heat-map of where the week actually went: repetitive work, handoffs, and the quiet rework that never shows up in any dashboard.</p>
            <ul className="priv-list">
              <li><span className="check"><svg viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Team-level workflow heat-maps</li>
              <li><span className="check"><svg viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Ranked automation opportunities</li>
              <li><span className="check"><svg viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Quarterly transformation roadmap</li>
            </ul>
          </div>

          <div className="priv-card soft">
            <div className="priv-tag">Co-pilot</div>
            <h3>Employees keep their report.</h3>
            <p>Every person gets the same findings their manager sees, plus personal agent prototypes they can accept, tweak, or reject. It's a co-pilot that learns alongside them, not a watcher.</p>
            <ul className="priv-list">
              <li><span className="check"><svg viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Metadata only — content is never stored</li>
              <li><span className="check"><svg viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>Opt-in with a visible, always-on indicator</li>
              <li><span className="check"><svg viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>SOC 2 Type II · GDPR · on-prem available</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Contact / Request access ---
function Contact() {
  const [submitted, setSubmitted] = useStateS(false);
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact">
          <div className="contact-content">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "color-mix(in oklab, var(--bg) 55%, var(--ink))", marginBottom: 16 }}>
              Q2 cohort · 20 seats left
            </div>
            <h2>Find the 12 hours hiding in <em>every week.</em></h2>
            <p>We're onboarding 20 mid-market ops teams this quarter. Tell us about yours, and a founding engineer will reply in under 24 hours with a 14-day pilot plan.</p>
            <div className="contact-meta">
              <div className="contact-meta-row"><span>Pilot length</span><strong>14 days</strong></div>
              <div className="contact-meta-row"><span>Deployment</span><strong>SaaS or on-prem</strong></div>
              <div className="contact-meta-row"><span>Team size</span><strong>50–500 seats</strong></div>
              <div className="contact-meta-row" style={{ borderBottom: "none" }}><span>First report in</span><strong>2 weeks</strong></div>
            </div>
          </div>
          <form className="form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            {submitted ? (
              <div className="form-success">
                <div style={{ fontSize: 40 }}>✦</div>
                <h4>We'll be in touch.</h4>
                <p>Check your inbox for a calendar link within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="form-row inline">
                  <div>
                    <label>Name</label>
                    <input type="text" placeholder="Maria Larsen" required />
                  </div>
                  <div>
                    <label>Work email</label>
                    <input type="email" placeholder="maria@acme.co" required />
                  </div>
                </div>
                <div className="form-row inline">
                  <div>
                    <label>Company</label>
                    <input type="text" placeholder="Acme Logistics" required />
                  </div>
                  <div>
                    <label>Team size</label>
                    <select>
                      <option>50–100</option>
                      <option>100–250</option>
                      <option>250–500</option>
                      <option>500+</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <label>What workflow keeps you up at night?</label>
                  <textarea rows="2" placeholder="Anything we should know..." />
                </div>
                <button className="form-submit" type="submit">Get access →</button>
                <div style={{ marginTop: 12, fontSize: 11, color: "color-mix(in oklab, var(--bg) 45%, var(--ink))", textAlign: "center", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Reply in &lt; 24 hrs · No credit card
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="wordmark">Infra<span>struct</span><span style={{ color: "var(--accent-ink)", fontStyle: "italic" }}>.</span></div>
        <div className="footer-grid" style={{ marginTop: 60 }}>
          <div className="footer-brand">
            <div className="logo"><div className="logo-mark" /> Infrastruct</div>
            <p>The audit layer for the AI-native operating company.</p>
          </div>
          <div>
            <h5>Product</h5>
            <ul>
              <li><a href="#">How it works</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Sample report</a></li>
              <li><a href="#">ROI calculator</a></li>
              <li><a href="#">Docs</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Infrastruct, Inc.</div>
          <div>SOC 2 · GDPR · ISO 27001</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { StatsSection, HowItWorks, Ticker, Privacy, Contact, Footer });
