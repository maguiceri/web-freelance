"use client";
import { useEffect, useRef } from "react";

interface NNode {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
}

interface Pulse {
  from: number; to: number;
  t: number; speed: number;
}

const N        = 90;
const SPREAD   = 1080;
const SPREAD_Y = 780;
const CONNECT  = 400; // 3D distance threshold
const FOV      = 740;
const ROT_Y    = 0.00085;

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cssW = window.innerWidth;
    let cssH = window.innerHeight;

    const resize = () => {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas.width  = cssW * dpr;
      canvas.height = cssH * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const nodes: NNode[] = Array.from({ length: N }, () => ({
      x:  (Math.random() - 0.5) * SPREAD,
      y:  (Math.random() - 0.5) * SPREAD_Y,
      z:  (Math.random() - 0.5) * SPREAD,
      vx: (Math.random() - 0.5) * 1.1,
      vy: (Math.random() - 0.5) * 0.9,
      vz: (Math.random() - 0.5) * 1.1,
    }));

    const pulses: Pulse[] = [];
    let lastPulse = 0;
    let angleY    = 0;
    let raf: number;

    const draw = (ts: number) => {
      if (document.hidden) { raf = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, cssW, cssH);

      angleY += ROT_Y;
      const aX   = Math.sin(angleY * 0.45) * 0.28;
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(aX),    sinX = Math.sin(aX);

      // drift
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy; n.z += n.vz;
        if (Math.abs(n.x) > SPREAD   / 2) n.vx *= -1;
        if (Math.abs(n.y) > SPREAD_Y / 2) n.vy *= -1;
        if (Math.abs(n.z) > SPREAD   / 2) n.vz *= -1;
      }

      // rotate → project
      const proj = nodes.map(n => {
        const rx  = n.x * cosY - n.z * sinY;
        const rz  = n.x * sinY + n.z * cosY;
        const ry  = n.y * cosX - rz  * sinX;
        const rz2 = n.y * sinX + rz  * cosX;
        const s   = FOV / (FOV + rz2 + SPREAD / 2);
        return { sx: rx * s + cssW / 2, sy: ry * s + cssH / 2, scale: s, rz: rz2 };
      });

      // edges (3D distance for stable topology)
      const edges: [number, number, number][] = [];
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const d  = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < CONNECT) edges.push([i, j, d]);
        }
      }

      // spawn pulse every ~450 ms
      if (ts - lastPulse > 160 && edges.length) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ from: e[0], to: e[1], t: 0, speed: 0.018 + Math.random() * 0.014 });
        lastPulse = ts;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed;
        if (pulses[i].t >= 1) pulses.splice(i, 1);
      }

      // draw edges
      for (const [i, j, d] of edges) {
        const pi = proj[i], pj = proj[j];
        const fade = (1 - d / CONNECT) * ((pi.scale + pj.scale) / 2);
        ctx.beginPath();
        ctx.moveTo(pi.sx, pi.sy);
        ctx.lineTo(pj.sx, pj.sy);
        ctx.strokeStyle = `rgba(45,212,191,${fade * 0.36})`;
        ctx.lineWidth   = 0.65 * (pi.scale + pj.scale) / 2;
        ctx.stroke();
      }

      // draw pulses (glowing dot traveling along edge)
      for (const p of pulses) {
        const pi = proj[p.from], pj = proj[p.to];
        const px = pi.sx + (pj.sx - pi.sx) * p.t;
        const py = pi.sy + (pj.sy - pi.sy) * p.t;
        const sc = (pi.scale + pj.scale) / 2;
        const g  = ctx.createRadialGradient(px, py, 0, px, py, 7 * sc);
        g.addColorStop(0,    "rgba(167,243,208,0.95)");
        g.addColorStop(0.35, "rgba(45,212,191,0.55)");
        g.addColorStop(1,    "rgba(45,212,191,0)");
        ctx.beginPath();
        ctx.arc(px, py, 7 * sc, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // draw nodes back → front
      proj
        .map((p, i) => ({ ...p, i }))
        .sort((a, b) => b.rz - a.rz)
        .forEach(({ sx, sy, scale }) => {
          const r = Math.max(0.8, 2.2 * scale);
          // soft glow
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 4.5);
          grd.addColorStop(0, `rgba(45,212,191,${0.60 * scale})`);
          grd.addColorStop(1, "rgba(45,212,191,0)");
          ctx.beginPath();
          ctx.arc(sx, sy, r * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
          // core dot
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167,243,208,${Math.min(1, 0.85 * scale + 0.3)})`;
          ctx.fill();
        });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
