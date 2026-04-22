const { useState, useEffect, useRef } = React;

function App() {
  const [tweaks, setTweaks] = useState(window.__TWEAKS);
  const blobsRef = useRef([]);

  // Apply tweaks to :root
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
    document.documentElement.style.setProperty(
      "--accent-soft",
      `color-mix(in oklab, ${tweaks.accent} 22%, transparent)`
    );
    document.documentElement.setAttribute("data-theme", tweaks.theme);
    document.documentElement.setAttribute("data-density", tweaks.density);
    document.documentElement.setAttribute("data-fontpair", tweaks.fontPair);
  }, [tweaks]);

  // Parallax atmosphere blobs
  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      const dx = (e.clientX - w / 2) / w;
      const dy = (e.clientY - h / 2) / h;
      blobsRef.current.forEach((blob, i) => {
        if (!blob) return;
        const mult = [40, -60, 50][i] || 30;
        blob.style.transform = `translate(${dx * mult}px, ${dy * mult}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Split headline so first sentence stays plain and the last 2-4 words italicize
  const headline = tweaks.headline || "AI agents that shadow your team and turn their work into automations.";
  const words = headline.trim().split(" ");
  const splitAt = Math.max(words.length - 3, Math.floor(words.length * 0.7));
  const leftPart = words.slice(0, splitAt).join(" ");
  const rightPart = words.slice(splitAt).join(" ");

  return (
    <>
      <div className="atmosphere">
        <div className="atmo-blob a" ref={(el) => (blobsRef.current[0] = el)} />
        <div className="atmo-blob b" ref={(el) => (blobsRef.current[1] = el)} />
        <div className="atmo-blob c" ref={(el) => (blobsRef.current[2] = el)} />
      </div>

      <nav className="nav">
        <div className="nav-inner">
          <div className="logo">
            <div className="logo-mark" />
            Infrastruct
          </div>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#trust">Trust</a>
            <a href="#pricing">Pricing</a>
            <a href="#customers">Customers</a>
          </div>
          <a href="#contact" className="nav-cta">Get access →</a>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="eyebrow">
            <span className="dot" />
            <span>Onboarding Q2 '26 cohort</span>
            <span className="eyebrow-badge">14-day pilot</span>
          </div>
          <h1>
            {leftPart} <em>{rightPart}</em>
          </h1>
          <p className="hero-sub">Infrastruct deploys observer agents across your team's stack. Two weeks later, every employee and their manager gets a concrete blueprint for where AI fits into their actual workflow.</p>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">Get access <span>→</span></a>
            <a href="#how" className="btn btn-ghost">See how it works</a>
          </div>

          <div className="hero-visual-wrap" id="hero-visual">
            <HeroVisual variant={tweaks.heroVisual} />
          </div>
        </div>
      </section>

      <section className="logos">
        <div className="container">
          <div className="logos-label">Observing work across</div>
          <div className="logos-row">
            <div>Gmail</div>
            <div>Slack</div>
            <div>Notion</div>
            <div>Linear</div>
            <div>Salesforce</div>
            <div>Figma</div>
            <div>Sheets</div>
            <div>HubSpot</div>
          </div>
        </div>
      </section>

      <div id="how"><HowItWorks /></div>
      <StatsSection />
      <Ticker />
      <div id="pricing"><Pricing /></div>
      <div id="trust"><Privacy /></div>
      <Contact />
      <Footer />

      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
