'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger);

const RED = '#B12025';
const CHARCOAL = '#17191C';

const MODEL_BASE_URL =
  'https://api.getlayers.ai/storage/v1/object/public/public/assets/laocoon-59f84455c6';

const MODEL_URL = `${MODEL_BASE_URL}/bronze_horse.glb`;

const slides = [
  {
    number: '01',
    eyebrow: 'WEB DEVELOPMENT',
    title: ['Websites', 'built to perform.'],
    description:
      'Fast, responsive websites designed around your business, your customers and the actions you need visitors to take.',
    secondary:
      'From the first wireframe to launch, every screen is planned, designed, developed and tested by one team.',
  },
  {
  number: '02',
  eyebrow: 'RESPONSIVE DESIGN',
  title: ['One experience. Every screen.'],
  description:
    'Layouts adapt cleanly across mobile, tablet and desktop without losing hierarchy, usability or visual impact.',
  secondary:
    'Your website is tested across common screen sizes before launch.',
},
  {
    number: '03',
    eyebrow: 'PERFORMANCE',
    title: ['Fast by', 'default.'],
    description:
      'Modern frameworks, optimised assets and careful frontend engineering keep your pages smooth and responsive.',
    secondary:
      'Performance, accessibility, SEO basics and Core Web Vitals are considered throughout the build.',
  },
  {
    number: '04',
    eyebrow: 'FIRSTNOTCH SOLUTIONS',
    title: ['Designed.', 'Built. Launched.'],
    description:
      'A complete website build from discovery and design through development, testing, deployment and handover.',
    secondary:
      'Built with technology that fits your business instead of forcing your business to fit the technology.',
  },
] as const;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export default function WebDevelopmentHorseHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cursorInnerRef = useRef<HTMLDivElement | null>(null);
  const cursorOuterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;
    const canvas = canvasRef.current;

    if (!section || !hero || !canvas) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // =====================================================
    // THREE.JS CORE
    // =====================================================

    const scene = new THREE.Scene();

    scene.background = new THREE.Color('#050505');
    scene.fog = new THREE.FogExp2('#050505', 0.012);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(
      sizes.width < 640 ? 56 : 50,
      sizes.width / sizes.height,
      0.1,
      100
    );

    camera.position.set(0, 0.15, 4.2);

    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, sizes.width < 640 ? 1.5 : 2)
    );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.7;

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // =====================================================
    // BACKGROUND SHADER
    // =====================================================

    const shaderUniforms = {
      uTime: {
        value: 0,
      },

      uResolution: {
        value: new THREE.Vector2(
          sizes.width,
          sizes.height
        ),
      },

      uMouse: {
        value: new THREE.Vector2(0, 0),
      },

      uScroll: {
        value: 0,
      },
    };

    const vertexShader = `
      varying vec2 vUv;

      void main() {
        vUv = uv;

        gl_Position =
          projectionMatrix *
          modelViewMatrix *
          vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScroll;

      float hash(float n) {
        return fract(sin(n) * 43758.5453123);
      }

      float noise(vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);

        f = f * f * (3.0 - 2.0 * f);

        float n =
          p.x +
          p.y * 57.0 +
          113.0 * p.z;

        return mix(
          mix(
            mix(
              hash(n + 0.0),
              hash(n + 1.0),
              f.x
            ),
            mix(
              hash(n + 57.0),
              hash(n + 58.0),
              f.x
            ),
            f.y
          ),
          mix(
            mix(
              hash(n + 113.0),
              hash(n + 114.0),
              f.x
            ),
            mix(
              hash(n + 170.0),
              hash(n + 171.0),
              f.x
            ),
            f.y
          ),
          f.z
        );
      }

      void main() {
        vec2 uv =
          (
            gl_FragCoord.xy -
            0.5 * uResolution.xy
          ) / uResolution.y;

        float aspect =
          uResolution.x /
          uResolution.y;

        float time =
          uTime * 0.075;

        float scroll =
          uScroll;

        vec2 warpedUv = uv;

        float deformation =
          scroll * 4.5;

        warpedUv.x +=
          sin(
            uv.y * 2.4 +
            time * 0.25 +
            deformation
          ) * 0.26;

        warpedUv.y +=
          cos(
            uv.x * 2.2 -
            time * 0.16 -
            deformation * 0.7
          ) * 0.24;

        warpedUv.x +=
          sin(
            uv.y * 1.15 -
            time * 0.1 -
            deformation * 1.3
          ) * 0.16;

        warpedUv += vec2(
          scroll * 0.025,
          -scroll * 0.015
        );

        warpedUv += vec2(
          uMouse.x *
          aspect *
          0.025,

          uMouse.y *
          0.025
        );

        vec2 dir1 =
          normalize(vec2(0.86, 0.45));

        vec2 dir2 =
          normalize(vec2(-0.62, 0.78));

        vec2 dir3 =
          normalize(vec2(0.34, 0.94));

        float wave1 =
          sin(
            dot(
              warpedUv,
              dir1
            ) * 2.6 +
            time
          );

        float wave2 =
          cos(
            dot(
              warpedUv,
              dir2
            ) * 3.4 -
            time * 1.35 +
            wave1 * 0.35
          );

        float wave3 =
          sin(
            dot(
              warpedUv,
              dir3
            ) * 4.4 +
            time * 1.6 +
            wave2 * 0.35
          );

        float field =
          wave1 * 0.50 +
          wave2 * 0.34 +
          wave3 * 0.16;

        float sheen =
          pow(
            max(
              0.0,
              1.0 -
              abs(field - 0.08)
            ),
            3.0
          );

        float highlight =
          pow(
            max(
              0.0,
              1.0 -
              abs(field - 0.14)
            ),
            9.0
          );

        vec3 black =
          vec3(
            0.006,
            0.006,
            0.007
          );

        vec3 charcoal =
          vec3(
            0.035,
            0.038,
            0.043
          );

        vec3 deepRed =
          vec3(
            0.18,
            0.012,
            0.018
          );

        vec3 brandRed =
          vec3(
            0.694,
            0.125,
            0.145
          );

        vec3 softRed =
          vec3(
            0.95,
            0.26,
            0.30
          );

        float redMix =
          smoothstep(
            0.0,
            1.0,
            scroll
          );

        vec3 color =
          mix(
            black,
            charcoal,
            smoothstep(
              -0.8,
              0.6,
              field
            )
          );

        color =
          mix(
            color,
            deepRed,
            smoothstep(
              0.05,
              0.8,
              field
            ) *
            (0.40 + redMix * 0.30)
          );

        color +=
          brandRed *
          sheen *
          0.36;

        color +=
          softRed *
          highlight *
          0.34;

        float glow =
          1.0 -
          smoothstep(
            0.0,
            1.25,
            length(
              uv -
              vec2(
                0.20,
                0.02
              )
            )
          );

        color +=
          brandRed *
          glow *
          0.045;

        float vignette =
          1.0 -
          dot(
            uv,
            uv
          ) *
          0.18;

        color *= vignette;

        gl_FragColor =
          vec4(
            color,
            1.0
          );
      }
    `;

    const backgroundMaterial =
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: shaderUniforms,
        depthWrite: false,
        depthTest: false,
      });

    const backgroundGeometry =
      new THREE.PlaneGeometry(
        30,
        30
      );

    const backgroundMesh =
      new THREE.Mesh(
        backgroundGeometry,
        backgroundMaterial
      );

    backgroundMesh.position.set(
      0,
      0,
      -8
    );

    backgroundMesh.renderOrder =
      -10;

    backgroundMesh.frustumCulled =
      false;

    camera.add(backgroundMesh);

    // =====================================================
    // LIGHTS
    // =====================================================

    const ambientLight =
      new THREE.AmbientLight(
        '#ffffff',
        0.12
      );

    scene.add(ambientLight);

    const keyLight =
      new THREE.SpotLight(
        '#ffffff',
        18
      );

    keyLight.position.set(
      4,
      6,
      3
    );

    keyLight.angle =
      Math.PI / 4;

    keyLight.penumbra =
      0.88;

    keyLight.castShadow =
      true;

    keyLight.shadow.mapSize.set(
      sizes.width < 640
        ? 1024
        : 2048,

      sizes.width < 640
        ? 1024
        : 2048
    );

    keyLight.shadow.camera.near =
      1;

    keyLight.shadow.camera.far =
      15;

    keyLight.shadow.bias =
      -0.001;

    scene.add(keyLight);

    const redRim =
      new THREE.DirectionalLight(
        '#B12025',
        8
      );

    redRim.position.set(
      -5,
      3,
      -4
    );

    scene.add(redRim);

    const softFill =
      new THREE.DirectionalLight(
        '#ffffff',
        1.2
      );

    softFill.position.set(
      -2,
      -4,
      2
    );

    scene.add(softFill);

    // =====================================================
    // HORSE MODEL
    // =====================================================

    let model:
      | THREE.Group
      | null = null;

    let modelPivot:
      | THREE.Group
      | null = null;

    let mixer:
      | THREE.AnimationMixer
      | null = null;

    let modelReveal = 0;

    let disposed = false;

    const loader =
      new GLTFLoader();

    loader.load(
      MODEL_URL,

      (gltf) => {
        if (disposed) return;

        model = gltf.scene;

        modelPivot =
          new THREE.Group();

        scene.add(
          modelPivot
        );

        modelPivot.add(
          model
        );

        model.traverse(
          (object) => {
            if (
              !(object instanceof THREE.Mesh)
            ) {
              return;
            }

            object.castShadow =
              true;

            object.receiveShadow =
              true;

            const materials =
              Array.isArray(
                object.material
              )
                ? object.material
                : [object.material];

            const clonedMaterials =
              materials.map(
                (material) => {
                  const clone =
                    material.clone();

                  if (
                    clone instanceof
                    THREE.MeshStandardMaterial
                  ) {
                    clone.roughness =
                      0.32;

                    clone.metalness =
                      0.94;

                    clone.transparent =
                      true;

                    clone.opacity =
                      0;

                    clone.color.set(
                      '#8D4A39'
                    );

                    clone.envMapIntensity =
                      1.4;

                    if (
                      clone.map
                    ) {
                      clone.map.anisotropy =
                        Math.min(
                          16,
                          renderer.capabilities.getMaxAnisotropy()
                        );
                    }
                  }

                  return clone;
                }
              );

            object.material =
              Array.isArray(
                object.material
              )
                ? clonedMaterials
                : clonedMaterials[0];
          }
        );

        if (
          gltf.animations &&
          gltf.animations.length > 0
        ) {
          mixer =
            new THREE.AnimationMixer(
              model
            );

          gltf.animations.forEach(
            (clip) => {
              mixer
                ?.clipAction(clip)
                .play();
            }
          );
        }

        const initialBox =
          new THREE.Box3().setFromObject(
            model
          );

        const initialSize =
          initialBox.getSize(
            new THREE.Vector3()
          );

        const maxDimension =
          Math.max(
            initialSize.x,
            initialSize.y,
            initialSize.z
          );

        const desiredSize =
          sizes.width < 640
            ? 2.9
            : 3.55;

        const scale =
          desiredSize /
          Math.max(
            maxDimension,
            0.0001
          );

        model.scale.setScalar(
          scale
        );

        model.updateMatrixWorld(
          true
        );

        const scaledBox =
          new THREE.Box3().setFromObject(
            model
          );

        const center =
          scaledBox.getCenter(
            new THREE.Vector3()
          );

        model.position.sub(
          center
        );

        modelPivot.position.y =
          sizes.width < 640
            ? -0.15
            : -0.36;

        modelPivot.scale.setScalar(
          0.94
        );
      },

      undefined,

      (error) => {
        console.error(
          'WebDevelopmentHorseHero: horse GLB failed to load.',
          error
        );
      }
    );

    // =====================================================
    // PARTICLES
    // =====================================================

    const particleCount =
      sizes.width < 640
        ? 180
        : 420;

    type ParticleData = {
      speedX: number;
      speedY: number;
      speedZ: number;
      swaySpeed: number;
      swayRadius: number;
      phase: number;
    };

    const particleData:
      ParticleData[] = [];

    const particleGeometry =
      new THREE.BufferGeometry();

    const particlePositions =
      new Float32Array(
        particleCount * 3
      );

    const particleColors =
      new Float32Array(
        particleCount * 3
      );

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      const index =
        i * 3;

      particlePositions[index] =
        (Math.random() - 0.5) *
        7;

      particlePositions[index + 1] =
        (Math.random() - 0.5) *
          5 -
        0.5;

      particlePositions[index + 2] =
        (Math.random() - 0.5) *
        7;

      const useRed =
        Math.random() < 0.7;

      if (useRed) {
        particleColors[index] =
          0.88;

        particleColors[index + 1] =
          0.08 +
          Math.random() * 0.08;

        particleColors[index + 2] =
          0.10 +
          Math.random() * 0.08;
      } else {
        particleColors[index] =
          0.75 +
          Math.random() * 0.2;

        particleColors[index + 1] =
          0.75 +
          Math.random() * 0.2;

        particleColors[index + 2] =
          0.75 +
          Math.random() * 0.2;
      }

      particleData.push({
        speedX:
          (Math.random() -
            0.5) *
          0.28,

        speedY:
          0.08 +
          Math.random() *
            0.22,

        speedZ:
          (Math.random() -
            0.5) *
          0.28,

        swaySpeed:
          0.5 +
          Math.random() *
            1.3,

        swayRadius:
          0.03 +
          Math.random() *
            0.1,

        phase:
          Math.random() *
          Math.PI *
          2,
      });
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );

    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(
        particleColors,
        3
      )
    );

    // Soft circular particle texture

    const particleCanvas =
      document.createElement(
        'canvas'
      );

    particleCanvas.width =
      32;

    particleCanvas.height =
      32;

    const context =
      particleCanvas.getContext(
        '2d'
      );

    if (context) {
      const gradient =
        context.createRadialGradient(
          16,
          16,
          0,
          16,
          16,
          16
        );

      gradient.addColorStop(
        0,
        'rgba(255,255,255,1)'
      );

      gradient.addColorStop(
        0.25,
        'rgba(255,255,255,.86)'
      );

      gradient.addColorStop(
        0.62,
        'rgba(255,255,255,.22)'
      );

      gradient.addColorStop(
        1,
        'rgba(255,255,255,0)'
      );

      context.fillStyle =
        gradient;

      context.fillRect(
        0,
        0,
        32,
        32
      );
    }

    const particleTexture =
      new THREE.CanvasTexture(
        particleCanvas
      );

    const particleMaterial =
      new THREE.PointsMaterial({
        size:
          sizes.width < 640
            ? 0.035
            : 0.027,

        vertexColors: true,

        transparent: true,

        opacity: 0.78,

        blending:
          THREE.AdditiveBlending,

        depthWrite: false,

        map: particleTexture,
      });

    const particles =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );

    scene.add(particles);

    // =====================================================
    // POINTER
    // =====================================================

    let pointerX = 0;
    let pointerY = 0;

    let targetPointerX = 0;
    let targetPointerY = 0;

    let cursorX =
      window.innerWidth / 2;

    let cursorY =
      window.innerHeight / 2;

    let outerCursorX =
      cursorX;

    let outerCursorY =
      cursorY;

    const finePointer =
      window.matchMedia(
        '(pointer: fine)'
      ).matches;

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      targetPointerX =
        (event.clientX /
          window.innerWidth) *
          2 -
        1;

      targetPointerY =
        (event.clientY /
          window.innerHeight) *
          2 -
        1;

      cursorX =
        event.clientX;

      cursorY =
        event.clientY;

      if (
        cursorInnerRef.current
      ) {
        cursorInnerRef.current.style.transform =
          `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      {
        passive: true,
      }
    );

    // =====================================================
    // SLIDE ANIMATION
    // =====================================================

    const slideCenters = [
      0.05,
      0.34,
      0.63,
      0.91,
    ];

    const renderSlides = (
      progress: number
    ) => {
      slideRefs.current.forEach(
        (slide, index) => {
          if (!slide) return;

          const distance =
            Math.abs(
              progress -
                slideCenters[index]
            );

          const visibility =
            1 -
            clamp(
              distance /
                0.135
            );

          const eased =
            visibility *
            visibility *
            (3 -
              2 *
                visibility);

          gsap.set(slide, {
            opacity: eased,
            y:
              (1 - eased) *
              35,
            filter:
              `blur(${(1 - eased) * 7}px)`,

            pointerEvents:
              eased > 0.65
                ? 'auto'
                : 'none',
          });

          const chars =
            slide.querySelectorAll(
              '[data-horse-char]'
            );

          chars.forEach(
            (
              character,
              charIndex
            ) => {
              const delay =
                charIndex *
                0.012;

              const charProgress =
                clamp(
                  eased *
                    1.35 -
                    delay
                );

              gsap.set(
                character,
                {
                  opacity:
                    charProgress,

                  y:
                    (1 -
                      charProgress) *
                    34,

                  filter:
                    `blur(${(1 - charProgress) * 9}px)`,
                }
              );
            }
          );
        }
      );

      progressFillRefs.current.forEach(
        (fill, index) => {
          if (!fill) return;

          const start =
            index * 0.25;

          const end =
            (index + 1) *
            0.25;

          const local =
            clamp(
              (progress -
                start) /
                (end -
                  start)
            );

          fill.style.transform =
            `scaleY(${local})`;
        }
      );
    };

    // =====================================================
    // SCROLL PROGRESS
    // =====================================================

    let targetScroll = 0;
    let currentScroll = 0;

    let scrollTrigger:
      | ScrollTrigger
      | undefined;

    if (!reduceMotion) {
      scrollTrigger =
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',

          // Overall horse sequence speed.
          // Reduce 5.2 to make it faster.
          end: () =>
            `+=${window.innerHeight * 5.2}`,

          pin: hero,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh:
            true,

          onUpdate: (self) => {
            targetScroll =
              self.progress;
          },

          onRefresh: (self) => {
            targetScroll =
              self.progress;
          },
        });
    } else {
      targetScroll = 0;
      currentScroll = 0;

      renderSlides(0);
    }

    // =====================================================
    // RESIZE
    // =====================================================

    const handleResize = () => {
      sizes.width =
        window.innerWidth;

      sizes.height =
        window.innerHeight;

      camera.aspect =
        sizes.width /
        sizes.height;

      camera.fov =
        sizes.width < 640
          ? 56
          : 50;

      camera.updateProjectionMatrix();

      renderer.setSize(
        sizes.width,
        sizes.height
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          sizes.width < 640
            ? 1.5
            : 2
        )
      );

      shaderUniforms.uResolution.value.set(
        sizes.width,
        sizes.height
      );

      ScrollTrigger.refresh();
    };

    window.addEventListener(
      'resize',
      handleResize
    );

    // =====================================================
    // MAIN RENDER LOOP
    // =====================================================

    const clock =
      new THREE.Clock();

    let animationFrame = 0;

    const lookAt =
      new THREE.Vector3(
        0,
        -0.1,
        0
      );

    const targetCameraPosition =
      new THREE.Vector3();

    const animate = () => {
      animationFrame =
        requestAnimationFrame(
          animate
        );

      const delta =
        Math.min(
          clock.getDelta(),
          0.05
        );

      const elapsed =
        clock.getElapsedTime();

      mixer?.update(delta);

      // Smooth scroll interpolation.

      currentScroll +=
        (targetScroll -
          currentScroll) *
        0.055;

      pointerX +=
        (targetPointerX -
          pointerX) *
        0.055;

      pointerY +=
        (targetPointerY -
          pointerY) *
        0.055;

      // -----------------------------------------------
      // CUSTOM CURSOR
      // -----------------------------------------------

      if (
        finePointer &&
        cursorOuterRef.current
      ) {
        outerCursorX +=
          (cursorX -
            outerCursorX) *
          0.16;

        outerCursorY +=
          (cursorY -
            outerCursorY) *
          0.16;

        cursorOuterRef.current.style.transform =
          `translate3d(${outerCursorX}px, ${outerCursorY}px, 0) translate(-50%, -50%)`;
      }

      // -----------------------------------------------
      // HORSE
      // -----------------------------------------------

      if (
        model &&
        modelPivot
      ) {
        modelReveal +=
          (1 -
            modelReveal) *
          0.028;

        const reveal =
          1 -
          Math.pow(
            1 -
              modelReveal,
            3
          );

        const modelScale =
          0.92 +
          reveal * 0.08;

        modelPivot.scale.setScalar(
          modelScale
        );

        modelPivot.rotation.y +=
          (
            pointerX *
              0.22 -
            modelPivot.rotation.y
          ) *
          0.04;

        modelPivot.rotation.x +=
          (
            pointerY *
              0.10 -
            modelPivot.rotation.x
          ) *
          0.04;

        model.traverse(
          (object) => {
            if (
              !(
                object instanceof
                THREE.Mesh
              )
            ) {
              return;
            }

            const materials =
              Array.isArray(
                object.material
              )
                ? object.material
                : [object.material];

            materials.forEach(
              (material) => {
                if (
                  material
                    .transparent
                ) {
                  material.opacity =
                    reveal;
                }
              }
            );
          }
        );
      }

      // -----------------------------------------------
      // PARTICLES
      // -----------------------------------------------

      const positions =
        particleGeometry.getAttribute(
          'position'
        ) as THREE.BufferAttribute;

      const array =
        positions.array as Float32Array;

      const scrollVelocity =
        Math.abs(
          targetScroll -
            currentScroll
        );

      const speedMultiplier =
        1 +
        scrollVelocity *
          12;

      particleData.forEach(
        (data, index) => {
          const i =
            index * 3;

          array[i] +=
            data.speedX *
            delta *
            speedMultiplier;

          array[i + 1] +=
            data.speedY *
            delta *
            speedMultiplier;

          array[i + 2] +=
            data.speedZ *
            delta *
            speedMultiplier;

          array[i] +=
            Math.sin(
              elapsed *
                data.swaySpeed +
                data.phase
            ) *
            data.swayRadius *
            delta;

          array[i + 2] +=
            Math.cos(
              elapsed *
                data.swaySpeed +
                data.phase
            ) *
            data.swayRadius *
            delta;

          if (
            array[i + 1] >
              3 ||
            Math.abs(
              array[i]
            ) > 3.8 ||
            Math.abs(
              array[i + 2]
            ) > 3.8
          ) {
            array[i] =
              (Math.random() -
                0.5) *
              3.2;

            array[i + 1] =
              -2.8;

            array[i + 2] =
              (Math.random() -
                0.5) *
              3.2;
          }
        }
      );

      positions.needsUpdate =
        true;

      particles.rotation.y =
        currentScroll *
        0.55;

      // -----------------------------------------------
      // CAMERA ORBIT
      // -----------------------------------------------

      const angle =
        currentScroll *
          Math.PI *
          2 +
        0.02;

      const lift =
        Math.sin(
          currentScroll *
            Math.PI
        );

      const mobile =
        sizes.width < 640;

      const radius =
        (mobile
          ? 4.8
          : 4.25) -
        lift * 0.52;

      const cameraX =
        radius *
        Math.sin(angle);

      const cameraZ =
        radius *
        Math.cos(angle);

      const cameraY =
        (mobile
          ? 0.25
          : 0.35) +
        lift * 0.68;

      targetCameraPosition.set(
        cameraX,
        cameraY,
        cameraZ
      );

      camera.position.lerp(
        targetCameraPosition,
        0.045
      );

      const startFocus =
        clamp(
          currentScroll /
            0.28
        );

      lookAt.x =
        -0.55 *
        (1 -
          startFocus);

      lookAt.y =
        mobile
          ? -0.02
          : -0.13;

      camera.lookAt(
        lookAt
      );

      // -----------------------------------------------
      // SHADER
      // -----------------------------------------------

      shaderUniforms.uTime.value =
        elapsed;

      shaderUniforms.uScroll.value =
        currentScroll;

      shaderUniforms.uMouse.value.set(
        pointerX,
        -pointerY
      );

      // -----------------------------------------------
      // HTML STORY
      // -----------------------------------------------

      renderSlides(
        currentScroll
      );

      renderer.render(
        scene,
        camera
      );
    };

    renderSlides(0);

    animate();

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      disposed = true;

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      window.removeEventListener(
        'resize',
        handleResize
      );

      scrollTrigger?.kill();

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();

      backgroundGeometry.dispose();
      backgroundMaterial.dispose();

      model?.traverse(
        (object) => {
          if (
            !(
              object instanceof
              THREE.Mesh
            )
          ) {
            return;
          }

          object.geometry?.dispose();

          const materials =
            Array.isArray(
              object.material
            )
              ? object.material
              : [object.material];

          materials.forEach(
            (material) => {
              if (
                material instanceof
                THREE.MeshStandardMaterial
              ) {
                material.map?.dispose();
              }

              material.dispose();
            }
          );
        }
      );

      renderer.dispose();

      scene.clear();
    };
  }, []);

  const scrollToIncluded =
    () => {
      document
        .getElementById(
          'wd-included'
        )
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    };

  const renderTitle = (
    lines: readonly string[]
  ) => (
    <>
      {lines.map(
        (line, lineIndex) => (
          <span
            key={line}
            className="block"
          >
            {Array.from(
              line
            ).map(
              (
                character,
                characterIndex
              ) => (
                <span
                  key={`${lineIndex}-${characterIndex}`}
                  data-horse-char
                  className="inline-block will-change-[transform,opacity,filter]"
                >
                  {character ===
                  ' '
                    ? '\u00A0'
                    : character}
                </span>
              )
            )}
          </span>
        )
      )}
    </>
  );

  return (
    <section
      ref={sectionRef}
      aria-label="FirstNotch web development experience"
      className="
        relative
        z-0
        min-h-[100svh]
        bg-black
      "
    >
      <div
        ref={heroRef}
        className="
          relative
          h-[100svh]
          min-h-[620px]
          w-full
          overflow-hidden
          bg-black
          text-white
        "
      >
        {/* ==========================================
            THREE.JS CANVAS
        =========================================== */}

        <canvas
          ref={canvasRef}
          aria-label="Interactive 3D horse representing FirstNotch web development"
          className="
            absolute
            inset-0
            z-0
            h-full
            w-full
            outline-none
          "
        />

        {/* ==========================================
            CINEMATIC VIGNETTE
        =========================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-[2]
            bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,.12)_62%,rgba(0,0,0,.72)_100%)]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[2]
            h-[45%]
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
          "
        />

        {/* ==========================================
            EDITORIAL VERTICAL LINES
            No square/grid background.
        =========================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-[22px]
            right-[22px]
            z-[3]
            hidden
            justify-between
            lg:flex
          "
        >
          {[0, 1, 2, 3, 4].map(
            (line) => (
              <div
                key={line}
                className="
                  relative
                  h-full
                  w-px
                  bg-white/[0.09]
                "
              />
            )
          )}
        </div>

        {/* TOP RULE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-[74px]
            z-[4]
            hidden
            h-px
            bg-white/10
            lg:block
          "
        />

       

        {/* ==========================================
            STORY SLIDES
        =========================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
          "
        >
          {slides.map(
            (slide, index) => {
              const desktopPosition =
                index === 0
                  ? 'lg:left-[60px] lg:right-auto lg:max-w-[820px]'
                  : index === 1
                    ? 'lg:left-[28%] lg:right-auto lg:max-w-[720px]'
                    : index === 2
                      ? 'lg:left-auto lg:right-[6%] lg:max-w-[660px]'
                      : 'lg:left-[18%] lg:right-auto lg:max-w-[780px]';

              return (
                <div
                  key={slide.number}
                  ref={(element) => {
                    slideRefs.current[
                      index
                    ] =
                      element;
                  }}
                  className={`
                    pointer-events-none
                    absolute
                    bottom-[8%]
                    left-5
                    right-5
                    opacity-0
                    will-change-[transform,opacity,filter]

                    sm:left-8
                    sm:right-8
                    sm:bottom-[9%]

                    ${desktopPosition}
                  `}
                >
                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-[9px]
                        text-[#E85B60]
                      "
                    >
                      {slide.number} / 04
                    </span>

                    <span
                      className="
                        h-px
                        w-[38px]
                        bg-[#B12025]
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[.22em]
                        text-white/55
                      "
                    >
                      {slide.eyebrow}
                    </span>
                  </div>

                  <h1
  className={`
    max-w-[1000px]
    text-[clamp(3rem,15vw,5.2rem)]
    font-semibold
    leading-[.91]
    tracking-[-.075em]
    text-white

    sm:text-[clamp(4.5rem,10vw,7rem)]

    ${
      index === 1
        ? 'lg:max-w-none lg:whitespace-nowrap lg:text-[clamp(4.2rem,6vw,6.8rem)]'
        : 'lg:text-[clamp(5rem,7vw,8rem)]'
    }
  `}
>
                    {renderTitle(
                      slide.title
                    )}
                  </h1>

                  <div
                    className="
                      mt-5
                      grid
                      max-w-[760px]
                      gap-3

                      sm:mt-6

                      lg:grid-cols-2
                      lg:gap-8
                    "
                  >
                    <p
                      className="
                        text-[11px]
                        leading-[1.7]
                        text-white/70

                        sm:text-[13px]
                        sm:leading-[1.8]
                      "
                    >
                      {
                        slide.description
                      }
                    </p>

                    <p
                      className="
                        hidden
                        text-[12px]
                        leading-[1.8]
                        text-white/42

                        md:block
                      "
                    >
                      {
                        slide.secondary
                      }
                    </p>
                  </div>

                  {index === 0 && (
                    <div
                      className="
                        pointer-events-auto
                        mt-6
                        flex
                        flex-wrap
                        gap-2.5

                        sm:mt-7
                      "
                    >
                      <a
                        href="#contact"
                        className="
                          inline-flex
                          min-h-[43px]
                          items-center
                          justify-center
                          gap-2
                          rounded-full
                          bg-[#B12025]
                          px-5
                          text-[10px]
                          font-bold
                          text-white
                          transition
                          duration-300
                          hover:bg-[#94191E]

                          sm:min-h-[48px]
                          sm:px-6
                          sm:text-[11px]
                        "
                      >
                        Book a free discovery call

                        <ArrowUpRight
                          size={15}
                        />
                      </a>

                      <button
                        type="button"
                        onClick={
                          scrollToIncluded
                        }
                        className="
                          inline-flex
                          min-h-[43px]
                          items-center
                          justify-center
                          gap-2
                          rounded-full
                          border
                          border-white/25
                          bg-white/[0.06]
                          px-5
                          text-[10px]
                          font-semibold
                          text-white
                          backdrop-blur-md
                          transition
                          duration-300
                          hover:border-white/50
                          hover:bg-white
                          hover:text-[#17191C]

                          sm:min-h-[48px]
                          sm:px-6
                          sm:text-[11px]
                        "
                      >
                        See what is included

                        <ArrowDown
                          size={15}
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* ==========================================
            RIGHT STORY PROGRESS
        =========================================== */}

        <div
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            z-30
            flex
            -translate-y-1/2
            flex-col
            gap-[7px]

            sm:right-6

            lg:right-[40px]
            lg:gap-[10px]
          "
        >
          {slides.map(
            (slide, index) => (
              <div
                key={slide.number}
                className="
                  relative
                  h-[28px]
                  w-[2px]
                  overflow-hidden
                  rounded-full
                  bg-white/15

                  lg:h-[42px]
                "
              >
                <div
                  ref={(element) => {
                    progressFillRefs.current[
                      index
                    ] =
                      element;
                  }}
                  className="
                    absolute
                    inset-0
                    origin-top
                    scale-y-0
                    bg-[#E85B60]
                  "
                />
              </div>
            )
          )}
        </div>

        {/* ==========================================
            SCROLL HINT
        =========================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[18px]
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-2
            whitespace-nowrap
            text-[8px]
            font-bold
            uppercase
            tracking-[.22em]
            text-white/35

            sm:bottom-[25px]
            sm:text-[9px]
          "
        >
          Scroll to explore

          <ArrowDown
            size={12}
            className="
              animate-bounce
            "
          />
        </div>

        {/* ==========================================
            CUSTOM CURSOR — DESKTOP
        =========================================== */}

        <div
          ref={cursorOuterRef}
          aria-hidden="true"
          className="
            pointer-events-none
            fixed
            left-0
            top-0
            z-[9998]
            hidden
            h-[42px]
            w-[42px]
            rounded-full
            border
            border-white/40
            will-change-transform

            lg:block
          "
        />

        <div
          ref={cursorInnerRef}
          aria-hidden="true"
          className="
            pointer-events-none
            fixed
            left-0
            top-0
            z-[9999]
            hidden
            h-[6px]
            w-[6px]
            rounded-full
            bg-white
            shadow-[0_0_15px_rgba(255,255,255,.65)]
            will-change-transform

            lg:block
          "
        />
      </div>
    </section>
  );
}