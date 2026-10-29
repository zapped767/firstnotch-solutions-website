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

gsap.registerPlugin(ScrollTrigger);

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

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const MOBILE_SPOTS = [
  { x: 0.14, y: 0.13 },
  { x: 0.85, y: 0.20 },
  { x: 0.08, y: 0.36 },
  { x: 0.91, y: 0.42 },
  { x: 0.10, y: 0.62 },
  { x: 0.88, y: 0.67 },
  { x: 0.22, y: 0.86 },
  { x: 0.77, y: 0.89 },
  { x: 0.49, y: 0.96 },
] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;

    if (!hero || !stage) return;

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>(
        '[data-fns-tunnel-card]'
      )
    );

    const mm = gsap.matchMedia();

    // DESKTOP ANIMATION — UNCHANGED
    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const camera = {
          progress: 0,
          pointerX: 0,
          pointerY: 0,
        };

        const clamp = gsap.utils.clamp(0, 1);

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
            const angle = index * GOLDEN_ANGLE;

            const closing = 1 - camera.progress * 0.28;

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

            const phase =
              0.28 +
              (index / cards.length) * 0.5 +
              camera.progress * 0.83;

            const z = -1450 + phase * 1900;

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
              rotation: index % 2 === 0 ? -5 : 5,
              opacity,
              visibility:
                opacity > 0.015 ? 'visible' : 'hidden',
            });
          });

          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: camera.progress,
            });
          }
        };

        render();

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

        const move = (event: PointerEvent) => {
          pointerX(
            (event.clientX / window.innerWidth - 0.5) * 2
          );

          pointerY(
            (event.clientY / window.innerHeight - 0.5) * 2
          );
        };

        window.addEventListener(
          'pointermove',
          move,
          { passive: true }
        );

        const observer = new ResizeObserver(render);
        observer.observe(stage);

        return () => {
          observer.disconnect();
          window.removeEventListener('pointermove', move);
          travel.scrollTrigger?.kill();
          travel.kill();
        };
      }
    );

    // MOBILE ANIMATION — UPDATED
    mm.add(
      '(max-width: 639px) and (prefers-reduced-motion: no-preference)',
      () => {
        const state = { progress: 0 };

        gsap.set(cards, {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: 'center center',
        });

        const render = () => {
          const width = stage.clientWidth;
          const height = stage.clientHeight;

          if (!width || !height) return;

          const narrow = width < 375;

          cards.forEach((card, index) => {
            const spot = MOBILE_SPOTS[index];
            const progress = state.progress;

            // Images move closer together during scrolling.
            const closing = 1 - progress * 0.20;

            const driftX =
              Math.sin(
                progress * Math.PI * 1.45 +
                index * 0.9
              ) * (narrow ? 5 : 8);

            const driftY =
              (progress - 0.5) *
              (index % 2 ? -45 : 40);

            const z =
              -260 +
              progress * 330 -
              (index % 3) * 48;

            gsap.set(card, {
              x:
                (spot.x - 0.5) * width * closing +
                driftX,
              y:
                (spot.y - 0.5) * height * closing +
                driftY,
              z,
              rotation:
                (index % 2 ? -5 : 5) +
                progress * (index % 2 ? 4 : -4),
              opacity:
                index === 8 && narrow ? 0.5 : 0.94,
              visibility: 'visible',
            });
          });

          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: state.progress,
            });
          }
        };

        render();

        const travel = gsap.to(state, {
          progress: 1,
          ease: 'none',
          onUpdate: render,

          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
            invalidateOnRefresh: true,
            onRefresh: render,
          },
        });

        const observer = new ResizeObserver(render);
        observer.observe(stage);

        return () => {
          observer.disconnect();
          travel.scrollTrigger?.kill();
          travel.kill();
        };
      }
    );

    // TABLET ANIMATION — UNCHANGED
    mm.add(
      '(min-width: 640px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)',
      () => {
        const state = { progress: 0 };

        gsap.set(cards, {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: 'center center',
        });

        const render = () => {
          const width = stage.clientWidth;
          const height = stage.clientHeight;

          if (!width || !height) return;

          const narrow = width < 375;

          cards.forEach((card, index) => {
            const spot = MOBILE_SPOTS[index];
            const progress = state.progress;

            const driftX =
              Math.sin(
                progress * Math.PI * 1.45 +
                index * 0.9
              ) * (narrow ? 7 : 12);

            const driftY =
              (progress - 0.5) *
              (index % 2 ? -95 : 85);

            const z =
              -260 +
              progress * 330 -
              (index % 3) * 48;

            gsap.set(card, {
              x: (spot.x - 0.5) * width + driftX,
              y: (spot.y - 0.5) * height + driftY,
              z,
              rotation:
                (index % 2 ? -5 : 5) +
                progress * (index % 2 ? 4 : -4),
              opacity:
                index === 8 && narrow ? 0.5 : 0.94,
              visibility: 'visible',
            });
          });

          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: state.progress,
            });
          }
        };

        render();

        const travel = gsap.to(state, {
          progress: 1,
          ease: 'none',
          onUpdate: render,

          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
            invalidateOnRefresh: true,
            onRefresh: render,
          },
        });

        const observer = new ResizeObserver(render);
        observer.observe(stage);

        return () => {
          observer.disconnect();
          travel.scrollTrigger?.kill();
          travel.kill();
        };
      }
    );

    // REDUCED MOTION FALLBACK — UNCHANGED
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
      });

      const render = () => {
        const width = stage.clientWidth;
        const height = stage.clientHeight;

        cards.forEach((card, index) => {
          if (width < 1024) {
            const spot = MOBILE_SPOTS[index];

            gsap.set(card, {
              x: (spot.x - 0.5) * width,
              y: (spot.y - 0.5) * height,
              z: -180,
              rotation: index % 2 ? -4 : 4,
              opacity: 0.85,
              visibility: 'visible',
            });
          } else {
            const angle = index * GOLDEN_ANGLE;

            gsap.set(card, {
              x: Math.cos(angle) * width * 0.39,
              y: Math.sin(angle) * height * 0.31,
              z: -500,
              rotation: 0,
              opacity: 1,
              visibility: 'visible',
            });
          }
        });
      };

      render();

      const observer = new ResizeObserver(render);
      observer.observe(stage);

      return () => observer.disconnect();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      aria-labelledby="fns-hero-title"
      className="
        relative isolate overflow-hidden bg-white
        pt-[88px] text-[#B12025]
      "
    >
      <div
        className="
          relative mx-auto
          min-h-[620px]
          max-w-[1680px]
          sm:min-h-[800px]
          lg:min-h-[calc(100svh-88px)]
        "
      >
        {/* 3D BACKGROUND */}
        <div
          ref={stageRef}
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-0
            block overflow-hidden [perspective:1150px]
          "
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* SUBTLE RED DOTS */}
          <div
            className="
              absolute inset-0 opacity-35
              [background-image:radial-gradient(rgba(177,32,37,.14)_1px,transparent_1px)]
              [background-size:29px_29px]
              [mask-image:radial-gradient(ellipse_at_center,transparent_18%,black_90%)]
            "
          />

          {/* PHOTO CARDS */}
          {PHOTOS.map((photo, index) => (
            <div
              key={photo.src}
              data-fns-tunnel-card
              className="
                absolute left-1/2 top-1/2
                aspect-[4/5] w-[70px] opacity-0
                [transform-style:preserve-3d]
                min-[380px]:w-[87px]
                sm:w-[115px]
                lg:w-[clamp(145px,12vw,200px)]
              "
            >
              <div
                className="
                  relative h-full w-full overflow-hidden
                  rounded-[12px] border border-[#B12025]/10
                  bg-[#fff5f5]
                  shadow-[0_16px_35px_rgba(23,25,28,.18)]
                  sm:rounded-[19px]
                  lg:rounded-[21px]
                  lg:shadow-[0_24px_65px_rgba(23,25,28,.18)]
                "
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt=""
                  draggable={false}
                  loading={index < 5 ? 'eager' : 'lazy'}
                  className="h-full w-full object-cover"
                />

                <span
                  className="
                    absolute inset-x-0 bottom-0
                    bg-gradient-to-t from-[#17191C]/80
                    to-transparent px-1.5 pb-1.5 pt-5
                    text-[7px] font-semibold uppercase
                    tracking-[.08em] text-white
                    sm:px-3 sm:pb-3 sm:pt-12
                    sm:text-[9px] lg:text-[10px]
                  "
                >
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SOFT WHITE CENTRE */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute left-1/2
            top-1/2 z-10 h-[430px]
            w-[min(96vw,780px)]
            -translate-x-1/2 -translate-y-1/2
            sm:h-[540px]
            lg:h-[700px] lg:w-[1050px]
          "
          style={{
            background:
              'radial-gradient(ellipse at center, #fff 0%, rgba(255,255,255,.97) 31%, rgba(255,255,255,.84) 50%, rgba(255,255,255,.18) 73%, transparent 85%)',
          }}
        />

       {/* CENTRE CONTENT */}
<div
  className="
    relative z-20 mx-auto flex
    min-h-[620px] max-w-[1100px]
    flex-col items-center justify-center
    px-5 pb-[20px] pt-[100px]
    text-center
    sm:min-h-[800px]
    sm:px-8 sm:pb-[75px] sm:pt-[95px]
    lg:min-h-[calc(100svh-88px)]
    lg:pb-[40px] lg:pt-[35px]
  "
>
          {/* EYEBROW */}
          <p
            data-fns-intro
            className="
              mb-[16px] text-[9px] font-semibold
              uppercase tracking-[.21em]
              text-[#B12025]
              sm:mb-[22px] sm:text-[11px]
              sm:tracking-[.25em]
            "
          >
            {COPY.eyebrow}
          </p>

          {/* HEADING */}
          <h1
            id="fns-hero-title"
            className="
              max-w-[1060px]
              text-[clamp(2.05rem,9.4vw,4rem)]
              font-semibold leading-[1.08]
              tracking-[-.075em]
              text-[#B12025]
              lg:text-[clamp(3.2rem,6.9vw,7.2rem)]
              lg:leading-[1.035]
            "
          >
            {[
              'Outsourcing that',
              'works like',
              "it's in-house.",
            ].map((line) => (
              <span
                key={line}
                className="block overflow-hidden pb-[.11em]"
              >
                <span data-fns-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* DESCRIPTION */}
          <p
            data-fns-intro
            className="
              mt-4 max-w-[305px]
              text-[13px] leading-[1.85]
              text-[#5D3437]
              sm:mt-5 sm:max-w-[660px]
              sm:text-[16px]
            "
          >
            {COPY.intro}
          </p>

          {/* CTA BUTTONS */}
          <div
            data-fns-intro
            className="
              mt-5 flex flex-wrap items-center
              justify-center gap-3
              sm:mt-8 sm:gap-4
            "
          >
            <a
              data-fns-magnetic
              href="#contact"
              className="
                inline-flex min-h-[50px] items-center
                gap-2 rounded-full bg-[#B12025]
                px-5 text-[11px] font-semibold
                text-white transition
                hover:bg-[#991c21]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#B12025]
                sm:min-h-[54px] sm:gap-3
                sm:px-6 sm:text-[12px]
              "
            >
              {COPY.cta}
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>

            <a
              href="#services"
              className="
                inline-flex min-h-[48px] items-center
                gap-2 rounded-full border
                border-[#B12025]/30 bg-white/90
                px-5 text-[11px] font-semibold
                text-[#B12025] transition
                hover:bg-[#fff5f5]
                sm:min-h-[54px] sm:px-6
                sm:text-[12px]
              "
            >
              See what we do
              <ArrowDown aria-hidden="true" size={16} />
            </a>
          </div>

          {/* SCROLL INDICATOR */}
          <p
            data-fns-intro
            className="
              mt-7 flex items-center gap-2
              text-[9px] font-semibold uppercase
              tracking-[.17em] text-[#B12025]/65
              sm:mt-12 sm:text-[10px]
              sm:tracking-[.18em]
            "
          >
            <MousePointer2
              size={13}
              aria-hidden="true"
            />
            Scroll to explore our work
          </p>
        </div>
      </div>

      {/* SCROLL PROGRESS LINE */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 z-30
          h-[3px] bg-[#B12025]/10
        "
      >
        <div
          ref={progressRef}
          className="
            h-full w-full origin-left scale-x-0
            bg-[#B12025]
          "
        />
      </div>
    </section>
  );
}