'use client';

import { useEffect, useRef } from 'react';

type Dot = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  trail: number;
};

const MAX_DOTS = 100;
const SPEED = 1;

export default function FallingDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext('2d');

    if (!canvas || !host || !context) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let frame = 0;
    let previousTime = 0;
    let visible = false;

    const canAnimate = () =>
      visible && !document.hidden && !reducedMotion.matches;

    const draw = (time: number) => {
      frame = 0;

      if (!canAnimate()) return;

      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 0;

      previousTime = time;

      context.clearRect(0, 0, width, height);

      for (const dot of dots) {
        dot.y += dot.speed * delta;

        // Recycle each dot after it leaves the bottom.
        if (dot.y > height + dot.trail + 4) {
          dot.y = -4;
          dot.x = Math.random() * width;
        }

        // Give some dots a faint rain-like tail.
        if (dot.trail > 0) {
          context.beginPath();
          context.strokeStyle =
            `rgba(255,255,255,${dot.opacity * 0.2})`;
          context.lineWidth = dot.radius * 0.8;
          context.lineCap = 'round';
          context.moveTo(dot.x, dot.y - dot.trail);
          context.lineTo(dot.x, dot.y);
          context.stroke();
        }

        context.beginPath();
        context.fillStyle =
          `rgba(255,255,255,${dot.opacity})`;
        context.arc(
          dot.x,
          dot.y,
          dot.radius,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      frame = window.requestAnimationFrame(draw);
    };

    const sync = () => {
      if (canAnimate()) {
        if (!frame) {
          previousTime = 0;
          frame = window.requestAnimationFrame(draw);
        }
      } else {
        window.cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;

        if (reducedMotion.matches) {
          context.clearRect(0, 0, width, height);
        }
      }
    };

    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;

      const ratio = Math.min(
        window.devicePixelRatio || 1,
        2,
      );

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(
        MAX_DOTS,
        Math.max(
          24,
          Math.round((width * height) / 18000),
        ),
      );

      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.65 + Math.random() * 1.15,
        speed: (30 + Math.random() * 45) * SPEED,
        opacity: 0.25 + Math.random() * 0.5,
        trail:
          Math.random() > 0.65
            ? 4 + Math.random() * 6
            : 0,
      }));

      sync();
    };

    const resizeObserver = new ResizeObserver(resize);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        sync();
      },
      { rootMargin: '100px' },
    );

    resize();

    resizeObserver.observe(host);
    visibilityObserver.observe(host);

    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      document.removeEventListener(
        'visibilitychange',
        sync,
      );

      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
      />
    </div>
  );
}