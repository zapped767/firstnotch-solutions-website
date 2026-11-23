
"use client";

import { useEffect, useRef } from "react";

interface FlowingRedMeshProps {
  className?: string;
  opacity?: number;
  speed?: number;
  lineCount?: number;
  amplitude?: number;
}

export default function FlowingRedMesh({
  className = "",
  opacity = 1,
  speed = 0.65,
  lineCount = 95,
  amplitude = 38,
}: FlowingRedMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", {
      alpha: true,
    });

    if (!context) return;

    const ctx = context;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;
    let elapsed = 0;
    let visible = true;
    let reducedMotion = false;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const density = Math.max(
      12,
      Math.min(180, Math.floor(lineCount))
    );

    const waveSpeed = Math.max(0, speed);
    const waveAmplitude = Math.max(0, amplitude);

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      render(elapsed);
    };

    const render = (time: number) => {
      if (width <= 0 || height <= 0) return;

      ctx.clearRect(0, 0, width, height);

      const centerY = height * 0.5;

      // ============================================
      // FIRST WAVE — FLOWING RED SILK MESH
      // ============================================

      for (let i = 0; i < density; i++) {
        const offset = i - density / 2;
        const phase = i * 0.075;

        ctx.beginPath();

        for (let x = 0; x <= width + 5; x += 4) {
          const u = x / width;

          const waveOne =
            Math.sin(
              u * Math.PI * 3.8 -
                time * 0.75 +
                phase
            ) *
            waveAmplitude *
            Math.sin(u * Math.PI);

          const waveTwo =
            Math.sin(
              u * Math.PI * 6.2 +
                time * 0.38 +
                phase * 0.65
            ) *
            waveAmplitude *
            0.28;

          const twist =
            Math.sin(u * Math.PI * 2.1 + time * 0.3) *
            offset *
            0.32;

          const y =
            centerY +
            offset * (height / 280) * 2.8 +
            waveOne +
            waveTwo +
            twist;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const isHighlight = i % 8 === 0;

        ctx.strokeStyle = isHighlight
          ? "rgba(177,32,37,0.40)"
          : `rgba(177,32,37,${
              0.08 +
              (Math.sin(i * 0.12 + time * 0.3) + 1) *
                0.055
            })`;

        ctx.lineWidth = isHighlight ? 1.15 : 0.65;
        ctx.stroke();
      }

      // ============================================
      // SECOND WAVE — INTERSECTING RED STRANDS
      // ============================================

      const secondDensity = Math.floor(density * 0.65);

      for (let i = 0; i < secondDensity; i++) {
        const offset = i - secondDensity / 2;

        ctx.beginPath();

        for (let x = 0; x <= width + 5; x += 5) {
          const u = x / width;

          const wave =
            Math.sin(
              u * Math.PI * 3.5 +
                time * 0.55 +
                i * 0.045
            ) *
            waveAmplitude *
            0.8;

          const crossing =
            Math.cos(u * Math.PI * 1.8 - time * 0.25) *
            offset *
            0.5;

          const y =
            centerY -
            offset * (height / 300) * 2.7 +
            wave +
            crossing;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle =
          i % 9 === 0
            ? "rgba(177,32,37,0.26)"
            : "rgba(177,32,37,0.07)";

        ctx.lineWidth = 0.65;
        ctx.stroke();
      }

      // ============================================
      // THIRD LAYER — SUBTLE WHITE HIGHLIGHTS
      // ============================================

      for (let i = 0; i < 18; i++) {
        const offset = i - 9;

        ctx.beginPath();

        for (let x = 0; x <= width + 5; x += 6) {
          const u = x / width;

          const y =
            centerY +
            offset * 5 +
            Math.sin(
              u * Math.PI * 4.2 -
                time * 0.48 +
                i * 0.12
            ) *
              waveAmplitude *
              0.72;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    };

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;

      const delta = Math.min(
        (timestamp - lastTime) / 1000,
        0.05
      );

      lastTime = timestamp;

      if (!reducedMotion && visible) {
        elapsed += delta * waveSpeed;
        render(elapsed);
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches;
      lastTime = 0;

      if (reducedMotion) render(elapsed);
    };

    handleMotionChange();

    const resizeObserver = new ResizeObserver(
      resizeCanvas
    );

    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        lastTime = 0;
      },
      { threshold: 0 }
    );

    visibilityObserver.observe(canvas);

    motionQuery.addEventListener(
      "change",
      handleMotionChange
    );

    resizeCanvas();

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);

      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      motionQuery.removeEventListener(
        "change",
        handleMotionChange
      );
    };
  }, [speed, lineCount, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
      style={{
        opacity: Math.max(0, Math.min(1, opacity)),
      }}
    />
  );
}
