"use client";

import { Suspense, lazy, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Glow = lazy(() => import("./Glow"));

function Rings() {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);
  const r4 = useRef<THREE.Mesh>(null!);

  useFrame((_, d) => {
    r1.current.rotation.x += d * 0.22;
    r1.current.rotation.y += d * 0.14;
    r2.current.rotation.x -= d * 0.12;
    r2.current.rotation.z += d * 0.18;
    r3.current.rotation.y += d * 0.09;
    r3.current.rotation.z -= d * 0.16;
    r4.current.rotation.x += d * 0.07;
    r4.current.rotation.y -= d * 0.1;
  });

  return (
    <>
      <mesh ref={r1}>
        <torusGeometry args={[1.1, 0.013, 16, 120]} />
        <meshBasicMaterial color="#ff6b35" />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, 0, Math.PI / 5]}>
        <torusGeometry args={[1.65, 0.009, 16, 120]} />
        <meshBasicMaterial color="#ffae8a" />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[0.72, 0.016, 16, 80]} />
        <meshBasicMaterial color="#ff6b35" />
      </mesh>
      <mesh ref={r4} rotation={[Math.PI / 6, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[2.1, 0.006, 16, 120]} />
        <meshBasicMaterial color="#ff8855" />
      </mesh>
    </>
  );
}

export default function ContactRings({
  active = true,
  lite = false,
}: {
  active?: boolean;
  lite?: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 3.8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={lite ? 1 : [1, 1.5]}
    >
      <Rings />
      {!lite && (
        <Suspense fallback={null}>
          <Glow intensity={1.6} luminanceThreshold={0.05} luminanceSmoothing={0.6} />
        </Suspense>
      )}
    </Canvas>
  );
}
