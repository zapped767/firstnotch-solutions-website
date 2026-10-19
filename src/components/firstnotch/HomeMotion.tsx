'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { LOGOS } from './content';
import { setPageScroller } from './scroll';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const select = gsap.utils.selector(root);
        const lenis = new Lenis({
          autoRaf: false,
          smoothWheel: true,
          lerp: 0.09,
          anchors: { offset: -96 },
        });
        setPageScroller(lenis);
        const sync = () => ScrollTrigger.update();
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on('scroll', sync);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(select('[data-fns-curtain]'), { yPercent: 0 }, { yPercent: -100, duration: 0.85 })
          .from(select('[data-fns-line]'), { yPercent: 108, duration: 1.05, stagger: 0.12 }, 0.4)
          .from(
            select('[data-fns-intro]'),
            { y: 20, opacity: 0, duration: 0.75, stagger: 0.1 },
            0.65,
          )
          .from(select('[data-fns-hero-note]'), { y: 28, opacity: 0, duration: 0.8 }, 0.85);

        const hero = root.current?.querySelector('#top');
        const layers: Array<[string, number]> = [
          ['background', -10],
          ['shape', -20],
          ['headline', -8],
          ['foreground', -30],
        ];
        layers.forEach(([layer, speed]) =>
          gsap.to(select(`[data-fns-layer="${layer}"]`), {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
          }),
        );

        root.current?.querySelectorAll<HTMLElement>('[data-fns-bento-grid]').forEach((grid) => {
          const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-fns-bento]'));
          gsap.from(cards, {
            y: 60,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
          });
        });
        select('[data-fns-reveal]').forEach((element: HTMLElement) =>
          gsap.from(element, {
            y: 35,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          }),
        );
        root.current?.querySelectorAll<HTMLElement>('[data-fns-read]').forEach((element) => {
          gsap.fromTo(
            element.querySelectorAll('[data-fns-word]'),
            { opacity: 0.2 },
            {
              opacity: 1,
              stagger: 0.12,
              ease: 'none',
              scrollTrigger: { trigger: element, start: 'top 88%', end: 'bottom 50%', scrub: true },
            },
          );
        });
        select('[data-fns-parallax]').forEach((element: HTMLElement) =>
          gsap.fromTo(
            element,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: element.closest('[data-fns-frame]'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          ),
        );
        gsap.to(select('[data-fns-progress]'), {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
        return () => {
          gsap.ticker.remove(tick);
          lenis.off('scroll', sync);
          setPageScroller(null);
          lenis.destroy();
          gsap.ticker.lagSmoothing(500, 33);
        };
      });

      media.add(
        '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const cleanups: Array<() => void> = [];
          root.current?.querySelectorAll<HTMLElement>('[data-fns-card]').forEach((element) => {
            gsap.set(element, { transformPerspective: 800, transformOrigin: '50% 50%' });
            const rx = gsap.quickTo(element, 'rotationX', {
              duration: 0.6,
              ease: 'elastic.out(1,0.5)',
            });
            const ry = gsap.quickTo(element, 'rotationY', {
              duration: 0.6,
              ease: 'elastic.out(1,0.5)',
            });
            const lift = gsap.quickTo(element, 'y', { duration: 0.45, ease: 'power3.out' });
            const scale = gsap.quickTo(element, 'scale', { duration: 0.45, ease: 'power3.out' });
            const glow = gsap.quickTo(element.querySelector('[data-fns-spotlight]'), 'opacity', {
              duration: 0.4,
              ease: 'power3.out',
            });
            const enter = () => {
              lift(-8);
              scale(1.02);
              glow(1);
            };
            const move = (event: PointerEvent) => {
              const rect = element.parentElement!.getBoundingClientRect();
              const x = gsap.utils.clamp(0, 1, (event.clientX - rect.left) / rect.width);
              const y = gsap.utils.clamp(0, 1, (event.clientY - rect.top) / rect.height);
              element.style.setProperty('--x', `${x * 100}%`);
              element.style.setProperty('--y', `${y * 100}%`);
              rx(-(y - 0.5) * 12);
              ry((x - 0.5) * 12);
            };
            const leave = () => {
              rx(0);
              ry(0);
              lift(0);
              scale(1);
              glow(0);
            };
            element.addEventListener('pointerenter', enter);
            element.addEventListener('pointermove', move);
            element.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              element.removeEventListener('pointerenter', enter);
              element.removeEventListener('pointermove', move);
              element.removeEventListener('pointerleave', leave);
              element.style.removeProperty('--x');
              element.style.removeProperty('--y');
            });
          });
          root.current?.querySelectorAll<HTMLElement>('[data-fns-magnetic]').forEach((element) => {
            const x = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' });
            const y = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' });
            const move = (event: PointerEvent) => {
              const r = element.getBoundingClientRect();
              x(gsap.utils.clamp(-12, 12, (event.clientX - r.left - r.width / 2) * 0.16));
              y(gsap.utils.clamp(-9, 9, (event.clientY - r.top - r.height / 2) * 0.16));
            };
            const leave = () => {
              x(0);
              y(0);
            };
            element.addEventListener('pointermove', move);
            element.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              element.removeEventListener('pointermove', move);
              element.removeEventListener('pointerleave', leave);
            });
          });
          if (cursor.current) {
            gsap.set(cursor.current, { xPercent: -50, yPercent: -50 });
            const x = gsap.quickTo(cursor.current, 'x', { duration: 0.16, ease: 'power3.out' });
            const y = gsap.quickTo(cursor.current, 'y', { duration: 0.16, ease: 'power3.out' });
            const scale = gsap.quickTo(cursor.current, 'scale', {
              duration: 0.3,
              ease: 'power3.out',
            });
            const alpha = gsap.quickTo(cursor.current, 'opacity', { duration: 0.2 });
            const move = (event: PointerEvent) => {
              x(event.clientX);
              y(event.clientY);
              alpha(1);
            };
            const over = (event: PointerEvent) => {
              const interactive =
                event.target instanceof Element && event.target.closest('a,button,[data-fns-card]');
              scale(interactive ? 2.5 : 1);
            };
            const leave = () => alpha(0);
            window.addEventListener('pointermove', move, { passive: true });
            window.addEventListener('pointerover', over, { passive: true });
            document.documentElement.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              window.removeEventListener('pointermove', move);
              window.removeEventListener('pointerover', over);
              document.documentElement.removeEventListener('pointerleave', leave);
            });
          }
          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );

      let alive = true;
      let frame = 0;
      const refresh = () => {
        if (!alive) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (alive) {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
          }
        });
      };
      const images = Array.from(root.current?.querySelectorAll('img') ?? []);
      images.forEach((image) => {
        image.addEventListener('load', refresh);
        image.addEventListener('error', refresh);
      });
      const observer = new ResizeObserver(refresh);
      if (root.current) observer.observe(root.current);
      document.fonts.ready.then(refresh);
      refresh();
      return () => {
        alive = false;
        cancelAnimationFrame(frame);
        observer.disconnect();
        images.forEach((image) => {
          image.removeEventListener('load', refresh);
          image.removeEventListener('error', refresh);
        });
        media.revert();
      };
    },
    { scope: root },
  );
  return (
    <div
      ref={root}
      className="isolate bg-white text-[#17191C] selection:bg-[#B12025] selection:text-white [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#B12025] [&_button:focus-visible]:outline [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#B12025]"
    >
      <div
        data-fns-curtain
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] bg-[#B12025]"
        style={{ transform: 'translateY(-100%)' }}
      >
        <div className="flex h-full items-center justify-center">
          <Image
            src={LOGOS.white}
            alt=""
            width={270}
            height={95}
            loading="eager"
            className="h-auto w-[270px]"
          />
        </div>
      </div>
      <div
        ref={cursor}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-4 w-4 rounded-full border border-[#B12025] opacity-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23808080' filter='url(%23n)' d='M0 0h160v160H0z'/%3E%3C/svg%3E")`,
        }}
      />
      {children}
    </div>
  );
}
