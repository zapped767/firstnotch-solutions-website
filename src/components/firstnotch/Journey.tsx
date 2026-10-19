'use client';

import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Photo from './Photo';
import { jumpTo } from './scroll';
import { COPY, JOURNEY } from './content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          if (!root.current || !track.current || !viewport.current) {
            return;
          }

          const distance = () =>
            Math.max(
              0,
              track.current!.scrollWidth -
                viewport.current!.clientWidth,
            );

          gsap.set(viewport.current, {
            overflowX: 'hidden',
            scrollSnapType: 'none',
          });

          viewport.current.scrollLeft = 0;

          const setProgress = gsap.quickSetter(
            progress.current,
            'scaleX',
          );

          const tween = gsap.to(track.current, {
            x: () => -distance(),
            ease: 'none',

            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,

              onUpdate: (self) => {
                setProgress(self.progress);
              },
            },
          });

          trigger.current = tween.scrollTrigger ?? null;

          return () => {
            trigger.current = null;
            gsap.set(progress.current, { scaleX: 0 });
          };
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  function move(direction: -1 | 1) {
    if (trigger.current) {
      const current = trigger.current;
      const span = current.end - current.start;

      const panel = track.current
        ?.firstElementChild as HTMLElement | null;

      const increment = panel
        ? panel.offsetWidth + 20
        : span / 3;

      const origin = Math.min(
        current.end,
        Math.max(current.start, window.scrollY),
      );

      jumpTo(
        Math.min(
          current.end,
          Math.max(
            current.start,
            origin + direction * increment,
          ),
        ),
      );
    } else {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      viewport.current?.scrollBy({
        left: direction * viewport.current.clientWidth * 0.85,
        behavior: reduce ? 'instant' : 'smooth',
      });
    }
  }

  return (
    <section
      id="process"
      ref={root}
      aria-labelledby="fns-process-title"
      className="relative scroll-mt-24 overflow-hidden bg-white pb-14 pt-28 font-normal text-[#B12025] lg:flex lg:h-[100svh] lg:min-h-[760px] lg:flex-col lg:justify-center lg:pb-10 lg:pt-28"
    >
      {/* Heading and navigation */}
      <div className="mx-auto mb-9 flex w-full max-w-[1536px] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-14">
        <div>
          <h2
            id="fns-process-title"
            className="max-w-[850px] text-[clamp(2.25rem,4vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.055em]"
          >
            {COPY.process}
          </h2>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous process step"
              className="rounded-full border border-[#B12025]/30 bg-white p-3 transition-colors hover:bg-[#B12025] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B12025]"
            >
              <ArrowLeft aria-hidden="true" size={18} />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next process step"
              className="rounded-full border border-[#B12025]/30 bg-white p-3 transition-colors hover:bg-[#B12025] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B12025]"
            >
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div
        ref={viewport}
        tabIndex={0}
        role="region"
        aria-label="Four steps to working with FirstNotch. Use left and right arrow keys to explore."
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;

          if (
            event.key === 'ArrowRight' ||
            event.key === 'ArrowLeft'
          ) {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        className="w-full shrink-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={track}
          className="flex w-max gap-5 px-5 sm:px-8 lg:px-14"
        >
          {JOURNEY.map((step) => (
            <article
              key={step.number}
              className="grid w-[85vw] shrink-0 snap-center overflow-hidden rounded-[18px] border border-[#B12025]/15 bg-white shadow-[0_8px_30px_rgba(177,32,37,0.04)] sm:w-[68vw] lg:h-[clamp(380px,47svh,500px)] lg:w-[70vw] lg:grid-cols-2 xl:w-[60vw]"
            >
              {/* Left panel: blurred photo with white overlay */}
              <div className="relative flex min-h-[310px] flex-col justify-between overflow-hidden bg-white p-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-8"
                >
                  <Photo
                    src={step.image}
                    alt=""
                    sizes="(min-width: 1024px) 35vw, (min-width: 640px) 68vw, 85vw"
                    className="blur-2xl"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-white/85"
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-5xl font-bold tracking-[-0.065em]">
                    {step.number}
                  </span>
                </div>

                <div className="relative z-10 mt-8">
                  <h3 className="max-w-[340px] text-[clamp(1.6rem,2.5vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.045em]">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-[350px] text-xs font-normal leading-6">
                    {step.body}
                  </p>
                </div>
              </div>

              {/* Right panel: clear photo */}
              <div className="relative h-[210px] overflow-hidden sm:h-[240px] lg:h-full">
                <Photo
                  src={step.image}
                  alt=""
                  sizes="(min-width: 1024px) 35vw, (min-width: 640px) 68vw, 85vw"
                  className="opacity-100"
                />

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-2 w-1/3 bg-[#B12025]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Red scroll progress indicator */}
      <div
        aria-hidden="true"
        className="mx-5 mt-6 hidden h-px bg-[#B12025]/20 sm:mx-8 lg:mx-14 lg:block motion-reduce:hidden"
      >
        <div
          ref={progress}
          className="h-px w-full origin-left scale-x-0 bg-[#B12025]"
        />
      </div>
    </section>
  );
}