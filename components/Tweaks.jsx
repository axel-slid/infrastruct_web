const { useState: useStateT, useEffect: useEffectT } = React;

function TweaksPanel({ tweaks, setTweaks }) {
  const [active, setActive] = useStateT(false);

  useEffectT(() => {
    const onMsg = (e) => {
      if (e.data?.type === "__activate_edit_mode") setActive(true);
      if (e.data?.type === "__deactivate_edit_mode") setActive(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
  };

  if (!active) return null;

  const accentSwatches = [
    "#E8845A", // coral
    "#7BA584", // sage
    "#7B94C2", // periwinkle
    "#C57FAD", // rose
    "#D4A04C", // ochre
    "#1A1915", // ink
  ];

  return (
    <div className="tweaks">
      <h4>
        <span>Tweaks</span>
        <span style={{ color: "var(--accent)" }}>●</span>
      </h4>

      <div className="tweak-row">
        <label>Accent</label>
        <div className="tweak-swatches">
          {accentSwatches.map((c) => (
            <div
              key={c}
              className={`tweak-swatch${tweaks.accent === c ? " active" : ""}`}
              style={{ background: c }}
              onClick={() => update({ accent: c })}
            />
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Theme</label>
        <div className="tweak-seg">
          <button className={tweaks.theme === "light" ? "active" : ""} onClick={() => update({ theme: "light" })}>Light</button>
          <button className={tweaks.theme === "dark" ? "active" : ""} onClick={() => update({ theme: "dark" })}>Dark</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Density</label>
        <div className="tweak-seg">
          <button className={tweaks.density === "airy" ? "active" : ""} onClick={() => update({ density: "airy" })}>Airy</button>
          <button className={tweaks.density === "compact" ? "active" : ""} onClick={() => update({ density: "compact" })}>Compact</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Hero visual</label>
        <div className="tweak-seg">
          <button className={tweaks.heroVisual === "combined" ? "active" : ""} onClick={() => update({ heroVisual: "combined" })}>Combined</button>
          <button className={tweaks.heroVisual === "watcher" ? "active" : ""} onClick={() => update({ heroVisual: "watcher" })}>Watcher</button>
          <button className={tweaks.heroVisual === "network" ? "active" : ""} onClick={() => update({ heroVisual: "network" })}>Network</button>
          <button className={tweaks.heroVisual === "report" ? "active" : ""} onClick={() => update({ heroVisual: "report" })}>Report</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Font pairing</label>
        <div className="tweak-seg">
          <button className={tweaks.fontPair === "instrument_geist" ? "active" : ""} onClick={() => update({ fontPair: "instrument_geist" })}>Instrument</button>
          <button className={tweaks.fontPair === "fraunces_space" ? "active" : ""} onClick={() => update({ fontPair: "fraunces_space" })}>Fraunces</button>
          <button className={tweaks.fontPair === "geist_only" ? "active" : ""} onClick={() => update({ fontPair: "geist_only" })}>Sans-only</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Headline</label>
        <input
          type="text"
          value={tweaks.headline}
          onChange={(e) => update({ headline: e.target.value })}
        />
      </div>
    </div>
  );
}

Object.assign(window, { TweaksPanel });
