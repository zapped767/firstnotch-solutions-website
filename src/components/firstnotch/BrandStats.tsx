'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { STATS } from './content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Higher number = slower animation.
const FILL_DURATION = 12;
const COUNTER_DURATION = 8;

const BRAND_TEXT = 'FIRSTNOTCH SOLUTIONS';

const items = STATS.map(([display, label]) => ({
  display,
  label,
  target: Number.parseInt(display, 10),
  suffix: display.replace(/^\d+/, ''),
}));

export default function BrandStats() {
  const root = useRef<HTMLDivElement>(null);
  const statsSection = useRef<HTMLElement>(null);
  const wordmark = useRef<HTMLParagraphElement>(null);
  const redText = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const fill = redText.current;
        const title = wordmark.current;

        const nodes = root.current?.querySelectorAll<HTMLElement>(
          '[data-fns-stat-number]',
        );

        if (
          !fill ||
          !title ||
          !nodes?.length ||
          !statsSection.current
        ) {
          return;
        }

        // WATER FILL
        const water = {
          progress: 0,
          phase: 0,
        };

        const drawWater = () => {
          const edge = -3 + water.progress * 106;
          const points = ['0% 0%'];

          // Build a gently moving wave along the fill edge.
          for (let step = 0; step <= 20; step += 1) {
            const y = step * 5;

            const wave =
              Math.sin(step * 0.55 + water.phase) * 1.2 +
              Math.sin(step * 1.1 - water.phase) * 0.4;

            points.push(
              `${(edge + wave).toFixed(3)}% ${y}%`,
            );
          }

          points.push('0% 100%');

          fill.style.clipPath = `polygon(${points.join(', ')})`;
        };

        drawWater();

        const liquidLoop = gsap.timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 0.5,
        });

        liquidLoop
          .set(fill, {
            opacity: 1,
          })
          .to(water, {
            progress: 1,
            phase: Math.PI * 10,
            duration: FILL_DURATION,
            ease: 'none',
            onUpdate: drawWater,
          })
          .to(
            fill,
            {
              opacity: 0,
              duration: 0.8,
              ease: 'power1.inOut',
            },
            '+=1.2',
          );

        // Pause the loop while the wordmark is offscreen.
        const visibility = ScrollTrigger.create({
          trigger: title,
          start: 'top bottom',
          end: 'bottom top',

          onToggle: (self) => {
            if (self.isActive) {
              liquidLoop.play();
            } else {
              liquidLoop.pause();
            }
          },
        });

        if (visibility.isActive) {
          liquidLoop.play();
        }

        // STAT COUNTERS
        const counters = Array.from(nodes).map((node) => ({
          node,
          current: 0,
          target: Number(node.dataset.target),
          suffix: node.dataset.suffix ?? '',
        }));

        const finish = () => {
          counters.forEach((item) => {
            item.node.textContent =
              `${item.target}${item.suffix}`;
          });
        };

        counters.forEach((item) => {
          item.node.textContent = `0${item.suffix}`;
        });

        const animation = gsap.to(counters, {
          current: (index: number) => counters[index].target,
          duration: COUNTER_DURATION,
          stagger: 0.15,
          ease: 'none',
          paused: true,

          onUpdate: () => {
            counters.forEach((item) => {
              item.node.textContent =
                `${Math.round(item.current)}${item.suffix}`;
            });
          },

          onComplete: finish,
        });

        ScrollTrigger.create({
          trigger: statsSection.current,
          start: 'top 85%',
          once: true,

          onEnter: () => {
            animation.play();
          },
        });

        return () => {
          finish();
          fill.style.clipPath = 'inset(0 100% 0 0)';
        };
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section
        aria-label="FirstNotch Solutions"
        className="overflow-hidden bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-14"
      >
        <div className="mx-auto max-w-[1536px]">
          <p
            ref={wordmark}
            className="whitespace-nowrap text-center text-[clamp(1.25rem,7.4vw,8.25rem)] font-bold uppercase leading-[1.05] tracking-[-0.055em] text-[#D3D3D3]"
          >
            <span className="relative inline-block">
              {BRAND_TEXT}

              <span
                ref={redText}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 text-[#B12025]"
                style={{
                  clipPath: 'inset(0 100% 0 0)',
                }}
              >
                {BRAND_TEXT}
              </span>
            </span>
          </p>
        </div>
      </section>

      <section
        ref={statsSection}
        aria-label="FirstNotch in numbers"
        className="bg-[#B12025] px-5 py-12 text-white sm:px-8 lg:px-14 lg:py-16"
      >
        <div className="mx-auto grid max-w-[1424px] grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
          {items.map((item) => (
            <div key={item.display}>
              <p className="text-[clamp(2.75rem,5vw,4.75rem)] font-semibold leading-none tracking-[-0.06em] text-white tabular-nums">
                <span
                  data-fns-stat-number
                  data-target={item.target}
                  data-suffix={item.suffix}
                  aria-hidden="true"
                >
                  {item.display}
                </span>

                <span className="sr-only">
                  {item.display}
                </span>
              </p>

              <p className="mt-4 max-w-[250px] text-xs font-normal leading-[1.7] text-white sm:text-[13px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}