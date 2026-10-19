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
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#17191C] px-5 py-20 text-white sm:px-8 lg:px-14 lg:py-28"
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
        <div className="mb-12 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <h2
            id="fns-services-title"
            className="max-w-[800px] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[1.08] tracking-[-0.055em]"
          >
            <ScrollWords text={COPY.serviceTitle} />
          </h2>

          <p
            data-fns-reveal
            className="max-w-[340px] text-sm font-light leading-[1.7] text-white/65"
          >
            {COPY.services}
          </p>
        </div>

        <div
          data-fns-bento-grid
          className="grid gap-5 lg:grid-cols-12"
        >
          {/* Customer Support */}
          <article
            data-fns-bento
            className="relative min-h-[650px] rounded-3xl border border-white/10 bg-white/[0.04] lg:col-span-7 lg:row-span-2"
          >
            <div
              data-fns-card
              className="relative flex h-full min-h-[650px] flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [--x:50%] [--y:50%] sm:p-10 lg:min-h-[810px]"
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
                size={30}
                strokeWidth={1.4}
                className="relative"
              />

              <div className="relative">
                <h3 className="text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-[1.05] tracking-[-0.05em]">
                  {SERVICES[0].title}
                </h3>

                <p className="mt-6 max-w-[420px] text-sm font-light leading-[1.7] text-white/75">
                  {SERVICES[0].description}
                </p>

                <ul className="mt-7 flex max-w-[520px] flex-wrap gap-2">
                  {SERVICES[0].items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/25 px-3 py-2 text-[11px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-9 inline-flex items-center gap-5 border-b border-white/50 pb-2 text-xs font-medium"
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
              className={`rounded-3xl border border-white/10 lg:col-span-5 ${
                index === 0
                  ? 'bg-[#B12025]'
                  : 'bg-white/[0.04]'
              }`}
            >
              <div
                data-fns-card
                className="relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [--x:50%] [--y:50%] sm:p-8"
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

                  <h3 className="mt-6 text-[30px] font-semibold leading-tight tracking-[-0.04em]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-xs font-light leading-6 text-white/75">
                    {service.description}
                  </p>

                  <ul className="mt-5 grid gap-x-4 gap-y-2 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="text-[11px] leading-5 text-white/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className="relative mt-7 inline-flex w-fit items-center gap-5 border-b border-white/50 pb-2 text-xs font-medium"
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

          {/* Workspace image */}
          <article
            data-fns-bento
            className="min-h-[330px] rounded-3xl border border-white/10 lg:col-span-5"
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
            className="rounded-3xl border border-white/10 bg-white/[0.04] lg:col-span-12"
          >
            <div
              data-fns-card
              className="relative grid h-full overflow-hidden rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [--x:50%] [--y:50%] lg:grid-cols-2"
            >
              <div className="relative p-7 sm:p-10">
                <Code2
                  aria-hidden="true"
                  size={28}
                  strokeWidth={1.4}
                />

                <h3 className="mt-6 text-[34px] font-semibold leading-tight tracking-[-0.04em]">
                  {SERVICES[2].title}
                </h3>

                <p className="mt-4 max-w-[540px] text-sm font-light leading-[1.7] text-white/70">
                  {SERVICES[2].description}
                </p>

                <ul className="mt-6 grid gap-3 text-xs text-white/80 sm:grid-cols-2">
                  {SERVICES[2].items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-5 border-b border-white/50 pb-2 text-xs font-medium"
                >
                  {SERVICES[2].link}

                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                  />
                </a>
              </div>

              <div className="relative min-h-[300px]">
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
      </div>
    </section>
  );
}