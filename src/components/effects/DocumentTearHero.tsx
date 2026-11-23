'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type DocumentTearHeroProps = {
  className?: string;
};

const POINTS = 90;

function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;

    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createTear(seed = 21) {
  const random = seededRandom(seed);

  return Array.from({ length: POINTS }, (_, index) => {
    const x = index / (POINTS - 1);

    const centerDistance = Math.abs(x - 0.5) * 2;

    const base =
      0.69 +
      Math.pow(centerDistance, 1.5) * 0.13;

    const wave =
      Math.sin(x * 13) * 0.012 +
      Math.sin(x * 29) * 0.008 +
      Math.sin(x * 51) * 0.004;

    const noise = (random() - 0.5) * 0.018;

    return {
      x,
      y: Math.min(0.88, base + wave + noise),
    };
  });
}

function buildPath(
  points: { x: number; y: number }[],
  width: number,
  height: number,
) {
  let path = `M 0 0 L ${width} 0 L ${width} ${
    points[points.length - 1].y * height
  }`;

  for (let index = points.length - 1; index >= 0; index--) {
    path += ` L ${points[index].x * width} ${
      points[index].y * height
    }`;
  }

  path += ' Z';

  return path;
}

function buildEdge(
  points: { x: number; y: number }[],
  width: number,
  height: number,
) {
  return points
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L';

      return `${command} ${point.x * width} ${
        point.y * height
      }`;
    })
    .join(' ');
}

export default function DocumentTearHero({
  className = '',
}: DocumentTearHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  const tear = useMemo(() => createTear(27), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const width = 1600;
  const height = 900;

  const paperPath = buildPath(tear, width, height);
  const edgePath = buildEdge(tear, width, height);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* SOFT BACKGROUND GLOW */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_32%,rgba(177,32,37,0.07),transparent_45%)]
        "
      />

      {/* RED PAPER */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        <defs>
          <linearGradient
            id="documentHeroPaper"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#B12025" />
            <stop offset="55%" stopColor="#A31D22" />
            <stop offset="100%" stopColor="#7A1217" />
          </linearGradient>

          <filter
            id="documentHeroShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="160%"
          >
            <feDropShadow
              dx="0"
              dy="20"
              stdDeviation="24"
              floodColor="#17191C"
              floodOpacity="0.13"
            />
          </filter>
        </defs>

        <path
          d={paperPath}
          fill="url(#documentHeroPaper)"
          filter="url(#documentHeroShadow)"
          className={`
            transition-all
            duration-[1400ms]
            ease-out

            ${
              mounted
                ? 'translate-y-0 opacity-100'
                : '-translate-y-[35px] opacity-0'
            }
          `}
        />

        {/* TORN WHITE FIBRE EDGE */}
        <path
          d={edgePath}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
        />

        <path
          d={edgePath}
          fill="none"
          stroke="#F5D9D9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>

      {/* PAPER GRAIN */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-[75%]
          opacity-[0.13]
          mix-blend-soft-light

          [background-image:radial-gradient(rgba(255,255,255,.8)_0.7px,transparent_0.7px)]
          [background-size:5px_5px]
        "
      />

      {/* PUSH PIN */}
      <div
        className={`
          absolute
          left-1/2
          top-[74%]
          z-10
          -translate-x-1/2
          transition-all
          delay-500
          duration-1000

          ${
            mounted
              ? 'translate-y-0 opacity-100'
              : '-translate-y-[80px] opacity-0'
          }
        `}
      >
        {/* PIN SHADOW */}
        <div
          className="
            absolute
            left-1/2
            top-[29px]
            h-[30px]
            w-[60px]
            -translate-x-1/2
            rounded-full
            bg-black/20
            blur-xl
          "
        />

        {/* PIN HEAD */}
        <div
          className="
            relative
            h-[44px]
            w-[44px]
            rounded-full
            border-[5px]
            border-[#8F171C]
            bg-[#D83A3F]
            shadow-[inset_-7px_-8px_13px_rgba(90,0,0,.35),inset_5px_5px_8px_rgba(255,255,255,.35),0_10px_22px_rgba(23,25,28,.22)]
          "
        >
          <span
            className="
              absolute
              left-[8px]
              top-[6px]
              h-[10px]
              w-[10px]
              rounded-full
              bg-white/60
              blur-[1px]
            "
          />
        </div>

        {/* NEEDLE */}
        <div
          className="
            absolute
            left-1/2
            top-[39px]
            h-[55px]
            w-[2px]
            -translate-x-1/2
            bg-gradient-to-b
            from-[#8E949C]
            via-white
            to-[#45494E]
          "
        />
      </div>

      {/* LEFT PAPER FOLD */}
      <div
        className="
          absolute
          bottom-[12%]
          left-[5%]
          h-[65px]
          w-[130px]
          -rotate-[8deg]
          rounded-[50%]
          bg-[#8F171C]/30
          blur-[1px]
          max-sm:hidden
        "
      />

      {/* RIGHT PAPER FOLD */}
      <div
        className="
          absolute
          bottom-[9%]
          right-[7%]
          h-[70px]
          w-[145px]
          rotate-[7deg]
          rounded-[50%]
          bg-[#7A1217]/25
          blur-[1px]
          max-sm:hidden
        "
      />
    </div>
  );
}