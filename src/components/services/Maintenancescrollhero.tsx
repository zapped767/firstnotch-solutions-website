"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const RED = "#B12025";

const ONLINE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1778146476147-5f8d4bd03c79?auto=format&fit=crop&w=1800&q=82",
    alt: "Developer maintaining a modern website",
  },
  {
    src: "https://images.unsplash.com/photo-1782094673136-5198a372980c?auto=format&fit=crop&w=1800&q=82",
    alt: "Modern data centre infrastructure",
  },
  {
    src: "https://images.unsplash.com/photo-1667264501379-c1537934c7ab?auto=format&fit=crop&w=1800&q=82",
    alt: "Technical network and infrastructure connections",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=82",
    alt: "Website performance analytics dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1800&q=82",
    alt: "Software source code used for website maintenance",
  },
] as const;

function OnlineScene({ index }: { index: number }) {
  const image = ONLINE_IMAGES[index];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#17191C]">
      <img
        src={image.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="eager"
        decoding="async"
        className="h-full w-full select-none object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#17191C]/10 via-transparent to-[#B12025]/28"
      />

      <span className="sr-only">{image.alt}</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   Maintenance "images" — five illustrated scenes drawn in SVG.
   No external URLs, so nothing can break, and they stay crisp at
   every size (full-bleed background, 240px tile, 64px inline icon).
------------------------------------------------------------------- */

const FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function SceneUpdates() {
  const widths = [150, 120, 170, 110];
  return (
    <Svg>
      <defs>
        <linearGradient id="mh-s0" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A2D33" />
          <stop offset="1" stopColor="#0F1113" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#mh-s0)" />
      <circle cx="350" cy="40" r="150" fill={RED} opacity=".22" />
      <rect x="36" y="56" width="328" height="270" rx="20" fill="#16181B" stroke="#fff" strokeOpacity=".1" />
      <circle cx="62" cy="82" r="5" fill={RED} />
      <circle cx="80" cy="82" r="5" fill="#fff" opacity=".25" />
      <circle cx="98" cy="82" r="5" fill="#fff" opacity=".25" />
      <line x1="36" y1="104" x2="364" y2="104" stroke="#fff" strokeOpacity=".08" />
      {widths.map((w, i) => (
        <g key={i} transform={`translate(62 ${120 + i * 44})`}>
          {i < 3 ? (
            <>
              <circle cx="12" cy="14" r="12" fill={RED} />
              <path d="M6.5 14.5l4 4 7.5-8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <>
              <circle cx="12" cy="14" r="11" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="5 4" />
              <circle cx="12" cy="14" r="3.5" fill={RED} />
            </>
          )}
          <rect x="38" y="6" width={w} height="9" rx="4.5" fill="#fff" opacity=".7" />
          <rect x="38" y="21" width="84" height="5" rx="2.5" fill="#fff" opacity=".2" />
          <rect x="228" y="4" width="48" height="22" rx="11" fill={RED} opacity={i < 3 ? 0.3 : 0.95} />
        </g>
      ))}
      <rect x="62" y="296" width="276" height="6" rx="3" fill="#fff" opacity=".1" />
      <rect x="62" y="296" width="206" height="6" rx="3" fill={RED} />
      <text x="36" y="366" fill="#fff" fillOpacity=".7" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily={FONT}>
        PLUGIN UPDATES
      </text>
    </Svg>
  );
}

function SceneSecurity() {
  return (
    <Svg>
      <defs>
        <linearGradient id="mh-s1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CC2A31" />
          <stop offset="1" stopColor="#6A0E12" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#mh-s1)" />
      <circle cx="70" cy="350" r="150" fill="#fff" opacity=".07" />
      <circle cx="200" cy="190" r="158" fill="none" stroke="#fff" strokeOpacity=".12" />
      <circle cx="200" cy="190" r="122" fill="none" stroke="#fff" strokeOpacity=".2" strokeDasharray="3 7" />
      <path
        d="M200 74L300 109V194C300 254 257 298 200 325C143 298 100 254 100 194V109Z"
        fill="#fff"
        fillOpacity=".13"
        stroke="#fff"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M153 198l33 33 62-71" fill="none" stroke="#fff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="290" y="46" width="82" height="30" rx="15" fill="#fff" />
      <text x="331" y="66" textAnchor="middle" fill={RED} fontSize="12" fontWeight="800" fontFamily={FONT}>
        SCAN CLEAR
      </text>
      <rect x="28" y="284" width="86" height="30" rx="15" fill="#fff" fillOpacity=".16" stroke="#fff" strokeOpacity=".5" />
      <text x="71" y="304" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800" fontFamily={FONT}>
        PATCHED
      </text>
      <text x="28" y="366" fill="#fff" fillOpacity=".8" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily={FONT}>
        SECURITY PATCHES
      </text>
    </Svg>
  );
}

function SceneBackups() {
  return (
    <Svg>
      <defs>
        <linearGradient id="mh-s2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24272C" />
          <stop offset="1" stopColor="#111315" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#mh-s2)" />
      <circle cx="40" cy="380" r="170" fill={RED} opacity=".2" />
      {[2, 1, 0].map((i) => {
        const y = 150 + i * 58;
        return (
          <g key={i}>
            <path d={`M110 ${y} v34 a90 24 0 0 0 180 0 v-34`} fill="#262A30" stroke="#fff" strokeOpacity=".1" />
            <ellipse cx="200" cy={y} rx="90" ry="24" fill="#32373E" stroke="#fff" strokeOpacity=".14" />
            <circle cx="132" cy={y + 30} r="4.5" fill={RED} />
            <rect x="148" y={y + 27} width="62" height="6" rx="3" fill="#fff" opacity=".28" />
            <rect x="222" y={y + 27} width="40" height="6" rx="3" fill="#fff" opacity=".14" />
          </g>
        );
      })}
      <circle cx="304" cy="96" r="38" fill={RED} />
      <path d="M290 98a15 15 0 1 0 5-11" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M287 79v13h13" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="36" y="84" fill="#fff" fillOpacity=".9" fontSize="30" fontWeight="700" fontFamily={FONT}>
        Restore
      </text>
      <text x="36" y="108" fill="#fff" fillOpacity=".5" fontSize="14" fontFamily={FONT}>
        point verified
      </text>
      <text x="36" y="372" fill="#fff" fillOpacity=".7" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily={FONT}>
        VERIFIED BACKUPS
      </text>
    </Svg>
  );
}

function SceneUptime() {
  return (
    <Svg>
      <defs>
        <linearGradient id="mh-s3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFE9E9" />
        </linearGradient>
        <linearGradient id="mh-s3a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={RED} stopOpacity=".28" />
          <stop offset="1" stopColor={RED} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#mh-s3)" />
      {[210, 250, 290, 330].map((y) => (
        <line key={y} x1="28" y1={y} x2="372" y2={y} stroke="#17191C" strokeOpacity=".07" />
      ))}
      <text x="28" y="86" fill="#17191C" fillOpacity=".5" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily={FONT}>
        UPTIME
      </text>
      <text x="26" y="156" fill={RED} fontSize="74" fontWeight="700" letterSpacing="-3" fontFamily={FONT}>
        99.9%
      </text>
      <rect x="284" y="64" width="88" height="28" rx="14" fill="#17191C" />
      <circle cx="302" cy="78" r="4.5" fill="#3DDC97" />
      <text x="314" y="82" fill="#fff" fontSize="11" fontWeight="700" letterSpacing="1" fontFamily={FONT}>
        ONLINE
      </text>
      <polygon points="28,330 28,292 80,276 132,286 184,246 236,258 288,214 340,222 372,180 372,330" fill="url(#mh-s3a)" />
      <polyline
        points="28,292 80,276 132,286 184,246 236,258 288,214 340,222 372,180"
        fill="none"
        stroke={RED}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="372" cy="180" r="12" fill={RED} opacity=".2" />
      <circle cx="372" cy="180" r="6" fill={RED} />
      <text x="28" y="366" fill="#17191C" fillOpacity=".55" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily={FONT}>
        24/7 MONITORING
      </text>
    </Svg>
  );
}

function SceneReport() {
  return (
    <Svg>
      <defs>
        <linearGradient id="mh-s4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B12025" />
          <stop offset="1" stopColor="#17191C" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#mh-s4)" />
      <circle cx="360" cy="60" r="130" fill="#fff" opacity=".07" />
      <path d="M86 250A114 114 0 0 1 314 250" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="20" strokeLinecap="round" />
      <path d="M86 250A114 114 0 0 1 294 185" fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round" />
      <text x="200" y="246" textAnchor="middle" fill="#fff" fontSize="70" fontWeight="700" letterSpacing="-3" fontFamily={FONT}>
        98
      </text>
      <text x="200" y="272" textAnchor="middle" fill="#fff" fillOpacity=".7" fontSize="12" fontWeight="700" letterSpacing="3" fontFamily={FONT}>
        PAGE SPEED
      </text>
      <rect x="56" y="298" width="288" height="42" rx="12" fill="#fff" fillOpacity=".12" stroke="#fff" strokeOpacity=".25" />
      <circle cx="80" cy="319" r="9" fill="#fff" />
      <path d="M75.5 319.5l3 3 6-6.5" fill="none" stroke={RED} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="100" y="311" width="130" height="7" rx="3.5" fill="#fff" opacity=".8" />
      <rect x="100" y="324" width="80" height="5" rx="2.5" fill="#fff" opacity=".35" />
      <text x="56" y="376" fill="#fff" fillOpacity=".75" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily={FONT}>
        MONTHLY REPORT
      </text>
    </Svg>
  );
}

const SVG_SCENES = [
  SceneUpdates,
  SceneSecurity,
  SceneBackups,
  SceneUptime,
  SceneReport,
];

const SCENES = ONLINE_IMAGES.map(
  (_, index) =>
    function MaintenanceOnlineScene() {
      return <OnlineScene index={index} />;
    },
);

/* ------------------------------------------------------------------
   Headline that assembles during the scroll. Each `icon` index is a
   slot where the matching scene tile lands.
------------------------------------------------------------------- */

const HEADLINE: { text: string; icon?: number; accent?: boolean }[] = [
  { text: "Planned updates", icon: 0 },
  { text: "and security patches", icon: 1, accent: true },
  { text: "keep backups verified", icon: 2 },
  { text: "and uptime watched,", icon: 3, accent: true },
  { text: "so your site stays fast", icon: 4 },
  { text: "and online, every month." },
];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function RisingWords({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(/\s+/).map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          {index > 0 ? " " : null}
          <span className="inline-block overflow-hidden align-bottom">
            <span data-maint-hero-word className="inline-block">
              {word}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

interface Props {
  onSeeIncluded?: () => void;
}

export default function MaintenanceScrollHero({ onSeeIncluded }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const placeholderRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const segRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [active, setActive] = useState(0);

  // Preload every online hero image before the scroll sequence needs it.
  useEffect(() => {
    let cancelled = false;

    const loaders = ONLINE_IMAGES.map(
      (image) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();

          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = image.src;
        }),
    );

    Promise.all(loaders).then(() => {
      if (!cancelled) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Background slideshow
  useEffect(() => {
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % SCENES.length),
      4800,
    );
    return () => window.clearInterval(id);
  }, []);

  // Pinned scroll animation
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const row = rowRef.current;
    if (!section || !header || !row) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiles = tileRefs.current.filter((x): x is HTMLDivElement => !!x);
    const flies = flyRefs.current.filter((x): x is HTMLDivElement => !!x);
    const holes = placeholderRefs.current.filter((x): x is HTMLSpanElement => !!x);
    const segs = segRefs.current.filter((x): x is HTMLSpanElement => !!x);
    if (!tiles.length || tiles.length !== holes.length) return;

    // random reveal order for the headline pieces
    const order = segs.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    const easeIO = gsap.parseEase("power2.inOut");

    const m = {
      W: 0,
      H: 0,
      cx0: 0,
      cy0: 0,
      S: 1,
      size: 60,
      base: [] as { x: number; y: number }[],
      target: [] as { x: number; y: number }[],
    };

    // Measure everything relative to the section, with transforms cleared.
    const measure = () => {
      gsap.set(row, { x: 0, y: 0, scale: 1, opacity: 1 });
      tiles.forEach((t) => gsap.set(t, { x: 0, y: 0 }));

      const s = section.getBoundingClientRect();
      const r = row.getBoundingClientRect();
      m.W = s.width;
      m.H = s.height;
      m.cx0 = r.left - s.left + r.width / 2;
      m.cy0 = r.top - s.top + r.height / 2;

      m.base = tiles.map((t) => {
        const q = t.getBoundingClientRect();
        return { x: q.left - s.left + q.width / 2, y: q.top - s.top + q.height / 2 };
      });

      const tileSize = tiles[0].getBoundingClientRect().width || 1;
      m.size = holes[0].getBoundingClientRect().width || 60;
      m.S = m.size / tileSize;

      m.target = holes.map((h) => {
        const q = h.getBoundingClientRect();
        return { x: q.left - s.left + q.width / 2, y: q.top - s.top + q.height / 2 };
      });

      flies.forEach((f) => gsap.set(f, { width: m.size, height: m.size }));
    };

    const render = (p: number) => {
      const { W, H, cx0, cy0, S, size } = m;

      // 1) intro copy + slideshow fade out
      const hp = clamp01(p / 0.15);
      gsap.set(header, {
        y: -60 * hp,
        opacity: 1 - hp,
        pointerEvents: hp < 0.4 ? "auto" : "none",
      });

      // 2) tile row: rises (0–0.3), then scales to centre (0.3–0.6)
      const p1 = clamp01(p / 0.3);
      const p2 = clamp01((p - 0.3) / 0.3);
      const rise = -H * 0.3 * p1;
      const centerX = cx0 + (W / 2 - cx0) * p2;
      const centerY = cy0 + rise + (H / 2 - (cy0 - H * 0.3)) * p2;

      gsap.set(row, {
        x: centerX - cx0,
        y: centerY - cy0,
        scale: 1 + (S - 1) * p2,
        opacity: p < 0.6 ? 1 : 0,
        force3D: true,
      });

      tiles.forEach((t, i) => {
        const stagger = i * 0.1;
        const k = clamp01(gsap.utils.mapRange(stagger, stagger + 0.5, 0, 1, p1));
        gsap.set(t, {
          x: 0,
          y: -rise * (1 - k),
          force3D: true,
        });
      });

      // 3) flying copies travel into the headline slots (0.6–0.75)
      const q = clamp01((p - 0.6) / 0.15);
      flies.forEach((f, i) => {
        if (p < 0.6) {
          gsap.set(f, { opacity: 0 });
          return;
        }
        const sx = W / 2 + (m.base[i].x - cx0) * S;
        const sy = H / 2 + (m.base[i].y - cy0) * S;
        const dx = m.target[i].x - sx;
        const dy = m.target[i].y - sy;
        const yy = q < 0.5 ? dy * easeIO(q / 0.5) : dy;
        const xx = q < 0.5 ? 0 : dx * easeIO((q - 0.5) / 0.5);
        gsap.set(f, {
          x: sx + xx - size / 2,
          y: sy + yy - size / 2,
          opacity: 1,
          force3D: true,
        });
      });

      // 4) headline words appear in random order (0.75–0.95)
      order.forEach((segIndex, k) => {
        const start = 0.77 + k * 0.032;
        const o =
          p < 0.75 ? 0 : clamp01(gsap.utils.mapRange(start, start + 0.02, 0, 1, p));
        gsap.set(segs[segIndex], { opacity: o });
      });
    };

    const proxy = { p: 0 };

    measure();
    render(0);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * 4.8}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        measure();
        proxy.p = self.progress;
        render(proxy.p);
      },
      onUpdate: (self) => {
        // light smoothing so the motion feels weighted, not twitchy
        gsap.to(proxy, {
          p: self.progress,
          duration: 0.42,
ease: "power2.out",
          overwrite: true,
          onUpdate: () => render(proxy.p),
        });
      },
    });

    // fonts change text layout → re-measure the headline slots
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      gsap.killTweensOf(proxy);
      st.kill();
    };
  }, []);

  const handleSeeIncluded = () => {
    if (onSeeIncluded) return onSeeIncluded();
    document
      .getElementById("maintenance-included")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="maintenance-title"
      className="relative w-full overflow-hidden bg-[#FAFAFA] text-[#17191C]"
      style={{ height: "100svh" }}
    >
      {/* INTRO LAYER: slideshow + first-screen copy (fades out on scroll) */}
      <div
        ref={headerRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <div aria-hidden="true" className="absolute inset-0">
          {SCENES.map((Scene, i) => (
            <div
              key={i}
              className="absolute inset-0 will-change-[opacity,transform] transition-[opacity,transform] duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                opacity: active === i ? 0.64 : 0,
                transform: active === i ? "scale(1.045)" : "scale(1.085)",
              }}
            >
              <Scene />
            </div>
          ))}

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(250,250,250,.86) 0%, rgba(250,250,250,.68) 44%, rgba(250,250,250,.96) 100%)",
            }}
          />
          
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-[150px] pt-[100px] text-center sm:px-8 sm:pb-[250px] lg:pb-[290px]">
          <p
            data-maint-eyebrow
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B12025] sm:text-[11px]"
          >
            Website maintenance services in Sri Lanka
          </p>

          <h1
            id="maintenance-title"
            className="mx-auto mt-5 max-w-[1200px] text-[clamp(2.4rem,7.4vw,6.2rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[#B12025] sm:mt-7"
          >
            <RisingWords text="Your Website Kept Secure and Online." />
          </h1>

          <p
            data-maint-hero-copy
            className="mx-auto mt-4 max-w-[900px] text-[clamp(1.15rem,3vw,2.2rem)] font-semibold leading-[1.15] tracking-[-0.04em] text-[#B12025]"
          >
            With a short report each month.
          </p>

          <p
            data-maint-hero-copy
            className="mx-auto mt-6 hidden max-w-[640px] text-[14px] leading-[1.85] text-[#17191C]/62 sm:block"
          >
            Website software goes out of date, updates can fail, security
            notices appear and small changes build up. FirstNotch handles the
            routine maintenance so your team does not have to keep chasing it.
          </p>

          <div
            data-maint-hero-copy
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#contact"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white transition hover:bg-[#981A1F]"
            >
              Book a free discovery call
              <ArrowUpRight size={16} />
            </a>

            <button
              type="button"
              onClick={handleSeeIncluded}
              className="inline-flex min-h-[50px] items-center gap-2 rounded-full border border-[#B12025]/20 bg-white px-6 text-[12px] font-semibold text-[#B12025] transition hover:border-[#B12025]"
            >
              See what is included
              <ArrowDown data-maint-down size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* HEADLINE THAT ASSEMBLES ON SCROLL */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center px-5">
        <h2 className="max-w-[90vw] text-center text-[clamp(1.5rem,4.6vw,4.4rem)] font-semibold leading-[1.28] tracking-[-0.05em] text-[#17191C] md:max-w-[85vw] md:leading-[1.2]">
          {HEADLINE.map((seg, i) => (
            <React.Fragment key={i}>
              <span
                ref={(el) => {
                  segRefs.current[i] = el;
                }}
                className="opacity-0"
                style={seg.accent ? { color: RED } : undefined}
              >
                {seg.text}
              </span>
              {seg.icon !== undefined && (
                <span
                  ref={(el) => {
                    placeholderRefs.current[seg.icon as number] = el;
                  }}
                  aria-hidden="true"
                  className="invisible mx-1.5 inline-block h-8 w-8 align-middle md:h-16 md:w-16"
                />
              )}{" "}
            </React.Fragment>
          ))}
        </h2>
      </div>

      {/* TILE ROW (starts at the bottom, rises and shrinks) */}
      <div
        ref={rowRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 z-20 mx-auto flex w-[90%] items-center gap-2 will-change-transform md:w-[62%] md:gap-3"
      >
        {SCENES.map((Scene, i) => (
          <div
            key={i}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className="aspect-square flex-1 overflow-hidden rounded-[12px] border border-white/35 shadow-[0_18px_45px_rgba(23,25,28,0.20)] will-change-transform [backface-visibility:hidden]"
          >
            <Scene />
          </div>
        ))}
      </div>

      {/* FLYING COPIES (land inside the headline) */}
      {SCENES.map((Scene, i) => (
        <div
          key={i}
          ref={(el) => {
            flyRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-30 overflow-hidden rounded-[10px] border border-white/30 opacity-0 shadow-[0_10px_26px_rgba(23,25,28,0.16)] will-change-transform [backface-visibility:hidden]"
        >
          <Scene />
        </div>
      ))}
    </section>
  );
}
