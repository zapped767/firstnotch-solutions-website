
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from 'lucide-react';

// ==========================================
// MANUAL ANIMATION SETTINGS
// ==========================================

const SETTINGS = {
  drawerHeight: 260,
  expandDuration: 0.72,
  reverseSpeed: 1.5,
  scanningDistance: 188,
};

// ==========================================
// EXAMPLE ACCESS PERMISSIONS
// ==========================================

const PERMISSIONS = [
  {
    number: '01',
    title: 'Team lead',
    description: 'Role-based access',
    Icon: UserRoundCheck,
  },
  {
    number: '02',
    title: 'Team member',
    description: 'Limited permissions',
    Icon: Users,
  },
] as const;

type Props = {
  title: string;
  description: string;
};

export default function SecurityCard({
  title,
  description,
}: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // ========================================
  // GSAP SECURE VAULT ANIMATION
  // ========================================

  useEffect(() => {
    const card = cardRef.current;
    const drawer = drawerRef.current;
    const scan = scanRef.current;
    const seal = sealRef.current;
    const footer = footerRef.current;

    if (
      !card ||
      !drawer ||
      !scan ||
      !seal ||
      !footer
    ) {
      return;
    }

    const roles = Array.from(
      drawer.querySelectorAll<HTMLElement>(
        '[data-security-role]'
      )
    );

    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        // ==================================
        // INITIAL COLLAPSED STATE
        // ==================================

        gsap.set(drawer, {
          height: 0,
        });

        gsap.set(roles, {
          autoAlpha: 0,
          x: 24,
        });

        gsap.set(scan, {
          autoAlpha: 0,
          y: 0,
        });

        gsap.set(seal, {
          autoAlpha: 0,
          scale: 0.5,
          rotation: -25,
          transformOrigin: 'center center',
        });

        gsap.set(footer, {
          autoAlpha: 0,
          y: 12,
        });

        // ==================================
        // CREATE HOVER TIMELINE
        // ==================================

        const tl = gsap.timeline({
          paused: true,
          defaults: {
            ease: 'power3.out',
          },
        });

        // 01 — SECURITY DRAWER UNFOLDS
        tl.to(
          drawer,
          {
            height: SETTINGS.drawerHeight,
            duration: SETTINGS.expandDuration,
            ease: 'power3.inOut',
          },
          0
        );

        // 02 — PERMISSIONS APPEAR IN ORDER
        tl.to(
          roles,
          {
            autoAlpha: 1,
            x: 0,
            stagger: 0.28,
            duration: 0.48,
          },
          0.48
        );

        // 03 — ACTIVATE SCANNING LIGHT
        tl.to(
          scan,
          {
            autoAlpha: 0.8,
            duration: 0.12,
          },
          0.76
        );

        // 04 — SCAN ACROSS THE ACCESS PANEL
        tl.to(
          scan,
          {
            y: SETTINGS.scanningDistance,
            duration: 0.95,
            ease: 'none',
          },
          0.86
        );

        // 05 — SCANNER DISAPPEARS
        tl.to(
          scan,
          {
            autoAlpha: 0,
            duration: 0.18,
          },
          1.79
        );

        // 06 — SHIELD SEAL ACTIVATES
        tl.to(
          seal,
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'back.out(1.8)',
          },
          1.37
        );

        // 07 — SECURITY CONFIRMATION
        tl.to(
          footer,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
          },
          1.83
        );

        // ==================================
        // HOVER / KEYBOARD CONTROLS
        // ==================================

        const open = () => {
          tl.timeScale(1).play();
        };

        const close = () => {
          tl.timeScale(SETTINGS.reverseSpeed).reverse();
        };

        const onFocusOut = (event: FocusEvent) => {
          const next = event.relatedTarget;

          if (
            !(next instanceof Node) ||
            !card.contains(next)
          ) {
            close();
          }
        };

        card.addEventListener('mouseenter', open);
        card.addEventListener('mouseleave', close);
        card.addEventListener('focusin', open);
        card.addEventListener('focusout', onFocusOut);

        return () => {
          card.removeEventListener('mouseenter', open);
          card.removeEventListener('mouseleave', close);
          card.removeEventListener('focusin', open);
          card.removeEventListener('focusout', onFocusOut);

          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  // ========================================
  // CARD UI
  // ========================================

  return (
    <article
      ref={cardRef}
      data-standards-card
      tabIndex={0}
      aria-label={`${title}. Focus to preview the security workflow.`}
      className="
        group relative flex min-h-[650px] flex-col
        overflow-hidden rounded-[32px]
        border border-[#B12025]
        bg-[#B12025] p-6 text-white
        outline-none transition-shadow duration-300
        hover:shadow-[0_24px_65px_rgba(23,25,28,0.14)]
        focus-visible:ring-2
        focus-visible:ring-white
        focus-visible:ring-offset-4
        focus-visible:ring-offset-[#B12025]
        sm:p-9 lg:p-10
      "
    >
      {/* OUTER CARD CONTENT — UNCHANGED */}
      <div className="relative z-10">
        <div className="mb-9 flex items-center justify-between gap-4">
          <span className="text-[10px] font-semibold tracking-[0.17em] text-white/85">
            04 / DATA PROTECTION
          </span>

          <a
            href="#contact"
            aria-label="Discuss data protection"
            className="
              flex h-10 w-10 shrink-0 items-center
              justify-center rounded-full border
              border-white/35 bg-white/10
              transition-colors
              hover:bg-white hover:text-[#B12025]
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-white
            "
          >
            <ArrowUpRight size={19} />
          </a>
        </div>

        <h3 className="max-w-[510px] text-[clamp(1.8rem,2.7vw,2.7rem)] font-semibold leading-[1.13] tracking-[-0.05em]">
          {title}
        </h3>

        <p className="mt-5 max-w-[485px] text-[13px] font-light leading-[1.8] text-white/85 sm:text-[14px]">
          {description}
        </p>
      </div>

      {/* ==================================
          ANIMATION STAGE

          Closer to the heading/description.
          This remains fixed in height.
      ================================== */}

      <div className="relative z-10 mt-8 h-[355px] w-full shrink-0">

        {/* ==================================
            MANUAL CONTAINER WIDTH

            Desktop: 82%
            Large desktop: 70%

            Reduce: xl:w-[62%]
            Increase: xl:w-[78%]
        ================================== */}

        <div
          className="
            absolute right-0 top-0
            w-full overflow-hidden rounded-[23px]
            bg-white text-[#17191C]
            shadow-[0_20px_55px_rgba(0,0,0,0.13)]
            lg:w-[82%] xl:w-[70%]
          "
        >
          {/* ==================================
              FIXED SECURITY HEADER
              ALWAYS VISIBLE
          ================================== */}

          <div className="relative flex h-[84px] items-center justify-between gap-3 border-b border-black/10 px-4 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B12025]/10 text-[#B12025]">
                <Fingerprint
                  size={21}
                  strokeWidth={1.8}
                />
              </span>

              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold sm:text-[13px]">
                  Access control
                </p>

                <p className="mt-1 truncate text-[10px] text-[#17191C]/45">
                  Example security workflow
                </p>
              </div>
            </div>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B12025]/10 text-[#B12025]">
              <LockKeyhole size={15} />
            </span>
          </div>

          {/* ==================================
              EXPANDING SECURITY DRAWER
          ================================== */}

          <div
            ref={drawerRef}
            className="
              relative h-[260px]
              overflow-hidden bg-white
            "
          >
            {/* SCANNING BEAM */}
            <div
              ref={scanRef}
              aria-hidden="true"
              className="
                pointer-events-none absolute
                left-4 right-4 top-[12px] z-20
                h-[2px] bg-[#B12025]
                opacity-0
                shadow-[0_0_12px_2px_rgba(177,32,37,0.25)]
              "
            />

            <div className="px-4 pb-3 pt-3 sm:px-5">

              {/* TWO ACCESS PERMISSION ROWS */}
              <div className="space-y-2">
                {PERMISSIONS.map((item) => {
                  const Icon = item.Icon;

                  return (
                    <div
                      key={item.number}
                      data-security-role
                      className="
                        flex min-h-[60px] items-center
                        gap-3 rounded-[12px]
                        border border-[#17191C]/[0.045]
                        bg-[#F7F7F7] px-3 py-2
                      "
                    >
                      {/* ROLE ICON */}
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B12025]/10 text-[#B12025]">
                        <Icon size={18} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-semibold">
                          {item.title}
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-[#17191C]/45">
                          {item.description}
                        </p>
                      </div>

                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B12025]/25 text-[#B12025]">
                        <Check size={13} />
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ==================================
                  PREMIUM SECURITY SEAL
              ================================== */}

              <div
                ref={sealRef}
                className="
                  mt-3 flex min-h-[54px]
                  items-center gap-3
                  rounded-[12px]
                  bg-[#B12025]/[0.07]
                  px-3
                "
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#B12025]/25 bg-white text-[#B12025]">
                  <ShieldCheck
                    size={21}
                    strokeWidth={1.8}
                  />

                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-1 h-[8px] w-[8px] rounded-full bg-[#B12025]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#B12025]">
                    Protected access
                  </p>

                  <p className="mt-1 text-[10px] text-[#17191C]/55">
                    Permission-based workflow
                  </p>
                </div>

                <CheckCircle2
                  size={18}
                  className="ml-auto shrink-0 text-[#B12025]"
                />
              </div>

              {/* FINAL STATUS */}
              <div
                ref={footerRef}
                className="
                  mt-3 flex items-center
                  gap-2 border-t border-black/10
                  pt-3 text-[10px] font-semibold
                  text-[#B12025]
                "
              >
                <LockKeyhole size={15} />
                Confidentiality comes first
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
