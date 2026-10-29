import {
  ArrowUpRight,
  Code2,
  Headphones,
  Layers3,
} from 'lucide-react';

import Photo from './Photo';
import { COPY, MEDIA, SERVICES } from './content';
import { ScrollWords } from './ContentBlocks';
import FallingDots from './FallingDots';

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="fns-services-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#17191C] px-5 py-9 text-white sm:px-8 sm:py-20 lg:px-14 lg:py-28"
    >
      {/* Falling dots background */}
      <FallingDots />

      {/* Existing red background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#B12025]/15 blur-[100px]"
      />

      {/* Content above the background effect */}
      <div className="relative z-10 mx-auto max-w-[1424px]">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:mb-12 sm:gap-7 lg:flex-row lg:items-end">
          <h2
            id="fns-services-title"
            className="max-w-[800px] text-[32px] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-[clamp(2.5rem,5vw,4.8rem)]"
          >
            <ScrollWords text={COPY.serviceTitle} />
          </h2>

          <p
            data-fns-reveal
            className="max-w-[340px] text-[12px] font-light leading-[1.55] text-white/65 sm:text-sm sm:leading-[1.7]"
          >
            {COPY.services}
          </p>
        </div>

        {/* Horizontal scrolling on mobile only */}
        <div
          data-fns-bento-grid
          aria-label="Explore our outsourcing services"
          className="
            flex snap-x snap-mandatory gap-3
            overflow-x-auto overscroll-x-contain
            pb-3
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:grid sm:gap-5 sm:overflow-visible sm:pb-0
            lg:grid-cols-12
          "
        >
          {/* Customer Support */}
          <article
            data-fns-bento
            className="
              relative w-[88%] min-w-[88%] shrink-0 snap-start
              overflow-hidden rounded-3xl border border-white/10
              bg-white/[0.04]
              sm:w-auto sm:min-w-0 sm:shrink sm:overflow-visible
              sm:min-h-[650px]
              lg:col-span-7 lg:row-span-2
            "
          >
            <div
              data-fns-card
              className="
                relative flex h-full min-h-[400px] flex-col
                justify-between overflow-hidden rounded-3xl
                p-5
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                [--x:50%] [--y:50%]
                sm:min-h-[650px] sm:p-10
                lg:min-h-[810px]
              "
            >
              <div
                data-fns-frame
                className="absolute inset-0 overflow-hidden"
              >
                <div
                  data-fns-parallax
                  className="absolute -inset-y-[12%] inset-x-0"
                >
                  <Photo
                    src={MEDIA.people}
                    alt="Colleagues around a meeting table; stock photograph"
                    sizes="(min-width:1024px) 58vw,100vw"
                  />
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#17191C]/70"
              />

              <div
                data-fns-spotlight
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 [background:radial-gradient(450px_circle_at_var(--x)_var(--y),rgba(255,255,255,.15),transparent_70%)]"
              />

              <Headphones
                aria-hidden="true"
                size={26}
                strokeWidth={1.4}
                className="relative sm:h-[30px] sm:w-[30px]"
              />

              <div className="relative">
                <h3 className="text-[29px] font-semibold leading-[1.05] tracking-[-0.05em] sm:text-[clamp(2.5rem,4vw,4rem)]">
                  {SERVICES[0].title}
                </h3>

                <p className="mt-3 max-w-[420px] text-[12px] font-light leading-[1.6] text-white/75 sm:mt-6 sm:text-sm sm:leading-[1.7]">
                  {SERVICES[0].description}
                </p>

                <ul className="mt-4 flex max-w-[520px] flex-wrap gap-1.5 sm:mt-7 sm:gap-2">
                  {SERVICES[0].items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/25 px-2.5 py-1.5 text-[10px] sm:px-3 sm:py-2 sm:text-[11px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-3 border-b border-white/50 pb-2 text-[11px] font-medium sm:mt-9 sm:gap-5 sm:text-xs"
                >
                  {SERVICES[0].link}

                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                  />
                </a>
              </div>
            </div>
          </article>

          {/* BPO & Back Office */}
          {SERVICES.slice(1, 2).map((service, index) => (
            <article
              key={service.title}
              data-fns-bento
              className={`
                w-[88%] min-w-[88%] shrink-0 snap-start
                rounded-3xl border border-white/10
                sm:w-auto sm:min-w-0 sm:shrink
                lg:col-span-5
                ${
                  index === 0
                    ? 'bg-[#B12025]'
                    : 'bg-white/[0.04]'
                }
              `}
            >
              <div
                data-fns-card
                className="
                  relative flex h-full min-h-[400px]
                  flex-col justify-between overflow-hidden
                  rounded-3xl p-5
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                  [--x:50%] [--y:50%]
                  sm:min-h-[360px] sm:p-8
                "
              >
                <div
                  data-fns-spotlight
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 [background:radial-gradient(400px_circle_at_var(--x)_var(--y),rgba(255,255,255,.14),transparent_70%)]"
                />

                <div className="relative">
                  {index === 0 ? (
                    <Layers3
                      aria-hidden="true"
                      size={26}
                      strokeWidth={1.4}
                    />
                  ) : (
                    <Code2
                      aria-hidden="true"
                      size={26}
                      strokeWidth={1.4}
                    />
                  )}

                  <h3 className="mt-4 text-[26px] font-semibold leading-tight tracking-[-0.04em] sm:mt-6 sm:text-[30px]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-[12px] font-light leading-[1.6] text-white/75 sm:mt-4 sm:leading-6">
                    {service.description}
                  </p>

                  <ul className="mt-4 grid gap-x-4 gap-y-1.5 sm:mt-5 sm:gap-y-2 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="text-[10px] leading-[1.6] text-white/85 sm:text-[11px] sm:leading-5"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className="relative mt-5 inline-flex w-fit items-center gap-3 border-b border-white/50 pb-2 text-[11px] font-medium sm:mt-7 sm:gap-5 sm:text-xs"
                >
                  {service.link}

                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                  />
                </a>
              </div>
            </article>
          ))}

          {/* Workspace image - unchanged on tablet/desktop */}
          <article
            data-fns-bento
            className="
              hidden min-h-[330px] rounded-3xl
              border border-white/10
              sm:block
              lg:col-span-5
            "
          >
            <div
              data-fns-card
              className="relative h-full min-h-[330px] overflow-hidden rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [--x:50%] [--y:50%]"
            >
              <div
                data-fns-frame
                className="absolute inset-0 overflow-hidden"
              >
                <div
                  data-fns-parallax
                  className="absolute -inset-y-[12%] inset-x-0"
                >
                  <Photo
                    src={MEDIA.workspace}
                    alt=""
                    sizes="(min-width:1024px) 42vw,100vw"
                  />
                </div>
              </div>

              <div
                data-fns-spotlight
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 [background:radial-gradient(400px_circle_at_var(--x)_var(--y),rgba(255,255,255,.18),transparent_70%)]"
              />
            </div>
          </article>

          {/* IT Services */}
          <article
            data-fns-bento
            className="
              w-[88%] min-w-[88%] shrink-0 snap-start
              rounded-3xl border border-white/10
              bg-white/[0.04]
              sm:w-auto sm:min-w-0 sm:shrink
              lg:col-span-12
            "
          >
            <div
              data-fns-card
              className="
                relative grid h-full min-h-[400px]
                overflow-hidden rounded-3xl
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                [--x:50%] [--y:50%]
                sm:min-h-0
                lg:grid-cols-2
              "
            >
              <div className="relative p-5 sm:p-10">
                <Code2
                  aria-hidden="true"
                  size={26}
                  strokeWidth={1.4}
                  className="sm:h-[28px] sm:w-[28px]"
                />

                <h3 className="mt-4 text-[27px] font-semibold leading-tight tracking-[-0.04em] sm:mt-6 sm:text-[34px]">
                  {SERVICES[2].title}
                </h3>

                <p className="mt-3 max-w-[540px] text-[12px] font-light leading-[1.6] text-white/70 sm:mt-4 sm:text-sm sm:leading-[1.7]">
                  {SERVICES[2].description}
                </p>

                <ul className="mt-4 grid gap-2 text-[11px] text-white/80 sm:mt-6 sm:gap-3 sm:text-xs sm:grid-cols-2">
                  {SERVICES[2].items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-3 border-b border-white/50 pb-2 text-[11px] font-medium sm:mt-8 sm:gap-5 sm:text-xs"
                >
                  {SERVICES[2].link}

                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                  />
                </a>
              </div>

              <div className="relative hidden min-h-[300px] sm:block">
                <Photo
                  src={MEDIA.meeting}
                  alt=""
                  sizes="(min-width:1024px) 50vw,100vw"
                  className="opacity-75"
                />
              </div>

              <div
                data-fns-spotlight
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 [background:radial-gradient(500px_circle_at_var(--x)_var(--y),rgba(255,255,255,.14),transparent_70%)]"
              />
            </div>
          </article>
        </div>

        {/* Mobile swipe hint */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-white/50 sm:hidden">
          <span>Swipe to explore services</span>
          <span className="flex items-center gap-1">
            Scroll
            <ArrowUpRight
              size={13}
              className="rotate-45"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </section>
  );
}