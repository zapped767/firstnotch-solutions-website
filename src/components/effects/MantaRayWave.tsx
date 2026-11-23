"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MantaRayWave() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0.2, 8.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.appendChild(renderer.domElement);

    // ------------------------------------------------
    // MANTA-RAY STRANDS
    // ------------------------------------------------

    const group = new THREE.Group();
    scene.add(group);

    const STRANDS = 115;
    const SEGMENTS = 72;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.LineBasicMaterial[] = [];

    for (let i = 0; i < STRANDS; i++) {
      const geometry = new THREE.BufferGeometry();

      const positions = new Float32Array(SEGMENTS * 3);

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const distanceFromCenter =
        (i - (STRANDS - 1) / 2) / ((STRANDS - 1) / 2);

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color("#B12025"),
        transparent: true,
        opacity:
          0.08 +
          (1 - Math.abs(distanceFromCenter)) * 0.13,
        depthWrite: false,
      });

      const line = new THREE.Line(geometry, material);

      line.userData.strandIndex = i;
      line.userData.normalizedIndex = distanceFromCenter;

      group.add(line);

      geometries.push(geometry);
      materials.push(material);
    }

    // ------------------------------------------------
    // ANIMATION
    // ------------------------------------------------

    const clock = new THREE.Clock();
    let animationFrame = 0;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      group.children.forEach((child) => {
        const line = child as THREE.Line;

        const geometry = line.geometry as THREE.BufferGeometry;

        const position = geometry.getAttribute(
          "position"
        ) as THREE.BufferAttribute;

        const strand = line.userData.normalizedIndex as number;

        for (let j = 0; j < SEGMENTS; j++) {
          const progress = j / (SEGMENTS - 1);

          // Horizontal width
          const x = (progress - 0.5) * 11.5;

          // Manta ray wing silhouette:
          // highest/widest around center and thinner at edges
          const wingEnvelope =
            Math.pow(Math.sin(progress * Math.PI), 0.72);

          // Strand spread
          const spread =
            strand *
            wingEnvelope *
            (1.55 + Math.abs(x) * 0.08);

          // Main slow wing flap
          const flap =
            Math.sin(time * 0.58 + Math.abs(x) * 0.42) *
            0.34 *
            wingEnvelope;

          // Fine travelling wave
          const ripple =
            Math.sin(
              x * 1.12 -
                time * 0.82 +
                strand * 2.2
            ) *
            0.105 *
            wingEnvelope;

          // Small secondary movement
          const micro =
            Math.cos(
              x * 2.25 +
                time * 0.44 +
                strand * 3.5
            ) *
            0.035;

          // Gentle V / manta shape
          const mantaCurve =
            -Math.abs(x) * 0.055 +
            Math.pow(Math.abs(x) / 5.7, 2) * 0.3;

          const y =
            spread +
            flap +
            ripple +
            micro +
            mantaCurve;

          // Subtle depth creates premium 3D appearance
          const z =
            Math.cos(progress * Math.PI * 2 + time * 0.25) *
              0.13 +
            strand * 0.24;

          position.setXYZ(j, x, y, z);
        }

        position.needsUpdate = true;
      });

      // Extremely subtle floating motion
      group.rotation.z = Math.sin(time * 0.18) * 0.015;
      group.rotation.x = Math.sin(time * 0.21) * 0.025;

      renderer.render(scene, camera);
    };

    animate();

    // ------------------------------------------------
    // RESPONSIVE
    // ------------------------------------------------

    const resize = () => {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      if (width < 640) {
        camera.position.z = 11.8;
        group.scale.set(0.9, 0.9, 0.9);
      } else if (width < 1024) {
        camera.position.z = 10;
        group.scale.set(1, 1, 1);
      } else {
        camera.position.z = 8.8;
        group.scale.set(1, 1, 1);
      }
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);

      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());

      renderer.dispose();

      if (
        renderer.domElement &&
        renderer.domElement.parentNode === container
      ) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
    />
  );
}