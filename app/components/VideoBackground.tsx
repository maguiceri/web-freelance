"use client";

export default function VideoBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Fallback gradient — always visible behind the video */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#01030a_0%,#020617_45%,#040a1c_100%)]" />

      {/* Looping video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      >
        <source src="/14134130_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Blue color-grading overlay (replaces mix-blend-color + mix-blend-multiply) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,61,0.55)_0%,rgba(10,26,74,0.45)_50%,rgba(10,18,48,0.55)_100%)]" />

      {/* Subtle blue glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.20),transparent_55%),radial-gradient(circle_at_85%_85%,rgba(56,189,248,0.16),transparent_55%)]" />

      {/* Final readability overlay */}
      <div className="absolute inset-0 bg-slate-950/25" />

      {/* Top + bottom vignettes */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />
    </div>
  );
}
