"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  AdaptiveDpr,
  PerformanceMonitor,
  Float,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import AbstractShape from "./AbstractShape";

// floating dust particles around the shape (atmosphere)
function Dust() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useRef(
    (() => {
      const n = 600;
      const arr = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const r = 2.2 + Math.random() * 2.6;
        const t = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        arr[i * 3] = r * Math.sin(ph) * Math.cos(t);
        arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(t);
        arr[i * 3 + 2] = r * Math.cos(ph);
      }
      return arr;
    })()
  );
  useFrame((_, d) => {
    ref.current.rotation.y += d * 0.02;
  });
  return (
    <Points ref={ref} positions={positions.current} stride={3}>
      <PointMaterial
        transparent
        color="#ffae8a"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

// gently move the camera toward the mouse for a parallax feel
function Rig() {
  useFrame((state) => {
    state.camera.position.x += (state.pointer.x * 1.1 - state.camera.position.x) * 0.04;
    state.camera.position.y += (state.pointer.y * 1.1 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  const pointer = useRef(0); // pushed up on hover/click, decays in the shape
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onPointerMove={() => (pointer.current = 0.5)}
      onPointerDown={() => (pointer.current = 1.2)}
    >
      {/* auto lower quality on weak devices to keep it smooth */}
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />
      <AdaptiveDpr pixelated />

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <AbstractShape pointer={pointer} />
      </Float>
      <Dust />
      <Rig />

      {/* the real glow */}
      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
