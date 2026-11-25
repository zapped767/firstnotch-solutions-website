'use client';

/* HiringCrowdHero — port of the 21st.dev "signal-led outbound" crowd hero.
   A crowd of applicants walks past. One person is picked, a check pops over
   them ("Passed the technical assessment"), a verdict line is typed, an offer
   flies from the FirstNotch beacon along an arc, and the reply comes back.
   Only a few applicants are ever picked, which is the whole point of the page.

   Differences from the original:
   - FirstNotch red + white theme
   - hiring roles instead of cold-email signals
   - GSAP (already in your project) instead of the `motion` package
   - responsive: the layout is measured from the text block instead of fixed px
   - no built-in nav (your site header stays)                                    */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

/* Open Peeps (CC0) crowd, served from the original author's public bucket.
   Tip: download these into /public/peeps and point ASSET() at them for production. */
const ASSET = (id: string) =>
  `https://wbarljqnwyapytycfglm.supabase.co/storage/v1/object/public/canvas_assets/c5b084d7-d978-4942-8775-19c92226e9c1/${id}.svg`;

const PEEPS = [
  '381d6479-f5b5-49ca-82f3-474c87c62996',
  '9df39fca-20db-4273-bf7e-488d04a13321',
  '3c8ee64a-67b3-4a2c-84d5-c665c725e7c5',
  '3ccafa92-f479-4885-a6fb-0af92993b7f6',
  '735686b6-9bd5-4ab1-9fe6-59c50b5e2eb0',
  '3f775475-8920-4f55-b7c1-16bf192a0b1f',
  'b56ceaf5-7fb3-40a2-bb1a-d41c547c71ca',
  '4bd0452d-b321-4488-b57a-0c52dc73ceb1',
  '5d3553c5-a46f-4238-bcb5-02ff60b0f907',
  '6669baf9-e6d8-476b-abd4-e3d52517aee8',
  '2a2fffcb-9e4e-4610-a2ec-c2c334e29001',
  '742a5c0b-c77f-4ab3-96eb-dbca387f5ff8',
  'da0b3073-d6fd-46d2-a1f6-747fbfedf2b1',
  'd9738cd5-9685-47c4-9eab-e004c4d83776',
  '706557e0-8408-4b07-bcab-2968cf4c493e',
  '45a054f3-181d-4746-983d-12be5078e2f0',
  '38ab3806-883c-4868-9198-a1db96941d06',
  '6a165ed6-e6e5-4695-9aff-bd2cd51c4b1e',
  'c5d7e55b-3899-4297-8632-a5f6a186ac05',
  '25b3470e-e046-42f5-9b36-591d37e72d28',
].map(ASSET);

type Tone = 'caution' | 'route' | 'plain';

export type HireStep = {
  /** Role chip shown over the picked applicant */
  tag: string;
  tc: Tone;
  /** What the applicant achieved */
  signal: string;
  /** Small label on the typing pill */
  lab: string;
  /** Verdict line that gets typed */
  line: string;
  /** Applicant's reply chip + text */
  rtag: string;
  rc: Tone;
  reply: string;
};

const DEFAULT_DATA: HireStep[] = [
  {
    tag: 'Business Manager',
    tc: 'route',
    signal: 'Passed the language test in English and Sinhala',
    lab: 'Check · Experience',
    line: '8 years leading client accounts —',
    rtag: 'Accepted',
    rc: 'route',
    reply: 'Happy to join. When do I start?',
  },
  {
    tag: 'Call Center Agent',
    tc: 'route',
    signal: 'Scored 94% on the spoken English test',
    lab: 'Check · Assessment',
    line: 'Calm, clear and polite on live calls —',
    rtag: 'Accepted',
    rc: 'route',
    reply: 'Ready to start account training Monday.',
  },
  {
    tag: 'Developer',
    tc: 'route',
    signal: 'Passed the practical technical assessment',
    lab: 'Check · Technical',
    line: 'Clean code, references verified —',
    rtag: 'Question',
    rc: 'plain',
    reply: 'Can I meet the client team first?',
  },
  {
    tag: 'Content Writer',
    tc: 'route',
    signal: 'Writing sample reviewed, 3 references verified',
    lab: 'Check · References',
    line: 'Clear writing, confirmed work history —',
    rtag: 'Accepted',
    rc: 'route',
    reply: 'Great. Sending my signed agreement.',
  },
  {
    tag: 'Operations Officer',
    tc: 'route',
    signal: 'Process test passed, client sign-off complete',
    lab: 'Check · Final test',
    line: 'Accurate, organised and reliable —',
    rtag: 'Accepted',
    rc: 'route',
    reply: 'Excited to join the account team.',
  },
];

const CSS = `
.hch{--base:#ffffff;--c1:#f4b9bc;--c2:#e4777d;--c3:#f9d3d4;--c4:#fde8e8;--ac:177,32,37;--route:rgb(var(--ac));--route2:#941A1F;--tint:#fdeaea;--rline:#f5d2d3;--panel:#fff;--ink:#17191C;--ink2:#3a3d42;--muted:#5d6066}
.hch,.hch *{box-sizing:border-box}
.hch{position:relative;width:100%;min-height:860px;overflow:hidden;background:var(--base);color:var(--ink);-webkit-font-smoothing:antialiased}
.hch a{color:inherit;text-decoration:none}
.hch .bg{position:absolute;inset:0;overflow:hidden;background:var(--base)}
.hch .bg i{position:absolute;border-radius:50%;filter:blur(80px);opacity:.2;will-change:transform}
.hch .b1{left:-14%;top:48%;width:58%;height:84%;background:var(--c1);animation:hch-d1 24s ease-in-out infinite alternate}
.hch .b2{left:24%;top:58%;width:54%;height:76%;background:var(--c2);opacity:.14;animation:hch-d2 28s ease-in-out infinite alternate}
.hch .b3{right:-16%;top:42%;width:56%;height:88%;background:var(--c3);animation:hch-d3 26s ease-in-out infinite alternate}
.hch .b4{left:52%;top:52%;width:26%;height:36%;background:var(--c4);animation:hch-d2 20s ease-in-out infinite alternate-reverse}
.hch .dome{position:absolute;left:-28%;right:-28%;top:-52%;height:112%;border-radius:50%;background:radial-gradient(closest-side,#fff 64%,rgba(255,255,255,.86) 78%,rgba(255,255,255,0) 100%)}
.hch .grain{position:absolute;inset:0;width:100%;height:100%;opacity:.05}
@keyframes hch-d1{to{transform:translate(9%,-7%) scale(1.08)}}
@keyframes hch-d2{to{transform:translate(-8%,-5%) scale(1.1)}}
@keyframes hch-d3{to{transform:translate(-7%,6%) scale(1.06)}}
.hch .fx{position:absolute;z-index:3;left:0;top:0;width:100%;height:100%;pointer-events:none}
.hch .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:48px;padding:0 22px;border-radius:999px;border:1px solid rgba(23,25,28,.14);background:rgba(255,255,255,.8);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:var(--ink);font-size:13px;font-weight:600;transition:background .2s,border-color .2s,color .2s,transform .35s cubic-bezier(.3,1.6,.5,1),box-shadow .3s}
.hch .btn:hover{background:#fff;border-color:rgba(var(--ac),.5);color:var(--route)}
.hch .btn.pri{border-color:transparent;background:var(--route);color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 10px 24px -10px rgba(var(--ac),.75)}
.hch .btn.pri:hover{background:var(--route2);color:#fff;transform:translateY(-1px)}
.hch .hero{position:absolute;z-index:6;left:0;right:0;top:118px;padding:0 20px;text-align:center}
.hch .kick{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--route)}
.hch .kick i{width:6px;height:6px;border-radius:50%;background:var(--route);box-shadow:0 0 0 4px rgba(var(--ac),.16)}
.hch h1{margin:16px 0 0;font-size:clamp(46px,8vw,112px);line-height:1;letter-spacing:-.07em;font-weight:600;color:var(--ink)}
.hch h1 .w{display:inline-block}
.hch h1 em{font-style:normal;color:var(--route)}
.hch .ph{position:relative;white-space:nowrap}
.hch .ph::after{content:"";position:absolute;z-index:-1;left:-.04em;right:-.04em;bottom:.09em;height:.3em;border-radius:.08em;background:var(--rline);transform:scaleX(0);transform-origin:0 50%;opacity:0}
.hch .ph.hit::after{animation:hch-mark 1.8s cubic-bezier(.5,0,.2,1)}
.hch .ph.lit::after{transform:none;opacity:1}
@keyframes hch-mark{0%{transform:scaleX(0);opacity:1}28%{transform:scaleX(1);opacity:1}76%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}
.hch .lead{max-width:680px;margin:20px auto 0;font-size:clamp(12px,1.25vw,16px);line-height:1.7;color:var(--muted)}
.hch .ctas{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:24px}
.hch .beacon{position:absolute;z-index:5;left:50%;top:414px;width:60px;height:60px;margin-left:-30px}
.hch .btile{width:100%;height:100%;border-radius:18px;background:var(--route);display:grid;place-items:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 0 0 6px rgba(255,255,255,.7),0 0 0 7px rgba(var(--ac),.18),0 18px 34px -12px rgba(var(--ac),.75)}
.hch .btile svg{width:28px;height:28px;display:block}
.hch .compose{position:absolute;z-index:5;left:50%;top:488px;pointer-events:none}
.hch .cen{position:absolute;left:0;top:0;transform:translateX(-50%);width:max-content}
.hch .cbox{display:flex;align-items:center;gap:8px;height:30px;padding:0 13px 0 5px;border-radius:999px;background:rgba(255,255,255,.94);border:1px solid rgba(23,25,28,.08);box-shadow:0 14px 30px -14px rgba(60,10,12,.4);font-size:13px;white-space:nowrap;transform:scale(0);transform-origin:50% 0}
.hch .cbox .lab{height:20px;padding:0 8px;border-radius:999px;background:var(--tint);color:var(--route2);font:500 11px/20px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.hch .caret{width:1.5px;height:14px;margin-left:-6px;background:var(--route);animation:hch-blink 1s steps(1) infinite}
@keyframes hch-blink{50%{opacity:0}}
.hch .crowd{position:absolute;z-index:2;left:0;right:0;top:540px;height:360px;pointer-events:none}
.hch .pw{position:absolute;left:0}
.hch .pe{width:100%;height:100%;will-change:transform;transform-origin:50% 88%}
.hch .hp{position:relative;width:100%;height:100%}
.hch .pw img{display:block;width:100%;height:100%;transition:filter .45s,transform .5s cubic-bezier(.3,1.6,.5,1)}
.hch .tip{position:absolute;z-index:4;left:0;top:0;pointer-events:none;will-change:transform}
.hch .tip .cen{top:auto;bottom:0}
.hch .tbox{position:relative;display:flex;align-items:center;gap:8px;height:36px;padding:0 13px 0 7px;border-radius:12px;background:var(--panel);border:1px solid rgba(23,25,28,.08);box-shadow:0 18px 40px -16px rgba(60,10,12,.42),0 2px 6px -2px rgba(60,10,12,.12);font-size:13px;font-weight:600;white-space:nowrap;transform:scale(0);transform-origin:50% 100%}
.hch .tbox::after{content:"";position:absolute;left:50%;bottom:-5px;width:9px;height:9px;margin-left:-5px;background:var(--panel);border-right:1px solid rgba(23,25,28,.08);border-bottom:1px solid rgba(23,25,28,.08);transform:rotate(45deg)}
.hch .tbox.reply{font-weight:500}
.hch .tg{display:inline-flex;align-items:center;height:22px;padding:0 7px;border-radius:6px;font-size:12px;font-weight:600}
.hch .tg.caution{color:#7a5a12;background:#fbf3db}
.hch .tg.route{color:#B12025;background:#fdeaea}
.hch .tg.plain{color:#4b4a47;background:#efefed}
@media (max-width:700px){
  .hch .hero{top:100px}
  .hch .ph{white-space:normal}
  .hch .btn{height:42px;padding:0 16px;font-size:11px}
  .hch .tbox{font-size:11.5px;height:32px}
  .hch .cbox{font-size:11.5px}
  .hch .tg{font-size:10.5px;height:20px}
}
@media (prefers-reduced-motion:reduce){.hch *{animation:none!important;transition:none!important}}
`;

export interface HiringCrowdHeroProps {
  kicker?: string;
  /** First highlighted part of the headline */
  titleA?: string;
  /** Second highlighted part (shown in red) */
  titleB?: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  data?: HireStep[];
  className?: string;
}

const words = (s: string) =>
  s.split(' ').map((w, i, a) => (
    <span key={i}>
      <span className="w">{w}</span>
      {i < a.length - 1 ? ' ' : null}
    </span>
  ));

export default function HiringCrowdHero({
  kicker = 'THE FIRSTNOTCH STANDARD',
  titleA = 'How we',
  titleB = 'hire.',
  lead = 'The people on your account are chosen carefully, trained on your work and measured after they start. Every applicant goes through language, technical, experience and reference checks first.',
  primary = { label: 'See the hiring process', href: '#screening' },
  secondary = { label: 'View careers', href: '/work-with-us' },
  data = DEFAULT_DATA,
  className = '',
}: HiringCrowdHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const $ = (s: string) => root.querySelector(s) as HTMLElement;
    const frozen =
      !!navigator.webdriver || matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animated = !frozen;

    let seed = frozen ? 11 : (Math.random() * 1e9) | 0;
    const rnd = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

    const fx = $('.fx') as HTMLCanvasElement;
    const g = fx.getContext('2d')!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const hero = $('.hero');
    const beacon = $('.beacon');
    const compose = $('.compose');
    const crowd = $('.crowd');

    let W = root.clientWidth;
    let H = root.clientHeight;
    let BY = 444; // beacon centre (where emails leave from)
    let TOP = 540; // top of the crowd band
    let BH = 360; // height of the crowd band
    let SC = 1; // people scale

    /* Layout is measured from the text block, so it works at any width. */
    const size = () => {
      W = root.clientWidth;
      SC = Math.max(0.55, Math.min(1, W / 1440));
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      BY = Math.round(heroBottom + 46);
      TOP = BY + Math.round(96 * Math.max(0.8, SC));
      BH = Math.round(360 * Math.max(0.78, SC));
      beacon.style.top = BY - 30 + 'px';
      compose.style.top = BY + 44 + 'px';
      crowd.style.top = TOP + 'px';
      crowd.style.height = BH + 'px';
      const total = TOP + BH;
      if (root.style.height !== total + 'px') root.style.height = total + 'px';
      root.style.minHeight = '0';
      H = root.clientHeight;
      fx.width = W * dpr;
      fx.height = H * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* the accent comes from the theme, so the beams match the background */
    const AC = getComputedStyle(root).getPropertyValue('--ac').trim() || '177,32,37';
    const COL = `rgb(${AC})`;
    const al = (o: number) => `rgba(${AC},${o})`;

    /* the crowd: applicants nobody picked stay faded; farther away = lighter */
    const P: any[] = [];
    crowd.innerHTML = '';
    const fade = (p: any) =>
      `blur(${Math.max(0, (74 - p.t) * 0.045).toFixed(2)}px) contrast(${(0.36 + 0.3 * p.depth).toFixed(
        2
      )}) brightness(${(1 / (0.68 + 0.15 * p.depth)).toFixed(2)})`;
    function place(p: any, anywhere: boolean) {
      p.t = 31 + rnd() * 54;
      p.depth = (p.t - 31) / 54;
      p.w = (146 + (p.t - 31.8) * 2.62) * SC;
      p.h = p.w * 1.35;
      p.dir = rnd() < 0.5 ? 1 : -1;
      p.speed = 108 / (12 + rnd() * 26);
      p.x = anywhere ? -4 + rnd() * 108 : p.dir > 0 ? -10 : 110;
      p.v = 1;
      p.state = 'walk';
      p.reached = false;
      p.ph = rnd() * 6.283;
      p.f = 1.5 + p.speed * 0.22;
      p.bob = 0;
      p.px = (p.x / 100) * W;
      p.el.className = 'pw';
      p.el.style.cssText = `top:${p.t.toFixed(2)}%;width:${p.w.toFixed(1)}px;height:${p.h.toFixed(
        1
      )}px;z-index:${p.t | 0}`;
      p.img.src = PEEPS[(rnd() * PEEPS.length) | 0];
      p.img.style.filter = fade(p);
      p.img.style.transform = `scaleX(${p.dir})`;
    }

    size();

    const count = W < 700 ? 28 : 42;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.innerHTML =
        '<div class="pe"><div class="hp"><img alt="" draggable="false" decoding="async"></div></div>';
      crowd.appendChild(el);
      const p = {
        el,
        pe: el.firstChild as HTMLElement,
        hp: el.firstChild!.firstChild as HTMLElement,
        img: el.querySelector('img')!,
      };
      place(p, true);
      P.push(p);
    }
    const head = (p: any) => [p.px, TOP + (BH * p.t) / 100 - p.h / 2 + p.h * 0.3 + p.bob];

    const onSize = () => {
      size();
      P.forEach((p) => {
        if (p.state === 'walk') place(p, true);
      });
    };
    const ro = new ResizeObserver(() => {
      const wChanged = Math.abs(root.clientWidth - W) > 1;
      const hChanged = hero.offsetTop + hero.offsetHeight + 46 !== BY;
      if (wChanged) onSize();
      else if (hChanged) size();
    });
    ro.observe(root);
    ro.observe(hero);

    /* three offers can be in the air at once */
    const S: any[] = [0, 1, 2].map(() => {
      const tip = document.createElement('div');
      tip.className = 'tip';
      tip.innerHTML = '<div class="cen"><div class="tbox"></div></div>';
      root.appendChild(tip);
      return { tip, box: tip.querySelector('.tbox'), p: null };
    });
    const btile = $('.btile');
    const cbox = $('.cbox');
    const clab = $('.cbox .lab');
    const ctxt = $('.cbox .txt');
    let comp: any = null;

    const pop = (el: HTMLElement, on: boolean) => {
      if (animated) {
        if (on)
          gsap.fromTo(
            el,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.8)', overwrite: true }
          );
        else gsap.to(el, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in', overwrite: true });
      } else {
        el.style.transform = `scale(${on ? 1 : 0})`;
        el.style.opacity = on ? '1' : '0';
      }
    };
    const flip = (s: any) => {
      const d = s.d;
      const set = () => {
        s.box.className = 'tbox reply';
        s.box.innerHTML = `<span class="tg ${d.rc}">${d.rtag}</span>“${d.reply}”`;
      };
      if (animated) {
        gsap.to(s.box, {
          rotationX: 90,
          transformPerspective: 600,
          duration: 0.14,
          ease: 'power2.in',
          onComplete: () => {
            set();
            gsap.fromTo(
              s.box,
              { rotationX: -90 },
              { rotationX: 0, transformPerspective: 600, duration: 0.45, ease: 'back.out(2)' }
            );
          },
        });
      } else set();
    };
    const hop = (p: any) => {
      if (animated)
        gsap.fromTo(
          p.hp,
          { y: 0, scale: 1 },
          {
            keyframes: [
              { y: -26, scale: 1.06, duration: 0.3, ease: 'power2.out' },
              { y: 0, scale: 1, duration: 0.3, ease: 'power2.in' },
            ],
          }
        );
    };
    const bump = (k: number) => {
      if (animated)
        gsap.fromTo(
          btile,
          { scale: 1 },
          {
            keyframes: [
              { scale: k, duration: 0.2, ease: 'power2.out' },
              { scale: 1, duration: 0.25, ease: 'power2.in' },
            ],
          }
        );
    };
    const hit = (c: string) => {
      if (frozen) return;
      const e = $('.' + c);
      e.classList.remove('hit');
      void e.offsetWidth;
      e.classList.add('hit');
    };

    let side = 1;
    let di = 0;
    let nextAt = 0.6;
    function pick() {
      const act = S.filter((s) => s.p).map((s) => s.p.px);
      const cx = W / 2;
      const ok = (p: any) => {
        if (p.state !== 'walk' || p.reached || p.t < 47) return false;
        const f = p.px + ((p.dir * p.speed) / 100) * W * 2.4;
        return (
          p.px > W * 0.13 &&
          p.px < W * 0.87 &&
          f > W * 0.1 &&
          f < W * 0.9 &&
          Math.abs(p.px - cx) > 120 * SC &&
          act.every((a) => Math.abs(a - p.px) > 400 * SC)
        );
      };
      let c = P.filter(ok);
      const pref = c.filter((p) => (p.px - cx) * side > 0);
      if (pref.length) c = pref;
      if (!c.length) return null;
      side = -side;
      return c[(rnd() * c.length) | 0];
    }
    function start(now: number) {
      const s = S.find((s) => !s.p);
      if (!s) {
        nextAt = now + 0.2;
        return;
      }
      const p = pick();
      if (!p) {
        nextAt = now + 0.3;
        return;
      }
      s.p = p;
      s.d = data[di++ % data.length];
      s.t0 = now;
      s.st = 0;
      s.ly = 0;
      nextAt = now + 2.4;
      p.state = 'locked';
      p.el.style.zIndex = 200;
      p.img.style.filter = 'none';
      p.img.style.transform = `scaleX(${p.dir}) scale(1.07)`;
    }
    const envelope = (x: number, y: number, rot: number, sc: number) => {
      g.save();
      g.translate(x, y);
      g.rotate(rot);
      g.scale(sc, sc);
      g.globalAlpha = 1;
      g.setLineDash([]);
      g.shadowColor = al(0.55);
      g.shadowBlur = 16;
      g.fillStyle = '#fff';
      g.strokeStyle = COL;
      g.lineWidth = 2;
      g.lineJoin = 'round';
      g.beginPath();
      g.roundRect(-15, -10.5, 30, 21, 4);
      g.fill();
      g.shadowBlur = 0;
      g.stroke();
      g.beginPath();
      g.moveTo(-12.5, -7.5);
      g.lineTo(0, 2.5);
      g.lineTo(12.5, -7.5);
      g.stroke();
      g.restore();
    };

    function drawReach(s: any, a: number, now: number, hx: number, hy: number) {
      const p = s.p;
      const P0 = [W / 2, BY];
      const P1 = [(P0[0] + hx) / 2, Math.min(BY, hy) - (26 + Math.abs(hx - P0[0]) * 0.07)];
      const B = (u: number) => {
        const v = 1 - u;
        return [
          v * v * P0[0] + 2 * v * u * P1[0] + u * u * hx,
          v * v * P0[1] + 2 * v * u * P1[1] + u * u * hy,
        ];
      };
      const seg = (u0: number, u1: number, n: number) => {
        g.beginPath();
        for (let i = 0; i <= n; i++) {
          const q = B(u0 + ((u1 - u0) * i) / n);
          i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]);
        }
        g.stroke();
      };
      g.strokeStyle = COL;
      g.lineCap = 'round';
      if (a < 3.75) {
        /* target ring locks onto the head */
        const R = p.w * 0.27;
        const k = Math.min(1, a / 0.5);
        const e = 1 - Math.pow(1 - k, 3);
        g.save();
        g.translate(hx, hy);
        g.rotate(now * 1.2);
        g.globalAlpha = 0.9 * k;
        g.lineWidth = 2;
        g.setLineDash([R * 0.5, R * 0.285]);
        g.beginPath();
        g.arc(0, 0, R * (2.2 - 1.2 * e), 0, 6.2832);
        g.stroke();
        g.restore();
      }
      if (a < 6.2) {
        /* the thread: dashed while aiming, solid while the reply comes back */
        g.save();
        g.lineWidth = 1.2;
        if (a < 3.75) {
          g.globalAlpha = 0.55;
          g.setLineDash([3, 6]);
          g.lineDashOffset = -now * 24;
          seg(0, Math.min(1, a / 0.6), 28);
        } else {
          g.globalAlpha = 0.35 * Math.min(1, (6.2 - a) / 0.4);
          seg(0, 1, 28);
        }
        g.restore();
      }
      if (a >= 2.9 && a < 3.75) {
        /* the offer is thrown along the arc */
        const u = ease((a - 2.9) / 0.85);
        g.save();
        g.shadowColor = al(0.8);
        g.shadowBlur = 14;
        for (let i = 0; i < 14; i++) {
          const u1 = u - (0.46 * i) / 14;
          const u0 = u - (0.46 * (i + 1)) / 14;
          if (u1 <= 0) break;
          const f = 1 - i / 14;
          g.globalAlpha = f * 0.22;
          g.lineWidth = 16 * f;
          seg(Math.max(0, u0), u1, 3);
          g.globalAlpha = f * 0.95;
          g.lineWidth = 6 * f + 1;
          seg(Math.max(0, u0), u1, 3);
        }
        g.restore();
        const q = B(u);
        const q2 = B(Math.min(1, u + 0.02));
        const dx = q2[0] - q[0];
        envelope(
          q[0],
          q[1],
          Math.atan2(q2[1] - q[1], Math.abs(dx) || 1e-6) * (dx >= 0 ? 1 : -1) * 0.6,
          Math.min(1, (a - 2.9) / 0.15)
        );
      }
      if (a >= 3.75 && a < 4.4) {
        /* it lands */
        const k = (a - 3.75) / 0.65;
        const e = 1 - Math.pow(1 - k, 3);
        g.save();
        g.globalAlpha = 1 - k;
        g.lineWidth = 2.5;
        g.beginPath();
        g.arc(hx, hy, p.w * 0.2 + e * p.w * 0.32, 0, 6.2832);
        g.stroke();
        g.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
          const an = (i / 10) * 6.2832 + s.t0;
          const r0 = p.w * 0.3 + e * p.w * 0.22;
          const r1 = r0 + 12 * (1 - k);
          g.beginPath();
          g.moveTo(hx + Math.cos(an) * r0, hy + Math.sin(an) * r0);
          g.lineTo(hx + Math.cos(an) * r1, hy + Math.sin(an) * r1);
          g.stroke();
        }
        g.restore();
      }
      if (a >= 5.3 && a < 6) {
        /* the reply travels back to the beacon */
        const u = 1 - ease((a - 5.3) / 0.7);
        g.save();
        for (let i = 0; i < 8; i++) {
          const u0 = u + (0.22 * i) / 8;
          const u1 = u + (0.22 * (i + 1)) / 8;
          if (u0 >= 1) break;
          g.globalAlpha = (1 - i / 8) * 0.7;
          g.lineWidth = 3 * (1 - i / 10);
          seg(u0, Math.min(1, u1), 3);
        }
        const q = B(u);
        g.globalAlpha = 1;
        g.shadowColor = al(0.8);
        g.shadowBlur = 12;
        g.fillStyle = COL;
        g.beginPath();
        g.arc(q[0], q[1], 6, 0, 6.2832);
        g.fill();
        g.shadowBlur = 0;
        g.fillStyle = '#fff';
        g.beginPath();
        g.arc(q[0], q[1], 2.4, 0, 6.2832);
        g.fill();
        g.restore();
      }
    }

    let mx = 0;
    let tmx = 0;
    const onMove = (e: PointerEvent) => {
      tmx = (e.clientX - root.getBoundingClientRect().left) / W - 0.5;
    };
    addEventListener('pointermove', onMove);

    function tick(now: number, dt: number, draw: boolean) {
      mx += (tmx - mx) * Math.min(1, dt * 4);
      for (const p of P) {
        const tv = p.state === 'walk' ? 1 : p.state === 'locked' ? 0.45 : 0;
        p.v += (tv - p.v) * Math.min(1, dt * 5);
        p.x += p.dir * p.speed * p.v * dt;
        if ((p.x > 111 || p.x < -11) && p.state === 'walk') place(p, false);
        const s = Math.sin(now * Math.PI * p.f + p.ph);
        p.bob = -Math.abs(s) * (1.5 + 2.5 * p.depth) * p.v;
        p.px = (p.x / 100) * W - mx * p.depth * W * 0.02;
        if (draw)
          p.pe.style.transform = `translate3d(${(p.px - p.w / 2).toFixed(1)}px,${(
            -p.h / 2 +
            p.bob
          ).toFixed(1)}px,0) rotate(${(s * 0.7 * p.v).toFixed(2)}deg)`;
      }
      if (now >= nextAt) start(now);
      if (draw) g.clearRect(0, 0, W, H);
      const margin = Math.min(170, W * 0.42);
      for (const s of S) {
        if (!s.p) continue;
        const a = now - s.t0;
        const p = s.p;
        const d = s.d;
        if (s.st < 1 && a >= 0.9) {
          s.st = 1;
          s.box.className = 'tbox';
          s.box.innerHTML = `<span class="tg ${d.tc}">${d.tag}</span>${d.signal}`;
          pop(s.box, true);
        }
        if (s.st < 2 && a >= 1.8) {
          s.st = 2;
          comp = { d, t0: now, n: -1 };
          clab.textContent = d.lab;
          ctxt.textContent = '';
          pop(cbox, true);
        }
        if (s.st < 3 && a >= 2.9) {
          s.st = 3;
          if (comp && comp.d === d) {
            pop(cbox, false);
            comp = null;
          }
          bump(1.16);
          hit('p1'); /* first headline part lights up as the offer is thrown */
        }
        if (s.st < 4 && a >= 3.75) {
          s.st = 4;
          p.state = 'read';
          p.reached = true;
          p.img.style.filter = `drop-shadow(0 0 14px ${al(0.6)})`;
          hop(p);
        }
        if (s.st < 5 && a >= 4.45) {
          s.st = 5;
          flip(s);
          hit('p2'); /* second part lights up as the reply arrives */
        }
        if (s.st < 6 && a >= 6) {
          s.st = 6;
          bump(1.1);
        }
        if (s.st < 7 && a >= 6.7) {
          s.st = 7;
          pop(s.box, false);
          p.state = 'walk';
          p.el.style.zIndex = p.t | 0;
          p.img.style.transform = `scaleX(${p.dir})`;
          p.img.style.filter = `drop-shadow(0 0 8px ${al(0.45)})`;
        }
        if (a >= 7.1) {
          s.p = null;
          continue;
        }
        if (draw) {
          const [hx, hy] = head(p);
          s.hx = hx;
          s.ty = hy - p.h * 0.21 - 14;
          let lift = 0;
          for (const o of S)
            if (
              o !== s &&
              o.p &&
              o.t0 < s.t0 &&
              Math.abs(o.hx - hx) < 350 &&
              Math.abs(o.ty - s.ty) < 46
            )
              lift = -46; /* two bubbles never sit on each other */
          s.ly += (lift - s.ly) * Math.min(1, dt * 8);
          const tx = Math.max(margin, Math.min(W - margin, hx));
          s.tip.style.transform = `translate(${tx.toFixed(1)}px,${(s.ty + s.ly).toFixed(1)}px)`;
          drawReach(s, a, now, hx, hy);
        }
      }
      if (comp) {
        const L = comp.d.line;
        const n = Math.ceil(Math.min(1, (now - comp.t0) / 0.8) * L.length);
        if (n !== comp.n) {
          comp.n = n;
          ctxt.textContent = L.slice(0, n);
        }
      }
    }

    let raf = 0;
    if (frozen) {
      /* reduced motion / screenshots: run until an offer is in the air, then hold that frame */
      let i = 0;
      for (; i < 1500; i++) {
        tick(i / 60, 1 / 60, false);
        if (
          i > 420 &&
          S.filter((s) => s.p).length > 1 &&
          S.some((s) => s.p && i / 60 - s.t0 > 3.32 && i / 60 - s.t0 < 3.4)
        )
          break;
      }
      tick(i / 60, 0, true);
      $('.p1').classList.add('lit');
    } else {
      gsap.fromTo(
        root.querySelectorAll('h1 .w'),
        { opacity: 0, y: 28, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', stagger: 0.08 }
      );
      gsap.fromTo(
        root.querySelectorAll('.kick,.lead,.ctas'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.25 }
      );
      gsap.fromTo(
        btile,
        { scale: 0 },
        { scale: 1, duration: 0.7, ease: 'back.out(2)', delay: 0.6 }
      );
      gsap.fromTo(crowd, { opacity: 0 }, { opacity: 1, duration: 0.9 });

      /* frames can come slowly in a busy tab: let the clock catch up so the loop stays in real time */
      let last = performance.now();
      let now = 0;
      const loop = (ms: number) => {
        const dt = Math.min(0.25, Math.max(0, (ms - last) / 1000));
        last = ms;
        now += dt;
        tick(now, dt, true);
        raf = requestAnimationFrame(loop);
      };
      loop(last);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener('pointermove', onMove);
      gsap.killTweensOf(root.querySelectorAll('*'));
      S.forEach((s) => s.tip.remove());
      crowd.innerHTML = '';
    };
  }, [data]);

  return (
    <div ref={ref} className={`hch ${className}`}>
      <style>{CSS}</style>

      <div className="bg" aria-hidden="true">
        <i className="b1" />
        <i className="b2" />
        <i className="b3" />
        <i className="b4" />
        <div className="dome" />
        <svg className="grain">
          <filter id="hch-n">
            <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves={2} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hch-n)" />
        </svg>
      </div>

      <main className="hero">
        <span className="kick">
          <i />
          {kicker}
        </span>

        <h1>
          <span className="ph p1">{words(titleA)}</span>{' '}
          <span className="ph p2">
            <em>{words(titleB)}</em>
          </span>
        </h1>

        <p className="lead">{lead}</p>

        <div className="ctas">
          <a className="btn pri" href={primary.href}>
            {primary.label}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7l10 10M17 8v9H8" />
            </svg>
          </a>
          <Link className="btn" href={secondary.href}>
            {secondary.label}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </main>

      <div className="crowd" aria-hidden="true" />
      <canvas className="fx" aria-hidden="true" />

      {/* the beacon: where every offer leaves from */}
      <div className="beacon" aria-hidden="true">
        <div className="btile">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="8" r="3.4" />
            <path d="M3 20c0-3.3 2.7-5.6 6-5.6 1.3 0 2.5.3 3.4.9" />
            <path d="M15.5 17.5l2.3 2.3 4-4.3" />
          </svg>
        </div>
      </div>

      <div className="compose" aria-hidden="true">
        <div className="cen">
          <div className="cbox">
            <span className="lab" />
            <span className="txt" />
            <i className="caret" />
          </div>
        </div>
      </div>
    </div>
  );
}