import { ArrowUpRight, ArrowDown } from 'lucide-react';
import Photo from './Photo';
import { COPY, MEDIA } from './content';

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="fns-hero-title"
      className="relative isolate overflow-hidden bg-[#B12025] pt-[88px] text-white"
    >
      <div
        data-fns-layer="background"
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-[20%] inset-x-0 bg-[#B12025] lg:bg-[#B12025]"
      />

 

      <div className="mx-auto grid max-w-[1536px] lg:min-h-[min(920px,100svh)] lg:grid-cols-12">
        <div
          data-fns-layer="headline"
          className="relative z-10 flex flex-col justify-center px-5 pb-14 pt-16 sm:px-8 lg:col-span-7 lg:py-24 lg:pl-14 lg:pr-0"
        >
          <p
            data-fns-intro
            className="mb-8 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:text-xs"
          >
           

            {COPY.eyebrow}
          </p>

          <h1
            id="fns-hero-title"
            className="relative text-[clamp(3rem,6.8vw,7rem)] font-semibold leading-[1.02] tracking-[-0.065em] text-white lg:-mr-36"
          >
            {['Outsourcing that', 'works like', "it's in-house."].map(
              (line, index) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-3"
                >
                  <span data-fns-line className="block">
                    {line}
                    {index < 2 ? ' ' : ''}
                  </span>
                </span>
              ),
            )}
          </h1>

          <p
            data-fns-intro
            className="mt-7 max-w-[460px] text-sm font-light leading-[1.7] text-white sm:text-[15px]"
          >
            {COPY.intro}
          </p>

          <div
            data-fns-intro
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <a
              data-fns-magnetic
              href="#contact"
              className="group inline-flex min-h-14 items-center gap-6 rounded-full bg-white px-6 text-xs font-semibold text-[#B12025] transition-opacity hover:opacity-90"
            >
              {COPY.cta}

              <ArrowUpRight aria-hidden="true" size={19} />
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-3 border-b border-white/60 py-2 text-xs text-white"
            >
              See what we do

              <ArrowDown aria-hidden="true" size={15} />
            </a>
          </div>
        </div>

        <div className="relative mx-5 mb-6 h-[410px] overflow-hidden rounded-br-[72px] sm:mx-8 sm:h-[500px] lg:col-span-5 lg:mx-0 lg:mb-0 lg:h-auto lg:min-h-[760px] lg:rounded-none lg:rounded-bl-[100px]">
          <div
            data-fns-layer="foreground"
            className="absolute inset-0"
          >
            <div className="absolute -inset-y-[40%] inset-x-0">
              <Photo
                src={MEDIA.hero}
                alt="Colleagues collaborating in a shared office; stock photograph"
                sizes="(min-width:1024px) 48vw, 100vw"
                eager
                className="object-[58%_center]"
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#B12025]/15"
          />

          
        </div>
      </div>
    </section>
  );
}