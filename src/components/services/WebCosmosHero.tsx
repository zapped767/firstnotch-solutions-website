'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// ======================================================
// FIRSTNOTCH BRAND COLOURS
// ======================================================
const RED = 0xb12025; // FirstNotch Red   #B12025
const CHARCOAL = 0x17191c; // Midnight Charcoal #17191C
const WHITE = 0xffffff; // Pure White        #FFFFFF

// ======================================================
// CONTENT (3 scroll stages)
// ======================================================
const SECTIONS = [
  {
    title: 'WEB DEVELOPMENT',
    line1: 'Websites built around your brand,',
    line2: 'fast and clear on every screen',
  },
  {
    title: 'BUILT TO PERFORM',
    line1: 'Custom design, modern frameworks',
    line2: 'and pages tested before launch',
  },
  {
    title: 'READY TO LAUNCH',
    line1: 'A date agreed with you, training for your team',
    line2: 'and 30 days of fixes after launch',
  },
] as const;

const TOTAL = SECTIONS.length;

// Camera keyframes, one per stage
const CAMERA_POSITIONS = [
  { x: 0, y: 30, z: 300 },
  { x: 0, y: 40, z: -50 },
  { x: 0, y: 50, z: -700 },
];

type Refs = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  animationId: number | null;
  targetCameraX: number;
  targetCameraY: number;
  targetCameraZ: number;
  progress: number;
};

export default function WebCosmosHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollUiRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 300 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const threeRefs = useRef<Refs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    targetCameraX: CAMERA_POSITIONS[0].x,
    targetCameraY: CAMERA_POSITIONS[0].y,
    targetCameraZ: CAMERA_POSITIONS[0].z,
    progress: 0,
  });

  // ====================================================
  // THREE.JS SCENE
  // ====================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const refs = threeRefs.current;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.innerWidth < 768;

    const getSize = () => ({
      w: stage.clientWidth || window.innerWidth,
      h: stage.clientHeight || window.innerHeight,
    });

    const { w, h } = getSize();

    // Scene
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(CHARCOAL, 0.00025);

    // Camera
    refs.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 2000);
    refs.camera.position.set(0, 20, 300);

    // Renderer
    refs.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    refs.renderer.setSize(w, h, false);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    // Post-processing (red glow)
    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(
      new UnrealBloomPass(new THREE.Vector2(w, h), 0.8, 0.4, 0.85)
    );

    // ---------------- STARS ----------------
    const createStarField = () => {
      const starCount = isMobile ? 2200 : 5000;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        const white = new THREE.Color(WHITE);
        const softRed = new THREE.Color(WHITE).lerp(new THREE.Color(RED), 0.35);
        const brandRed = new THREE.Color(RED).lerp(new THREE.Color(WHITE), 0.2);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const choice = Math.random();
          const color =
            choice < 0.7 ? white : choice < 0.9 ? softRed : brandRed;

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;

            void main() {
              vColor = color;
              vec3 pos = position;

              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;

            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;

              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene!.add(stars);
        refs.stars.push(stars);
      }
    };

    // ---------------- NEBULA ----------------
    const createNebula = () => {
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(RED) },
          color2: {
            value: new THREE.Color(RED).lerp(new THREE.Color(WHITE), 0.3),
          },
          opacity: { value: 0.3 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;

          void main() {
            vUv = uv;
            vec3 pos = position;

            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);

            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;

            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      refs.scene!.add(nebula);
      refs.nebula = nebula;
    };

    // ---------------- MOUNTAINS (charcoal → red depth) ----------------
    const createMountains = () => {
      const base = new THREE.Color(CHARCOAL);
      const red = new THREE.Color(RED);

      const layers = [
        { distance: -50, height: 60, color: base.clone(), opacity: 1 },
        { distance: -100, height: 80, color: base.clone().lerp(red, 0.18), opacity: 0.8 },
        { distance: -150, height: 100, color: base.clone().lerp(red, 0.36), opacity: 0.6 },
        { distance: -200, height: 120, color: base.clone().lerp(red, 0.55), opacity: 0.4 },
      ];

      layers.forEach((layer, index) => {
        const points: THREE.Vector2[] = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            Math.random() * layer.height * 0.2 -
            100;
          points.push(new THREE.Vector2(x, y));
        }

        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const geometry = new THREE.ShapeGeometry(new THREE.Shape(points));
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = {
          baseZ: layer.distance,
          baseOpacity: layer.opacity,
          index,
        };
        refs.scene!.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    // ---------------- ATMOSPHERE (red glow) ----------------
    const createAtmosphere = () => {
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          glow: { value: new THREE.Color(RED) },
        },
        vertexShader: `
          varying vec3 vNormal;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          uniform vec3 glow;

          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = glow * 1.4 * intensity;

            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;

            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      refs.scene!.add(new THREE.Mesh(geometry, material));
    };

    createStarField();
    createNebula();
    createMountains();
    createAtmosphere();

    // ---------------- ANIMATION LOOP ----------------
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      const progress = refs.progress;

      refs.stars.forEach((field) => {
        (field.material as THREE.ShaderMaterial).uniforms.time.value = time;
      });

      if (refs.nebula) {
        (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value =
          time * 0.5;
      }

      // Smooth camera
      const smoothing = 0.05;
      const s = smoothCameraPos.current;
      s.x += (refs.targetCameraX - s.x) * smoothing;
      s.y += (refs.targetCameraY - s.y) * smoothing;
      s.z += (refs.targetCameraZ - s.z) * smoothing;

      const floatX = reduceMotion ? 0 : Math.sin(time * 0.1) * 2;
      const floatY = reduceMotion ? 0 : Math.cos(time * 0.15) * 1;

      if (refs.camera) {
        refs.camera.position.set(s.x + floatX, s.y + floatY, s.z);
        refs.camera.lookAt(0, 10, s.z - 600);
      }

      // Mountains: parallax float, then fade out as the camera flies through
      const fade = THREE.MathUtils.smoothstep(progress, 0.5, 0.75);
      refs.mountains.forEach((mountain, i) => {
        const parallax = 1 + i * 0.5;
        mountain.position.x = reduceMotion ? 0 : Math.sin(time * 0.1) * 2 * parallax;
        mountain.position.y = 50 + (reduceMotion ? 0 : Math.cos(time * 0.15) * parallax);

        const mat = mountain.material as THREE.MeshBasicMaterial;
        mat.opacity = mountain.userData.baseOpacity * (1 - fade);
        mountain.visible = mat.opacity > 0.01;
      });

      refs.composer?.render();
    };

    animate();
    setIsReady(true);

    // ---------------- RESIZE ----------------
    const handleResize = () => {
      const { w: nw, h: nh } = getSize();
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = nw / nh;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(nw, nh, false);
      refs.composer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    // ---------------- CLEANUP ----------------
    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);

      refs.scene?.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });

      refs.composer?.dispose?.();
      refs.renderer?.dispose();

      refs.stars = [];
      refs.mountains = [];
      refs.nebula = null;
      refs.scene = null;
      refs.camera = null;
      refs.renderer = null;
      refs.composer = null;
    };
  }, []);

  // ====================================================
  // SCROLL → PROGRESS INSIDE THE HERO ONLY
  // ====================================================
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      const refs = threeRefs.current;
      refs.progress = progress;

      setScrollProgress(progress);
      setCurrentSection(Math.min(TOTAL - 1, Math.floor(progress * TOTAL)));

      // Interpolate between keyframes
      const t = progress * (TOTAL - 1);
      const index = Math.min(TOTAL - 2, Math.floor(t));
      const frac = t - index;
      const a = CAMERA_POSITIONS[index];
      const b = CAMERA_POSITIONS[index + 1];

      refs.targetCameraX = a.x + (b.x - a.x) * frac;
      refs.targetCameraY = a.y + (b.y - a.y) * frac;
      refs.targetCameraZ = a.z + (b.z - a.z) * frac;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // ====================================================
  // GSAP — INTRO (menu + scroll indicator)
  // ====================================================
  useEffect(() => {
    if (!isReady) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.set([menuRef.current, scrollUiRef.current], { visibility: 'visible' });

      const tl = gsap.timeline();
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: reduce ? 0 : 1,
        ease: 'power3.out',
      }).from(
        scrollUiRef.current,
        {
          opacity: 0,
          y: 50,
          duration: reduce ? 0 : 1,
          ease: 'power2.out',
        },
        '-=0.5'
      );
    }, stageRef);

    return () => ctx.revert();
  }, [isReady]);

  // ====================================================
  // GSAP — TEXT TRANSITIONS PER STAGE
  // ====================================================
  useEffect(() => {
    if (!isReady || !stageRef.current) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = reduce ? 0 : 1;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>('[data-wch-block]');

      blocks.forEach((block, i) => {
        const chars = block.querySelectorAll('[data-wch-char]');
        const lines = block.querySelectorAll('[data-wch-line]');

        if (i === currentSection) {
          gsap.set(block, { visibility: 'visible' });
          gsap.killTweensOf([chars, lines]);

          gsap.fromTo(
            chars,
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: dur * 1.3,
              stagger: reduce ? 0 : 0.035,
              ease: 'power4.out',
            }
          );

          gsap.fromTo(
            lines,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: dur * 0.9,
              delay: reduce ? 0 : 0.35,
              stagger: reduce ? 0 : 0.18,
              ease: 'power3.out',
            }
          );
        } else {
          gsap.killTweensOf([chars, lines]);
          gsap.to([...chars, ...lines], {
            opacity: 0,
            y: -30,
            yPercent: 0,
            duration: dur * 0.35,
            ease: 'power2.in',
            overwrite: true,
            onComplete: () => {
              gsap.set(block, { visibility: 'hidden' });
            },
          });
        }
      });
    }, stageRef);

    return () => ctx.revert();
  }, [currentSection, isReady]);

  return (
    <section
      ref={sectionRef}
      id="wd-hero"
      aria-label="Web development"
      className="wch-section"
    >
      <style>{css}</style>

      <div ref={stageRef} className="wch-stage">
        <canvas ref={canvasRef} className="wch-canvas" aria-hidden="true" />

        {/* Vignette + red glow */}
        <div className="wch-vignette" aria-hidden="true" />
        <div className="wch-glow" aria-hidden="true" />

        {/* Side menu */}
        <div
          ref={menuRef}
          className="wch-side-menu"
          style={{ visibility: 'hidden' }}
          aria-hidden="true"
        >
          <div className="wch-menu-icon">
            <span />
            <span />
            <span />
          </div>
          <div className="wch-vertical-text">WEB</div>
        </div>

        {/* Text stages */}
        <div className="wch-content">
          {SECTIONS.map((item, i) => {
            const Heading = i === 0 ? 'h1' : 'h2';
            return (
              <div
                key={item.title}
                data-wch-block
                className="wch-block"
                style={{ visibility: 'hidden' }}
                aria-hidden={i !== currentSection}
              >
                <Heading className="wch-title" aria-label={item.title}>
                  {item.title.split(' ').map((word, w) => (
                    <span key={`${word}-${w}`} className="wch-word" aria-hidden="true">
                      {word.split('').map((char, c) => (
                        <span key={c} data-wch-char className="wch-char">
                          {char}
                        </span>
                      ))}
                      {'\u00a0'}
                    </span>
                  ))}
                </Heading>

                <div className="wch-subtitle">
                  <p data-wch-line className="wch-line">
                    {item.line1}
                  </p>
                  <p data-wch-line className="wch-line">
                    {item.line2}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollUiRef}
          className="wch-scroll"
          style={{ visibility: 'hidden' }}
          aria-hidden="true"
        >
          <div className="wch-scroll-text">SCROLL</div>
          <div className="wch-track">
            <div
              className="wch-fill"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="wch-counter">
            {String(currentSection + 1).padStart(2, '0')} /{' '}
            {String(TOTAL).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// STYLES (FirstNotch palette)
//   Red      #B12025
//   Charcoal #17191C
//   White    #FFFFFF
// ======================================================
const css = `
.wch-section {
  position: relative;
  height: 360vh;
  background: #17191C;
}

.wch-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  width: 100%;
  overflow: hidden;
  background: #17191C;
  color: #FFFFFF;
}

.wch-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.wch-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at center, rgba(23,25,28,0) 40%, rgba(23,25,28,.75) 100%),
    linear-gradient(to bottom, rgba(23,25,28,.55) 0%, rgba(23,25,28,0) 22%, rgba(23,25,28,0) 70%, rgba(23,25,28,.85) 100%);
}

.wch-glow {
  position: absolute;
  left: 50%;
  bottom: -20%;
  width: 90vw;
  height: 55vh;
  transform: translateX(-50%);
  pointer-events: none;
  border-radius: 9999px;
  background: rgba(177,32,37,.22);
  filter: blur(120px);
}

/* Side menu */
.wch-side-menu {
  position: absolute;
  left: 28px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.wch-menu-icon {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wch-menu-icon span {
  display: block;
  width: 24px;
  height: 2px;
  background: #FFFFFF;
}

.wch-menu-icon span:nth-child(2) {
  width: 16px;
  background: #B12025;
}

.wch-vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .4em;
  color: rgba(255,255,255,.7);
}

/* Content */
.wch-content {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: grid;
  place-items: center;
  padding: 96px 24px 120px;
  pointer-events: none;
}

.wch-block {
  grid-area: 1 / 1;
  width: 100%;
  max-width: 1320px;
  text-align: center;
}

.wch-title {
  margin: 0;
  font-size: clamp(2.6rem, 9vw, 9rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -.055em;
  color: #FFFFFF;
  text-shadow: 0 0 60px rgba(177,32,37,.45);
}

.wch-word {
  display: inline-block;
  overflow: hidden;
  padding-bottom: .1em;
  vertical-align: bottom;
}

.wch-char {
  display: inline-block;
  will-change: transform, opacity;
}

.wch-subtitle {
  margin-top: 28px;
}

.wch-line {
  margin: 0;
  font-size: clamp(.95rem, 1.7vw, 1.5rem);
  line-height: 1.6;
  font-weight: 400;
  color: rgba(255,255,255,.78);
}

.wch-line:first-child {
  color: #FFFFFF;
}

.wch-line + .wch-line {
  color: rgba(255,255,255,.7);
}

/* Scroll indicator */
.wch-scroll {
  position: absolute;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 16px;
}

.wch-scroll-text {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .3em;
  color: rgba(255,255,255,.75);
}

.wch-track {
  position: relative;
  width: 110px;
  height: 2px;
  background: rgba(255,255,255,.2);
}

.wch-fill {
  height: 100%;
  background: #B12025;
  box-shadow: 0 0 12px rgba(177,32,37,.9);
}

.wch-counter {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: .1em;
  color: rgba(255,255,255,.75);
}

@media (max-width: 767px) {
  .wch-side-menu { left: 14px; }
  .wch-content { padding: 88px 20px 110px 44px; }
  .wch-track { width: 64px; }
  .wch-scroll { bottom: 24px; gap: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .wch-glow { filter: blur(90px); }
}
`;