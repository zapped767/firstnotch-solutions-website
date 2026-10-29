import { ArrowUpRight } from 'lucide-react';

import Photo from './Photo';
import BrandStats from './BrandStats';
import StandardsShowcase from './StandardsShowcase';
import WhySriLankaMobileSlider from '@/components/services/WhySriLankaMobileSlider';

import {
  ADVANTAGES,
  COPY,
  INDUSTRIES,
  MEDIA,
  QUOTES,
  RESULTS,
} from './content';

/* =========================================================
   SCROLL WORDS
========================================================= */

export function ScrollWords({ text }: { text: string }) {
  return (
    <span data-fns-read>
      {text.split(/\s+/).map((word, index) => (
        <span
          key={index}
          data-fns-word
          className="inline-block"
        >
          {word}
          {'\u00a0'}
        </span>
      ))}
    </span>
  );
}

/* =========================================================
   CLIENT STATS
========================================================= */

export function ClientStats() {
  return <BrandStats />;
}

/* =========================================================
   ABOUT
========================================================= */

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="fns-about-title"
      className="scroll-mt-20 px-5 py-9 sm:scroll-mt-28 sm:px-8 sm:py-20 lg:px-14 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1424px] gap-6 sm:gap-12 lg:grid-cols-12 lg:gap-20">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-5">
          <h2
            id="fns-about-title"
            className="text-[clamp(1.85rem,8vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-[clamp(2.5rem,4.6vw,4.5rem)]"
          >
            <ScrollWords text={COPY.aboutTitle} />
          </h2>

          <p
            data-fns-reveal
            className="mt-3 text-[12px] font-light leading-[1.6] text-black/60 sm:mt-6 sm:text-sm sm:leading-[1.7]"
          >
            {COPY.about}
          </p>

          <a
            href="#standards"
            className="mt-4 inline-flex items-center gap-3 border-b border-[#B12025] pb-1.5 text-[11px] font-medium sm:mt-7 sm:gap-4 sm:pb-2 sm:text-xs"
          >
            More about us
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

        {/* RIGHT CONTENT */}
        <div className="min-w-0 lg:col-span-7">

          {/* MOBILE VIEW — AUTO SIDE SCROLL */}
          <div className="md:hidden">
            <WhySriLankaMobileSlider />
          </div>

          {/* DESKTOP VIEW — ORIGINAL DESIGN */}
          <div
            data-fns-bento-grid
            className="hidden gap-x-8 md:grid md:grid-cols-2"
          >
            {ADVANTAGES.map(([title, body]) => (
              <article
                key={title}
                data-fns-bento
                className="border-t border-black/15 py-7"
              >
                <span
                  aria-hidden="true"
                  className="mb-5 block h-1 w-6 bg-[#B12025]"
                />

                <h3 className="text-base font-semibold leading-snug tracking-tight">
                  {title}
                </h3>

                <p className="mt-4 text-xs font-light leading-6 text-black/60">
                  {body}
                </p>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TESTIMONIAL QUOTE BAND
========================================================= */

export function QuoteBand({ index }: { index: number }) {
  const [text, company] = QUOTES[index];

  return (
    <section
      aria-label={`Testimonial: ${company}`}
      className="relative overflow-hidden bg-[#B12025] px-5 py-9 text-white sm:px-8 sm:py-16 lg:px-14 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-1 bg-[#B12025]"
      />

      <blockquote className="mx-auto max-w-[1100px]">
        <p className="text-[clamp(1.7rem,3.6vw,3.6rem)] font-medium leading-[1.3] tracking-[-0.04em]">
          “<ScrollWords text={text} />”
        </p>
      </blockquote>
    </section>
  );
}

/* =========================================================
   WHY CLIENTS STAY WITH FIRSTNOTCH
========================================================= */

export function Standards() {
  return <StandardsShowcase />;
}

/* =========================================================
   HIRING
========================================================= */

export function Hiring() {
  return (
    <section
      id="hiring"
      aria-labelledby="fns-hiring-title"
      className="scroll-mt-28 px-5 py-8 sm:px-8 sm:py-20 lg:px-14 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1424px] gap-12 lg:grid-cols-12 lg:gap-16">

        {/* IMAGE — HIDDEN ON MOBILE */}
        <div
          data-fns-frame
          className="relative hidden min-h-[430px] overflow-hidden rounded-tl-[70px] rounded-br-[70px] bg-[#17191C] sm:block lg:col-span-5"
        >
          <div
            data-fns-parallax
            className="absolute -inset-y-[12%] inset-x-0"
          >
            <Photo
              src={MEDIA.meeting}
              alt="A collaborative workshop; stock photograph"
              sizes="(min-width:1024px) 42vw,100vw"
            />
          </div>

          <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-[#B12025] p-7 text-white">
            <p className="text-[clamp(2.7rem,4.8vw,4.5rem)] font-medium leading-none tracking-[-0.06em]">
              15 to 20%
            </p>

            <p className="mt-4 text-xs">
              of applicants pass screening.
            </p>
          </div>
        </div>

        {/* HIRING CONTENT */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <h2
            id="fns-hiring-title"
            className="text-[clamp(1.9rem,8vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.055em] sm:text-[clamp(2.5rem,4.8vw,4.5rem)]"
          >
            <ScrollWords text={COPY.hiringTitle} />
          </h2>

          <p
            data-fns-reveal
            className="mt-4 max-w-[580px] text-[12px] font-light leading-[1.6] text-black/60 sm:mt-7 sm:text-sm sm:leading-[1.7]"
          >
            {COPY.hiring}
          </p>

          <a
            href="#hiring"
            className="mt-5 inline-flex w-fit items-center gap-5 border-b border-[#B12025] pb-2 text-xs font-medium sm:mt-8"
          >
            See how we hire
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   RESULTS + INDUSTRIES
========================================================= */

export function ResultsIndustries() {
  return (
    <>
      {/* =====================================================
          RECENT RESULTS
      ===================================================== */}

      <section
        id="results"
        aria-labelledby="fns-results-title"
        className="scroll-mt-28 overflow-hidden px-5 pb-5 pt-3 sm:px-8 sm:py-20 lg:px-14 lg:py-28"
      >
        <div className="mx-auto max-w-[1424px]">

          {/* HEADING */}
          <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-12 sm:gap-6 sm:flex-row sm:items-end">
            <h2
              id="fns-results-title"
              className="text-[clamp(1.5rem,6.5vw,1.9rem)] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-[clamp(2.5rem,4.8vw,4.5rem)] sm:leading-[1.1]"
            >
              <ScrollWords text={COPY.results} />
            </h2>

            <a
              href="#case-studies"
              className="inline-flex w-fit items-center gap-3 border-b border-[#B12025] pb-1.5 text-[10px] font-medium sm:gap-4 sm:pb-2 sm:text-xs"
            >
              Read the case studies
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>

          {/* HORIZONTAL SCROLL ON MOBILE */}
          <div
            id="case-studies"
            data-fns-bento-grid
            role="region"
            aria-label="Recent client results. Swipe horizontally to see more."
            tabIndex={0}
            className="
              -mr-5 flex snap-x snap-mandatory gap-3
              overflow-x-auto overscroll-x-contain
              scroll-smooth pb-2 pr-5
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:mr-0 sm:grid sm:gap-5 sm:overflow-visible
              sm:pb-0 sm:pr-0
              md:grid-cols-3
            "
          >
            {RESULTS.map((item) => (
              <article
                key={item.company}
                data-fns-bento
                className="
                  w-[82%] shrink-0 snap-start
                  overflow-hidden rounded-[20px]
                  border border-black/10 bg-white

                  sm:w-auto sm:shrink sm:rounded-3xl
                "
              >
                <div
                  data-fns-card
                  className="
                    relative flex h-full min-h-[185px]
                    flex-col overflow-hidden
                    rounded-[20px] p-4
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                    [--x:50%] [--y:50%]

                    sm:block sm:min-h-0 sm:rounded-3xl sm:p-7
                  "
                >
                  {/* SPOTLIGHT EFFECT */}
                  <div
                    data-fns-spotlight
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 [background:radial-gradient(350px_circle_at_var(--x)_var(--y),rgba(177,32,37,.12),transparent_70%)]"
                  />

                  {/* COMPANY AND COUNTRY */}
                  <div className="relative flex flex-wrap items-center justify-between gap-2 text-[8px] font-medium uppercase tracking-[0.08em] sm:gap-3 sm:text-[10px] sm:tracking-[0.1em]">
                    <span>{item.company}</span>

                    <span>
                      <span aria-hidden="true">
                        {item.flag}
                      </span>
                      {' '}
                      {item.country}
                    </span>
                  </div>

                  {/* RESULT NUMBER */}
                  <p
                    className="
                      relative my-5
                      text-[clamp(2rem,9vw,2.8rem)]
                      font-medium leading-none
                      tracking-[-0.065em]
                      text-[#B12025]

                      sm:my-9
                      sm:text-[clamp(3rem,5vw,5.5rem)]
                    "
                  >
                    {item.value}
                  </p>

                  {/* RESULT DESCRIPTION */}
                  <p
                    className="
                      relative mt-auto
                      text-[10px] font-light
                      leading-[1.55] text-black/65

                      sm:mt-0 sm:text-xs sm:leading-6
                    "
                  >
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* MOBILE SWIPE INDICATOR */}
          <div
            aria-hidden="true"
            className="mt-3 flex items-center justify-center gap-2 sm:hidden"
          >
            <span className="h-1.5 w-6 rounded-full bg-[#B12025]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#B12025]/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#B12025]/25" />
          </div>

        </div>
      </section>

      {/* =====================================================
          INDUSTRIES WE SERVE
      ===================================================== */}

      <section
        id="industries"
        aria-labelledby="fns-industries-title"
        className="
          scroll-mt-24 bg-white
          px-5 pb-7 pt-6

          sm:px-8 sm:py-20
          lg:px-14 lg:py-28
        "
      >
        <div
          className="
            mx-auto grid max-w-[1424px]
            gap-5

            sm:gap-10
            lg:grid-cols-2
          "
        >
          {/* LEFT CONTENT */}
          <div>
            <h2
              id="fns-industries-title"
              className="
                text-[clamp(1.8rem,8vw,2.1rem)]
                font-semibold
                leading-[1.08]
                tracking-[-0.055em]

                sm:text-[clamp(2.5rem,4.5vw,4rem)]
                sm:leading-[1.1]
              "
            >
              <ScrollWords text={COPY.industriesTitle} />
            </h2>

            <p
              data-fns-reveal
              className="
                mt-3 max-w-[500px]
                text-[11px]
                font-light
                leading-[1.6]
                text-black/60

                sm:mt-6
                sm:text-sm
                sm:leading-[1.7]
              "
            >
              {COPY.industries}
            </p>

            <a
              href="#industry-list"
              className="
                mt-4 inline-flex items-center
                gap-3 border-b border-[#B12025]
                pb-1.5
                text-[11px]
                font-medium

                sm:mt-7
                sm:gap-4
                sm:pb-2
                sm:text-xs
              "
            >
              See all industries
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>

          {/* RIGHT CONTENT — INDUSTRY LINKS */}
          <ul
            id="industry-list"
            className="scroll-mt-28"
          >
            {INDUSTRIES.map((item) => (
              <li
                key={item}
                data-fns-reveal
                className="
                  border-b border-black/15
                  py-4
                  text-[13px]
                  font-medium
                  tracking-tight

                  sm:py-6
                  sm:text-xl
                "
              >
                <a
                  href="#contact"
                  className="
                    flex items-center
                    justify-between
                    gap-3

                    sm:gap-5
                  "
                >
                  <span>{item}</span>

                  <ArrowUpRight
                    aria-hidden="true"
                    size={20}
                    className="
                      shrink-0
                      text-[#B12025]
                    "
                  />
                </a>
              </li>
            ))}
          </ul>

        </div>
      </section>
    </>
  );
}