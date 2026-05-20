"use client";

/**
 * Animated neural network background.
 * - 4 layers of nodes (input → 2 hidden → output)
 * - Lines connecting every node between adjacent layers
 * - A subset of edges has flowing dashes (data flow effect)
 * - Each node pulses with its own delay
 * - A hub node in each layer has an extra "thought" aura
 */

const VIEW_W = 1600;
const VIEW_H = 900;

const LAYER_X = [200, 600, 1000, 1400];
const LAYER_COUNTS = [4, 7, 7, 4];

type Node = {
  id: string;
  layer: number;
  index: number;
  x: number;
  y: number;
  r: number;
  delay: number;
  hub: boolean;
};

const NODES: Node[] = LAYER_X.flatMap((x, layerIdx) => {
  const count = LAYER_COUNTS[layerIdx];
  return Array.from({ length: count }, (_, i) => {
    const yBase = 110 + ((i + 0.5) / count) * (VIEW_H - 220);
    const yOffset = (((layerIdx * 17 + i * 23) % 11) - 5) * 5;
    return {
      id: `n-${layerIdx}-${i}`,
      layer: layerIdx,
      index: i,
      x,
      y: yBase + yOffset,
      r: 6 + ((layerIdx + i) % 3),
      delay: -(((layerIdx * 3 + i) * 0.27) % 4),
      hub: i === Math.floor(count / 2),
    };
  });
});

type Edge = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  duration: number;
  bright: boolean;
};

const EDGES: Edge[] = (() => {
  const list: Edge[] = [];
  for (let l = 0; l < LAYER_X.length - 1; l++) {
    const from = NODES.filter((n) => n.layer === l);
    const to = NODES.filter((n) => n.layer === l + 1);
    from.forEach((f, fi) => {
      to.forEach((t, ti) => {
        const idx = fi * 100 + ti + l * 7;
        list.push({
          id: `e-${l}-${fi}-${ti}`,
          x1: f.x,
          y1: f.y,
          x2: t.x,
          y2: t.y,
          delay: -((idx * 0.4) % 6),
          duration: 3 + ((idx + l) % 3),
          bright: idx % 4 === 0,
        });
      });
    });
  }
  return list;
})();

const STARS = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 53 + 7) % 100,
  top: (i * 31 + 3) % 100,
  size: 1 + ((i * 7) % 2),
  delay: -(((i * 0.4) % 5)).toFixed(2),
  duration: 2 + (i % 4),
}));

export default function NeuralBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient (very dark, electric blue) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#01030a_0%,#020617_45%,#040a1c_100%)]" />

      {/* Soft glow blobs to add depth */}
      <div className="absolute -top-40 left-[-12%] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.20),transparent_60%)] blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-12%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_60%)] blur-3xl" />
      <div className="absolute top-[35%] left-[40%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),transparent_60%)] blur-3xl" />

      {/* Subtle grid for tech feel */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(186,230,253,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(186,230,253,0.7)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Faint stars for texture */}
      {STARS.map((s, i) => (
        <span
          key={`star-${i}`}
          data-fx-star
          className="absolute rounded-full bg-sky-100"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0,
            animation: `twinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 6px rgba(186,230,253,0.85)",
          }}
        />
      ))}

      {/* Neural network */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="1" />
            <stop offset="35%" stopColor="#60a5fa" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#1d4ed8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hubAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="brightEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Static dim edges */}
        <g>
          {EDGES.map((e) => (
            <line
              key={e.id}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="rgba(96,165,250,0.18)"
              strokeWidth={1}
            />
          ))}
        </g>

        {/* Bright edges with flowing dashes (data flow) */}
        <g>
          {EDGES.filter((e) => e.bright).map((e) => (
            <line
              key={`flow-${e.id}`}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="rgba(147,197,253,0.85)"
              strokeWidth={1.6}
              strokeDasharray="6 14"
              strokeLinecap="round"
              className="fxEdgeFlow"
              style={{
                animationDuration: `${e.duration}s`,
                animationDelay: `${e.delay}s`,
              }}
            />
          ))}
        </g>

        {/* Hub node auras (extra "thinking" pulse) */}
        <g>
          {NODES.filter((n) => n.hub).map((n) => (
            <circle
              key={`aura-${n.id}`}
              cx={n.x}
              cy={n.y}
              r={n.r * 4}
              fill="url(#hubAura)"
              className="fxNodeAura"
              style={{ animationDelay: `${n.delay}s` }}
            />
          ))}
        </g>

        {/* Nodes (halo + bright core) */}
        <g>
          {NODES.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r * 2.4}
                fill="url(#nodeGlow)"
                className="fxNode"
                style={{ animationDelay: `${n.delay}s` }}
              />
              <circle cx={n.x} cy={n.y} r={n.r * 0.55} fill="#e0f2fe" />
            </g>
          ))}
        </g>
      </svg>

      {/* Vignettes */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />
    </div>
  );
}
