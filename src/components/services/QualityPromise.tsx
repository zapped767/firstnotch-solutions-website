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
  },
  {
    number: '02',
    step: 'STEP 02',
    title: 'Training',
    description:
      'Your team learns your tools, workflows, customer expectations and tone before live work begins.',
  },
  {
    number: '03',
    step: 'STEP 03',
    title: 'QA score',
    description:
      'Every piece of work receives a quality score, from a support call to a website update.',
  },
  {
    number: '04',
    step: 'STEP 04',
    title: 'Monthly review',
    description:
      'Individual performance is reviewed every month, with coaching and clear actions for improvement.',
  },
] as const;

export default function QualityPromise() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeIndexRef = useRef(0);
  const pausedUntilRef = useRef(0);

  // ==========================================
  // KEEP ACTIVE INDEX SYNCHRONISED
  // ==========================================

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // ==========================================
  // DESKTOP: ORIGINAL VERTICAL SCROLL DETECTION
  // ==========================================

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const desktopMedia = window.matchMedia(
      '(min-width: 1024px)'
    );

    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      observer?.disconnect();
      observer = null;

      // Desktop only.
      // Mobile uses horizontal slider detection.
      if (!desktopMedia.matches) return;

      const cards =
        section.querySelectorAll<HTMLElement>(
          '[data-quality-step]'
        );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;

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

      cards.forEach((card) => {
        observer?.observe(card);
      });
    };

    setupObserver();

    desktopMedia.addEventListener(
      'change',
      setupObserver
    );

    return () => {
      observer?.disconnect();

      desktopMedia.removeEventListener(
        'change',
        setupObserver
      );
    };
  }, []);

  // ==========================================
  // MOBILE ONLY: AUTOMATIC SIDE SCROLL
  // ==========================================

  useEffect(() => {
    const slider = sliderRef.current;
    const section = sectionRef.current;

    if (!slider || !section) return;

    const mobileMedia = window.matchMedia(
      '(max-width: 1023px)'
    );

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    let interval: ReturnType<typeof setInterval> | null =
      null;

    let scrollTimeout: ReturnType<typeof setTimeout> | null =
      null;

    let isVisible = false;
    let programmaticScroll = false;

    const getCards = () =>
      Array.from(
        slider.querySelectorAll<HTMLElement>(
          '[data-quality-step]'
        )
      );

    const updateActiveCard = () => {
      if (!mobileMedia.matches) return;

      const cards = getCards();

      if (!cards.length) return;

      const sliderCenter =
        slider.getBoundingClientRect().left +
        slider.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();

        const cardCenter =
          rect.left + rect.width / 2;

        const distance = Math.abs(
          cardCenter - sliderCenter
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (activeIndexRef.current !== closestIndex) {
        activeIndexRef.current = closestIndex;
        setActiveIndex(closestIndex);
      }
    };

    const scrollToCard = (index: number) => {
      if (!mobileMedia.matches) return;

      const cards = getCards();

      const card = cards[index];

      if (!card) return;

      programmaticScroll = true;

      // Calculate position relative to the scroll container.
      const targetLeft =
        card.offsetLeft -
        slider.offsetLeft -
        (slider.clientWidth - card.clientWidth) / 2;

      slider.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });

      activeIndexRef.current = index;
      setActiveIndex(index);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        programmaticScroll = false;
      }, 900);
    };

    const pauseAutoScroll = () => {
      if (!mobileMedia.matches) return;

      if (programmaticScroll) return;

      pausedUntilRef.current =
        Date.now() + 5000;
    };

    const stopAutoScroll = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const startAutoScroll = () => {
      stopAutoScroll();

      // Absolutely no auto-scrolling on desktop.
      if (!mobileMedia.matches) return;

      if (reducedMotion.matches) return;

      interval = setInterval(() => {
        if (!isVisible) return;

        if (document.hidden) return;

        if (
          Date.now() <
          pausedUntilRef.current
        ) {
          return;
        }

        const nextIndex =
          (activeIndexRef.current + 1) %
          QUALITY_STEPS.length;

        scrollToCard(nextIndex);
      }, 3500);
    };

    const visibilityObserver =
      new IntersectionObserver(
        (entries) => {
          isVisible =
            entries[0]?.isIntersecting ?? false;
        },
        {
          threshold: 0.15,
        }
      );

    visibilityObserver.observe(section);

    slider.addEventListener(
      'scroll',
      updateActiveCard,
      { passive: true }
    );

    slider.addEventListener(
      'touchstart',
      pauseAutoScroll,
      { passive: true }
    );

    slider.addEventListener(
      'pointerdown',
      pauseAutoScroll
    );

    slider.addEventListener(
      'wheel',
      pauseAutoScroll,
      { passive: true }
    );

    mobileMedia.addEventListener(
      'change',
      startAutoScroll
    );

    reducedMotion.addEventListener(
      'change',
      startAutoScroll
    );

    startAutoScroll();

    return () => {
      stopAutoScroll();

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      visibilityObserver.disconnect();

      slider.removeEventListener(
        'scroll',
        updateActiveCard
      );

      slider.removeEventListener(
        'touchstart',
        pauseAutoScroll
      );

      slider.removeEventListener(
        'pointerdown',
        pauseAutoScroll
      );

      slider.removeEventListener(
        'wheel',
        pauseAutoScroll
      );

      mobileMedia.removeEventListener(
        'change',
        startAutoScroll
      );

      reducedMotion.removeEventListener(
        'change',
        startAutoScroll
      );
    };
  }, []);

  // ==========================================
  // ORIGINAL GSAP NUMBER ANIMATION
  // ==========================================

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
        overflow-hidden
        bg-white
        px-[16px]
        py-[40px]
        sm:px-[24px]
        sm:py-[70px]
        lg:overflow-visible
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
          gap-[24px]
          lg:grid-cols-[minmax(320px,390px)_minmax(0,1fr)]
          lg:gap-[45px]
        "
      >
        {/* =====================================
            LEFT: ORIGINAL STICKY HEADING
        ===================================== */}

        <div className="lg:sticky lg:top-[180px]">
          <p
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-[#B12025]
              lg:text-[12px]
              lg:tracking-[0.26em]
            "
          >
            OUR QUALITY PROMISE
          </p>

          <h2
            className="
              mt-[14px]
              max-w-[420px]
              text-[clamp(2rem,7vw,2.5rem)]
              font-bold
              leading-[1.08]
              tracking-[-0.055em]
              text-[#17191C]
              lg:mt-[20px]
              lg:text-[clamp(2.8rem,4.5vw,4.8rem)]
              lg:leading-[1.06]
              lg:tracking-[-0.06em]
            "
          >
            How we keep quality high.
          </h2>

          {/* ORIGINAL ANIMATED NUMBER */}

          <div
            className="
              mt-[18px]
              overflow-hidden
              lg:mt-[28px]
            "
          >
            <div
              ref={numberRef}
              className="
                text-[90px]
                font-bold
                leading-[0.95]
                tracking-[-0.09em]
                text-[#B12025]
                lg:text-[clamp(7rem,13vw,11rem)]
              "
            >
              {active.number}
            </div>
          </div>

          <p
            className="
              mt-[8px]
              text-[19px]
              font-bold
              text-[#17191C]
              lg:mt-[12px]
              lg:text-[23px]
            "
          >
            {active.title}
          </p>
        </div>

        {/* =====================================
            RIGHT: QUALITY CARDS
        ===================================== */}

        <div className="min-w-0">
          <div
            ref={sliderRef}
            aria-label="FirstNotch quality promise steps"
            className="
              relative
              flex
              w-full
              snap-x
              snap-mandatory
              gap-[12px]
              overflow-x-auto
              overscroll-x-contain
              scroll-smooth
              pb-[12px]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:gap-[16px]

              lg:block
              lg:space-y-[20px]
              lg:overflow-visible
              lg:pb-0
              lg:snap-none
            "
          >
            {QUALITY_STEPS.map((item, index) => {
              const isActive =
                activeIndex === index;

              return (
                <article
                  key={item.number}
                  data-quality-step
                  data-index={index}
                  onMouseEnter={() => {
                    if (
                      window.matchMedia(
                        '(min-width: 1024px)'
                      ).matches
                    ) {
                      setActiveIndex(index);
                    }
                  }}
                  className={`
                    group
                    relative
                    isolate
                    w-[88%]
                    shrink-0
                    snap-center
                    overflow-hidden
                    rounded-[20px]
                    border
                    bg-white
                    transition-shadow
                    duration-500

                    sm:w-[75%]
                    sm:rounded-[24px]

                    lg:w-full
                    lg:rounded-[28px]

                    ${
                      isActive
                        ? 'border-[#B12025]/35 shadow-[0_22px_55px_rgba(0,0,0,0.13)]'
                        : 'border-[#B12025]/15 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                    }
                  `}
                >
                  {/* =====================================
                      WHITE BACKGROUND
                      NO IMAGES
                      RED TEXT
                  ===================================== */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      min-h-[245px]
                      flex-col
                      justify-between
                      px-[20px]
                      py-[22px]

                      sm:min-h-[280px]
                      sm:px-[26px]
                      sm:py-[28px]

                      lg:min-h-[340px]
                      lg:px-[35px]
                      lg:py-[35px]
                    "
                  >
                    <div>
                      {/* STEP LABEL */}

                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.20em]
                          text-[#B12025]
                          lg:text-[12px]
                          lg:tracking-[0.24em]
                        "
                      >
                        {item.step}
                      </p>

                      {/* TITLE */}

                      <h3
                        className="
                          mt-[14px]
                          text-[25px]
                          font-bold
                          leading-[1.12]
                          tracking-[-0.045em]
                          text-[#B12025]

                          sm:text-[30px]

                          lg:mt-[22px]
                          lg:text-[35px]

                          xl:text-[40px]
                        "
                      >
                        {item.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p
                        className="
                          mt-[12px]
                          max-w-[580px]
                          text-[12px]
                          font-medium
                          leading-[1.65]
                          text-[#B12025]

                          sm:text-[14px]

                          lg:mt-[18px]
                          lg:text-[15px]
                          lg:font-bold
                          lg:leading-[1.8]

                          xl:text-[16px]
                        "
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* CARD FOOTER */}

                    <div
                      className="
                        mt-[18px]
                        flex
                        items-center
                        justify-between
                        lg:mt-[25px]
                      "
                    >
                      <span
                        className="
                          flex
                          h-[36px]
                          w-[36px]
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#B12025]/20
                          bg-[#B12025]/[0.06]
                          text-[11px]
                          font-bold
                          text-[#B12025]

                          lg:h-[42px]
                          lg:w-[42px]
                          lg:text-[12px]
                        "
                      >
                        {item.number}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`
                          h-[10px]
                          w-[10px]
                          rounded-full
                          bg-[#B12025]
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

          {/* =====================================
              MOBILE ONLY: SLIDER DOTS
          ===================================== */}

          <div
            className="
              mt-[12px]
              flex
              items-center
              justify-center
              gap-[8px]
              lg:hidden
            "
          >
            {QUALITY_STEPS.map((item, index) => (
              <button
                key={item.number}
                type="button"
                aria-label={`Go to ${item.title}`}
                aria-current={
                  activeIndex === index
                    ? 'step'
                    : undefined
                }
                onClick={() => {
                  const slider =
                    sliderRef.current;

                  if (!slider) return;

                  const cards =
                    slider.querySelectorAll<HTMLElement>(
                      '[data-quality-step]'
                    );

                  const card = cards[index];

                  if (!card) return;

                  pausedUntilRef.current =
                    Date.now() + 5000;

                  const targetLeft =
                    card.offsetLeft -
                    slider.offsetLeft -
                    (slider.clientWidth -
                      card.clientWidth) /
                      2;

                  slider.scrollTo({
                    left: Math.max(
                      0,
                      targetLeft
                    ),
                    behavior: 'smooth',
                  });

                  activeIndexRef.current =
                    index;

                  setActiveIndex(index);
                }}
                className={`
                  h-[7px]
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    activeIndex === index
                      ? 'w-[24px] bg-[#B12025]'
                      : 'w-[7px] bg-[#B12025]/25'
                  }
                `}
              />
            ))}
          </div>

          {/* MOBILE ONLY: HELPER TEXT */}

          <p
            className="
              mt-[10px]
              text-center
              text-[10px]
              font-medium
              tracking-[0.03em]
              text-[#17191C]/50
              lg:hidden
            "
          >
            Swipe to explore our quality process
          </p>
        </div>
      </div>
    </section>
  );
}