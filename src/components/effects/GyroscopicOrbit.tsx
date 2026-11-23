"use client";

export default function GyroscopicOrbit() {
  const rings = [
    { rx: 335, ry: 285, opacity: 0.10, width: 2 },
    { rx: 320, ry: 272, opacity: 0.16, width: 2 },
    { rx: 305, ry: 258, opacity: 0.24, width: 2 },
    { rx: 289, ry: 244, opacity: 0.32, width: 2 },
    { rx: 272, ry: 230, opacity: 0.42, width: 2.2 },
    { rx: 255, ry: 215, opacity: 0.55, width: 2.2 },
    { rx: 237, ry: 200, opacity: 0.68, width: 2.3 },
    { rx: 219, ry: 184, opacity: 0.82, width: 2.4 },
    { rx: 201, ry: 168, opacity: 0.95, width: 2.5 },
    { rx: 182, ry: 152, opacity: 0.78, width: 2.3 },
    { rx: 163, ry: 136, opacity: 0.56, width: 2.1 },
    { rx: 144, ry: 120, opacity: 0.34, width: 2 },
  ];

  const dots = Array.from({ length: 17 * 19 });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* =====================================================
          MAIN LARGE RIGHT-SIDE RING SYSTEM
      ====================================================== */}
      <div className="fn-reference-orbit absolute right-[-245px] top-[-150px] h-[720px] w-[850px] max-sm:right-[-250px] max-sm:top-[-80px] max-sm:h-[470px] max-sm:w-[570px]">
        <svg
          viewBox="0 0 850 720"
          className="h-full w-full overflow-visible"
          fill="none"
        >
          <defs>
            {/* Fade rings on left side like reference */}
            <linearGradient
              id="fnRingFade"
              x1="70"
              y1="360"
              x2="760"
              y2="360"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#B12025" stopOpacity="0" />
              <stop offset="26%" stopColor="#B12025" stopOpacity="0.08" />
              <stop offset="55%" stopColor="#B12025" stopOpacity="0.75" />
              <stop offset="78%" stopColor="#B12025" stopOpacity="1" />
              <stop offset="100%" stopColor="#B12025" stopOpacity="0.3" />
            </linearGradient>

            <filter
              id="fnSoftGlow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="0.7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g
            className="fn-ring-group"
            transform="translate(425 350)"
            filter="url(#fnSoftGlow)"
          >
            {rings.map((ring, index) => (
              <ellipse
                key={index}
                cx="0"
                cy="0"
                rx={ring.rx}
                ry={ring.ry}
                stroke="url(#fnRingFade)"
                strokeWidth={ring.width}
                opacity={ring.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* Additional sweeping offset rings */}
          <g
            className="fn-ring-secondary"
            transform="translate(500 335) rotate(-9)"
            opacity="0.22"
          >
            <ellipse
              cx="0"
              cy="0"
              rx="350"
              ry="260"
              stroke="#B12025"
              strokeWidth="2"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="328"
              ry="244"
              stroke="#B12025"
              strokeWidth="2"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="305"
              ry="228"
              stroke="#B12025"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      {/* =====================================================
          LEFT / MIDDLE FAINT SWEEP
      ====================================================== */}
      <div className="fn-reference-orbit-reverse absolute right-[180px] top-[-170px] h-[670px] w-[720px] opacity-[0.16] max-sm:hidden">
        <svg
          viewBox="0 0 720 670"
          className="h-full w-full"
          fill="none"
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <ellipse
              key={index}
              cx="360"
              cy="330"
              rx={280 - index * 17}
              ry={245 - index * 15}
              stroke="#B12025"
              strokeWidth="2"
              opacity={0.14 + index * 0.035}
            />
          ))}
        </svg>
      </div>

      {/* =====================================================
          HALFTONE DOT FIELD — RIGHT
      ====================================================== */}
      <div
        className="
          fn-halftone
          absolute
          right-[120px]
          top-[180px]
          grid
          h-[330px]
          w-[290px]
          grid-cols-[repeat(17,1fr)]
          gap-[5px]
          opacity-50

          max-sm:right-[-30px]
          max-sm:top-[145px]
          max-sm:h-[200px]
          max-sm:w-[180px]
          max-sm:gap-[3px]
        "
      >
        {dots.map((_, index) => {
          const row = Math.floor(index / 17);
          const col = index % 17;

          const dx = col - 8;
          const dy = row - 9;

          const distance = Math.sqrt(
            dx * dx * 0.75 + dy * dy * 0.55
          );

          const size = Math.max(1.2, 5.4 - distance * 0.38);

          const opacity = Math.max(
            0.05,
            0.78 - distance * 0.055
          );

          return (
            <span
              key={index}
              className="block self-center justify-self-center rounded-full bg-[#B12025]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                opacity,
              }}
            />
          );
        })}
      </div>

      {/* =====================================================
          SMALL SECONDARY DOT FIELD
      ====================================================== */}
      <div
        className="
          fn-halftone-secondary
          absolute
          right-[500px]
          top-[130px]
          grid
          h-[220px]
          w-[190px]
          grid-cols-[repeat(17,1fr)]
          gap-[4px]
          opacity-[0.22]

          max-lg:hidden
        "
      >
        {dots.map((_, index) => {
          const row = Math.floor(index / 17);
          const col = index % 17;

          const dx = col - 8;
          const dy = row - 9;

          const distance = Math.sqrt(dx * dx + dy * dy);

          const size = Math.max(1, 3.8 - distance * 0.25);

          return (
            <span
              key={index}
              className="block self-center justify-self-center rounded-full bg-[#B12025]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.max(
                  0.04,
                  0.58 - distance * 0.045
                ),
              }}
            />
          );
        })}
      </div>

      {/* =====================================================
          SOFT WHITE FADE
      ====================================================== */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(90deg,rgba(244,244,245,1)_0%,rgba(244,244,245,0.98)_34%,rgba(244,244,245,0.70)_55%,rgba(244,244,245,0.05)_82%)]
        "
      />

     <style jsx>{`
  .fn-reference-orbit {
    transform-origin: 58% 48%;
    animation: fnOrbitRotate 36s linear infinite;
  }

  .fn-reference-orbit-reverse {
    transform-origin: center;
    animation: fnOrbitReverse 46s linear infinite;
  }

  .fn-ring-group {
    transform-origin: center;
  }

  .fn-ring-secondary {
    transform-origin: center;
    animation: fnSecondaryMove 13s ease-in-out infinite;
  }

  .fn-halftone {
    animation: fnDotsFloat 9s ease-in-out infinite;
  }

  .fn-halftone-secondary {
    animation: fnDotsFloatSecondary 12s ease-in-out infinite;
  }

  @keyframes fnOrbitRotate {
    0% {
      transform: rotate(-3deg) scale(1);
    }
    50% {
      transform: rotate(4deg) scale(1.025);
    }
    100% {
      transform: rotate(-3deg) scale(1);
    }
  }

  @keyframes fnOrbitReverse {
    0% {
      transform: rotate(5deg) scale(1);
    }
    50% {
      transform: rotate(-4deg) scale(1.035);
    }
    100% {
      transform: rotate(5deg) scale(1);
    }
  }

  @keyframes fnSecondaryMove {
    0%,
    100% {
      opacity: 0.18;
    }
    50% {
      opacity: 0.34;
    }
  }

  @keyframes fnDotsFloat {
    0%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(-8px, 12px, 0);
    }
  }

  @keyframes fnDotsFloatSecondary {
    0%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(10px, -8px, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fn-reference-orbit,
    .fn-reference-orbit-reverse,
    .fn-ring-secondary,
    .fn-halftone,
    .fn-halftone-secondary {
      animation: none !important;
    }
  }
`}</style>
    </div>
  );
}