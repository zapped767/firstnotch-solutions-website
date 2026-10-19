import { ArrowUpRight, Check } from 'lucide-react';
import Photo from './Photo';
import BrandStats from './BrandStats';

import {
  ADVANTAGES,
  COPY,
  INDUSTRIES,
  MEDIA,
  QUOTES,
  RESULTS,
  STANDARDS,
} from './content';

export function ScrollWords({ text }: { text: string }) {
  return (
    <span data-fns-read>
      {text.split(/\s+/).map((word, index) => (
        <span key={index} data-fns-word className="inline-block">
          {word}
          {'\u00a0'}
        </span>
      ))}
    </span>
  );
}

export function ClientStats() {
  return <BrandStats />;
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="fns-about-title"
      className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-14 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1424px] gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <h2
            id="fns-about-title"
            className="text-[clamp(2.5rem,4.6vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.055em]"
          >
            <ScrollWords text={COPY.aboutTitle} />
          </h2>

          <p
            data-fns-reveal
            className="mt-6 text-sm font-light leading-[1.7] text-black/60"
          >
            {COPY.about}
          </p>

          <a
            href="#standards"
            className="mt-7 inline-flex items-center gap-4 border-b border-[#B12025] pb-2 text-xs font-medium"
          >
            More about us
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

        <div
          data-fns-bento-grid
          className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7"
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
    </section>
  );
}

export function QuoteBand({ index }: { index: number }) {
  const [text, company] = QUOTES[index];

  return (
    <section
      aria-label={`Testimonial: ${company}`}
      className="relative overflow-hidden bg-[#B12025] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-1 bg-[#B12025]"
      />

      <blockquote className="mx-auto max-w-[1100px]">
        <p className="text-[clamp(1.7rem,3.6vw,3.6rem)] font-medium leading-[1.3] tracking-[-0.04em]">
          “<ScrollWords text={text} />”
        </p>

        <footer className="mt-8 flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-[#B12025]"
          />

          {company}
        </footer>
      </blockquote>
    </section>
  );
}

export function Standards() {
  return (
    <section
      id="standards"
      aria-labelledby="fns-standards-title"
      className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-14 lg:py-32"
    >
      <div className="mx-auto max-w-[1424px]">
        <h2
          id="fns-standards-title"
          className="mb-12 max-w-[900px] text-[clamp(2.5rem,4.8vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.055em]"
        >
          <ScrollWords text={COPY.standardsTitle} />
        </h2>

        <div
          data-fns-bento-grid
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STANDARDS.map(([title, body]) => (
            <article
              key={title}
              data-fns-bento
              className="rounded-3xl border border-black/10 bg-[#17191C] text-white"
            >
              <div
                data-fns-card
                className="relative h-full overflow-hidden rounded-3xl p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [--x:50%] [--y:50%]"
              >
                <div
                  data-fns-spotlight
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 [background:radial-gradient(400px_circle_at_var(--x)_var(--y),rgba(177,32,37,.35),transparent_70%)]"
                />

                <Check
                  aria-hidden="true"
                  size={23}
                  className="relative mb-10 text-white/70"
                />

                <h3 className="relative text-xl font-medium tracking-tight">
                  {title}
                </h3>

                <p className="relative mt-4 text-xs font-light leading-6 text-white/65">
                  {body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Hiring() {
  return (
    <section
      id="hiring"
      aria-labelledby="fns-hiring-title"
      className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1424px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div
          data-fns-frame
          className="relative min-h-[430px] overflow-hidden rounded-tl-[70px] rounded-br-[70px] bg-[#17191C] lg:col-span-5"
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

        <div className="flex flex-col justify-center lg:col-span-7">
          <h2
            id="fns-hiring-title"
            className="text-[clamp(2.5rem,4.8vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.055em]"
          >
            <ScrollWords text={COPY.hiringTitle} />
          </h2>

          <p
            data-fns-reveal
            className="mt-7 max-w-[580px] text-sm font-light leading-[1.7] text-black/60"
          >
            {COPY.hiring}
          </p>

          <a
            href="#hiring"
            className="mt-8 inline-flex w-fit items-center gap-5 border-b border-[#B12025] pb-2 text-xs font-medium"
          >
            See how we hire
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function ResultsIndustries() {
  return (
    <>
      <section
        id="results"
        aria-labelledby="fns-results-title"
        className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
      >
        <div className="mx-auto max-w-[1424px]">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2
              id="fns-results-title"
              className="text-[clamp(2.5rem,4.8vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.055em]"
            >
              <ScrollWords text={COPY.results} />
            </h2>

            <a
              href="#case-studies"
              className="inline-flex w-fit items-center gap-4 border-b border-[#B12025] pb-2 text-xs font-medium"
            >
              Read the case studies
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>

          <div
            id="case-studies"
            data-fns-bento-grid
            className="grid scroll-mt-28 gap-5 md:grid-cols-3"
          >
            {RESULTS.map((item) => (
              <article
                key={item.company}
                data-fns-bento
                className="rounded-3xl border border-black/10 bg-white"
              >
                <div
                  data-fns-card
                  className="relative h-full overflow-hidden rounded-3xl p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [--x:50%] [--y:50%]"
                >
                  <div
                    data-fns-spotlight
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 [background:radial-gradient(350px_circle_at_var(--x)_var(--y),rgba(177,32,37,.12),transparent_70%)]"
                  />

                  <div className="relative flex flex-wrap items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.1em]">
                    <span>{item.company}</span>

                    <span>
                      <span aria-hidden="true">{item.flag}</span>
                      {' '}
                      {item.country}
                    </span>
                  </div>

                  <p className="relative my-9 text-[clamp(3rem,5vw,5.5rem)] font-medium leading-none tracking-[-0.065em] text-[#B12025]">
                    {item.value}
                  </p>

                  <p className="relative text-xs font-light leading-6 text-black/65">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="industries"
        aria-labelledby="fns-industries-title"
        className="scroll-mt-28 border-t border-black/10 px-5 py-16 sm:px-8 lg:px-14 lg:py-24"
      >
        <div className="mx-auto grid max-w-[1424px] gap-10 lg:grid-cols-2">
          <div>
            <h2
              id="fns-industries-title"
              className="text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.055em]"
            >
              <ScrollWords text={COPY.industriesTitle} />
            </h2>

            <p
              data-fns-reveal
              className="mt-6 max-w-[500px] text-sm font-light leading-[1.7] text-black/60"
            >
              {COPY.industries}
            </p>

            <a
              href="#industry-list"
              className="mt-7 inline-flex items-center gap-4 border-b border-[#B12025] pb-2 text-xs font-medium"
            >
              See all industries
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>

          <ul id="industry-list" className="scroll-mt-28">
            {INDUSTRIES.map((item) => (
              <li
                key={item}
                data-fns-reveal
                className="border-b border-black/15 py-6 text-xl font-medium tracking-tight"
              >
                <a
                  href="#contact"
                  className="flex items-center justify-between gap-5"
                >
                  {item}

                  <ArrowUpRight
                    aria-hidden="true"
                    size={20}
                    className="text-[#B12025]"
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