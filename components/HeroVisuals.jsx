// Three hero-visual variants, switchable via Tweaks
const { useState, useEffect, useRef } = React;

// --- Variant 1: "Watcher" — agent observing a workflow timeline ---
function WatcherVisual() {
  const [activeEvent, setActiveEvent] = useState(0);
  const events = [
    { time: "09:14", app: "Gmail", action: "Replied to 12 support tickets", tag: "Repetitive", insight: "Draft template detected" },
    { time: "10:02", app: "Figma", action: "Exported 24 assets to Drive", tag: "Automatable", insight: "Export pipeline" },
    { time: "11:38", app: "Sheets", action: "Reconciled weekly pipeline data", tag: "Automatable", insight: "4.2 hrs/wk reclaimable" },
    { time: "14:21", app: "Slack", action: "Routed 8 questions to #eng-help", agent: true, insight: "Triage agent candidate" },
    { time: "15:47", app: "Notion", action: "Compiled team status into doc", agent: true, insight: "Weekly roll-up automation" },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveEvent((e) => (e + 1) % events.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 28, height: "100%" }}>
      {/* Timeline */}
      <div style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.8)",
        borderRadius: 22,
        padding: 22,
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-2)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 4px var(--accent-soft)" }} />
            Live shadow · Maria L. · Ops
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>
            Tue, Apr 21
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {events.map((ev, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "60px 90px 1fr auto",
              gap: 14,
              alignItems: "center",
              padding: "10px 12px",
              borderRadius: 12,
              background: i === activeEvent ? "rgba(255,255,255,0.9)" : "transparent",
              border: i === activeEvent ? "1px solid var(--line)" : "1px solid transparent",
              transform: i === activeEvent ? "translateX(0)" : "translateX(0)",
              transition: "all 0.4s cubic-bezier(.2,.8,.2,1)",
              opacity: i === activeEvent ? 1 : 0.55,
              fontSize: 13,
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>{ev.time}</div>
              <div style={{ fontWeight: 500, fontSize: 13 }}>{ev.app}</div>
              <div style={{ color: "var(--ink-2)", fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.action}</div>
              <div style={{
                padding: "3px 10px",
                borderRadius: 100,
                background: ev.agent ? "var(--accent)" : "var(--pastel-mint)",
                color: ev.agent ? "#fff" : "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                {ev.agent ? "Agent" : ev.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight panel */}
      <div style={{
        background: "var(--ink)",
        color: "var(--bg)",
        borderRadius: 22,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: -60, right: -60,
          width: 200, height: 200,
          borderRadius: "50%",
          background: "var(--accent)",
          filter: "blur(60px)",
          opacity: 0.5,
        }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.6, marginBottom: 10 }}>
            Agent observation
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16, minHeight: 90, transition: "opacity 0.3s", fontStyle: "italic" }}>
            "{events[activeEvent].insight}"
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <Metric label="Patterns observed" value="1,284" />
            <Metric label="Automatable tasks" value="37" />
            <Metric label="Est. hours reclaimable / wk" value="11.4" accent />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, accent }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontSize: 12, opacity: 0.6 }}>{label}</span>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 15,
        color: accent ? "var(--accent)" : "var(--bg)",
        fontWeight: 500,
      }}>{value}</span>
    </div>
  );
}

// --- Variant 2: "Report" — animated sample report preview ---
function ReportVisual() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p + 1) % 100), 80);
    return () => clearInterval(id);
  }, []);

  const findings = [
    { task: "Weekly sales report compilation", hours: 4.2, conf: 94, status: "automate" },
    { task: "Customer onboarding emails", hours: 3.5, conf: 91, status: "automate" },
    { task: "Inventory reconciliation", hours: 2.8, conf: 87, status: "automate" },
    { task: "Meeting note distribution", hours: 1.9, conf: 82, status: "draft" },
    { task: "Status update collection", hours: 3.1, conf: 78, status: "draft" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, height: "100%" }}>
      <div style={{
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(255,255,255,0.9)",
        borderRadius: 22,
        padding: 28,
        position: "relative",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 4 }}>
              Infrastruct Audit · Q2
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: "-0.02em" }}>
              Operations Team Report
            </div>
          </div>
          <div style={{ padding: "4px 10px", background: "var(--ink)", color: "var(--bg)", borderRadius: 100, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            14 days
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {findings.map((f, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "1fr 80px 100px 90px",
              gap: 14,
              padding: "12px 14px",
              background: "rgba(255,255,255,0.6)",
              borderRadius: 12,
              border: "1px solid var(--line)",
              alignItems: "center",
              fontSize: 13,
            }}>
              <div style={{ fontWeight: 500 }}>{f.task}</div>
              <div style={{ fontFamily: "var(--font-mono)", color: "var(--ink-2)", fontSize: 12 }}>
                {f.hours} hrs/wk
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ flex: 1, height: 4, background: "var(--line)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${f.conf}%`, height: "100%", background: "var(--accent)" }} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>{f.conf}%</span>
              </div>
              <div style={{
                padding: "3px 10px",
                borderRadius: 100,
                background: f.status === "automate" ? "var(--accent)" : "var(--pastel-butter)",
                color: f.status === "automate" ? "#fff" : "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                textAlign: "center",
              }}>
                {f.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: "var(--ink)",
        color: "var(--bg)",
        borderRadius: 22,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.6, marginBottom: 14 }}>
          Total reclaimable
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 72, lineHeight: 0.95, letterSpacing: "-0.035em" }}>
          15.5<span style={{ fontSize: "0.4em", color: "var(--accent)" }}>h</span>
        </div>
        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4, marginBottom: 22 }}>per employee, per week</div>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 14 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: 10 }}>
            Generating recommendations · {progress}%
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.12)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "var(--accent)", transition: "width 0.1s linear" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Variant 3: "Network" — agent mesh diagram ---
function NetworkVisual() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1400);
    return () => clearInterval(id);
  }, []);

  const nodes = [
    { id: "gmail", x: 12, y: 22, label: "Gmail", color: "var(--pastel-peach)" },
    { id: "slack", x: 28, y: 68, label: "Slack", color: "var(--pastel-lilac)" },
    { id: "sheets", x: 18, y: 48, label: "Sheets", color: "var(--pastel-mint)" },
    { id: "figma", x: 32, y: 18, label: "Figma", color: "var(--pastel-sky)" },
    { id: "notion", x: 22, y: 84, label: "Notion", color: "var(--pastel-butter)" },
    { id: "salesforce", x: 40, y: 52, label: "Salesforce", color: "var(--pastel-peach)" },
  ];
  const agents = [
    { id: "triage", x: 70, y: 28, label: "Triage agent" },
    { id: "report", x: 76, y: 54, label: "Reporting agent" },
    { id: "assist", x: 72, y: 80, label: "Assist agent" },
  ];

  return (
    <div style={{ position: "relative", height: "100%", minHeight: 440 }}>
      {/* SVG connections */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="link" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--ink-3)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {nodes.map((n) =>
          agents.map((a, i) => (
            <line
              key={`${n.id}-${a.id}`}
              x1={`${n.x}%`} y1={`${n.y}%`}
              x2={`${a.x}%`} y2={`${a.y}%`}
              stroke="url(#link)"
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity={0.6}
            />
          ))
        )}
        {/* Animated pulse dot traversing */}
        {agents.map((a, i) => {
          const src = nodes[(pulse + i) % nodes.length];
          return (
            <circle key={`pulse-${i}-${pulse}`} r="4" fill="var(--accent)">
              <animate attributeName="cx" from={`${src.x}%`} to={`${a.x}%`} dur="1.2s" fill="freeze" />
              <animate attributeName="cy" from={`${src.y}%`} to={`${a.y}%`} dur="1.2s" fill="freeze" />
              <animate attributeName="opacity" from="1" to="0" dur="1.2s" fill="freeze" />
            </circle>
          );
        })}
        {/* Connector from agents to center output */}
        {agents.map((a) => (
          <line
            key={`out-${a.id}`}
            x1={`${a.x}%`} y1={`${a.y}%`}
            x2="92%" y2="50%"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.5"
          />
        ))}
      </svg>

      {/* Employee label column */}
      <div style={{
        position: "absolute", left: 20, top: 20, bottom: 20,
        width: 180,
        background: "rgba(255,255,255,0.6)",
        border: "1px solid rgba(255,255,255,0.9)",
        borderRadius: 18,
        padding: 18,
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 12 }}>
          Employee stack
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--pastel-lilac))" }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Maria L.</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Operations</div>
          </div>
        </div>
      </div>

      {/* Nodes */}
      {nodes.map((n) => (
        <div key={n.id} style={{
          position: "absolute",
          left: `${n.x}%`, top: `${n.y}%`,
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px 6px 6px",
          background: "#fff",
          borderRadius: 100,
          border: "1px solid var(--line)",
          fontSize: 12,
          fontWeight: 500,
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: n.color }} />
          {n.label}
        </div>
      ))}

      {/* Agents */}
      {agents.map((a) => (
        <div key={a.id} style={{
          position: "absolute",
          left: `${a.x}%`, top: `${a.y}%`,
          transform: "translate(-50%, -50%)",
          padding: "10px 14px",
          background: "var(--ink)",
          color: "var(--bg)",
          borderRadius: 14,
          fontSize: 13,
          fontWeight: 500,
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
        }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.5, marginBottom: 2 }}>Agent</div>
          {a.label}
        </div>
      ))}

      {/* Output card */}
      <div style={{
        position: "absolute",
        right: 20, top: "50%",
        transform: "translateY(-50%)",
        width: 170,
        background: "var(--accent)",
        color: "#fff",
        borderRadius: 18,
        padding: 18,
        boxShadow: "0 20px 40px -15px var(--accent)",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.8, marginBottom: 6 }}>
          Delivered
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.05, letterSpacing: "-0.02em", fontStyle: "italic" }}>
          Automation blueprint
        </div>
      </div>
    </div>
  );
}

function HeroVisual({ variant }) {
  if (variant === "report") return <ReportVisual />;
  if (variant === "network") return <NetworkVisual />;
  if (variant === "watcher") return <WatcherVisual />;
  return <CombinedVisual />;
}

// --- Variant 4: "Combined" — watcher timeline feeding into agent network ---
function CombinedVisual() {
  const [activeEvent, setActiveEventC] = useState(0);
  const [pulse, setPulseC] = useState(0);

  const events = [
    { time: "09:14", app: "Gmail", action: "Replied to 12 tickets", tag: "Repetitive", agentIdx: 0 },
    { time: "10:02", app: "Figma", action: "Exported 24 assets", tag: "Automatable", agentIdx: 2 },
    { time: "11:38", app: "Sheets", action: "Reconciled pipeline", tag: "Automatable", agentIdx: 1 },
    { time: "14:21", app: "Slack", action: "Routed 8 questions", agent: true, agentIdx: 0 },
    { time: "15:47", app: "Notion", action: "Compiled team status", agent: true, agentIdx: 1 },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveEventC((e) => (e + 1) % events.length), 2000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setPulseC((p) => p + 1), 1400);
    return () => clearInterval(id);
  }, []);

  const agents = [
    { id: "triage", y: 18, label: "Triage agent", color: "var(--accent)" },
    { id: "report", y: 50, label: "Reporting agent", color: "var(--accent)" },
    { id: "assist", y: 82, label: "Assist agent", color: "var(--accent)" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,1fr) 200px", gap: 20, height: "100%", minHeight: 460 }}>
      {/* LEFT: Timeline (watcher) */}
      <div style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.8)",
        borderRadius: 22,
        padding: 20,
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-2)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 4px var(--accent-soft)" }} />
            Live shadow
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)" }}>Tue, Apr 21</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--pastel-lilac))" }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Maria L.</div>
            <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Operations</div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
          {events.map((ev, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr auto",
              gap: 10,
              alignItems: "center",
              padding: "8px 10px",
              borderRadius: 10,
              background: i === activeEvent ? "rgba(255,255,255,0.95)" : "transparent",
              border: i === activeEvent ? "1px solid var(--line)" : "1px solid transparent",
              transition: "all 0.4s cubic-bezier(.2,.8,.2,1)",
              opacity: i === activeEvent ? 1 : 0.5,
              fontSize: 12,
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)" }}>{ev.time}</div>
              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                <span style={{ fontWeight: 500 }}>{ev.app}</span>
                <span style={{ color: "var(--ink-2)" }}> · {ev.action}</span>
              </div>
              <div style={{
                padding: "2px 8px",
                borderRadius: 100,
                background: ev.agent ? "var(--accent)" : "var(--pastel-mint)",
                color: ev.agent ? "#fff" : "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                {ev.agent ? "Agent" : ev.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE: Network routing */}
      <div style={{
        background: "rgba(255,255,255,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.7)",
        borderRadius: 22,
        padding: 20,
        position: "relative",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 14 }}>
          Routing
        </div>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
          <defs>
            <linearGradient id="linkC" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--ink-3)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {agents.map((a, i) => {
            const isActive = agents[events[activeEvent].agentIdx].id === a.id;
            return (
              <line
                key={`line-${i}`}
                x1="6%" y1="50%"
                x2="78%" y2={`${a.y}%`}
                stroke={isActive ? "var(--accent)" : "url(#linkC)"}
                strokeWidth={isActive ? "1.6" : "1"}
                strokeDasharray="4 5"
                opacity={isActive ? 1 : 0.4}
              />
            );
          })}
          {/* Animated pulse from timeline-side to active agent */}
          <circle key={`pulse-${pulse}`} r="4" fill="var(--accent)">
            <animate attributeName="cx" from="6%" to="78%" dur="1.3s" fill="freeze" />
            <animate attributeName="cy" from="50%" to={`${agents[events[activeEvent].agentIdx].y}%`} dur="1.3s" fill="freeze" />
            <animate attributeName="opacity" from="1" to="0" dur="1.3s" fill="freeze" />
          </circle>
        </svg>
        {/* Agent nodes on right edge */}
        {agents.map((a, i) => {
          const isActive = agents[events[activeEvent].agentIdx].id === a.id;
          return (
            <div key={a.id} style={{
              position: "absolute",
              right: 10,
              top: `${a.y}%`,
              transform: "translateY(-50%)",
              padding: "8px 12px",
              background: isActive ? "var(--ink)" : "rgba(255,255,255,0.9)",
              color: isActive ? "var(--bg)" : "var(--ink)",
              borderRadius: 12,
              fontSize: 11,
              fontWeight: 500,
              border: isActive ? "1px solid var(--ink)" : "1px solid var(--line)",
              boxShadow: isActive ? "0 10px 24px -10px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.4s",
              whiteSpace: "nowrap",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.55, marginBottom: 2 }}>Agent</div>
              {a.label}
            </div>
          );
        })}
      </div>

      {/* RIGHT: Live metrics panel */}
      <div style={{
        background: "var(--ink)",
        color: "var(--bg)",
        borderRadius: 22,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: -60, right: -60,
          width: 180, height: 180,
          borderRadius: "50%",
          background: "var(--accent)",
          filter: "blur(60px)",
          opacity: 0.5,
        }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.6, marginBottom: 10 }}>
            Reclaimable
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 0.95, letterSpacing: "-0.035em" }}>11.4</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>hrs</span>
          </div>
          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>per person, per week</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <Metric label="Patterns" value="1,284" />
            <Metric label="Automatable" value="37" />
            <Metric label="Agents live" value="3" accent />
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroVisual, WatcherVisual, ReportVisual, NetworkVisual, CombinedVisual });
