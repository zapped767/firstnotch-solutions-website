
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowUpRight,
  MousePointer2,
} from 'lucide-react';
import { COPY } from './content';

// ======================================================
// FIRSTNOTCH — CENTRED 3D HERO
//
// White background
// FirstNotch red heading
// Centred image tunnel
// GSAP ScrollTrigger
// Existing HomeMotion heading animation
// ======================================================

// Temporary online photos.
// Replace with real FirstNotch images later.

const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=720&q=85',
    title: 'Customer support',
  },
  {
    src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=720&q=85',
    title: 'Your people',
  },
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=720&q=85',
    title: 'IT services',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=720&q=85',
    title: 'Quality',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=720&q=85',
    title: 'Operations',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=720&q=85',
    title: 'Teamwork',
  },
  {
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=720&q=85',
    title: 'Back office',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=720&q=85',
    title: 'Colombo office',
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=720&q=85',
    title: 'Global clients',
  },
] as const;

const GOLDEN_ANGLE =
  Math.PI * (3 - Math.sqrt(5));

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;

    if (!hero || !stage) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>(
        '[data-fns-tunnel-card]'
      )
    );

    const mm = gsap.matchMedia();

    // ==================================================
    // DESKTOP — CENTRED 3D TUNNEL
    // ==================================================

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const camera = {
          progress: 0,
          pointerX: 0,
          pointerY: 0,
        };

        const clamp =
          gsap.utils.clamp(0, 1);

        gsap.set(cards, {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: 'center center',
        });

        const render = () => {
          const width = stage.clientWidth;
          const height = stage.clientHeight;

          if (!width || !height) return;

          cards.forEach((card, index) => {
            const angle =
              index * GOLDEN_ANGLE;

            // Images start around the centre,
            // then move inward as you scroll.

            const closing =
              1 - camera.progress * 0.28;

            const x =
              Math.cos(angle) *
              width *
              (0.39 + (index % 2) * 0.035) *
              closing;

            const y =
              Math.sin(angle) *
              height *
              (0.30 + (index % 3) * 0.035) *
              closing;

            // Perspective tunnel depth.

            const phase =
              0.28 +
              (index / cards.length) * 0.5 +
              camera.progress * 0.83;

            const z =
              -1450 + phase * 1900;

            // Fade images as they leave
            // the visible 3D area.

            const opacity = clamp(
              Math.min(
                phase / 0.15,
                (1.31 - phase) / 0.23
              )
            );

            gsap.set(card, {
              x: x - camera.pointerX * 30,
              y: y - camera.pointerY * 23,
              z,

              rotation:
                index % 2 === 0 ? -5 : 5,

              opacity,

              visibility:
                opacity > 0.015
                  ? 'visible'
                  : 'hidden',
            });
          });

          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: camera.progress,
            });
          }
        };

        render();

        // ==============================================
        // NORMAL PAGE SCROLL CONTROLS THE TUNNEL
        // ==============================================

        const travel = gsap.to(camera, {
          progress: 1,
          ease: 'none',
          onUpdate: render,

          scrollTrigger: {
            trigger: hero,
            start: 'top top',

            end: () =>
              `+=${Math.max(
                window.innerHeight * 1.35,
                850
              )}`,

            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: render,
          },
        });

        // ==============================================
        // SUBTLE MOUSE PARALLAX
        // ==============================================

        const pointerX = gsap.quickTo(
          camera,
          'pointerX',
          {
            duration: 0.65,
            ease: 'power3.out',
            onUpdate: render,
          }
        );

        const pointerY = gsap.quickTo(
          camera,
          'pointerY',
          {
            duration: 0.65,
            ease: 'power3.out',
            onUpdate: render,
          }
        );

        const move = (
          event: PointerEvent
        ) => {
          pointerX(
            (event.clientX /
              window.innerWidth -
              0.5) *
              2
          );

          pointerY(
            (event.clientY /
              window.innerHeight -
              0.5) *
              2
          );
        };

        window.addEventListener(
          'pointermove',
          move,
          { passive: true }
        );

        const observer =
          new ResizeObserver(render);

        observer.observe(stage);

        return () => {
          observer.disconnect();

          window.removeEventListener(
            'pointermove',
            move
          );

          travel.scrollTrigger?.kill();
          travel.kill();
        };
      }
    );

    // ==================================================
    // REDUCED MOTION — STATIC IMAGES
    // ==================================================

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: reduce)',
      () => {
        const layout = () => {
          cards.forEach((card, index) => {
            const angle =
              index * GOLDEN_ANGLE;

            gsap.set(card, {
              xPercent: -50,
              yPercent: -50,

              x:
                Math.cos(angle) *
                stage.clientWidth *
                0.39,

              y:
                Math.sin(angle) *
                stage.clientHeight *
                0.31,

              z: -500,

              opacity: 1,
              visibility: 'visible',
            });
          });
        };

        layout();

        const observer =
          new ResizeObserver(layout);

        observer.observe(stage);

        return () =>
          observer.disconnect();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      aria-labelledby="fns-hero-title"
      className="
        relative
        isolate
        overflow-hidden
        bg-white
        pt-[88px]
        text-[#B12025]
      "
    >
      <div
        className="
          relative
          mx-auto
          min-h-[790px]
          max-w-[1680px]
          lg:min-h-[calc(100svh-88px)]
        "
      >
        {/* =============================================
            CENTRED IMAGE TUNNEL
            NO LEFT / RIGHT SPLIT
        ============================================= */}

        <div
          ref={stageRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            hidden
            lg:block
            [perspective:1150px]
          "
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* SUBTLE RED DOT PATTERN */}

          <div
            className="
              absolute
              inset-0
              opacity-45
              [background-image:radial-gradient(rgba(177,32,37,.14)_1px,transparent_1px)]
              [background-size:29px_29px]
              [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_90%)]
            "
          />

          {/* FLOATING PHOTO CARDS */}

          {PHOTOS.map((photo, index) => (
            <div
              key={photo.src}
              data-fns-tunnel-card
              className="
                absolute
                left-1/2
                top-1/2
                aspect-[4/5]
                w-[clamp(145px,12vw,200px)]
                opacity-0
                [transform-style:preserve-3d]
              "
            >
              <div
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  rounded-[21px]
                  border
                  border-[#B12025]/10
                  bg-[#fff5f5]
                  shadow-[0_24px_65px_rgba(23,25,28,.18)]
                "
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}

                <img
                  src={photo.src}
                  alt=""
                  draggable={false}
                  loading={
                    index < 5
                      ? 'eager'
                      : 'lazy'
                  }
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                <span
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    bg-gradient-to-t
                    from-[#17191C]/80
                    to-transparent
                    px-3
                    pb-3
                    pt-12
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[.13em]
                    text-white
                  "
                >
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* =============================================
            SOFT WHITE CENTRE
            KEEPS HEADING CLEAR
        ============================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-10
            hidden
            h-[700px]
            w-[1050px]
            -translate-x-1/2
            -translate-y-1/2
            lg:block
          "
          style={{
            background:
              'radial-gradient(ellipse at center, #ffffff 0%, rgba(255,255,255,.98) 33%, rgba(255,255,255,.86) 51%, rgba(255,255,255,.1) 72%, transparent 82%)',
          }}
        />

        {/* =============================================
            CENTRED TEXT HEADING
        ============================================= */}

        <div
          className="
            relative
            z-20
            mx-auto
            flex
            min-h-[610px]
            max-w-[1100px]
            flex-col
            items-center
            justify-center
            px-5
            pb-9
            pt-[95px]
            text-center
            sm:px-8
            lg:min-h-[calc(100svh-88px)]
            lg:pb-[40px]
            lg:pt-[35px]
          "
        >
          {/* EYEBROW */}

          <p
            data-fns-intro
            className="
              mb-[26px]
              text-[11px]
              font-semibold
              uppercase
              tracking-[.25em]
              text-[#B12025]
            "
          >
            {COPY.eyebrow}
          </p>

          {/* RISING TEXT ANIMATION
              CONTROLLED BY HomeMotion.tsx */}

          <h1
            id="fns-hero-title"
            className="
              max-w-[1060px]
              text-[clamp(3.2rem,6.9vw,7.2rem)]
              font-semibold
              leading-[1.035]
              tracking-[-.075em]
              text-[#B12025]
            "
          >
            {[
              'Outsourcing that',
              'works like',
              "it's in-house.",
            ].map((line) => (
              <span
                key={line}
                className="
                  block
                  overflow-hidden
                  pb-[.11em]
                "
              >
                <span
                  data-fns-line
                  className="block"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* DESCRIPTION */}

          <p
            data-fns-intro
            className="
              mt-5
              max-w-[660px]
              text-[14px]
              leading-[1.85]
              text-[#5D3437]
              sm:text-[16px]
            "
          >
            {COPY.intro}
          </p>

          {/* BUTTONS */}

          <div
            data-fns-intro
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-4
            "
          >
            <a
              data-fns-magnetic
              href="#contact"
              className="
                inline-flex
                min-h-[54px]
                items-center
                gap-3
                rounded-full
                bg-[#B12025]
                px-6
                text-[12px]
                font-semibold
                text-white
                transition
                hover:bg-[#991c21]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#B12025]
              "
            >
              {COPY.cta}

              <ArrowUpRight
                aria-hidden="true"
                size={17}
              />
            </a>

            <a
              href="#services"
              className="
                inline-flex
                min-h-[54px]
                items-center
                gap-2
                rounded-full
                border
                border-[#B12025]/30
                bg-white
                px-6
                text-[12px]
                font-semibold
                text-[#B12025]
                transition
                hover:bg-[#fff5f5]
              "
            >
              See what we do

              <ArrowDown
                aria-hidden="true"
                size={16}
              />
            </a>
          </div>

          {/* SCROLL INDICATOR */}

          <p
            data-fns-intro
            className="
              mt-12
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[.18em]
              text-[#B12025]/65
            "
          >
            <MousePointer2
              size={13}
              aria-hidden="true"
            />

            Scroll to explore our work
          </p>
        </div>

        {/* =============================================
            MOBILE IMAGE CARDS
            NO 3D PINNING ON MOBILE
        ============================================= */}

        <div
          aria-label="FirstNotch services photo gallery"
          className="
            relative
            z-20
            flex
            gap-3
            overflow-x-auto
            px-5
            pb-12
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:px-8
            lg:hidden
          "
        >
          {PHOTOS.slice(0, 6).map(
            (photo) => (
              <div
                key={photo.src}
                className="
                  relative
                  aspect-[4/5]
                  w-[155px]
                  shrink-0
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-[#B12025]/10
                  bg-[#fff5f5]
                  shadow-md
                "
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}

                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                <span
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    bg-gradient-to-t
                    from-[#17191C]/80
                    to-transparent
                    px-3
                    pb-3
                    pt-8
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[.1em]
                    text-white
                  "
                >
                  {photo.title}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* SCROLL PROGRESS LINE */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          z-30
          h-[3px]
          bg-[#B12025]/10
        "
      >
        <div
          ref={progressRef}
          className="
            h-full
            w-full
            origin-left
            scale-x-0
            bg-[#B12025]
          "
        />
      </div>
    </section>
  );
}
