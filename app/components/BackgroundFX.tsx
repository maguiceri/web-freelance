"use client";

const STARS = Array.from({ length: 50 }, (_, i) => ({
  left: (i * 53 + 7) % 100,
  top: (i * 31 + 3) % 100,
  size: 1 + ((i * 7) % 3),
  delay: -(((i * 0.4) % 5)).toFixed(2),
  duration: 2 + (i % 4),
}));

const BIG_STARS = [
  { left: 12, top: 18, size: 28, delay: 0, duration: 6 },
  { left: 78, top: 24, size: 36, delay: -2, duration: 7 },
  { left: 32, top: 58, size: 24, delay: -1.5, duration: 5.5 },
  { left: 88, top: 72, size: 30, delay: -3, duration: 6.5 },
  { left: 6, top: 82, size: 26, delay: -0.8, duration: 5.2 },
  { left: 56, top: 14, size: 22, delay: -2.4, duration: 6.8 },
];

const NEBULAE = [
  {
    left: -8,
    top: 12,
    size: 720,
    color: "rgba(30, 64, 175, 0.18)",
    delay: 0,
    duration: 18,
  },
  {
    left: 60,
    top: 45,
    size: 620,
    color: "rgba(67, 56, 202, 0.16)",
    delay: -6,
    duration: 22,
  },
  {
    left: 30,
    top: 80,
    size: 540,
    color: "rgba(29, 78, 216, 0.16)",
    delay: -10,
    duration: 20,
  },
];

const SHOOTING_STARS = [
  { top: 14, delay: 0, duration: 14 },
  { top: 38, delay: -7, duration: 18 },
  { top: 62, delay: -3, duration: 22 },
];

function BrightStar({ size }: { size: number }) {
  return (
    <svg
      viewBox="-30 -30 60 60"
      width={size}
      height={size}
      className="overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="hbar"
          x1="-30"
          y1="0"
          x2="30"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#bae6fd" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e0f2fe" stopOpacity="1" />
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="vbar"
          x1="0"
          y1="-30"
          x2="0"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#bae6fd" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e0f2fe" stopOpacity="1" />
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="halo" cx="0" cy="0" r="8" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="0.5" stopColor="#bae6fd" stopOpacity="0.5" />
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="-30" y="-0.6" width="60" height="1.2" fill="url(#hbar)" />
      <rect x="-0.6" y="-30" width="1.2" height="60" fill="url(#vbar)" />
      <circle cx="0" cy="0" r="8" fill="url(#halo)" />
      <circle cx="0" cy="0" r="1.6" fill="white" />
    </svg>
  );
}

export default function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Deep dark-blue gradient (dominant) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#01040f_0%,#020617_30%,#050a26_60%,#0a163d_100%)]" />

      {/* Subtle nebulae for depth (deep blue / indigo, very dim) */}
      {NEBULAE.map((n, i) => (
        <div
          key={`nebula-${i}`}
          data-fx-nebula
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${n.left}%`,
            top: `${n.top}%`,
            width: `${n.size}px`,
            height: `${n.size}px`,
            background: `radial-gradient(circle at center, ${n.color}, transparent 65%)`,
            animation: `nebulaPulse ${n.duration}s ease-in-out infinite`,
            animationDelay: `${n.delay}s`,
          }}
        />
      ))}

      {/* Tiny twinkling stars across the whole sky */}
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

      {/* Bigger 4-pointed stars that breathe slowly */}
      {BIG_STARS.map((b, i) => (
        <div
          key={`big-${i}`}
          data-fx-bigstar
          className="absolute"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            transformOrigin: "center",
            animation: `starBreathe ${b.duration}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <BrightStar size={b.size} />
        </div>
      ))}

      {/* Shooting stars — quick streaks with long quiet phases */}
      {SHOOTING_STARS.map((sh, i) => (
        <span
          key={`shooting-${i}`}
          data-fx-shooting
          className="absolute block"
          style={{
            top: `${sh.top}%`,
            left: 0,
            width: "180px",
            height: "1.5px",
            background:
              "linear-gradient(90deg, rgba(186,230,253,0) 0%, rgba(186,230,253,0.9) 60%, #ffffff 100%)",
            filter: "drop-shadow(0 0 6px rgba(186,230,253,0.7))",
            opacity: 0,
            animation: `shootingStar ${sh.duration}s ease-in-out infinite`,
            animationDelay: `${sh.delay}s`,
          }}
        />
      ))}

      {/* Top + bottom vignette for readability */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/60 to-transparent" />
    </div>
  );
}
