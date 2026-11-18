"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type CultureGalleryImage = {
  src: string;
  title: string;
  description?: string;
};

type CultureGalleryPageProps = {
  eyebrow: string;
  title: string;
  highlightedWord: string;
  description: string;
  images: CultureGalleryImage[];
};

export default function CultureGalleryPage({
  eyebrow,
  title,
  highlightedWord,
  description,
  images,
}: CultureGalleryPageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    const horizontal = horizontalRef.current;
    const track = trackRef.current;

    if (!root || !horizontal || !track) return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------
      // HERO ENTRANCE
      // -------------------------------------------------------
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .fromTo(
          ".culture-gallery-back",
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
          }
        )
        .fromTo(
          ".culture-gallery-eyebrow",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.35"
        )
        .fromTo(
          ".culture-gallery-title",
          {
            opacity: 0,
            y: 70,
            rotateX: 12,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
          },
          "-=0.3"
        )
        .fromTo(
          ".culture-gallery-description",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.55"
        );

      // -------------------------------------------------------
      // INITIAL CARDS REVEAL
      // -------------------------------------------------------
      gsap.fromTo(
        ".culture-gallery-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.92,
          rotate: 2,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: horizontal,
            start: "top 82%",
            once: true,
          },
        }
      );

      const mm = gsap.matchMedia();

      // -------------------------------------------------------
      // DESKTOP — PIN + HORIZONTAL SCROLL
      // -------------------------------------------------------
      mm.add("(min-width: 768px)", () => {
        const getDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 100);

        const horizontalTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: horizontal,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Individual image parallax while horizontal scrolling
        gsap.utils
          .toArray<HTMLElement>(".culture-gallery-image")
          .forEach((image, index) => {
            gsap.fromTo(
              image,
              {
                xPercent: index % 2 === 0 ? -8 : 8,
                scale: 1.12,
              },
              {
                xPercent: index % 2 === 0 ? 8 : -8,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: image,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          });

        // Number movement
        gsap.utils
          .toArray<HTMLElement>(".culture-gallery-number")
          .forEach((number) => {
            gsap.fromTo(
              number,
              {
                y: 30,
                opacity: 0.2,
              },
              {
                y: -20,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: number,
                  containerAnimation: horizontalTween,
                  start: "left 90%",
                  end: "right 10%",
                  scrub: true,
                },
              }
            );
          });
      });

      // -------------------------------------------------------
      // MOBILE — NORMAL VERTICAL GSAP REVEAL
      // -------------------------------------------------------
      mm.add("(max-width: 767px)", () => {
        gsap.utils
          .toArray<HTMLElement>(".culture-gallery-card")
          .forEach((card) => {
            gsap.fromTo(
              card,
              {
                y: 60,
                opacity: 0,
                scale: 0.96,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          });
      });

      return () => mm.revert();
    }, root);

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);

    const timeout = window.setTimeout(refresh, 500);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  const normalTitle = title.replace(highlightedWord, "");

  return (
    <div
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-white text-[#17191C]"
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-5 pb-12 pt-[120px] sm:px-8 sm:pb-16 sm:pt-[150px] lg:px-14 lg:pb-20 lg:pt-[165px]">
        {/* RED AMBIENT GLOW */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[180px] top-[120px] h-[420px] w-[420px] rounded-full bg-[#B12025]/10 blur-[120px] sm:h-[600px] sm:w-[600px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[250px] top-[40px] h-[500px] w-[500px] rounded-full bg-[#B12025]/[0.06] blur-[150px]"
        />

        <div className="relative mx-auto max-w-[1420px]">
          <Link
            href="/culture"
            className="culture-gallery-back mb-12 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6C6C70] transition-colors hover:text-[#B12025] sm:mb-16"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#E6E6E6] transition-all hover:border-[#B12025] hover:bg-[#B12025] hover:text-white">
              <ArrowLeft size={14} />
            </span>

            Back to Culture
          </Link>

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.55fr]">
            <div>
              <p className="culture-gallery-eyebrow mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#B12025] sm:text-[11px]">
                {eyebrow}
              </p>

              <h1 className="culture-gallery-title max-w-[900px] text-[clamp(3rem,7vw,7.5rem)] font-[800] leading-[0.9] tracking-[-0.065em]">
                {normalTitle}

                <span className="text-[#B12025]">
                  {highlightedWord}
                </span>
              </h1>
            </div>

            <div className="culture-gallery-description lg:pb-3">
              <p className="max-w-[470px] text-[14px] leading-[1.8] text-[#66676D] sm:text-[16px]">
                {description}
              </p>

              <div className="mt-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#B12025]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B12025]">
                  15 moments
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HORIZONTAL GSAP GALLERY
      ===================================================== */}

      <section
        ref={horizontalRef}
        className="relative bg-[#FFF8F8] md:h-screen md:min-h-[700px]"
      >
        {/* TOP DECORATION */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#B12025]/25 to-transparent" />

        <div className="flex h-full items-center overflow-hidden py-12 md:py-0">
          <div
            ref={trackRef}
            className="
              grid
              w-full
              grid-cols-1
              gap-5
              px-5

              sm:grid-cols-2
              sm:px-8

              md:flex
              md:w-max
              md:flex-nowrap
              md:items-center
              md:gap-6
              md:px-[8vw]

              lg:gap-8
            "
          >
            {images.map((image, index) => {
              const large = index % 5 === 0 || index % 5 === 3;
              const tall = index % 4 === 1;

              return (
                <article
                  key={`${image.title}-${index}`}
                  className={`
                    culture-gallery-card
                    group
                    relative
                    overflow-hidden
                    rounded-[22px]
                    bg-[#17191C]

                    md:flex-none

                    ${
                      large
                        ? "md:h-[570px] md:w-[460px]"
                        : tall
                          ? "md:h-[500px] md:w-[350px]"
                          : "md:h-[430px] md:w-[390px]"
                    }
                  `}
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] h-full min-h-[320px] w-full overflow-hidden md:aspect-auto md:min-h-0">
                    <img
                      src={image.src}
                      alt={image.title}
                      loading={index < 3 ? "eager" : "lazy"}
                      className="culture-gallery-image absolute -left-[8%] top-0 h-full w-[116%] max-w-none object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    {/* OVERLAYS */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17191C]/90 via-[#17191C]/10 to-transparent" />

                    <div className="absolute inset-0 bg-[#B12025]/0 transition-colors duration-500 group-hover:bg-[#B12025]/10" />
                  </div>

                  {/* NUMBER */}
                  <span className="culture-gallery-number absolute right-5 top-5 text-[10px] font-semibold tracking-[0.18em] text-white/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-7">
                    <div className="mb-4 h-px w-8 bg-[#B12025] transition-all duration-500 group-hover:w-16" />

                    <div className="flex items-end justify-between gap-5">
                      <div>
                        <h2 className="text-[20px] font-bold tracking-[-0.035em] text-white sm:text-[24px]">
                          {image.title}
                        </h2>

                        {image.description && (
                          <p className="mt-2 max-w-[300px] text-[11px] leading-[1.6] text-white/65 sm:text-[12px]">
                            {image.description}
                          </p>
                        )}
                      </div>

                      <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:rotate-45 group-hover:border-[#B12025] group-hover:bg-[#B12025]">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* END CARD */}
            <div className="culture-gallery-card flex min-h-[320px] items-center justify-center rounded-[22px] border border-[#E7CDCE] bg-white p-10 md:h-[430px] md:w-[350px] md:flex-none">
              <div>
                <span className="mb-8 grid h-12 w-12 place-items-center rounded-full bg-[#B12025] text-white">
                  <ArrowUpRight size={18} />
                </span>

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B12025]">
                  FirstNotch Culture
                </p>

                <h2 className="mt-4 text-[32px] font-[800] leading-[1] tracking-[-0.05em] text-[#17191C]">
                  More than
                  <br />
                  a workplace.
                </h2>

                <Link
                  href="/culture"
                  className="mt-8 inline-flex items-center gap-3 text-[12px] font-bold text-[#17191C] transition-colors hover:text-[#B12025]"
                >
                  Explore Culture
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP SCROLL HINT */}
        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#777]">
            Scroll to explore
          </span>

          <span className="relative block h-px w-16 overflow-hidden bg-[#D9D9D9]">
            <span className="absolute left-0 top-0 h-full w-1/2 bg-[#B12025]" />
          </span>
        </div>
      </section>
    </div>
  );
}