
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// =====================================================
// HERO SCENES
// =====================================================

const SLIDES = [
  {
    eyebrow: "WEB DEVELOPMENT SERVICES IN SRI LANKA",
    title: "WEB DEVELOPMENT",
    subtitle:
      "A fast, custom website that brings in enquiries, built by a team in Colombo.",
    index: "01",
  },
  {
    eyebrow: "DESIGNED AROUND YOUR BUSINESS",
    title: "DESIGN & BUILD",
    subtitle:
      "Custom design, modern technology and responsive experiences that work on every screen.",
    index: "02",
  },
  {
    eyebrow: "FROM CONCEPT TO LAUNCH",
    title: "READY TO LAUNCH",
    subtitle:
      "A clear process from your first brief to testing, training and a supported launch.",
    index: "03",
  },
] as const;

// =====================================================
// MAIN HERO
// =====================================================

export default function WebCosmosHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(0);

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // =================================================
    // THREE.JS SCENE
    // =================================================

    const scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(
      0x17191c,
      0.00055
    );

    const camera = new THREE.PerspectiveCamera(
      70,
      1,
      0.1,
      2500
    );

    camera.position.set(0, 25, 280);
    camera.lookAt(0, 0, -500);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.75)
    );

    renderer.setClearColor(0x17191c, 0);

    renderer.toneMapping =
      THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure = 1.15;

    // =================================================
    // BLOOM
    // =================================================

    const composer = new EffectComposer(renderer);

    composer.addPass(
      new RenderPass(scene, camera)
    );

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      0.75,
      0.45,
      0.88
    );

    composer.addPass(bloom);

    // =================================================
    // COSMIC STARS
    // =================================================

    const stars: THREE.Points[] = [];

    for (let layer = 0; layer < 3; layer++) {
      const count = 1800;

      const positions = new Float32Array(
        count * 3
      );

      const colors = new Float32Array(
        count * 3
      );

      for (let i = 0; i < count; i++) {
        const radius =
          260 + Math.random() * 1100;

        const theta =
          Math.random() * Math.PI * 2;

        const phi = Math.acos(
          2 * Math.random() - 1
        );

        positions[i * 3] =
          radius *
          Math.sin(phi) *
          Math.cos(theta);

        positions[i * 3 + 1] =
          radius *
          Math.sin(phi) *
          Math.sin(theta);

        positions[i * 3 + 2] =
          radius * Math.cos(phi) - 400;

        const color = new THREE.Color();

        if (Math.random() > 0.85) {
          color.set("#B12025");
        } else {
          color.set("#FFFFFF");
        }

        const brightness =
          0.5 + Math.random() * 0.5;

        colors[i * 3] =
          color.r * brightness;

        colors[i * 3 + 1] =
          color.g * brightness;

        colors[i * 3 + 2] =
          color.b * brightness;
      }

      const geometry =
        new THREE.BufferGeometry();

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          positions,
          3
        )
      );

      geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(
          colors,
          3
        )
      );

      const material =
        new THREE.PointsMaterial({
          size: 1.5 + layer * 0.5,
          vertexColors: true,
          transparent: true,
          opacity: 0.85,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

      const points = new THREE.Points(
        geometry,
        material
      );

      scene.add(points);
      stars.push(points);
    }

    // =================================================
    // RED NEBULA BACKGROUND
    // =================================================

    const nebulaGeometry =
      new THREE.PlaneGeometry(
        1900,
        1100,
        32,
        20
      );

    const nebulaMaterial =
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },

          uRed: {
            value: new THREE.Color("#B12025"),
          },
        },

        vertexShader: `
          varying vec2 vUv;
          uniform float uTime;

          void main() {
            vUv = uv;

            vec3 p = position;

            p.z += sin(
              p.x * 0.006 + uTime * 0.2
            ) * cos(p.y * 0.006) * 18.0;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(p, 1.0);
          }
        `,

        fragmentShader: `
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uRed;

          void main() {
            vec2 center =
              vUv - vec2(0.55, 0.5);

            float radial = max(
              0.0,
              1.0 - length(center) * 1.8
            );

            float waves = sin(
              vUv.x * 13.0 + uTime * 0.2
            ) * cos(
              vUv.y * 9.0 - uTime * 0.15
            );

            float alpha =
              radial * (0.12 + waves * 0.035);

            gl_FragColor = vec4(
              uRed,
              max(alpha, 0.0)
            );
          }
        `,

        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

    const nebula = new THREE.Mesh(
      nebulaGeometry,
      nebulaMaterial
    );

    nebula.position.z = -850;

    scene.add(nebula);

    // =================================================
    // LAYERED MOUNTAIN BACKGROUND
    // =================================================

    const mountains: THREE.Mesh[] = [];

    const mountainLayers = [
      {
        z: -150,
        color: "#090B0E",
        height: 55,
      },
      {
        z: -300,
        color: "#111316",
        height: 78,
      },
      {
        z: -470,
        color: "#241316",
        height: 98,
      },
      {
        z: -650,
        color: "#40191E",
        height: 115,
      },
    ];

    mountainLayers.forEach(
      (layer, index) => {
        const points: THREE.Vector2[] = [];

        for (let i = 0; i <= 90; i++) {
          const x =
            (i / 90 - 0.5) * 1800;

          const y =
            Math.sin(
              i * 0.12 + index
            ) *
              layer.height +
            Math.cos(i * 0.055) *
              layer.height *
              0.5 -
            135;

          points.push(
            new THREE.Vector2(x, y)
          );
        }

        points.push(
          new THREE.Vector2(950, -600)
        );

        points.push(
          new THREE.Vector2(-950, -600)
        );

        const shape = new THREE.Shape(
          points
        );

        const geometry =
          new THREE.ShapeGeometry(shape);

        const material =
          new THREE.MeshBasicMaterial({
            color: layer.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.95 - index * 0.1,
            depthWrite: false,
          });

        const mesh = new THREE.Mesh(
          geometry,
          material
        );

        mesh.position.z = layer.z;

        scene.add(mesh);
        mountains.push(mesh);
      }
    );

    // =================================================
    // CAMERA AND RESIZE
    // =================================================

    const cameraTarget = {
      x: 0,
      y: 25,
      z: 280,
    };

    const resize = () => {
      const width = section.clientWidth;

      const height = Math.max(
        window.innerHeight,
        1
      );

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height,
        false
      );

      composer.setSize(
        width,
        height
      );
    };

    resize();

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(section);

    // =================================================
    // NEW: VERTICAL SCROLL HEADING ANIMATIONS
    // =================================================

    const slides =
      gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(
          "[data-cosmos-slide]"
        )
      );

    // Keep every heading mounted.
    // First heading starts visible.
    // Second and third start below.

    gsap.set(slides[0], {
      yPercent: 0,
      autoAlpha: 1,
    });

    gsap.set(slides.slice(1), {
      yPercent: 110,
      autoAlpha: 0,
    });

    const headingTimeline =
      gsap.timeline({
        paused: true,
      });

    if (
      !reducedMotion &&
      slides.length === 3
    ) {
      // Full timeline length = 10 units.
      // Scroll position drives timeline progress.

      const spacer = {
        position: 0,
      };

      headingTimeline.to(
        spacer,
        {
          position: 1,
          duration: 10,
        },
        0
      );

      // -----------------------------------------
      // SCENE 01 -> SCENE 02
      // WEB DEVELOPMENT goes UP
      // DESIGN & BUILD rises from BELOW
      // -----------------------------------------

      headingTimeline.to(
        slides[0],
        {
          yPercent: -110,
          autoAlpha: 0,
          ease: "power2.inOut",
          duration: 1.45,
        },
        2.0
      );

      headingTimeline.fromTo(
        slides[1],
        {
          yPercent: 110,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "power2.inOut",
          duration: 1.45,
        },
        2.0
      );

      // -----------------------------------------
      // SCENE 02 -> SCENE 03
      // DESIGN & BUILD goes UP
      // READY TO LAUNCH rises from BELOW
      // -----------------------------------------

      headingTimeline.to(
        slides[1],
        {
          yPercent: -110,
          autoAlpha: 0,
          ease: "power2.inOut",
          duration: 1.45,
        },
        5.55
      );

      headingTimeline.fromTo(
        slides[2],
        {
          yPercent: 110,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "power2.inOut",
          duration: 1.45,
        },
        5.55
      );
    }

    // =================================================
    // SCROLL CONTROL
    // =================================================

    const updateScroll = (p: number) => {
      setProgress(
        Math.round(p * 100)
      );

      const next =
        p < 0.27
          ? 0
          : p < 0.63
            ? 1
            : 2;

      if (activeRef.current !== next) {
        activeRef.current = next;
        setActive(next);
      }

      slides.forEach(
        (slide, index) => {
          slide.style.pointerEvents =
            next === index
              ? "auto"
              : "none";
        }
      );

      if (reducedMotion) {
        // Accessible static scene switching.

        slides.forEach(
          (slide, index) => {
            gsap.set(slide, {
              yPercent: 0,
              autoAlpha:
                next === index
                  ? 1
                  : 0,
            });
          }
        );
      } else {
        // Scroll controls vertical headings.
        // Reverses when scrolling upward.

        headingTimeline.progress(p);

        // Scroll also controls camera depth.

        cameraTarget.z =
          280 - p * 720;

        cameraTarget.y =
          25 + p * 45;

        cameraTarget.x =
          Math.sin(p * Math.PI) * 30;
      }
    };

    const trigger =
      ScrollTrigger.create({
        trigger: section,

        start: "top top",
        end: "bottom bottom",

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          updateScroll(
            self.progress
          );
        },

        onRefresh: (self) => {
          updateScroll(
            self.progress
          );
        },
      });

    // =================================================
    // THREE.JS ANIMATION LOOP
    // =================================================

    const clock = new THREE.Clock();

    let animationFrame = 0;
    let disposed = false;

    const animate = () => {
      if (disposed) return;

      animationFrame =
        requestAnimationFrame(animate);

      const elapsed =
        clock.getElapsedTime();

      stars.forEach(
        (group, index) => {
          if (!reducedMotion) {
            group.rotation.z =
              elapsed *
              0.003 *
              (index % 2 === 0
                ? 1
                : -1);
          }
        }
      );

      nebulaMaterial.uniforms.uTime.value =
        elapsed;

      camera.position.x +=
        (cameraTarget.x -
          camera.position.x) *
        0.055;

      camera.position.y +=
        (cameraTarget.y -
          camera.position.y) *
        0.055;

      camera.position.z +=
        (cameraTarget.z -
          camera.position.z) *
        0.055;

      camera.lookAt(
        0,
        0,
        -600
      );

      composer.render();
    };

    animate();

    // =================================================
    // CLEANUP
    // =================================================

    return () => {
      disposed = true;

      cancelAnimationFrame(
        animationFrame
      );

      trigger.kill();
      headingTimeline.kill();

      resizeObserver.disconnect();

      stars.forEach(
        (group) => {
          group.geometry.dispose();

          const material =
            group.material;

          if (
            Array.isArray(material)
          ) {
            material.forEach(
              (m) => m.dispose()
            );
          } else {
            material.dispose();
          }

          scene.remove(group);
        }
      );

      mountains.forEach(
        (mesh) => {
          mesh.geometry.dispose();

          const material =
            mesh.material;

          if (
            Array.isArray(material)
          ) {
            material.forEach(
              (m) => m.dispose()
            );
          } else {
            material.dispose();
          }

          scene.remove(mesh);
        }
      );

      nebulaGeometry.dispose();
      nebulaMaterial.dispose();

      scene.remove(nebula);

      composer.dispose();
      renderer.dispose();
    };
  }, []);

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section
      ref={sectionRef}
      id="wd-hero"
      className="relative h-[240vh] bg-[#17191C] text-white"
    >
      <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden">
        {/* THREE.JS COSMIC BACKGROUND */}

        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* BACKGROUND OVERLAYS */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(23,25,28,.74)_0%,rgba(23,25,28,.35)_55%,rgba(23,25,28,.28)_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#17191C] to-transparent"
        />

        {/* ============================================
            VERTICAL ROLLING HERO HEADINGS
        ============================================ */}

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1536px] flex-col px-5 pb-10 pt-[125px] sm:px-8 lg:px-14 lg:pb-14 lg:pt-[145px]">
          <div className="relative min-h-0 flex-1">
            {SLIDES.map(
              (slide, index) => (
                <div
                  key={slide.index}
                  data-cosmos-slide
                  aria-hidden={
                    active !== index
                  }
                  className="absolute inset-x-0 top-0 max-w-[1150px]"
                  style={{
                    opacity:
                      index === 0
                        ? 1
                        : 0,

                    visibility:
                      index === 0
                        ? "visible"
                        : "hidden",

                    pointerEvents:
                      index === active
                        ? "auto"
                        : "none",
                  }}
                >
                  {/* EYEBROW */}

                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-[#EF9A9C] sm:text-[12px]">
                    {slide.eyebrow}
                  </p>

                  {/* HEADING */}

                  {index === 0 ? (
                    <h1 className="max-w-[1100px] text-[clamp(2.8rem,8vw,9rem)] font-black uppercase leading-[.94] tracking-[-.075em] text-white">
                      {slide.title}
                    </h1>
                  ) : (
                    <h2 className="max-w-[1100px] text-[clamp(2.8rem,8vw,9rem)] font-black uppercase leading-[.94] tracking-[-.075em] text-white">
                      {slide.title}
                    </h2>
                  )}

                  {/* DESCRIPTION */}

                  <p className="mt-6 max-w-[700px] text-[clamp(14px,1.5vw,19px)] leading-[1.8] text-white/80">
                    {slide.subtitle}
                  </p>

                  {/* SCENE 01 BUTTONS */}

                  {index === 0 && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="#contact"
                        tabIndex={
                          active === 0
                            ? 0
                            : -1
                        }
                        className="inline-flex min-h-[48px] items-center gap-3 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white transition hover:bg-[#941A1F]"
                      >
                        Book a free discovery call

                        <ArrowUpRight
                          size={16}
                        />
                      </a>

                      <a
                        href="#wd-included"
                        tabIndex={
                          active === 0
                            ? 0
                            : -1
                        }
                        className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/40 px-6 text-[12px] font-semibold text-white transition hover:bg-white/10"
                      >
                        See what is included

                        <ArrowDown
                          size={16}
                        />
                      </a>
                    </div>
                  )}

                  {/* SCENE 02 LABEL */}

                  {index === 1 && (
                    <div className="mt-8 flex items-center gap-3 text-[#EF9A9C]">
                      <Code2
                        size={22}
                      />

                      <span className="text-[12px] font-semibold uppercase tracking-[.16em]">
                        Creative design / Modern code
                      </span>
                    </div>
                  )}

                  {/* SCENE 03 BUTTON */}

                  {index === 2 && (
                    <a
                      href="#wd-process"
                      tabIndex={
                        active === 2
                          ? 0
                          : -1
                      }
                      className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#B12025] px-6 py-4 text-[12px] font-semibold text-white"
                    >
                      <Rocket
                        size={17}
                      />

                      Explore our development process

                      <ArrowUpRight
                        size={16}
                      />
                    </a>
                  )}
                </div>
              )
            )}
          </div>

          {/* ============================================
              BOTTOM SCROLL PROGRESS
          ============================================ */}

          <div className="relative z-20 flex shrink-0 items-end justify-between gap-5">
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-white/70">
                Scroll to explore
              </span>

              {/* PROGRESS BAR */}

              <div className="hidden h-[2px] w-[130px] overflow-hidden bg-white/20 sm:block">
                <div
                  className="h-full bg-[#B12025]"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <span className="font-mono text-[11px] text-white/70">
                {progress}%
              </span>
            </div>

            {/* SCENE INDICATORS */}

            <div className="flex items-center gap-3">
              {SLIDES.map(
                (item, index) => (
                  <div
                    key={item.index}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      index === active
                        ? "w-9 bg-[#B12025]"
                        : "w-4 bg-white/30"
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
