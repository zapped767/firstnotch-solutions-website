'use client';

// Ridgeline dither scene — the exact canvas engine from the 21st.dev
// "Mountain Footer with Dithered Ridges", lifted out so it can sit at the
// bottom of the hero. Six ridges of ridged noise, drifting valley mist,
// pointer parallax + clearing, altitude readout, click gust, reveal on view.

import * as React from 'react';

export interface RidgelineHeroSceneProps {
  /** Must match the hero background so the range dissolves into it. */
  paper?: string;
  ink?: string;
  line?: string;
  /** Dither tones from mist (paper) to deepest ridge. */
  tones?: string[];
  seed?: number;
  ridges?: number;
  pixel?: number;
  mist?: number;
  drift?: number;
  radius?: number;
  interactive?: boolean;
  altimeter?: boolean;
  monoFamily?: string;
  /** Height of the range. */
  height?: string;
  className?: string;
}

// Brand version of the evergreen / glacier ramps: cream -> FirstNotch red -> deep wine.
const BRAND_TONES = ['#FFF9F6', '#F8E1DD', '#EDB7B2', '#D98381', '#B12025', '#7A1217', '#3A0A0D'];

const MONO_STACK =
  '"JetBrains Mono", "Geist Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace';

// #region ridge helpers (unchanged from the original)

export function rdfHex(hex: string) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((hex || '').trim());
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

export function rdfPack(rgb: number[]) {
  return ((255 << 24) | (rgb[2] << 16) | (rgb[1] << 8) | rgb[0]) >>> 0;
}

export const RDF_BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64);

export function rdfDither(tone: number, n: number, b: number) {
  const t = tone < 0 ? 0 : tone > 1 ? 1 : tone;
  const v = Math.floor(t * (n - 1) + b);
  return v > n - 1 ? n - 1 : v;
}

export function rdfHash(x: number, y: number, seed: number) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function rdfNoise(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = rdfHash(xi, yi, seed);
  const b = rdfHash(xi + 1, yi, seed);
  const c = rdfHash(xi, yi + 1, seed);
  const d = rdfHash(xi + 1, yi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function rdfFbm(x: number, y: number, seed: number, octaves: number) {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  for (let o = 0; o < octaves; o++) {
    sum += rdfNoise(x, y, seed + o * 31) * amp;
    norm += amp;
    x *= 2.03;
    y *= 2.03;
    amp *= 0.5;
  }
  return norm > 0 ? sum / norm : 0;
}

export function rdfSmooth(e0: number, e1: number, x: number) {
  const t = e1 === e0 ? (x < e0 ? 0 : 1) : Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

export function rdfEase(t: number) {
  const c = t < 0 ? 0 : t > 1 ? 1 : t;
  return 1 - Math.pow(1 - c, 3);
}

export function rdfRidgeline(
  cols: number,
  rows: number,
  i: number,
  layers: number,
  seed: number,
  margin: number,
) {
  const k = layers > 1 ? i / (layers - 1) : 1;
  const n = cols + margin * 2;
  const out = new Float32Array(n);
  const base = rows * (0.38 + 0.66 * Math.pow(k, 1.4));
  const amp = rows * (0.2 + 0.24 * k);
  const freq = 6 - 3.8 * k;
  const flankL = rows * 0.5 * k * k * k * (0.55 + 0.6 * rdfHash(i, 11, seed));
  const flankR = rows * 0.5 * k * k * k * (0.55 + 0.6 * rdfHash(i, 13, seed));
  const ceil = rows * 0.17;
  const tilt = (rdfHash(i, 7, seed) - 0.5) * rows * 0.34 * (0.4 + k);
  const s = (seed | 0) * 13 + i * 101;
  for (let x = 0; x < n; x++) {
    const u = (x - margin) / cols;
    const r1 = 1 - Math.abs(rdfNoise(u * freq + i * 3.7, 0.5, s) * 2 - 1);
    const r2 = 1 - Math.abs(rdfNoise(u * freq * 2.3, 3.5, s + 1) * 2 - 1);
    const f = rdfFbm(u * freq * 4.1, 9.5, s + 2, 3);
    const h = r1 * r1 * 0.62 + r2 * 0.24 + f * 0.14;
    const e = Math.min(1.2, Math.abs(u * 2 - 1));
    const y =
      base - h * amp + tilt * (u - 0.5) * 2 - (u < 0.5 ? flankL : flankR) * e * e * Math.sqrt(e);
    out[x] = y < ceil ? ceil - (ceil - y) * 0.25 : y;
  }
  return out;
}

export function rdfElevation(crest: number, rows: number, layer: number, layers: number) {
  const up = rows > 0 ? 1 - Math.min(1, Math.max(0, crest / rows)) : 0;
  return Math.round(420 + up * 2600 + (layers - 1 - layer) * 140);
}
// #endregion

const RDF_CSS = `
.rdf-scene { position: relative; z-index: 1; width: 100%; overflow: hidden; }
.rdf-scene canvas {
  position: absolute; left: 0; bottom: 0; display: block; max-width: none;
  image-rendering: pixelated; image-rendering: crisp-edges;
}
.rdf-alt {
  position: absolute; left: 0; top: 0; z-index: 2; pointer-events: none; opacity: 0;
  transition: opacity .35s ease; font: 500 10px/1 var(--rdf-mono); letter-spacing: .08em; color: var(--rdf-ink);
}
.rdf-alt i {
  position: absolute; left: -4px; top: -4px; width: 8px; height: 8px; border-radius: 50%;
  background: var(--rdf-paper); box-shadow: 0 0 0 1.5px var(--rdf-ink);
}
.rdf-alt b { position: absolute; left: -.5px; bottom: 6px; width: 1px; height: 26px; background: var(--rdf-ink); opacity: .55; }
.rdf-alt span {
  position: absolute; left: 0; bottom: 34px; transform: translateX(-50%); white-space: nowrap; padding: 5px 7px 4px;
  border-radius: 5px; background: color-mix(in srgb, var(--rdf-paper) 88%, transparent); box-shadow: 0 0 0 1px var(--rdf-line);
  -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
}
`;

export default function RidgelineHeroScene({
  paper = '#FFF9F6',
  ink = '#17191C',
  line = '#F0DAD6',
  tones: tonesProp,
  seed = 7,
  ridges = 6,
  pixel = 2,
  mist = 0.8,
  drift = 1,
  radius = 130,
  interactive = true,
  altimeter = true,
  monoFamily = MONO_STACK,
  height = '380px',
  className = '',
}: RidgelineHeroSceneProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const altRef = React.useRef<HTMLDivElement | null>(null);
  const altTextRef = React.useRef<HTMLSpanElement | null>(null);
  const revealAt = React.useRef<number | null>(null);

  const tones = tonesProp && tonesProp.length >= 2 ? tonesProp : BRAND_TONES;
  const layers = Math.max(2, Math.min(9, Math.round(ridges)));

  const opts = React.useRef({ mist, drift, radius, interactive, altimeter });
  opts.current = { mist, drift, radius, interactive, altimeter };
  const key = [seed, layers, pixel, tones.join(',')].join('|');

  // Reveal starts the first time a fifth of the scene is on screen.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        if (revealAt.current === null) revealAt.current = reduced ? -Infinity : performance.now();
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pal = new Uint32Array(tones.map((t) => rdfPack(rdfHex(t) || [128, 128, 128])));
    const nTones = pal.length;

    let p = 2;
    let cols = 1;
    let rows = 1;
    let margin = 2;
    let img = null as ImageData | null;
    let buf = new Uint32Array(0);
    let tops = [] as Float32Array[];
    let pools = [] as Float32Array[];
    let colTop = new Float32Array(0);
    let colSlope = new Float32Array(0);
    let colPool = new Float32Array(0);
    let fog = new Float32Array(0);
    let fw = 1;
    let fh = 1;
    let ceil = 0;
    let fadeTo = 1;

    let raf = 0;
    let visible = true;
    let awake = true;
    let lastDraw = 0;
    let lastTick = performance.now();
    let tx = 0;
    let ty = 0;
    let ex = 0;
    let ey = 0;
    let inside = false;
    let clear = 0;
    let pt = 0;
    let pe = 0;
    let windV = 0;
    let windX = 0;
    let altShown = false;
    let altLabel = '';

    const layout = () => {
      const rect = root.getBoundingClientRect();
      p = Math.max(1, Math.round(pixel));
      cols = Math.max(8, Math.ceil(rect.width / p));
      rows = Math.max(8, Math.ceil(rect.height / p));
      canvas.width = cols;
      canvas.height = rows;
      canvas.style.width = cols * p + 'px';
      canvas.style.height = rows * p + 'px';
      img = ctx.createImageData(cols, rows);
      buf = new Uint32Array(img.data.buffer);
      margin = Math.ceil(cols * 0.045) + 3;
      ceil = Math.max(rows * 0.17, 92 / p);
      fadeTo = Math.max(rows * 0.3, 128 / p);
      tops = [];
      pools = [];
      for (let i = 0; i < layers; i++) {
        const t = rdfRidgeline(cols, rows, i, layers, seed, margin);
        for (let x = 0; x < t.length; x++) if (t[x] < ceil) t[x] = ceil - (ceil - t[x]) * 0.2;
        const pool = new Float32Array(t.length);
        for (let x = 0; x < t.length; x++)
          pool[x] = 0.45 + 1.1 * rdfFbm(((x - margin) / cols) * 4, i * 5.3, seed + 9, 2);
        tops.push(t);
        pools.push(pool);
      }
      colTop = new Float32Array(layers * cols);
      colSlope = new Float32Array(layers * cols);
      colPool = new Float32Array(layers * cols);
      fw = (cols >> 1) + 2;
      fh = (rows >> 1) + 2;
      fog = new Float32Array(fw * fh);
      awake = true;
    };

    const draw = (now: number) => {
      if (!img) return;
      const o = opts.current;
      const dt = Math.min(64, now - lastTick);
      lastTick = now;
      const live = o.interactive && !reduced;
      const age = revealAt.current === null ? -1 : now - revealAt.current;

      const ease = 1 - Math.pow(0.82, dt / 16.7);
      const slow = 1 - Math.pow(0.93, dt / 16.7);
      ex += (tx - ex) * ease;
      ey += (ty - ey) * ease;
      clear += ((inside && o.interactive ? 1 : 0) - clear) * slow;
      pe += ((live ? pt : 0) - pe) * slow;
      windV *= Math.pow(0.965, dt / 16.7);
      windX += (windV * dt) / 1000;
      const fogT = (reduced ? 0 : (now / 1000) * 0.045 * Math.max(0, o.drift)) + windX;

      const sx = 9 / cols;
      const sy = 4.4 / rows;
      for (let gy = 0; gy < fh; gy++) {
        const ny = gy * sy;
        for (let gx = 0; gx < fw; gx++) {
          const nx = gx * sx + fogT;
          const warp = rdfNoise(nx * 0.45 - fogT * 0.6, ny * 0.8, 77) * 0.6;
          const v = rdfFbm(nx + warp, ny + warp * 0.4, 31, 3);
          fog[gy * fw + gx] = rdfSmooth(0.3, 0.74, v);
        }
      }

      const rev = new Float32Array(layers);
      const k = new Float32Array(layers);
      const toneBase = new Float32Array(layers);
      const fogDepth = new Float32Array(layers);
      for (let i = 0; i < layers; i++) {
        k[i] = i / (layers - 1);
        rev[i] = age < 0 ? 0 : rdfEase((age - 380 - i * 170) / 1300);
        toneBase[i] = 0.16 + 0.76 * Math.pow(k[i], 1.6);
        fogDepth[i] = rows * (0.08 + 0.42 * k[i]);
        const rise = (1 - rev[i]) * rows * 0.09;
        const shift = Math.round(pe * (0.25 + k[i]) * 0.75 * (margin - 3));
        const t = tops[i];
        const last = t.length - 1;
        for (let x = 0; x < cols; x++) {
          const at = x + margin + shift;
          colTop[i * cols + x] = t[at] + rise;
          colSlope[i * cols + x] = t[Math.min(last, at + 2)] - t[Math.max(0, at - 2)];
          colPool[i * cols + x] = fogDepth[i] * pools[i][at];
        }
      }
      const lift = age < 0 ? 1 : 1 - rdfEase((age - 900) / 1800);
      const mistK = Math.max(0, Math.min(1, o.mist));
      const r = Math.max(1, o.radius / p);
      const r2 = r * r;

      for (let y = 0; y < rows; y++) {
        const fade = rdfSmooth(0, fadeTo, y);
        const frow = (y >> 1) * fw;
        const by = (y & 7) * 8;
        const dyc = (y - ey) * 1.5;
        for (let x = 0; x < cols; x++) {
          let L = -1;
          for (let i = layers - 1; i >= 0; i--) {
            if (y >= colTop[i * cols + x]) {
              L = i;
              break;
            }
          }
          let tone = 0;
          let mk = 0.3;
          if (L >= 0) {
            const kk = k[L];
            const d = y - colTop[L * cols + x];
            const depth = colPool[L * cols + x];
            const crest = 1 - rdfSmooth(0, depth, d) * (0.88 - 0.45 * kk);
            tone = toneBase[L] * crest;
            const sl = colSlope[L * cols + x] * 0.06;
            tone += (sl < -0.2 ? -0.2 : sl > 0.2 ? 0.2 : sl) * (1 - rdfSmooth(0, depth * 0.5, d));
            tone += (rdfHash(x + Math.round(colTop[L * cols + x] * 7), d | 0, L) - 0.5) * 0.07 * kk;
            tone *= rev[L];
            mk = 0.95 - 0.5 * kk;
          } else {
            tone = 0.05 * rdfSmooth(rows * 0.15, rows * 0.6, y);
          }

          let m = fog[frow + (x >> 1)] * mistK * mk;
          if (clear > 0.01) {
            const dx = x - ex;
            const q = (dx * dx + dyc * dyc) / r2;
            if (q < 4) {
              const c = clear * Math.exp(-q);
              m *= 1 - c * 0.92;
              if (L >= 0) tone += c * 0.16 * rev[L];
            }
          }
          if (tone > 0.93) tone = 0.93;
          m += lift * 0.55;
          if (m > 1) m = 1;
          tone = (tone * (1 - m) + 0.09 * m * (1 - lift)) * fade;

          buf[y * cols + x] = pal[rdfDither(tone, nTones, RDF_BAYER[by + (x & 7)])];
        }
      }
      ctx.putImageData(img, 0, 0);

      const alt = altRef.current;
      const label = altTextRef.current;
      let show = false;
      if (alt && label && o.altimeter && inside && age > 1600) {
        const x = Math.max(0, Math.min(cols - 1, Math.round(ex)));
        for (let i = layers - 1; i >= 0; i--) {
          const crest = colTop[i * cols + x];
          if (ey >= crest - 6) {
            show = true;
            alt.style.transform = 'translate(' + (x * p).toFixed(1) + 'px,' + (crest * p).toFixed(1) + 'px)';
            const text = rdfElevation(crest, rows, i, layers).toLocaleString('en-US') + ' m';
            if (text !== altLabel) {
              altLabel = text;
              label.textContent = text;
            }
            break;
          }
        }
      }
      if (alt && show !== altShown) {
        altShown = show;
        alt.style.opacity = show ? '1' : '0';
      }

      const settling =
        Math.abs(tx - ex) + Math.abs(ty - ey) > 0.05 ||
        Math.abs((inside && o.interactive ? 1 : 0) - clear) > 0.005 ||
        Math.abs((live ? pt : 0) - pe) > 0.001 ||
        Math.abs(windV) > 0.002;
      awake = (age >= 0 && age < 3400) || age < 0 || settling || (!reduced && o.drift > 0);
    };

    const busy = () => {
      const age = revealAt.current === null ? -1 : performance.now() - revealAt.current;
      return (age >= 0 && age < 3400) || inside || Math.abs(windV) > 0.002 || Math.abs(pt - pe) > 0.001;
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      if (revealAt.current === null) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (busy() || now - lastDraw > 32) {
        draw(now);
        lastDraw = now;
      }
      if (awake) raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      awake = true;
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const o = opts.current;
      if (!o.interactive && !o.altimeter) return;
      const b = root.getBoundingClientRect();
      pt = b.width > 0 ? ((e.clientX - b.left) / b.width) * 2 - 1 : 0;
      const lx = (e.clientX - b.left) / p;
      const ly = (e.clientY - b.top) / p;
      const was = inside;
      inside = lx >= 0 && ly >= 0 && lx < cols && ly < rows;
      tx = lx;
      ty = ly;
      if (inside && !was) {
        ex = tx;
        ey = ty;
      }
      wake();
    };
    const onLeave = () => {
      pt = 0;
      inside = false;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if (!opts.current.interactive || reduced || !inside) return;
      if ((e.target as HTMLElement).closest('a,button')) return;
      windV += tx < cols / 2 ? 1.4 : -1.4;
      wake();
    };

    layout();
    draw(performance.now());
    wake();

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointerdown', onDown);
    const ro = new ResizeObserver(() => {
      layout();
      draw(performance.now());
      wake();
    });
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true;
      if (visible) {
        lastTick = performance.now();
        wake();
      }
    });
    io.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointerdown', onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div
      ref={rootRef}
      className={'rdf-scene' + (className ? ' ' + className : '')}
      style={
        {
          height,
          '--rdf-paper': paper,
          '--rdf-ink': ink,
          '--rdf-line': line,
          '--rdf-mono': monoFamily,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <style>{RDF_CSS}</style>
      <canvas ref={canvasRef} />
      <div ref={altRef} className="rdf-alt">
        <b />
        <i />
        <span ref={altTextRef} />
      </div>
    </div>
  );
}