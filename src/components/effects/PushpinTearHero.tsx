'use client';

// PushpinTearHero — the 21st.dev "Pushpin Tear Footer" engine, reworked as a hero.
// A red poster sheet carries your (centred) hero content. Its bottom edge has been
// ripped away from a glossy pushpin, revealing the cream paper underneath, with a
// jagged ridge, white fibre rim and curled flaps that lift toward the pointer.
// Click the pin and it re-rips a new edge.
//
// No dependencies. Everything (tear, flaps, grain, pin) is SVG + canvas built from numbers.

import * as React from 'react';

// #region tear engine -------------------------------------------------------

type Flap = { at: number; span: number; len: number; skew: number; dir: number; jag: number[] };
type Tear = { ys: number[]; rim: number[]; lag: number[]; flaps: Flap[] };

const RIDGE_N = 84;
/** Off-screen start: the ridge begins below the bottom edge, so the sheet is whole. */
const START = 1.06;
const FLAPS = 6;

const clamp01 = (v: number) => (Number.isFinite(v) ? (v < 0 ? 0 : v > 1 ? 1 : v) : 0);

function rng(seed: number) {
  let a = (Number.isFinite(seed) ? Math.floor(seed) : 0) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const XS: number[] = (() => {
  const r = rng(911);
  const out: number[] = [];
  for (let i = 0; i < RIDGE_N; i++) {
    const u = i / (RIDGE_N - 1);
    const j = i > 0 && i < RIDGE_N - 1 ? (r() - 0.5) * (0.8 / RIDGE_N) : 0;
    out.push(-0.02 + u * 1.04 + j);
  }
  return out;
})();

/** Paper height (px) left under the centre of the tear for the pin to sit on. */
const PAPER_CENTRE = 235;

/**
 * The ridge is measured in pixels from the bottom of the hero, so the sheet
 * always keeps enough room for the hero text however tall the content grows.
 */
function makeTear(seed: number, W: number, H: number): Tear {
  const n = RIDGE_N;
  const r = rng(seed);
  const ph = [r() * 6.283, r() * 6.283, r() * 6.283];
  const K = 950 * Math.min(1, Math.max(0.2, W / 1400));
  const safeH = Math.max(H, 1);
  const ys: number[] = [];
  const rim: number[] = [];
  const lag: number[] = [];
  for (let i = 0; i < n; i++) {
    const x = XS[Math.min(i, XS.length - 1)];
    const d = Math.min(1, Math.abs(x - 0.5) * 2);
    const base = 0.43 + 0.3 * Math.pow(d, 1.35);
    const wander =
      (0.022 * Math.sin(x * 7 + ph[0]) + 0.016 * Math.sin(x * 13 + ph[1]) + 0.01 * Math.sin(x * 29 + ph[2])) *
      (0.45 + 0.55 * d);
    const spike = r() < 0.16 ? 2.3 : 1;
    const jag = (r() - 0.5) * 0.022 * spike;
    const u = Math.min(0.8, Math.max(0.4, base + wander + jag));
    ys.push(Math.min(0.97, 1 - (PAPER_CENTRE + (u - 0.43) * K) / safeH));
    rim.push(1.2 + r() * 3.6);
    lag.push(Math.min(0.48, d * 0.4 + 0.04 + 0.03 * Math.sin(x * 23 + ph[1]) + r() * 0.012));
  }
  const slots = [0.05, 0.19, 0.33, 0.67, 0.81, 0.95];
  const up = r() < 0.5 ? [2, 4] : [1, 3];
  const flaps: Flap[] = slots.map((slot, k) => {
    const x = slot + (r() - 0.5) * 0.05;
    const span = 3 + Math.floor(r() * 5);
    const at = Math.max(0, Math.min(n - 1 - span, Math.round(x * (n - 1))));
    const dir = up.includes(k) ? -1 : 1;
    const outer = k === 0 || k === slots.length - 1;
    // flap lengths are a share of the hero height; cap so they stay modest on tall heroes
    const cap = Math.min(1, 950 / safeH);
    const len =
      (dir < 0 ? 0.022 + r() * 0.022 : outer ? 0.085 + r() * 0.04 : 0.045 + r() * 0.05) * cap;
    return { at, span, len, skew: (r() - 0.5) * 1.1, dir, jag: [r() - 0.5, r() - 0.5, r() - 0.5, r() - 0.5] };
  });
  return { ys, rim, lag, flaps };
}

function easeTear(t: number) {
  const x = clamp01(t);
  if (x === 0 || x === 1) return x;
  const c1 = 0.9;
  return 1 + (c1 + 1) * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

const easeInOut = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

function introYs(tear: Tear, t: number) {
  return tear.ys.map((y, i) => START + (y - START) * easeTear((t - tear.lag[i]) / 0.5));
}

function morphYs(from: number[], to: Tear, t: number) {
  return to.ys.map((y, i) => {
    const a = from[i] ?? y;
    return a + (y - a) * easeInOut((t - to.lag[i] * 0.6) / 0.6);
  });
}

function flapOpen(tear: Tear, f: Flap, t: number) {
  return easeTear((t - tear.lag[f.at] - 0.18) / 0.32);
}

function flapPoly(ys: number[], f: Flap, W: number, H: number, open: number) {
  const b = Math.min(ys.length - 1, f.at + f.span);
  const top: number[][] = [];
  for (let k = f.at; k <= b; k++) top.push([XS[k] * W, ys[k] * H]);
  const A = top[0];
  const B = top[top.length - 1];
  const mx = (A[0] + B[0]) / 2;
  const my = (A[1] + B[1]) / 2;
  const L = f.len * H * Math.max(0, open);
  const tip = [mx + f.skew * L, my + f.dir * L];
  const side = (P: number[], Q: number[], j0: number, j1: number) => {
    const dx = Q[0] - P[0];
    const dy = Q[1] - P[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    return [
      [P[0] + dx / 3 + nx * j0 * 0.22 * L, P[1] + dy / 3 + ny * j0 * 0.22 * L],
      [P[0] + (dx * 2) / 3 + nx * j1 * 0.22 * L, P[1] + (dy * 2) / 3 + ny * j1 * 0.22 * L],
    ];
  };
  return [...top, ...side(B, tip, f.jag[0], f.jag[1]), tip, ...side(tip, A, f.jag[2], f.jag[3])];
}

const n1 = (v: number) => Math.round(v * 10) / 10;

function polyD(pts: number[][]) {
  return pts.length ? 'M' + pts.map((p) => n1(p[0]) + ' ' + n1(p[1])).join('L') + 'Z' : '';
}

function sheetD(ys: number[], W: number, H: number, off?: number[]) {
  let d = 'M-20 -20L' + (W + 20) + ' -20';
  for (let i = ys.length - 1; i >= 0; i--) d += 'L' + n1(XS[i] * W) + ' ' + n1(ys[i] * H - (off ? off[i] : 0));
  return d + 'Z';
}

function mixHex(a: string, b: string, t: number) {
  const p = (h: string) => {
    const s = h.replace('#', '');
    const f = s.length === 3 ? s.split('').map((c) => c + c).join('') : s.padEnd(6, '0').slice(0, 6);
    return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16) || 0);
  };
  const x = p(a);
  const y = p(b);
  const k = clamp01(t);
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join('');
}

// #endregion

/** The pushpin: glossy domed cap, waisted neck, flange, steel needle. */
function Pin({ base, id }: { base: string; id: string }) {
  const hi = mixHex(base, '#ffffff', 0.62);
  const mid = base;
  const lo = mixHex(base, '#000000', 0.42);
  const deep = mixHex(base, '#000000', 0.66);
  const t = { transition: 'stop-color .7s ease' };
  const side = (gid: string) => (
    <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" style={{ ...t, stopColor: lo }} />
      <stop offset=".24" style={{ ...t, stopColor: mid }} />
      <stop offset=".4" style={{ ...t, stopColor: hi }} />
      <stop offset=".58" style={{ ...t, stopColor: mid }} />
      <stop offset="1" style={{ ...t, stopColor: deep }} />
    </linearGradient>
  );
  return (
    <svg viewBox="0 0 100 200" className="tph-pin-svg" aria-hidden="true">
      <defs>
        {side(id + 's')}
        <radialGradient id={id + 't'} cx=".38" cy=".3" r=".8">
          <stop offset="0" style={{ ...t, stopColor: hi }} />
          <stop offset=".55" style={{ ...t, stopColor: mid }} />
          <stop offset="1" style={{ ...t, stopColor: lo }} />
        </radialGradient>
        <linearGradient id={id + 'n'} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#5b616b" />
          <stop offset=".4" stopColor="#f4f5f7" />
          <stop offset=".7" stopColor="#a3a9b2" />
          <stop offset="1" stopColor="#4a4f57" />
        </linearGradient>
        <filter id={id + 'b'} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <path d="M48.3 112h3.4l-.7 76-1 4-1-4z" fill={'url(#' + id + 'n)'} />
      <ellipse cx="50" cy="191.5" rx="3.2" ry="1.1" fill="#0b1a33" opacity=".35" />
      <path d="M28 103v6.5a22 7 0 0 0 44 0V103z" fill={'url(#' + id + 's)'} />
      <ellipse cx="50" cy="103" rx="22" ry="7" fill={'url(#' + id + 't)'} />
      <path
        d="M41.5 38c1.6 16 4.6 26 3 36-1.8 10-13 19-14.6 29h40.2c-1.6-10-12.8-19-14.6-29-1.6-10 1.4-20 3-36z"
        fill={'url(#' + id + 's)'}
      />
      <path d="M16 22v14a34 13 0 0 0 68 0V22z" fill={'url(#' + id + 's)'} />
      <ellipse cx="50" cy="22" rx="34" ry="13" fill={'url(#' + id + 't)'} />
      <ellipse cx="50" cy="22" rx="33" ry="12.3" fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth=".8" />
      <ellipse cx="37" cy="17.5" rx="12" ry="4" fill="#fff" opacity=".7" filter={'url(#' + id + 'b)'} />
      <path
        d="M22 38c4 4.5 9.5 6.4 15 7"
        stroke="#fff"
        strokeOpacity=".35"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        filter={'url(#' + id + 'b)'}
      />
      <path d="M45 50c.8 8 1.6 14 .8 22" stroke="#fff" strokeOpacity=".45" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof matchMedia === 'undefined') return;
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener('change', onMq);
    return () => mq.removeEventListener('change', onMq);
  }, []);
  return reduced;
}

const CSS = `
.tph{position:relative;display:flex;flex-direction:column;overflow:hidden;isolation:isolate;background:var(--tph-sheet);
  color:var(--tph-on-sheet);min-height:var(--tph-min);--ease:cubic-bezier(.22,1,.36,1)}
.tph *,.tph *::before,.tph *::after{box-sizing:border-box}
.tph-stage{position:absolute;left:0;top:0;max-width:none;display:block;pointer-events:none;z-index:0}
.tph.is-hit .tph-sheet-g{animation:tph-hit .32s cubic-bezier(.3,.7,.4,1)}
.tph-sheet{fill:var(--tph-sheet)}.tph-paper{fill:var(--tph-paper)}.tph-rim{fill:var(--tph-rim)}
.tph-content{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:124px 20px ${PAPER_CENTRE + 56}px}
@media (max-width:640px){.tph-content{padding:100px 20px ${PAPER_CENTRE + 40}px}}
.tph-pin{position:absolute;z-index:3;left:50%;bottom:32px;width:86px;height:172px;transform:translateX(-50%);cursor:pointer;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;background:none;border:0;padding:0}
@media (max-width:640px){.tph-pin{width:72px;height:144px}}
.tph-pin:focus-visible{outline:1.5px solid var(--tph-on-paper);outline-offset:6px;border-radius:6px}
.tph-tilt{position:absolute;inset:0;transform-origin:50% 100%;transform:rotate(calc(5deg + var(--tilt,0deg)));transition:transform .7s var(--ease)}
.tph-drop,.tph-body{position:absolute;inset:0;transform-origin:50% 100%}
.tph-body{transition:transform .32s var(--ease)}
.tph-pin-svg{position:absolute;inset:0;width:100%;height:100%;max-width:none;display:block;overflow:visible}
.tph-shadow{position:absolute;right:50%;bottom:-.5%;width:150%;height:24%;transform-origin:100% 50%;transform:rotate(16deg);
  transition:transform .45s var(--ease),opacity .45s}
.tph-shadow::before,.tph-shadow::after{content:'';position:absolute;top:50%;border-radius:50%;transform:translateY(-50%)}
.tph-shadow::before{right:0;width:100%;height:24%;background:linear-gradient(90deg,transparent,rgba(60,8,10,.26) 60%,rgba(60,8,10,.42));filter:blur(2px)}
.tph-shadow::after{left:-6%;width:60%;height:100%;background:radial-gradient(closest-side,rgba(60,8,10,.22),transparent);filter:blur(3px)}
.tph:not(.s2) .tph-pin{opacity:0;pointer-events:none}
.tph.s2 .tph-drop{animation:tph-drop .62s cubic-bezier(.5,0,.75,0) both}
.tph.s2 .tph-shadow{animation:tph-shade .62s cubic-bezier(.5,0,.75,0) both}
.tph-pin:hover .tph-body{transform:translateY(-3%)}
.tph-pin:hover .tph-shadow{transform:rotate(16deg) translateX(-5%) scaleX(1.06)}
.tph-pin[data-pin=lift] .tph-body{transform:translateY(-22%) rotate(-10deg);transition-duration:.3s}
.tph-pin[data-pin=lift] .tph-shadow{transform:rotate(16deg) translateX(-26%) scale(1.25);opacity:.55}
.tph-pin[data-pin=stab] .tph-body{animation:tph-stab .42s cubic-bezier(.55,0,.8,.2) both}
@keyframes tph-hit{0%{transform:translateY(0)}30%{transform:translateY(2px)}60%{transform:translateY(-.5px)}100%{transform:translateY(0)}}
@keyframes tph-drop{0%{transform:translateY(-70vh) rotate(-28deg) scale(1.5);opacity:0}25%{opacity:1}80%{transform:translateY(0) rotate(3deg) scale(1)}90%{transform:scale(1.04,.95)}100%{transform:none;opacity:1}}
@keyframes tph-shade{0%{transform:rotate(16deg) translateX(-60%) scale(2.4);opacity:0}80%{transform:rotate(16deg);opacity:1}100%{transform:rotate(16deg);opacity:1}}
@keyframes tph-stab{0%{transform:translateY(-22%) rotate(-10deg)}70%{transform:translateY(1.5%) rotate(1deg)}100%{transform:none}}
@media (prefers-reduced-motion: reduce){.tph *,.tph *::before,.tph *::after{animation:none!important;transition-duration:.01s!important;transition-delay:0s!important}}
`;

export interface PushpinTearHeroProps {
  /** Hero content, shown centred on the sheet. */
  children: React.ReactNode;
  /** Sheet (and pin) colour. */
  sheet?: string;
  /** Paper revealed under the tear. Match the next section's background. */
  paper?: string;
  /** Text colour on the sheet. */
  sheetInk?: string;
  /** Pin / paper-ink colour. Defaults to the sheet colour. */
  paperInk?: string;
  /** Which tear to generate. Click the pin to cycle. */
  seed?: number;
  /** CSS min-height of the hero. */
  minHeight?: string;
  className?: string;
  onRepin?: (seed: number) => void;
}

export default function PushpinTearHero({
  children,
  sheet = '#B12025',
  paper = '#FFF9F6',
  sheetInk = '#FFFFFF',
  paperInk,
  seed = 7,
  minHeight = 'max(100svh, 760px)',
  className = '',
  onRepin,
}: PushpinTearHeroProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const rootRef = React.useRef<HTMLElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const sheetRef = React.useRef<SVGPathElement>(null);
  const rimRef = React.useRef<SVGPathElement>(null);
  const flapRefs = React.useRef<(SVGPathElement | null)[]>([]);
  const gradRefs = React.useRef<(SVGLinearGradientElement | null)[]>([]);
  const pinRef = React.useRef<HTMLButtonElement>(null);
  const timers = React.useRef<number[]>([]);

  const still = useReducedMotion();
  const [stage, setStage] = React.useState(0);
  const [hit, setHit] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [pin, setPin] = React.useState<'idle' | 'lift' | 'stab'>('idle');
  const [grain, setGrain] = React.useState('');

  const s = React.useRef({
    W: 0,
    H: 0,
    tear: makeTear(seed, 1400, 900),
    prev: null as Tear | null,
    from: [] as number[],
    ys: [] as number[],
    mode: 'wait' as 'wait' | 'intro' | 'morph' | 'rest',
    t0: 0,
    dur: 1,
    raf: 0,
    px: -1e4,
    py: -1e4,
    lift: new Array(FLAPS).fill(0) as number[],
    still: false,
    busy: false,
    seed,
  }).current;
  s.still = still;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  // ---- drawing -------------------------------------------------------------
  const frame = React.useCallback(
    (now: number) => {
      s.raf = 0;
      const { W, H, tear } = s;
      if (!W || !H) return;
      let busy = false;
      let ys: number[];
      const open = new Array(FLAPS).fill(1);
      const openOld = new Array(FLAPS).fill(0);
      if (s.mode === 'wait') {
        ys = tear.ys.map(() => START);
        open.fill(0);
      } else if (s.mode === 'intro') {
        const p = (now - s.t0) / s.dur;
        ys = introYs(tear, Math.min(1, p));
        tear.flaps.forEach((f, k) => (open[k] = flapOpen(tear, f, Math.min(1, p))));
        if (p >= 1) s.mode = 'rest';
        else busy = true;
      } else if (s.mode === 'morph') {
        const p = (now - s.t0) / s.dur;
        ys = morphYs(s.from, tear, Math.min(1, p));
        open.fill(easeTear((p - 0.5) / 0.5));
        openOld.fill(1 - easeInOut(p / 0.35));
        if (p >= 1) s.mode = 'rest';
        else busy = true;
      } else ys = tear.ys;
      s.ys = ys;

      tear.flaps.forEach((f, k) => {
        const b = Math.min(ys.length - 1, f.at + f.span);
        const mx = ((XS[f.at] + XS[b]) / 2) * W;
        const my = ((ys[f.at] + ys[b]) / 2) * H;
        const target = s.still ? 0 : clamp01(1 - Math.hypot(s.px - mx, s.py - my) / (0.2 * Math.max(W, 520)));
        s.lift[k] += (target - s.lift[k]) * 0.14;
        if (Math.abs(target - s.lift[k]) > 0.003) busy = true;
        open[k] *= 1 + 0.32 * s.lift[k];
      });

      sheetRef.current?.setAttribute('d', sheetD(ys, W, H, tear.rim));
      rimRef.current?.setAttribute('d', sheetD(ys, W, H));
      const draw = (k: number, f: Flap | undefined, o: number) => {
        const el = flapRefs.current[k];
        const g = gradRefs.current[k];
        if (!el || !g) return;
        if (!f || o < 0.01) return el.setAttribute('d', '');
        const pts = flapPoly(ys, f, W, H, o);
        el.setAttribute('d', polyD(pts));
        const b = Math.min(ys.length - 1, f.at + f.span);
        const tip = pts[f.span + 3];
        g.setAttribute('x1', String(((XS[f.at] + XS[b]) / 2) * W));
        g.setAttribute('y1', String(((ys[f.at] + ys[b]) / 2) * H));
        g.setAttribute('x2', String(tip[0]));
        g.setAttribute('y2', String(tip[1]));
      };
      for (let k = 0; k < FLAPS; k++) {
        draw(k, tear.flaps[k], open[k]);
        draw(FLAPS + k, s.prev?.flaps[k], openOld[k]);
      }
      if (busy) s.raf = requestAnimationFrame(frame);
    },
    [s]
  );

  const kick = React.useCallback(() => {
    if (!s.raf && typeof requestAnimationFrame !== 'undefined') s.raf = requestAnimationFrame(frame);
  }, [s, frame]);

  // size — the tear is measured from the bottom, so rebuild it whenever the hero resizes
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      s.W = el.clientWidth;
      s.H = el.clientHeight;
      s.tear = makeTear(s.seed, s.W, s.H);
      const svg = svgRef.current;
      if (svg) {
        svg.setAttribute('width', String(s.W));
        svg.setAttribute('height', String(s.H));
        svg.setAttribute('viewBox', '0 0 ' + s.W + ' ' + s.H);
      }
      kick();
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [s, kick]);

  // visibility
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setVisible(true);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.22 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // grain tile, once
  React.useEffect(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 160;
    const g = c.getContext('2d');
    if (!g) return;
    const img = g.createImageData(160, 160);
    const r = rng(42);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = r() < 0.5 ? 0 : 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = Math.floor(r() * 46);
    }
    g.putImageData(img, 0, 0);
    setGrain(c.toDataURL());
  }, []);

  // the opening: pin drops, sheet rips
  React.useEffect(() => {
    if (!visible || stage > 0) return;
    if (still) {
      setStage(3);
      s.mode = 'rest';
      kick();
      return;
    }
    setStage(1);
    later(() => setStage(2), 640);
    later(() => {
      setHit(true);
      setStage(3);
      s.mode = 'intro';
      s.t0 = performance.now();
      s.dur = 1550;
      kick();
    }, 1140);
    later(() => setHit(false), 1480);
  }, [visible, stage, still, s, kick]);

  React.useEffect(
    () => () => {
      timers.current.forEach((id) => clearTimeout(id));
    },
    []
  );

  // a new seed from outside re-tears in place
  React.useEffect(() => {
    if (seed === s.seed) return;
    s.seed = seed;
    s.prev = s.tear;
    s.from = s.ys.length ? s.ys : s.tear.ys;
    s.tear = makeTear(seed, s.W, s.H);
    if (s.mode !== 'wait') {
      s.mode = still ? 'rest' : 'morph';
      s.t0 = performance.now();
      s.dur = 1100;
    }
    kick();
  }, [seed, still, s, kick]);

  // ---- actions ------------------------------------------------------------
  const onPointerMove = (e: React.PointerEvent) => {
    const el = rootRef.current;
    if (!el || s.still) return;
    const r = el.getBoundingClientRect();
    s.px = e.clientX - r.left;
    s.py = e.clientY - r.top;
    const tilt = Math.max(-9, Math.min(9, (s.px / r.width - 0.5) * 18));
    pinRef.current?.style.setProperty('--tilt', tilt.toFixed(2) + 'deg');
    kick();
  };
  const onPointerLeave = () => {
    s.px = s.py = -1e4;
    pinRef.current?.style.setProperty('--tilt', '0deg');
    kick();
  };

  const repin = () => {
    if (s.busy || stage < 3) return;
    const next = s.seed + 1;
    const swap = () => {
      s.seed = next;
      s.prev = s.tear;
      s.from = s.ys.length ? s.ys : s.tear.ys;
      s.tear = makeTear(next, s.W, s.H);
    };
    if (still) {
      swap();
      s.prev = null;
      s.mode = 'rest';
      kick();
      onRepin?.(next);
      return;
    }
    s.busy = true;
    setPin('lift');
    later(() => {
      swap();
      s.mode = 'morph';
      s.t0 = performance.now();
      s.dur = 1150;
      kick();
    }, 300);
    later(() => setPin('stab'), 1280);
    later(() => {
      setPin('idle');
      s.busy = false;
      onRepin?.(next);
    }, 1720);
  };

  // ---- colours ------------------------------------------------------------
  const isHex = (v: string) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v);
  const pinBase = isHex(sheet) ? sheet : '#B12025';
  const flapBase = mixHex(isHex(paper) ? paper : '#FFF9F6', '#ffffff', 0.35);
  const vars = {
    '--tph-min': minHeight,
    '--tph-sheet': sheet,
    '--tph-paper': paper,
    '--tph-on-sheet': sheetInk,
    '--tph-on-paper': paperInk ?? sheet,
    '--tph-rim': mixHex(flapBase, '#ffffff', 0.6),
  } as React.CSSProperties;

  const cls = ['tph', stage >= 1 && 's1', stage >= 2 && 's2', stage >= 3 && 's3', hit && 'is-hit', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={rootRef} className={cls} style={vars} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <style>{CSS}</style>

      <svg ref={svgRef} className="tph-stage" aria-hidden="true">
        <defs>
          <radialGradient id={uid + 'v'} cx=".5" cy=".78" r=".75">
            <stop offset=".45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#3a0a0d" stopOpacity=".07" />
          </radialGradient>
          <linearGradient id={uid + 'l'} x1="0" y1="0" x2=".35" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".13" />
            <stop offset=".55" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#200003" stopOpacity=".14" />
          </linearGradient>
          {grain && (
            <pattern id={uid + 'g'} width="160" height="160" patternUnits="userSpaceOnUse">
              <image href={grain} width="160" height="160" />
            </pattern>
          )}
          <filter id={uid + 'd'} x="-5%" y="-5%" width="110%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#3a0a0d" floodOpacity=".3" />
          </filter>
          <filter id={uid + 'f'} x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="-2" dy="4" stdDeviation="4" floodColor="#3a0a0d" floodOpacity=".26" />
          </filter>
          {Array.from({ length: FLAPS * 2 }, (_, k) => (
            <linearGradient
              key={k}
              id={uid + 'fg' + k}
              ref={(el) => {
                gradRefs.current[k] = el;
              }}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor={mixHex(flapBase, '#3a1a1c', 0.34)} />
              <stop offset=".5" stopColor={mixHex(flapBase, '#3a1a1c', 0.08)} />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
          ))}
          <path id={uid + 's'} ref={sheetRef} />
        </defs>
        <rect className="tph-paper" width="100%" height="100%" />
        <rect width="100%" height="100%" fill={'url(#' + uid + 'v)'} style={{ mixBlendMode: 'multiply' }} />
        {grain && <rect width="100%" height="100%" fill={'url(#' + uid + 'g)'} opacity=".32" />}
        <g className="tph-sheet-g" filter={'url(#' + uid + 'd)'}>
          <path ref={rimRef} className="tph-rim" />
          <use href={'#' + uid + 's'} className="tph-sheet" />
        </g>
        <use href={'#' + uid + 's'} fill={'url(#' + uid + 'l)'} />
        {grain && <use href={'#' + uid + 's'} fill={'url(#' + uid + 'g)'} opacity=".5" />}
        <g filter={'url(#' + uid + 'f)'}>
          {Array.from({ length: FLAPS * 2 }, (_, k) => (
            <path
              key={k}
              ref={(el) => {
                flapRefs.current[k] = el;
              }}
              fill={'url(#' + uid + 'fg' + k + ')'}
            />
          ))}
        </g>
      </svg>

      {/* HERO CONTENT, centred on the sheet */}
      <div className="tph-content">{children}</div>

      {/* THE PIN */}
      <button
        ref={pinRef}
        type="button"
        className="tph-pin"
        data-pin={pin}
        onClick={repin}
        aria-label="Re-pin: tear a new edge"
        title="Pull the pin"
      >
        <span className="tph-shadow" aria-hidden="true" />
        <span className="tph-tilt">
          <span className="tph-drop">
            <span className="tph-body">
              <Pin base={pinBase} id={uid + 'p'} />
            </span>
          </span>
        </span>
      </button>
    </section>
  );
}