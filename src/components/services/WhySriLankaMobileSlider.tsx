
"use client";

import { useEffect, useRef, useState } from "react";

const benefits = [
  {
    title: "Strong English skills",
    description:
      "English is widely used in Sri Lankan business and education. The FirstNotch team also speaks Sinhala, Tamil and Hindi.",
  },
  {
    title: "Working hours that overlap with yours",
    description:
      "Sri Lanka is on GMT+5:30, so the working day overlaps with business hours in the Middle East, Europe and Australia.",
  },
  {
    title: "Lower costs",
    description:
      "Salaries here are lower than in the US, the UK or Australia. You pay less and still get the same QA checks and monthly reviews.",
  },
  {
    title: "An established industry",
    description:
      "Sri Lanka has a large IT and BPO sector. That means many trained and experienced people to hire from.",
  },
] as const;

export default function WhySriLankaMobileSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const visibleRef = useRef(false);

  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const getCards = () =>
      Array.from(
        track.querySelectorAll<HTMLElement>(
          "[data-benefit-card]"
        )
      );

    let resetTimer: number | undefined;

    const handleScroll = () => {
      const cards = getCards();
      if (!cards.length) return;

      const start = cards[0].offsetLeft;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const difference = Math.abs(
          card.offsetLeft - start - track.scrollLeft
        );

        if (difference < distance) {
          distance = difference;
          closest = index;
        }
      });

      currentRef.current = closest;
      setActive(closest % benefits.length);

      window.clearTimeout(resetTimer);

      // Last card is a copy of the first card.
      // Reset position for a seamless infinite loop.
      if (closest === benefits.length) {
        resetTimer = window.setTimeout(() => {
          if (currentRef.current !== benefits.length) {
            return;
          }

          track.style.scrollBehavior = "auto";
          track.style.scrollSnapType = "none";
          track.scrollLeft = 0;

          currentRef.current = 0;
          setActive(0);

          requestAnimationFrame(() => {
            track.style.scrollSnapType = "";
            track.style.scrollBehavior = "";
          });
        }, 380);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );

    observer.observe(track);

    track.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    const interval = window.setInterval(() => {
      if (
        reducedMotion.matches ||
        !visibleRef.current ||
        document.hidden ||
        Date.now() < pauseUntilRef.current
      ) {
        return;
      }

      const cards = getCards();
      if (!cards.length) return;

      const next = Math.min(
        currentRef.current + 1,
        benefits.length
      );

      const left =
        cards[next].offsetLeft - cards[0].offsetLeft;

      track.scrollTo({
        left,
        behavior: "smooth",
      });
    }, 3400);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(resetTimer);

      observer.disconnect();
      track.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const chooseCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    pauseUntilRef.current = Date.now() + 7000;

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(
        "[data-benefit-card]"
      )
    );

    if (!cards[index]) return;

    currentRef.current = index;
    setActive(index);

    track.scrollTo({
      left:
        cards[index].offsetLeft -
        cards[0].offsetLeft,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="w-full overflow-hidden md:hidden"
      aria-label="Benefits of Sri Lanka outsourcing"
    >
      {/* MOBILE AUTO-SCROLLING CARDS */}

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Four reasons to choose Sri Lanka"
        onPointerDown={() => {
          pauseUntilRef.current = Date.now() + 7000;
        }}
        onFocusCapture={() => {
          pauseUntilRef.current = Date.now() + 7000;
        }}
        className="
          relative flex
          snap-x snap-mandatory
          gap-4
          overflow-x-auto
          overscroll-x-contain
          px-5 pb-3
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {[...benefits, benefits[0]].map(
          (benefit, index) => (
            <article
              data-benefit-card
              key={`${benefit.title}-${index}`}
              aria-hidden={index === benefits.length}
              role="group"
              aria-roledescription="slide"
              aria-label={`${
                (index % benefits.length) + 1
              } of ${benefits.length}`}
              className="
                min-h-[238px]
                w-[min(79vw,330px)]
                shrink-0
                snap-start
                rounded-[18px]
                border border-[#E6E7E9]
                bg-white
                px-5 py-6
                shadow-[0_10px_35px_rgba(23,25,28,0.045)]
              "
            >
              <span
                className="block h-[3px] w-6 bg-[#B12025]"
                aria-hidden="true"
              />

              <h3 className="mt-5 text-[16px] font-semibold leading-[1.4] tracking-[-0.02em] text-[#17191C]">
                {benefit.title}
              </h3>

              <p className="mt-4 text-[13px] leading-[1.85] text-[#17191C]/65">
                {benefit.description}
              </p>
            </article>
          )
        )}
      </div>

      {/* CAROUSEL PROGRESS DOTS */}

      <div
        className="mt-4 flex items-center justify-center gap-2"
        aria-label="Select a benefit"
      >
        {benefits.map((benefit, index) => (
          <button
            key={benefit.title}
            type="button"
            onClick={() => chooseCard(index)}
            aria-label={`Show ${benefit.title}`}
            aria-current={
              active === index ? "true" : undefined
            }
            className={`
              h-[5px] rounded-full
              transition-all duration-300
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#B12025]
              ${
                active === index
                  ? "w-8 bg-[#B12025]"
                  : "w-3 bg-[#B12025]/20"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
