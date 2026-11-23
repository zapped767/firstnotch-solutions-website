"use client";

import { useEffect, useRef } from "react";

export default function IntelligentFlowField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    /*
     * Creates the large circular / orbital flow visible
     * in your reference image.
     */
    const getFlowAngle = (x: number, y: number) => {
      /*
       * Move the flow origin outside the screen.
       * This is what gives us the huge cropped circular shape.
       */
      const originX = width * 0.05;
      const originY = height * 0.02;

      const dx = x - originX;
      const dy = y - originY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      /*
       * Tangent to a circle.
       */
      let angle = Math.atan2(dy, dx) + Math.PI / 2;

      /*
       * Add subtle organic distortion.
       */
      angle +=
        Math.sin(distance * 0.008 + time * 0.45) * 0.18 +
        Math.sin(x * 0.004 - time * 0.25) * 0.08 +
        Math.cos(y * 0.005 + time * 0.2) * 0.06;

      /*
       * Cursor interaction.
       */
      if (mouse.active) {
        const mdx = x - mouse.x;
        const mdy = y - mouse.y;

        const mouseDistance = Math.sqrt(
          mdx * mdx + mdy * mdy
        );

        const influence = Math.max(
          0,
          1 - mouseDistance / 260
        );

        if (influence > 0) {
          const mouseAngle =
            Math.atan2(mdy, mdx) + Math.PI / 2;

          angle =
            angle * (1 - influence * 0.42) +
            mouseAngle * (influence * 0.42);
        }
      }

      return angle;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.008;

      /*
       * Density.
       *
       * Smaller gap = more lines.
       * 16-20 gives a premium dense appearance
       * without destroying performance.
       */
      const gap = width < 768 ? 22 : 17;

      /*
       * We intentionally draw mainly around
       * the outside/right/bottom areas.
       *
       * This keeps the center readable for your
       * Results heading and metric cards.
       */
      for (let y = -80; y < height + 100; y += gap) {
        for (let x = -80; x < width + 100; x += gap) {
          const originX = width * 0.05;
          const originY = height * 0.02;

          const dx = x - originX;
          const dy = y - originY;

          const radius = Math.sqrt(dx * dx + dy * dy);

          /*
           * Large empty center similar to reference.
           */
          const minRadius = Math.min(width, height) * 0.48;

          if (radius < minRadius) continue;

          /*
           * Don't make the entire page equally dense.
           */
          const normalized =
            Math.min(
              1,
              (radius - minRadius) /
                (Math.max(width, height) * 0.6)
            );

          if (normalized <= 0) continue;

          const angle = getFlowAngle(x, y);

          /*
           * Longer lines near outside edge.
           */
          const length =
            18 + normalized * 48;

          const wave =
            Math.sin(
              x * 0.009 +
                y * 0.006 +
                time * 1.2
            ) * 6;

          const startX =
            x +
            Math.cos(angle + Math.PI / 2) *
              wave;

          const startY =
            y +
            Math.sin(angle + Math.PI / 2) *
              wave;

          const endX =
            startX + Math.cos(angle) * length;

          const endY =
            startY + Math.sin(angle) * length;

          /*
           * FirstNotch red.
           *
           * Some lines intentionally become stronger
           * to create the layered appearance from
           * your reference.
           */
          const emphasis =
            Math.sin(
              x * 0.013 +
                y * 0.008 +
                time
            );

          let alpha =
            0.08 + normalized * 0.16;

          let lineWidth = 0.65;

          if (emphasis > 0.78) {
            alpha = 0.42;
            lineWidth = 1.15;
          }

          if (emphasis > 0.94) {
            alpha = 0.72;
            lineWidth = 1.4;
          }

          ctx.beginPath();

          ctx.moveTo(startX, startY);

          /*
           * Slight curve rather than perfectly
           * straight strokes.
           */
          const midX =
            (startX + endX) / 2 +
            Math.cos(angle + Math.PI / 2) * 5;

          const midY =
            (startY + endY) / 2 +
            Math.sin(angle + Math.PI / 2) * 5;

          ctx.quadraticCurveTo(
            midX,
            midY,
            endX,
            endY
          );

          ctx.strokeStyle = `rgba(177, 32, 37, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = "round";

          ctx.stroke();
        }
      }

      animationFrame =
        requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener("resize", resize);

    canvas.addEventListener(
      "pointermove",
      handlePointerMove
    );

    canvas.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resize
      );

      canvas.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      canvas.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
        bg-white
      "
    >
      <canvas
        ref={canvasRef}
        className="
          pointer-events-auto
          absolute
          inset-0
          h-full
          w-full
        "
      />

      {/* Soft white readability area */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_42%_42%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.78)_32%,rgba(255,255,255,0.20)_65%,transparent_82%)]
        "
      />

      {/* Very subtle FirstNotch red atmosphere */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-[220px]
          -right-[180px]
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#B12025]/[0.035]
          blur-[120px]
        "
      />
    </div>
  );
}