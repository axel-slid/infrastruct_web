const { useState: useStateP } = React;

function PricingTier({ name, tag, price, unit, description, features, highlight, cta }) {
  return (
    <div className={`price-card${highlight ? " price-card-highlight" : ""}`}>
      {highlight && <div className="price-ribbon">Most popular</div>}
      <div className="price-head">
        <div className="price-tag">{tag}</div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="price-amount">
        <span className="price-num">{price}</span>
        <span className="price-unit">{unit}</span>
      </div>
      <a href="#contact" className={`btn ${highlight ? "btn-accent" : "btn-ghost"}`} style={{ width: "100%", justifyContent: "center" }}>{cta}</a>
      <div className="price-divider" />
      <ul className="price-features">
        {features.map((f, i) => (
          <li key={i}>
            <span className="price-check">
              <svg viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pricing() {
  const [annual, setAnnual] = useStateP(true);

  const tiers = [
    {
      name: "Pilot",
      tag: "Try it",
      price: "Free",
      unit: "14-day audit",
      description: "One team, full observation, a single delivered blueprint. No credit card.",
      cta: "Start pilot",
      features: [
        "Up to 25 seats observed",
        "One workflow audit report",
        "Ranked automation shortlist",
        "Email support",
      ],
    },
    {
      name: "Team",
      tag: "Growing teams",
      price: annual ? "$24" : "$29",
      unit: "per seat / month",
      description: "Continuous shadowing across your stack with quarterly rollouts.",
      cta: "Get access",
      highlight: true,
      features: [
        "Unlimited employees observed",
        "Quarterly audit reports",
        "10 deployed agents included",
        "Manager + employee dashboards",
        "SOC 2 Type II, SSO",
        "Dedicated Slack channel",
      ],
    },
    {
      name: "Enterprise",
      tag: "500+ seats",
      price: "Custom",
      unit: "annual contract",
      description: "On-prem, bespoke agent development, and a transformation partner on your side.",
      cta: "Talk to sales",
      features: [
        "On-prem or VPC deployment",
        "Custom agent engineering",
        "Integration with bespoke tools",
        "Named transformation lead",
        "99.9% uptime SLA",
        "ISO 27001, HIPAA, DPA",
      ],
    },
  ];

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <div>
            <div className="section-eyebrow">Pricing</div>
            <h2 className="section-title">Priced against the hours <em>you get back.</em></h2>
            <p className="section-lead" style={{ marginBottom: 0 }}>Every tier includes the full audit. You pay for scale and deployment depth, not for findings.</p>
          </div>
          <div className="price-toggle">
            <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Annual <span className="price-save">save 17%</span></button>
            <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Monthly</button>
          </div>
        </div>

        <div className="price-grid">
          {tiers.map((t) => <PricingTier key={t.name} {...t} />)}
        </div>

        <div className="price-footnote">
          All plans include unlimited observed apps, GDPR compliance, and employee-visible activity indicators. Cancel or pause any time.
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Pricing });
