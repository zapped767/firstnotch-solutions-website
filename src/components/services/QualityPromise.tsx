
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const QUALITY_STEPS = [
  {
    number: '01',
    step: 'STEP 01',
    title: 'Hiring',
    description:
      'Only 15 to 20% of applicants pass our hiring checks. We select people who can represent your business well.',
    image: '/images/quality-promise/step-01.png',
  },
  {
    number: '02',
    step: 'STEP 02',
    title: 'Training',
    description:
      'Your team learns your tools, workflows, customer expectations and tone before live work begins.',
    image: '/images/quality-promise/step-02.png',
  },
  {
    number: '03',
    step: 'STEP 03',
    title: 'QA score',
    description:
      'Every piece of work receives a quality score, from a support call to a website update.',
    image: '/images/quality-promise/step-03.png',
  },
  {
    number: '04',
    step: 'STEP 04',
    title: 'Monthly review',
    description:
      'Individual performance is reviewed every month, with coaching and clear actions for improvement.',
    image: '/images/quality-promise/step-04.png',
  },
] as const;

export default function QualityPromise() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  // Update active step during scrolling
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const cards =
      section.querySelectorAll<HTMLElement>(
        '[data-quality-step]'
      );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target =
              entry.target as HTMLElement;

            const index = Number(
              target.dataset.index
            );

            if (
              Number.isInteger(index) &&
              index >= 0 &&
              index < QUALITY_STEPS.length
            ) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // GSAP animated number
  useEffect(() => {
    const element = numberRef.current;

    if (!element) return;

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      return;
    }

    const animation = gsap.fromTo(
      element,
      {
        y: 35,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
      }
    );

    return () => {
      animation.kill();
    };
  }, [activeIndex]);

  const active = QUALITY_STEPS[activeIndex];

  return (
    <section
      id="quality"
      ref={sectionRef}
      className="
        scroll-mt-[150px]
        bg-white
        px-[16px]
        py-[70px]
        sm:px-[24px]
        sm:py-[90px]
        lg:px-[40px]
        lg:py-[110px]
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1440px]
          items-start
          gap-[38px]
          lg:grid-cols-[minmax(320px,390px)_minmax(0,1fr)]
          lg:gap-[45px]
        "
      >
        {/* LEFT — STICKY HEADING */}

        <div className="lg:sticky lg:top-[180px]">
          <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#B12025]">
            OUR QUALITY PROMISE
          </p>

          <h2
            className="
              mt-[20px]
              max-w-[420px]
              text-[clamp(2.8rem,4.5vw,4.8rem)]
              font-bold
              leading-[1.06]
              tracking-[-0.06em]
              text-[#17191C]
            "
          >
            How we keep quality high.
          </h2>

          {/* ANIMATED RED NUMBER */}

          <div className="mt-[28px] overflow-hidden">
            <div
              ref={numberRef}
              className="
                text-[clamp(7rem,13vw,11rem)]
                font-bold
                leading-[0.95]
                tracking-[-0.09em]
                text-[#B12025]
              "
            >
              {active.number}
            </div>
          </div>

          <p className="mt-[12px] text-[23px] font-bold text-[#17191C]">
            {active.title}
          </p>
        </div>

        {/* RIGHT — FOUR CARDS */}

        <div className="space-y-[20px]">
          {QUALITY_STEPS.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={item.number}
                data-quality-step
                data-index={index}
                onMouseEnter={() =>
                  setActiveIndex(index)
                }
                className={`
                  group
                  relative
                  isolate
                  w-full
                  min-h-[310px]
                  overflow-hidden
                  rounded-[28px]
                  bg-[#B12025]
                  transition-shadow
                  duration-500
                  sm:min-h-[340px]
                  ${
                    isActive
                      ? 'shadow-[0_22px_55px_rgba(0,0,0,0.13)]'
                      : 'shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                  }
                `}
              >
                {/* FULL BACKGROUND IMAGE
                    NO RED/WHITE OVERLAY
                    NO GRADIENT */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-0
                    scale-[1.35]
                    bg-cover
                    bg-center
                    bg-no-repeat
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.39]
                    motion-reduce:transform-none
                  "
                  style={{
                    backgroundImage: `url("${item.image}")`,
                  }}
                />

                {/* ALL BLACK, BOLD TEXT */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    min-h-[310px]
                    flex-col
                    justify-between
                    px-[28px]
                    py-[30px]
                    sm:min-h-[340px]
                    sm:px-[35px]
                    sm:py-[35px]
                  "
                >
                  <div>
                    {/* STEP */}

                    <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-black">
                      {item.step}
                    </p>

                    {/* TITLE */}

                    <h3
                      className="
                        mt-[22px]
                        text-[35px]
                        font-bold
                        leading-[1.12]
                        tracking-[-0.045em]
                        text-black
                        sm:text-[40px]
                      "
                    >
                      {item.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        mt-[18px]
                        max-w-[580px]
                        text-[15px]
                        font-bold
                        leading-[1.8]
                        text-black
                        sm:text-[16px]
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* CARD FOOTER */}

                  <div className="mt-[25px] flex items-center justify-between">
                    <span
                      className="
                        flex
                        h-[42px]
                        w-[42px]
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-[12px]
                        font-bold
                        text-black
                        shadow-sm
                      "
                    >
                      {item.number}
                    </span>

                    <span
                      className={`
                        h-[10px]
                        w-[10px]
                        rounded-full
                        bg-black
                        transition-transform
                        duration-300
                        ${
                          isActive
                            ? 'scale-[1.35]'
                            : 'scale-100'
                        }
                      `}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
