'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { CONTACT, COPY } from './content';

// ======================================================
// FIRSTNOTCH PREMIUM HALFTONE FOOTER
// Midnight Charcoal: #17191C
// Pure White: #FFFFFF
// ======================================================

const FOOTER_SERVICES = [
  {
    label: 'Customer Support',
    href: '/services/customer-support-outsourcing',
  },
  {
    label: 'BPO & Back Office',
    href: '/services/bpo-back-office-outsourcing',
  },
  {
    label: 'IT Services',
    href: '/services/it-services',
  },
];

const COMPANY_LINKS = [
  {
    label: 'About us',
    href: '/about',
  },
  {
    label: 'How we hire',
    href: '/how-we-hire',
  },
  {
    label: 'Career',
    href: '/work-with-us',
  },
  {
    label: 'Resources',
    href: '/#top',
  },
];

// Existing office Google Map
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.029244598203!2d79.85696747476996!3d6.887100493111926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b5a49fe2ca5%3A0xaa2a26ad6ec270a6!2sFirstNotch%20Solutions%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1792139723326!5m2!1sen!2slk';

// ======================================================
// INTERACTIVE HALFTONE WORDMARK
// ======================================================

function HalftoneWordmark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;

    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let raf = 0;
    let visible = true;
    let alive = true;

    let width = 1;
    let height = 1;
    let dpr = 1;

    let pointerX = -10000;
    let pointerY = -10000;

    let shock = {
      x: 0,
      y: 0,
      time: -10000,
    };

    let dots = new Float32Array(0);
    let count = 0;

    // ================================================
    // TEXT SETTINGS
    // ================================================

    const WORDMARK_TEXT = 'FirstNotch Solutions';

    const TEXT_WIDTH_RATIO = 0.98;
    const TEXT_HEIGHT_RATIO = 1.9;
    const DOT_OPACITY = 0.85;

    // ================================================
    // CREATE HALFTONE TEXT DOTS
    // ================================================

    function prepare() {
      if (!alive) return;

      const bounds = wrap!.getBoundingClientRect();

      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));

      dpr = Math.min(
        window.devicePixelRatio || 1,
        1.5
      );

      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);

      const mask = document.createElement('canvas');

      mask.width = width;
      mask.height = height;

      const m = mask.getContext('2d', {
        willReadFrequently: true,
      });

      if (!m) return;

      const fontStack =
        'Arial, Helvetica, sans-serif';

      m.font = `900 100px ${fontStack}`;

      const measured =
        m.measureText(WORDMARK_TEXT).width || 1;

      const size = Math.max(
        1,
        Math.min(
          (width * TEXT_WIDTH_RATIO * 100) / measured,
          height * TEXT_HEIGHT_RATIO
        )
      );

      m.font = `900 ${size}px ${fontStack}`;

      m.textAlign = 'center';
      m.textBaseline = 'middle';
      m.fillStyle = '#FFFFFF';

      m.fillText(
        WORDMARK_TEXT,
        width / 2,
        height / 2,
        width * TEXT_WIDTH_RATIO
      );

      const data = m.getImageData(
        0,
        0,
        width,
        height
      ).data;

      const gap =
        width < 480 ? 3 :
        width < 768 ? 4 :
        7;

      const points: number[] = [];

      for (
        let y = gap / 2;
        y < height;
        y += gap
      ) {
        for (
          let x = gap / 2;
          x < width;
          x += gap
        ) {
          const ix = Math.min(
            width - 1,
            Math.floor(x)
          );

          const iy = Math.min(
            height - 1,
            Math.floor(y)
          );

          const coverage =
            data[(iy * width + ix) * 4 + 3] / 255;

          if (coverage < 0.10) continue;

          const radius =
            Math.sqrt(coverage) * gap * 0.48;

          points.push(
            x,
            y,
            0,
            0,
            x,
            y,
            radius
          );
        }
      }

      dots = new Float32Array(points);
      count = points.length / 7;

      wake();
    }

    // ================================================
    // DRAW INTERACTIVE DOTS
    // ================================================

    function draw(now: number) {
      if (!ctx) return false;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      let moving = false;

      const elapsed = now - shock.time;

      const interactionRadius =
        width < 640 ? 55 : 86;

      for (
        let index = 0;
        index < count;
        index++
      ) {
        const j = index * 7;

        let x = dots[j];
        let y = dots[j + 1];

        let vx = dots[j + 2];
        let vy = dots[j + 3];

        const hx = dots[j + 4];
        const hy = dots[j + 5];

        const dotR = dots[j + 6];

        if (!reducedMotion) {
          const dx = x - pointerX;
          const dy = y - pointerY;

          const dist =
            Math.hypot(dx, dy) + 0.001;

          if (dist < interactionRadius) {
            const force =
              (1 - dist / interactionRadius) *
              1.45;

            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }

          if (
            elapsed >= 0 &&
            elapsed < 850
          ) {
            const waveRadius = elapsed * 0.8;

            const waveDist =
              Math.hypot(
                hx - shock.x,
                hy - shock.y
              ) + 0.001;

            const band = Math.max(
              0,
              1 -
                Math.abs(
                  waveDist - waveRadius
                ) / 25
            );

            const force =
              band *
              2.4 *
              (1 - elapsed / 850);

            vx +=
              ((hx - shock.x) / waveDist) *
              force;

            vy +=
              ((hy - shock.y) / waveDist) *
              force;
          }

          vx =
            (vx + (hx - x) * 0.055) *
            0.82;

          vy =
            (vy + (hy - y) * 0.055) *
            0.82;

          x += vx;
          y += vy;

          dots[j] = x;
          dots[j + 1] = y;

          dots[j + 2] = vx;
          dots[j + 3] = vy;

          if (
            Math.abs(x - hx) +
            Math.abs(y - hy) +
            Math.abs(vx) +
            Math.abs(vy) >
            0.1
          ) {
            moving = true;
          }
        }

        const displacement =
          Math.hypot(x - hx, y - hy);

        ctx.fillStyle = '#FFFFFF';

        ctx.globalAlpha = Math.min(
          1,
          DOT_OPACITY + displacement / 75
        );

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          dotR,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      ctx.globalAlpha = 1;

      return (
        moving ||
        (elapsed >= 0 && elapsed < 850)
      );
    }

    // ================================================
    // ANIMATION LOOP
    // ================================================

    function tick(now: number) {
      raf = 0;

      if (!visible || !alive) return;

      const moving = draw(now);

      if (moving) {
        raf = requestAnimationFrame(tick);
      }
    }

    function wake() {
      if (!raf && visible && alive) {
        raf = requestAnimationFrame(tick);
      }
    }

    // ================================================
    // POINTER INTERACTIONS
    // ================================================

    function onPointerMove(event: PointerEvent) {
      if (reducedMotion) return;

      const rect = wrap!.getBoundingClientRect();

      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;

      wake();
    }

    function onPointerLeave() {
      pointerX = -10000;
      pointerY = -10000;

      wake();
    }

    function onPointerDown(event: PointerEvent) {
      if (reducedMotion) return;

      const rect = wrap!.getBoundingClientRect();

      shock = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        time: performance.now(),
      };

      wake();
    }

    // ================================================
    // RESPONSIVENESS + PERFORMANCE
    // ================================================

    const observer = new ResizeObserver(prepare);

    observer.observe(wrap);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;

        if (visible) {
          wake();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      {
        threshold: 0.01,
      }
    );

    visibility.observe(wrap);

    wrap.addEventListener(
      'pointermove',
      onPointerMove
    );

    wrap.addEventListener(
      'pointerleave',
      onPointerLeave
    );

    wrap.addEventListener(
      'pointerdown',
      onPointerDown
    );

    prepare();

    document.fonts?.ready.then(() => {
      if (alive) prepare();
    });

    return () => {
      alive = false;

      cancelAnimationFrame(raf);

      observer.disconnect();
      visibility.disconnect();

      wrap.removeEventListener(
        'pointermove',
        onPointerMove
      );

      wrap.removeEventListener(
        'pointerleave',
        onPointerLeave
      );

      wrap.removeEventListener(
        'pointerdown',
        onPointerDown
      );
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="
        relative
        h-[95px]
        w-full
        select-none
        overflow-hidden
        sm:h-[150px]
        lg:h-[220px]
        xl:h-[260px]
      "
      aria-label="FirstNotch Solutions"
      role="img"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      />

      <span className="sr-only">
        FirstNotch Solutions
      </span>
    </div>
  );
}

// ======================================================
// COMPLETE FIRSTNOTCH FOOTER
// ======================================================

export default function FirstNotchFooter() {
  return (
    <footer
  className="
    relative
    isolate
    overflow-hidden
    bg-[#B12025]
    font-normal
    text-[#FFFFFF]
  "
  aria-label="FirstNotch footer"
>
      <div
        className="
          relative
          mx-auto
          max-w-[1536px]
          px-5
          pt-[30px]
          sm:px-8
          sm:pt-[58px]
          lg:px-14
          lg:pt-[70px]
        "
      >
        {/* ==========================================
            LOGO / SERVICES / COMPANY / MAP
        ========================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-4
            gap-y-8
            border-b
            border-white/25
            pb-[28px]
            sm:gap-x-8
            sm:gap-y-12
            sm:pb-[54px]
            lg:grid-cols-[1.15fr_.72fr_.72fr_1.35fr]
            lg:gap-x-10
            lg:pb-[65px]
          "
        >
          {/* FIRSTNOTCH BRAND */}

          <div
            className="
              col-span-2
              min-w-0
              lg:col-span-1
            "
          >
            <Link
              href="/"
              className="inline-block"
              aria-label="FirstNotch Solutions home"
            >
              <Image
                src="/images/logo-white.svg"
                alt="FirstNotch Solutions"
                width={210}
                height={76}
                className="
                  h-auto
                  w-[140px]
                  object-contain
                  sm:w-[205px]
                "
              />
            </Link>

            <p
              className="
                mt-4
                max-w-[300px]
                text-[11px]
                leading-[1.7]
                text-white
                sm:mt-6
                sm:text-[13px]
                sm:leading-[1.9]
              "
            >
              {COPY.footer}
            </p>

            {/* DESKTOP / TABLET SOCIAL LINKS */}

            <div className="mt-7 hidden sm:block">
              <h3
                className="
                  text-[12px]
                  font-semibold
                  text-white
                "
              >
                Follow FirstNotch
              </h3>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-x-4
                  gap-y-3
                  text-[12px]
                  text-white
                "
              >
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    transition
                    hover:text-white
                    hover:underline
                  "
                >
                  LinkedIn
                </a>

                <span>Facebook</span>
                <span>Instagram</span>
              </div>
            </div>
          </div>

          {/* ========================================
              SERVICES
          ======================================== */}

          <nav aria-label="Footer services">
            <h3
              className="
                mb-4
                text-[12px]
                font-semibold
                text-white
                sm:mb-6
                sm:text-[13px]
              "
            >
              Services
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="
                      text-[11px]
                      leading-5
                      text-white
                      transition
                      hover:text-white
                      hover:underline
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-white
                      sm:text-[12px]
                      sm:leading-6
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ========================================
              COMPANY
          ======================================== */}

          <nav aria-label="Footer company">
            <h3
              className="
                mb-4
                text-[12px]
                font-semibold
                text-white
                sm:mb-6
                sm:text-[13px]
              "
            >
              Company
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="
                      text-[11px]
                      leading-5
                      text-white
                      transition
                      hover:text-white
                      hover:underline
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-white
                      sm:text-[12px]
                      sm:leading-6
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ========================================
              GOOGLE MAP — HIDDEN ON MOBILE
          ======================================== */}

          <div
            className="
              hidden
              min-w-0
              sm:col-span-2
              sm:block
              lg:col-span-1
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[23px]
                border
                border-white/30
                bg-white
                shadow-[0_18px_45px_rgba(0,0,0,.25)]
              "
            >
              <iframe
                title="FirstNotch Solutions office location"
                src={MAP_EMBED}
                width="600"
                height="310"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="
                  block
                  h-[245px]
                  w-full
                  sm:h-[270px]
                  lg:h-[260px]
                "
              />
            </div>
          </div>
        </div>

        {/* ==========================================
            MOBILE SOCIAL LINKS — BEFORE CREDITS
        ========================================== */}

        <div
          className="
            border-b
            border-white/20
            py-5
            sm:hidden
          "
        >
          <h3 className="text-[11px] font-semibold text-white">
            Follow FirstNotch
          </h3>

          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-x-5
              gap-y-2
              text-[11px]
              text-white
            "
          >
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>

            <span>Facebook</span>
            <span>Instagram</span>
          </div>
        </div>

        {/* ==========================================
            HALFTONE FIRSTNOTCH SOLUTIONS
            HIDDEN ON MOBILE
        ========================================== */}

        <div
          className="
            hidden
            border-b
            border-white/20
            pt-2
            sm:block
          "
        >
          <HalftoneWordmark />
        </div>

        {/* ==========================================
            COPYRIGHT + BACK TO TOP
        ========================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            py-4
            text-[10px]
            leading-5
            text-white
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:py-6
            sm:text-[11px]
            sm:leading-6
          "
        >
          <p>
            © 2026 FirstNotch Solutions (Pvt) Ltd.
            All rights reserved.
          </p>

          {/* HIDDEN ON MOBILE */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className="
              hidden
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-white/30
              px-4
              py-2
              font-semibold
              text-white
              transition
              hover:bg-white/10
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-white
              sm:inline-flex
            "
          >
            Back to top

            <ArrowUp
              size={14}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}